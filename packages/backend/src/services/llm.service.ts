import OpenAI from "openai";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

interface BusinessData {
  businessSize: number;
  seatingCapacity: number;
  customFields: Record<string, string | number>;
}

interface GenerateReportParams {
  businessData: BusinessData;
  regulationsContext: string; // זהו הטקסט מהמקטעים הרלוונטיים
}

// פונקציה לבניית הפרומפט
const buildPrompt = (data: GenerateReportParams): string => {
  const businessDetails = JSON.stringify(data.businessData, null, 2);

  return `
    **הוראה:**
    אתה יועץ רגולציה מומחה. תפקידך לפשט חוקים ותקנות עבור בעלי עסקים.
    בהינתן סעיפי הרגולציה המצורפים מטה ("הקשר") ונתוני העסק של המשתמש, עליך להפיק דוח ברור, פשוט, וידידותי.
    
    **חשוב מאוד: עצב את כל התשובה שלך באמצעות Markdown.**
    השתמש בכותרות (#, ##), רשימות (-, *), הדגשות (**) וכל מה שצריך כדי להפוך את הדוח לקריא ומסודר.

    **הקשר (סעיפי רגולציה רלוונטיים):**
    ---
    ${data.regulationsContext}
    ---

    **נתוני העסק:**
    ---
    ${businessDetails}
    ---

    **הפק את הדוח המעוצב ב-Markdown כעת:**
  `;
};

export const generateComplianceReport = async (params: GenerateReportParams): Promise<string> => {
  if (!DEEPSEEK_API_KEY) {
    throw new Error("DeepSeek API key not found.");
  }

  const prompt = buildPrompt(params);

  try {
    const openai = new OpenAI({
      baseURL: "https://api.deepseek.com",
      apiKey: DEEPSEEK_API_KEY,
    });

    const response = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "deepseek-chat",
    });

    const reportText = response.choices[0]?.message?.content;

    if (!reportText) {
      throw new Error("Received an empty response from the LLM.");
    }

    return reportText.trim();
  } catch (error: any) {
    console.error("Error calling DeepSeek API:", error.response?.data || error.message);
    throw new Error("Failed to communicate with the language model.");
  }
};

import OpenAI from "openai";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

interface BusinessData {
  businessSize: number;
  seatingCapacity: number;
  customFields: Record<string, string | number | boolean>;
}

interface GenerateReportParams {
  businessData: BusinessData;
  regulationsContext: string;
}

const buildPrompt = (data: GenerateReportParams): string => {
  const businessDetails = JSON.stringify(data.businessData, null, 2);

  return `
    **ROLE & GOAL:**
    You are an expert regulatory compliance consultant. Your goal is to generate a professional, clear, and trustworthy report for a business owner. The report must analyze the provided regulations and explain how they apply to the user's specific business data.

    **TONE & STYLE:**
    - **Professional & Authoritative:** Use formal language. Avoid slang, overly casual phrases, and emojis.
    - **Clear & Accessible:** Write in simple terms that a non-lawyer can understand, but do not oversimplify to the point of being unprofessional.
    - **Objective:** Base your analysis strictly on the provided "REGULATIONS CONTEXT". Do not invent rules or offer advice not supported by the text.

    **REPORT STRUCTURE (MANDATORY):**
    You MUST format the entire response in Markdown and follow this exact structure:

    # דוח תאימות רגולטורית לעסק

    ## 1. סיכום מנהלים
    Provide a brief, high-level summary of the key findings. Mention the most critical compliance points the business owner needs to be aware of.

    ## 2. ניתוח מפורט לפי נושאים
    Analyze the regulations based on the provided context. For each relevant topic (e.g., Fire Safety, Accessibility, Licensing), create a subsection. Within each subsection, list the specific regulations that apply to the user's business.
    
    For each regulation, use the following format:
    - **התקנה הרלוונטית:** [Quote or summarize the specific regulation].
    - **משמעות עבור העסק שלך:** [Explain clearly how this rule applies to the user's business, using their provided data. For example: "מאחר והעסק שלך בשטח של ${data.businessData.businessSize} מ"ר, חלה עליך חובה..."]
    - **פעולות מומלצות:** [Provide clear, actionable steps the business owner should take].

    ## 3. סעיפים שאינם רלוונטיים (אם יש)
    Briefly mention any major regulations from the context that do *not* apply to the business and explain why (e.g., "Regulations regarding businesses over 200 sq meters do not apply as your business is smaller.").

    ## 4. הצהרת אחריות
    Include the following disclaimer at the end: "דוח זה מבוסס על המידע שנמסר ועל סעיפי הרגולציה שהוזנו למערכת. הוא אינו מהווה תחליף לייעוץ משפטי מקצועי. מומלץ להתייעץ עם עורך דין או יועץ מומחה כדי להבטיח עמידה מלאה בכל הדרישות."

    **RULES & CONSTRAINTS:**
    1.  **DO NOT** use emojis under any circumstances.
    2.  **DO NOT** make up information. If the context is insufficient to answer a question, state that.
    3.  The report should be comprehensive. Aim for a detailed and thorough analysis.
    4.  The entire output must be in Hebrew.
    
    ---
    **REGULATIONS CONTEXT (Source of Truth):**
    ${data.regulationsContext}
    ---
    
    **USER'S BUSINESS DATA:**
    ${businessDetails}
    ---

    Generate the report now based on all the above instructions.
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
      temperature: 0.5,
    });

    const reportText = response.choices[0]?.message?.content;

    if (!reportText) {
      throw new Error("Received an empty response from the LLM.");
    }

    return reportText.trim();
  } catch (error: any) {
    const errorMessage = error.response?.data?.error?.message || error.message;
    console.error(`Error calling DeepSeek API: ${errorMessage}`);
    throw new Error("Failed to communicate with the language model.");
  }
};

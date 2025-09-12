import { Request, Response } from "express";
import { pipeline, FeatureExtractionPipeline } from "@xenova/transformers";
import { findRelevantChunks } from "../services/vector.service";
import { generateComplianceReport } from "../services/llm.service";
import { ComplianceRequestBody } from "../interfaces";

let extractor: FeatureExtractionPipeline;
(async () => {
  extractor = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
  console.log("Embedding model loaded for controller.");
})();

export const checkCompliance = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("Received request body:", req.body);
    const data = req.body as ComplianceRequestBody;
    const queryText = `בדיקת רגולציה לעסק בגודל ${data.businessSize} מ"ר, עם ${
      data.seatingCapacity
    } מקומות ישיבה, ומאפיינים נוספים: ${JSON.stringify(data.customFields)}`;

    const queryEmbeddingData = await extractor(queryText, { pooling: "mean", normalize: true });
    const queryEmbedding = Array.from(queryEmbeddingData.data);

    const relevantChunks = findRelevantChunks(queryEmbedding, 5);
    const regulationsContext = relevantChunks.map((chunk) => chunk.content).join("\n\n---\n\n");

    const reportText = await generateComplianceReport({
      businessData: data,
      regulationsContext: regulationsContext,
    });

    res.status(200).json({ report: reportText });
  } catch (error) {
    console.error("Error in checkCompliance controller:", error);
    res.status(500).json({ message: "Failed to generate compliance report." });
  }
};

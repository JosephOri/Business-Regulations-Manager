import fs from "fs/promises";
import path from "path";
import pdf from "pdf-parse";
import { pipeline, FeatureExtractionPipeline } from "@xenova/transformers";

const PDF_PATH = path.resolve(__dirname, "../../assets/regulations.pdf");
const OUTPUT_PATH = path.resolve(__dirname, "../../src/vector_store.json");

const chunkText = (text: string): string[] => {
  return text
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 50);
};

const main = async () => {
  console.log("🚀 Starting preprocessing of the regulations PDF...");

  try {
    console.log(`Reading PDF from: ${PDF_PATH}`);
    const pdfBuffer = await fs.readFile(PDF_PATH);
    const pdfData = await pdf(pdfBuffer);
    console.log("✅ PDF parsed successfully.");
    const textChunks = chunkText(pdfData.text);
    console.log(`📄 Text divided into ${textChunks.length} chunks.`);

    console.log("🧠 Loading embedding model (this may take a moment on first run)...");
    const extractor: FeatureExtractionPipeline = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("✅ Embedding model loaded.");

    console.log("🛠️ Generating embeddings for each chunk...");
    const vectorStore = [];
    for (let i = 0; i < textChunks.length; i++) {
      const chunk = textChunks[i];
      const embedding = await extractor(chunk, {
        pooling: "mean",
        normalize: true,
      });

      vectorStore.push({
        content: chunk,
        embedding: Array.from(embedding.data),
      });

      process.stdout.write(`\r   -> Processed chunk ${i + 1} of ${textChunks.length}`);
    }
    console.log("\n✅ All embeddings generated.");
    await fs.writeFile(OUTPUT_PATH, JSON.stringify(vectorStore, null, 2));
    console.log(`💾 Vector store saved successfully to: ${OUTPUT_PATH}`);
    console.log("✨ Preprocessing complete!");
  } catch (error) {
    console.error("❌ An error occurred during preprocessing:", error);
  }
};

main();

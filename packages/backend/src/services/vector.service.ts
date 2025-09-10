import fs from "fs/promises";
import path from "path";

interface VectorRecord {
  content: string;
  embedding: number[];
}

let vectorStore: VectorRecord[] = [];

export const loadVectorStore = async () => {
  if (vectorStore.length > 0) return;

  const filePath = path.resolve(__dirname, "../vector_store.json");
  const fileContent = await fs.readFile(filePath, "utf-8");
  vectorStore = JSON.parse(fileContent);
  console.log(`Vector store loaded with ${vectorStore.length} records.`);
};

const cosineSimilarity = (vecA: number[], vecB: number[]): number => {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  if (magnitudeA === 0 || magnitudeB === 0) return 0;
  return dotProduct / (magnitudeA * magnitudeB);
};

export const findRelevantChunks = (queryEmbedding: number[], topK: number = 5): VectorRecord[] => {
  const similarities = vectorStore.map((record, index) => ({
    index,
    similarity: cosineSimilarity(queryEmbedding, record.embedding),
  }));

  similarities.sort((a, b) => b.similarity - a.similarity);

  const topResults = similarities.slice(0, topK).map((result) => vectorStore[result.index]);

  return topResults;
};

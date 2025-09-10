import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import complianceRoutes from "./routes/compliance.routes";
import { loadVectorStore } from "./services/vector.service";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/compliance", complianceRoutes);

const startServer = async () => {
  await loadVectorStore();

  app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
  });
};

startServer();

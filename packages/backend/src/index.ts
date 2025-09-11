import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import complianceRoutes from "./routes/compliance.routes";
import { loadVectorStore } from "./services/vector.service";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/compliance", complianceRoutes);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Compliance API",
      version: "1.0.0",
      description: "API documentation for compliance checks",
    },
    servers: [
      {
        url: "http://localhost:" + port,
      },
    ],
  },
  // Scan TypeScript source files for JSDoc annotations
  apis: ["./src/routes/**/*.ts", "./src/controllers/**/*.ts"],
} as const;

const swaggerSpec = swaggerJSDoc(swaggerOptions as any);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const startServer = async () => {
  await loadVectorStore();

  app.listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
    console.log(`📘 Swagger docs available at http://localhost:${port}/api-docs`);
  });
};

startServer();

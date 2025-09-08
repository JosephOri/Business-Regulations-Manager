import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Interfaces
interface User {
  id: number;
  name: string;
  email: string;
}

interface MessageRequest {
  message: string;
}

interface MessageResponse {
  received: boolean;
  message: string;
}

interface ErrorResponse {
  error: string;
}

// Sample API routes
app.get("/api/health", (req: Request, res: Response<{ status: string; message: string }>) => {
  res.json({ status: "OK", message: "Backend server is running!" });
});

app.get("/api/users", (req: Request, res: Response<User[]>) => {
  const users: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ];
  res.json(users);
});

app.post(
  "/api/message",
  (
    req: Request<{}, MessageResponse | ErrorResponse, MessageRequest>,
    res: Response<MessageResponse | ErrorResponse>
  ) => {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    res.json({ received: true, message: `Server received: ${message}` });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// index.js
import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import googleAI from "./services/googleAI";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = "5000";
const aiService = new googleAI();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.post("/chat", async (req: Request, res: Response) => {
  const messages = req.body.messages;

  try {
    await aiService.chat(messages, res);
  } catch (error) {
    res.status(500).json({ error: "Failed to process chat request" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

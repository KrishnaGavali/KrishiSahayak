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

const port = 5000;
const aiService = new googleAI();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
  console.log("Response sent");
});

app.post("/chat", async (req: Request, res: Response) => {
  console.log("Received Body :", req.body);

  const messages = req.body.messages;

  try {
    await aiService.chat(messages, res);
  } catch (error) {
    res.status(500).json({ error: "Failed to process chat request" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});

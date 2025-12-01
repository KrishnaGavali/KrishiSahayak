import model from "../providers/googleAIModel";
import type { LanguageModel } from "ai";
import { streamText } from "ai";
import type { Response } from "express";

class googleAI {
  model: LanguageModel | null = null;

  constructor() {
    this.model = model;
  }

  getModel() {
    return this.model;
  }

  async chat(prompt: string, res: Response) {
    if (!this.model) {
      throw new Error("Model not initialized");
    }

    const result = streamText({
      model: this.model,
      prompt,
    });

    result.pipeUIMessageStreamToResponse(res);
  }
}

export default googleAI;

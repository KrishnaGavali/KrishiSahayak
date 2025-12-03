import model from "../providers/googleAIModel";
import type { LanguageModel, UIMessage } from "ai";
import { convertToModelMessages } from "ai";
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

  async chat(prompt: UIMessage[], res: Response) {
    if (!this.model) {
      throw new Error("Model not initialized");
    }

    console.log("Chat prompt received: ", convertToModelMessages(prompt));

    const result = streamText({
      model: this.model,
      prompt: convertToModelMessages(prompt),
    });

    result.pipeUIMessageStreamToResponse(res);
  }
}

export default googleAI;

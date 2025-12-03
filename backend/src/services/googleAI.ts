import model from "../providers/googleAIModel";
import type { LanguageModel, UIMessage } from "ai";
import { convertToModelMessages } from "ai";
import { streamText } from "ai";
import type { Response } from "express";
import { generatePrompt } from "../utils/PromptGenerator";

class googleAI {
  model: LanguageModel | null = null;

  constructor() {
    this.model = model;
  }

  getModel() {
    return this.model;
  }

  async chat(prompt: UIMessage[], res: Response, systemPrompt: string) {
    if (!this.model) {
      throw new Error("Model not initialized");
    }

    const result = streamText({
      model: this.model,
      prompt: convertToModelMessages(prompt),
      system: systemPrompt,
    });

    result.pipeUIMessageStreamToResponse(res);
  }
}

export default googleAI;

import model from "../providers/googleAIModel";
import type { LanguageModel } from "ai";

class googleAI {
  model: LanguageModel | null = null;

  constructor() {
    this.model = model;
  }

  getModel() {
    return this.model;
  }
}

export default googleAI;

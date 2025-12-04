import model from "../providers/googleAIModel";
import type { LanguageModel, UIMessage } from "ai";
import { convertToModelMessages, generateText } from "ai";
import { streamText } from "ai";
import type { Response } from "express";
import { generatePrompt } from "../utils/PromptGenerator";
import { google } from "@ai-sdk/google";
import type { CoreMessage } from "ai";

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

  async recomend(
    messages: Array<{ role: string; content: string }>,
    res: Response,
    systemPrompt: string
  ) {
    if (!this.model) {
      throw new Error("Model not initialized");
    }

    try {
      // Convert to CoreMessage format
      const coreMessages: CoreMessage[] = messages.map((msg) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      }));

      const { text } = await generateText({
        model: this.model,
        messages: coreMessages,
        system: systemPrompt,
        tools: {
          google_search: google.tools.googleSearch({}),
        },
      });

      // Parse the JSON response from the AI model
      let recommendationData;
      try {
        // Clean up the response - remove markdown code blocks if present
        let cleanedText = text
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim();

        // Try to extract JSON from the response (in case there's extra text)
        const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          // Validate it's proper JSON by attempting parse
          recommendationData = JSON.parse(jsonMatch[0]);
        } else {
          // If no JSON found, log and return error
          throw new Error("No JSON object found in response");
        }
      } catch (parseError) {
        const errorMsg =
          parseError instanceof Error
            ? parseError.message
            : "Unknown parse error";
        console.error("JSON parse error:", errorMsg);
        console.error("Raw response:", text.substring(0, 500)); // Log first 500 chars for debugging
        return res.status(500).json({
          success: false,
          error: `Failed to parse recommendation data: ${errorMsg}`,
          rawResponse: text.substring(0, 1000), // Send truncated response for debugging
        });
      }

      return res.json({
        success: true,
        recommendationData: recommendationData,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Recommendation generation error:", error);
      return res.status(500).json({
        success: false,
        error: errorMessage,
      });
    }
  }
}

export default googleAI;

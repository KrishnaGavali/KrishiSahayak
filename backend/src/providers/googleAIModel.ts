import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

const google = createGoogleGenerativeAI();

const model = google("gemini-2.0-flash");

export default model;

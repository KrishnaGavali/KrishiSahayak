// index.js
import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import googleAI from "./services/googleAI";
import cors from "cors";
import { generatePrompt } from "./utils/PromptGenerator";
import WeatherService from "./services/Weather";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const port = 5000;
const aiService = new googleAI();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/chat", async (req: Request, res: Response) => {
  const messages = req.body.messages;
  const locationInfo = req.body.locationDataActive || false;
  const weatherInfo = req.body.weatherDataActive || false;
  const location = req.body.location;

  let weatherData = null;

  // Fetch weather data first if needed
  if (weatherInfo && location) {
    const weatherService = new WeatherService(
      location.latitude,
      location.longitude
    );

    weatherData = await weatherService.getCurrentWeather();
  }

  // Generate prompt with all data available
  const systemPrompt = generatePrompt(
    locationInfo,
    weatherInfo,
    location,
    weatherData
  );

  try {
    await aiService.chat(messages, res, systemPrompt);
  } catch (error) {
    res.status(500).json({ error: "Failed to process chat request" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});

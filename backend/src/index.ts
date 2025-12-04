// index.js
import express from "express";
import type { Request, Response } from "express";
import dotenv from "dotenv";
import googleAI from "./services/googleAI";
import cors from "cors";
import {
  generatePrompt,
  generateRecommendationPrompt,
} from "./utils/PromptGenerator";
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

app.post("/weather", async (req: Request, res: Response) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        error: "Missing required parameters: latitude and longitude",
      });
    }

    const weatherService = new WeatherService(latitude, longitude, 3);
    const weatherData = await weatherService.getCurrentWeather();

    res.json({ success: true, weatherData });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch weather";
    res.status(500).json({ error: errorMessage });
  }
});

app.post("/recommendation", async (req: Request, res: Response) => {
  try {
    const messages: string = req.body.messages;
    const locationInfo = req.body.locationDataActive || false;
    const weatherInfo = req.body.weatherDataActive || false;
    const location = req.body.location;

    // Validate required fields
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: "Missing required parameter: messages array",
      });
    }

    let weatherData = null;

    // Fetch weather data first if needed
    if (weatherInfo && location) {
      if (location.latitude === undefined || location.longitude === undefined) {
        return res.status(400).json({
          error: "Invalid location data: latitude and longitude required",
        });
      }

      try {
        const weatherService = new WeatherService(
          location.latitude,
          location.longitude,
          3
        );
        weatherData = await weatherService.getCurrentWeather();
      } catch (weatherError) {
        console.error("Weather fetch error:", weatherError);
        // Continue without weather data if fetch fails
      }
    }

    // Generate system prompt with available data
    const systemPrompt = generateRecommendationPrompt(
      locationInfo ? location : null,
      weatherData
    );

    // Call AI service to generate recommendation
    await aiService.recomend(messages, res, systemPrompt);
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to process recommendation";
    console.error("Recommendation route error:", error);
    res.status(500).json({ error: errorMessage });
  }
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
      location.longitude,
      3
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

import { WeatherData } from "../services/Weather";

export const generatePrompt = (
  locationDataActive: boolean,
  weatherDataActive: boolean,
  location: { latitude: number; longitude: number } | null,
  weatherData: WeatherData | null
) => {
  let prompt =
    "Your are a helpful agricultural assistant AI name KrishiSahayak.";

  if (locationDataActive && location) {
    prompt += ` The user is located at latitude ${location.latitude} and longitude ${location.longitude}. Use this information to provide localized agricultural advice.`;
  } else {
    prompt +=
      " The user's location data is not available. Provide general agricultural advice.";
  }

  if (weatherDataActive && weatherData) {
    prompt += ` The current weather conditions at the user's location are as follows: ${JSON.stringify(weatherData)}`;
  }

  prompt +=
    " Always prioritize the user's safety and well-being in your recommendations.";
  prompt +=
    " If you are unsure about any advice, recommend consulting a local agricultural expert.";
  prompt += " Keep your responses concise and relevant to the user's queries.";
  prompt +=
    " Use clear and simple language that is easy for users to understand.";

  console.log("Generated Prompt: ", prompt);

  return prompt;
};

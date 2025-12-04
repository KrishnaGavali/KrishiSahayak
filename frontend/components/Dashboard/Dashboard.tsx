"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/card";
import WeatherSection from "./WeatherSection";
import {
  useUserLocation,
  requestUserLocation,
} from "@/context/UserLocationContext";
import { Alert } from "../ui/alert";
import RecomendationSection from "./RecomendationSection";
import { Cloud, Lightbulb } from "lucide-react";

interface WeatherData {
  location: {
    placeName: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    temp_c: number;
    condition: string;
    wind_kph: number;
    humidity: number;
    uv: number;
    precip_mm: number;
    vis_km: number;
  };
  forecast: Array<{
    date: string;
    max_temp_c: number;
    min_temp_c: number;
    avg_temp_c: number;
    condition: string;
  }>;
}

const Dashboard = () => {
  const {
    location,
    setLocation,
    error: locationError,
    loading: locationLoading,
  } = useUserLocation();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [weatherLoading, setWeatherLoading] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"weather" | "recommendation">(
    "weather"
  );

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) {
        const location = await requestUserLocation();
        setLocation(location);
        return;
      }

      setWeatherLoading(true);
      setWeatherError(null);

      try {
        const response = await fetch(
          `${
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
          }/weather`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude: location.latitude,
              longitude: location.longitude,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Weather API error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.success || !data.weatherData) {
          throw new Error(data.error || "Invalid weather data received");
        }

        setWeatherData(data.weatherData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch weather data";
        setWeatherError(errorMessage);
        console.error("Weather fetch error:", err);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div className="flex-1">
      {locationError && (
        <Alert className="bg-destructive/10 border-destructive text-destructive mb-4">
          <span className="font-semibold">Location Error:</span> {locationError}
        </Alert>
      )}

      {weatherError && (
        <Alert className="bg-destructive/10 border-destructive text-destructive mb-4">
          <span className="font-semibold">Weather Error:</span> {weatherError}
        </Alert>
      )}

      {locationLoading || weatherLoading ? (
        <Card className="flex items-center justify-center h-96 bg-linear-to-br from-primary/5 to-accent/5">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading weather data...</p>
          </div>
        </Card>
      ) : location && weatherData ? (
        <>
          {/* Tab Switcher for Mobile - Hidden on lg and above */}
          <div className="flex gap-2 mb-4 lg:hidden">
            <button
              onClick={() => setActiveTab("weather")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "weather"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800 text-foreground hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Cloud className="w-5 h-5" />
              Weather
            </button>
            <button
              onClick={() => setActiveTab("recommendation")}
              className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                activeTab === "recommendation"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800 text-foreground hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <Lightbulb className="w-5 h-5" />
              Recommendation
            </button>
          </div>

          {/* Desktop Layout - 2 Column */}
          <div className="hidden lg:grid grid-cols-2 gap-6">
            {/* Left Column - Weather */}
            <WeatherSection weatherData={weatherData} />
            {/* Right Column - Recommendations */}
            <div className="overflow-y-auto max-h-screen pr-4">
              <RecomendationSection weatherData={weatherData} />
            </div>
          </div>

          {/* Mobile Layout - Single Column with Tabs */}
          <div className="lg:hidden">
            {activeTab === "weather" && (
              <WeatherSection weatherData={weatherData} />
            )}
            {activeTab === "recommendation" && (
              <RecomendationSection weatherData={weatherData} />
            )}
          </div>
        </>
      ) : location ? (
        <Card className="flex items-center justify-center h-96 bg-linear-to-br from-muted/50 to-muted/30 border-dashed">
          <p className="text-muted-foreground text-center">
            No weather data available
          </p>
        </Card>
      ) : (
        <Card className="flex items-center justify-center h-96 bg-linear-to-br from-primary/5 to-accent/5 border-dashed">
          <p className="text-muted-foreground text-center">
            Please enable location services to view weather
          </p>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;

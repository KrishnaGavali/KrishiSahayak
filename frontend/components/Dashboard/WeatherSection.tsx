"use client";

import { Card } from "../ui/card";
import {
  Cloud,
  CloudRain,
  Wind,
  Droplets,
  Sun,
  Eye,
  MapPin,
  Zap,
  TrendingUp,
  Calendar,
} from "lucide-react";

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

interface WeatherSectionProps {
  weatherData: WeatherData;
}

const WeatherSection = ({ weatherData }: WeatherSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left Column - Current Weather */}
      <div className="space-y-4">
        {/* Main Weather Card */}
        <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="p-8">
            {/* Location Header */}
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">
                    {weatherData.location.placeName}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {weatherData.location.region}, {weatherData.location.country}
                </p>
              </div>
            </div>

            {/* Temperature Display */}
            <div className="mb-8">
              <div className="flex items-start gap-4">
                <div>
                  <p className="text-6xl font-bold mb-2 text-primary">
                    {Math.round(weatherData.current.temp_c)}°
                  </p>
                  <p className="text-lg text-muted-foreground font-medium">
                    {weatherData.current.condition}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Feels Like
                  </span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {Math.round(weatherData.current.temp_c - 2)}°C
                </p>
              </div>

              <div className="bg-background/50 backdrop-blur rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Humidity
                  </span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  {weatherData.current.humidity}%
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* UV & Solar */}
        <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
          <div className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Sun className="w-5 h-5 text-primary" />
              UV & Solar
            </h3>
            <div className="space-y-4">
              {/* UV Index */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-muted-foreground">
                    UV Index
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {Math.round(weatherData.current.uv)}
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-primary to-primary/60 h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        (weatherData.current.uv / 12) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  {weatherData.current.uv > 8
                    ? "Very High - Protect your skin"
                    : weatherData.current.uv > 5
                    ? "High - Sunscreen recommended"
                    : weatherData.current.uv > 2
                    ? "Moderate - Standard protection"
                    : "Low - Minimal protection needed"}
                </p>
              </div>

              {/* Location Info */}
              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-muted-foreground uppercase">
                    Coordinates
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">
                    {weatherData.location.lat.toFixed(2)}°,{" "}
                    {weatherData.location.lon.toFixed(2)}°
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Right Column - Detailed Metrics */}
      <div className="space-y-4">
        {/* Wind & Air Quality */}
        <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
          <div className="p-6">
            <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <Wind className="w-5 h-5 text-primary" />
              Wind & Atmosphere
            </h3>
            <div className="space-y-4">
              {/* Wind Speed */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Wind Speed
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {Math.round(weatherData.current.wind_kph)} km/h
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-primary to-primary/60 h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        (weatherData.current.wind_kph / 50) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Visibility */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Visibility
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {Math.round(weatherData.current.vis_km)} km
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-primary to-primary/60 h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        (weatherData.current.vis_km / 20) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Precipitation */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-muted-foreground">
                    Precipitation
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {weatherData.current.precip_mm} mm
                  </span>
                </div>
                <div className="w-full bg-muted/30 rounded-full h-2">
                  <div
                    className="bg-linear-to-r from-primary to-primary/60 h-2 rounded-full"
                    style={{
                      width: `${Math.min(
                        (weatherData.current.precip_mm / 20) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
        {/* 3-Day Forecast */}
        {weatherData.forecast && weatherData.forecast.length > 0 && (
          <Card className="bg-linear-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border-slate-200 dark:border-slate-700">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Forecast</h3>
              </div>
              <div className="space-y-3">
                {weatherData.forecast.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-background/50 backdrop-blur rounded-lg border border-border/50 hover:border-primary/30 hover:bg-background/70 transition-all"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-sm font-semibold text-muted-foreground min-w-fit">
                        {new Date(day.date).toLocaleDateString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                      <p className="text-xs text-muted-foreground line-clamp-1 flex-1">
                        {day.condition}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 ml-4">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">High</p>
                        <p className={`font-bold text-sm text-primary`}>
                          {Math.round(day.max_temp_c)}°
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Low</p>
                        <p className={`font-bold text-sm text-primary`}>
                          {Math.round(day.min_temp_c)}°
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WeatherSection;

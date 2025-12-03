"use client";

import { useChat } from "@ai-sdk/react";
import type { ChatStatus } from "ai";
import React, { useEffect } from "react";
import { Cloud, MapPin } from "lucide-react";
import {
  PromptInput as PromptInputComponent,
  PromptInputTextarea,
  PromptInputSubmit,
} from "../../components/ai-elements/prompt-input";
import {
  useUserLocation,
  requestUserLocation,
} from "@/context/UserLocationContext";

type PromptInputBoxProps = {
  sendMessage: ReturnType<typeof useChat>["sendMessage"];
  status: ChatStatus;
};

type moreInfo = {
  weather: boolean | null;
  location: boolean | null;
};

const PromptInputBox = ({ sendMessage, status }: PromptInputBoxProps) => {
  const { location, setLocation } = useUserLocation();

  const handleSubmit = (message: any) => {
    if (message.text.trim()) {
      sendMessage(
        { text: message.text },
        {
          body: {
            locationDataActive: locationInfoActive,
            weatherDataActive: weatherInfoActive,
            location: location,
          },
        }
      );
    }
  };

  const [weatherInfoActive, setWeatherInfoActive] = React.useState(false);
  const [locationInfoActive, setLocationInfoActive] = React.useState(false);

  useEffect(() => {
    if (weatherInfoActive || locationInfoActive) {
      if (location === null) {
        requestUserLocation().then((pos) => {
          console.log("Location obtained: ", pos);
          setLocation(pos);
        });
      } else {
        console.log("Using existing location: ", location);
      }
    }
  }, [weatherInfoActive, locationInfoActive]);

  return (
    <div className="m-2 mx-auto container max-w-4xl px-2 md:px-4">
      <div className="flex flex-wrap gap-2 md:gap-3 mb-2">
        <button
          onClick={() => setWeatherInfoActive(!weatherInfoActive)}
          className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 border rounded-lg transition-all duration-200 text-xs md:text-sm font-medium shadow-sm hover:shadow-md group ${
            weatherInfoActive
              ? "bg-primary text-primary-foreground border-primary shadow-md"
              : "bg-background text-foreground border-border hover:bg-accent hover:border-primary hover:text-primary"
          }`}
        >
          <Cloud className="size-3.5 md:size-4 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Weather</span>
        </button>
        <button
          onClick={() => setLocationInfoActive(!locationInfoActive)}
          className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 border rounded-lg transition-all duration-200 text-xs md:text-sm font-medium shadow-sm hover:shadow-md group ${
            locationInfoActive
              ? "bg-primary text-primary-foreground border-primary shadow-md"
              : "bg-background text-foreground border-border hover:bg-accent hover:border-primary hover:text-primary"
          }`}
        >
          <MapPin className="size-3.5 md:size-4 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Location</span>
        </button>
      </div>
      <PromptInputComponent onSubmit={handleSubmit} className="w-full">
        <PromptInputTextarea
          placeholder="Ask about crops, weather, farming..."
          className="pr-12 text-sm md:text-base"
        />
        <PromptInputSubmit
          status={status === "streaming" ? "streaming" : "ready"}
          className="absolute bottom-2 md:bottom-3 right-2 md:right-3"
        />
      </PromptInputComponent>
    </div>
  );
};

export default PromptInputBox;

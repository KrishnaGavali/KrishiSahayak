"use client";
import React, { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ChatBotConversation from "./Conversation";
import PromptInputBox from "./PromptInput";
import {
  useUserLocation,
  requestUserLocation,
} from "@/context/UserLocationContext";

interface moreInfo {
  weather: boolean | null;
  location: boolean | null;
}

const Chatbot = () => {
  const [moreInfo, setMoreInfo] = useState<moreInfo>({
    weather: null,
    location: null,
  });

  const { location, setLocation } = useUserLocation();

  useEffect(() => {
    if (moreInfo.weather || moreInfo.location) {
      if (location === null) {
        requestUserLocation().then((pos) => {
          console.log("Location obtained: ", pos);
          setLocation(pos);
        });
      } else {
        console.log("Using existing location: ", location);
      }
    }
  }, [moreInfo]);

  useEffect(() => {
    console.log("More Info changed: ", moreInfo);
  }, [moreInfo]);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "http://192.168.0.107:5000/chat",
    }),
  });

  return (
    <div className="flex flex-col flex-1">
      <ChatBotConversation messages={messages} status={status} />
      <PromptInputBox
        sendMessage={sendMessage}
        status={status}
        setMoreInfo={setMoreInfo}
      />
    </div>
  );
};

export default Chatbot;

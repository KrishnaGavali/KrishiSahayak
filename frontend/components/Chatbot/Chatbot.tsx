"use client";
import { BotIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "../ai-elements/message";

import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputSelect,
  PromptInputSelectContent,
  PromptInputSelectItem,
  PromptInputSelectTrigger,
  PromptInputSelectValue,
  PromptInputSpeechButton,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import ChatBotConversation from "./Conversation";
import PromptInputBox from "./PromptInput";

interface moreInfo {
  weather: boolean | null;
  location: boolean | null;
}

const Chatbot = () => {
  const [moreInfo, setMoreInfo] = useState<moreInfo>({
    weather: null,
    location: null,
  });

  useEffect(() => {}, [moreInfo]);

  useEffect(() => {
    console.log("More Info changed: ", moreInfo);
  }, [moreInfo]);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "http://192.168.0.107:5000/chat",
      body: (message: string) => ({ prompt: message }),
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

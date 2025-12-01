"use client";
import { BotIcon } from "lucide-react";
import React, { useState } from "react";
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

const Chatbot = () => {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:5000/chat",
      body: (message: string) => ({ prompt: message }),
    }),
  });

  return (
    <>
      <ChatBotConversation messages={messages} status={status} />
      <PromptInputBox sendMessage={sendMessage} status={status} />
    </>
  );
};

export default Chatbot;

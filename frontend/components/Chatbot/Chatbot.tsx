"use client";
import React, { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ChatBotConversation from "./Conversation";
import PromptInputBox from "./PromptInput";

const Chatbot = () => {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "http://10.239.105.37:5000/chat",
    }),
  });

  return (
    <div className="flex flex-col flex-1">
      <ChatBotConversation messages={messages} status={status} />
      <PromptInputBox sendMessage={sendMessage} status={status} />
    </div>
  );
};

export default Chatbot;

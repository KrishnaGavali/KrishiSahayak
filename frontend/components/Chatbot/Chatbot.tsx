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

const Chatbot = () => {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:5000/chat",
    }),
  });

  return (
    <>
      {/* {messages.map((message) => (
        <div key={message.id}>
          {message.role === "user" ? "User: " : "AI: "}
          {message.parts.map((part, index) =>
            part.type === "text" ? <span key={index}>{part.text}</span> : null
          )}
        </div>
      ))}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput("");
          }
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={status !== "ready"}
          placeholder="Say something..."
        />
        <button type="submit" disabled={status !== "ready"}>
          Submit
        </button>
      </form> */}

      {isChatBotOpen && <ChatBox />}

      <div
        className=" w-fit aspect-square fixed bottom-8 right-8 bg-primary text-secondary rounded-full p-4 shadow-lg cursor-pointer hover:bg-primary/80 transition-colors"
        onClick={() => setIsChatBotOpen((prev) => !prev)}
      >
        <BotIcon />
      </div>
    </>
  );
};

const ChatBox = () => {
  const { messages } = useChat();

  return (
    <div className=" w-80 h-96 fixed bottom-24 right-8 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col">
      <div className="bg-primary h-10 w-full rounded-t-lg">
        <h3 className="text-secondary p-2 text-center">KrishiSahayak</h3>
      </div>
      <div className="w-full bg-muted flex-1 rounded-b-lg" id="messages_input">
        {messages.map(({ role, parts }, index) => (
          <Message from={role} key={index}>
            <MessageContent>
              {parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <MessageResponse key={`${role}-${i}`}>
                        {part.text}
                      </MessageResponse>
                    );
                }
              })}
            </MessageContent>
          </Message>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;

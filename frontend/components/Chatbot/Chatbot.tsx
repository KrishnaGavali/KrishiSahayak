"use client";
import { BotIcon } from "lucide-react";
import React, { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";

const Chatbot = () => {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "http://localhost:5000/chat",
      body: (message: string) => ({ prompt: message }),
    }),
  });

  return (
    <>
      {messages.map((message) => (
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
      </form>

      <div
        className=" w-fit aspect-square absolute bottom-8 right-8 bg-primary text-secondary rounded-full p-4 shadow-lg cursor-pointer hover:bg-primary/80 transition-colors"
        onClick={() => setIsChatBotOpen((prev) => !prev)}
      >
        <BotIcon />
      </div>
    </>
  );
};

export default Chatbot;

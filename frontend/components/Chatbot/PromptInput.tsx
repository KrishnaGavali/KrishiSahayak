"use client";

import { useChat } from "@ai-sdk/react";
import type { ChatStatus } from "ai";
import React from "react";
import {
  PromptInput as PromptInputComponent,
  PromptInputTextarea,
  PromptInputSubmit,
} from "../../components/ai-elements/prompt-input";

type PromptInputBoxProps = {
  sendMessage: ReturnType<typeof useChat>["sendMessage"];
  status: ChatStatus;
};

const PromptInputBox = ({ sendMessage, status }: PromptInputBoxProps) => {
  const handleSubmit = (message: any) => {
    if (message.text.trim()) {
      sendMessage({ text: message.text });
    }
  };

  return (
    <div className=" m-4">
      <PromptInputComponent
        onSubmit={handleSubmit}
        className="mt-4 w-full max-w-4xl mx-auto relative"
      >
        <PromptInputTextarea placeholder="Say something..." className="pr-12" />
        <PromptInputSubmit
          status={status === "streaming" ? "streaming" : "ready"}
          className="absolute bottom-1 right-1"
        />
      </PromptInputComponent>
    </div>
  );
};

export default PromptInputBox;

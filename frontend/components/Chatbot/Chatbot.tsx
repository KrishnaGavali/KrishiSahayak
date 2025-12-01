import { BotIcon } from "lucide-react";
import React, { useState } from "react";

const Chatbot = () => {
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);

  return (
    <div
      className=" w-fit aspect-square absolute bottom-8 right-8 bg-primary text-secondary rounded-full p-4 shadow-lg cursor-pointer hover:bg-primary/80 transition-colors"
      onClick={() => setIsChatBotOpen((prev) => !prev)}
    >
      <BotIcon />
    </div>
  );
};

export default Chatbot;

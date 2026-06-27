"use client";

import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import { Message } from "@/types/message";

interface ChatWindowProps {
  messages: Message[];
  username: string;
  typingUser: string;
}

export default function ChatWindow({
  messages,
  username,
  typingUser,
}: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, typingUser]);

  return (
    <div className="flex-1 overflow-y-auto bg-blue-50 p-6">

      {messages.map((message, index) => (
        <MessageBubble
          key={index}
          message={message}
          isOwn={message.username === username}
        />
      ))}

      {/* Typing Indicator */}

      {typingUser && typingUser !== username && (
        <div className="mb-4 flex justify-start">

          <div className="rounded-2xl bg-gray-200 px-4 py-3">

            <p className="text-sm italic text-gray-500">

              {typingUser} sedang mengetik...

            </p>

          </div>

        </div>
      )}

      <div ref={bottomRef} />

    </div>
  );
}
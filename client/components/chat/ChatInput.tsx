"use client";

import { useState } from "react";
import { socket } from "@/lib/socket";

interface ChatInputProps {
  username: string;
  sendMessage: (message: string) => void;
}

export default function ChatInput({
  username,
  sendMessage,
}: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    sendMessage(message);

    setMessage("");

    socket.emit("stop-typing");
  };

  const handleChange = (value: string) => {
    setMessage(value);

    if (value.trim()) {
      socket.emit("typing", username);
    } else {
      socket.emit("stop-typing");
    }
  };

  return (
    <div className="border-t bg-white p-5">

      <div className="flex items-center gap-3">

        <input
          type="text"
          value={message}
          placeholder="Tulis pesan..."
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          className="flex-1 rounded-full border border-gray-300 px-5 py-3 outline-none transition focus:border-blue-600"
        />

        <button
          onClick={handleSend}
          className="rounded-full bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Kirim
        </button>

      </div>

    </div>
  );
}
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

      <div className="flex items-end gap-3">

        <textarea
          value={message}
          placeholder="Tulis pesan..."
          rows={1}
          onChange={(e) => {
            handleChange(e.target.value);

            const textarea = e.target;
            const maxHeight = 24 * 6;

            textarea.style.height = "auto";
            textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;

            // Scrollbar hanya muncul jika sudah melebihi 6 baris
            textarea.style.overflowY =
              textarea.scrollHeight > maxHeight ? "auto" : "hidden";
            
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();

              // Kembalikan tinggi setelah pesan terkirim
              e.currentTarget.style.height = "auto";
            }
          }}
          className="flex-1 resize-none overflow-hidden rounded-2xl border border-gray-300 px-5 py-3 outline-none transition focus:border-blue-600"
        />

        <button
          onClick={handleSend}
          className="rounded-full bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Kirim
        </button>

      </div>

    </div>
  );
}
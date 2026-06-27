"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import JoinCard from "@/components/JoinCard";
import ChatLayout from "@/components/chat/ChatLayout";
import { Message } from "@/types/message";

interface User {
  username: string;
  online: boolean;
}

export default function Home() {

  const [username, setUsername] = useState("");

  const [users, setUsers] = useState<User[]>([]);

  const [joined, setJoined] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);

  const [typingUser, setTypingUser] = useState("");

  const sendMessage = (text: string) => {

    if (!text.trim()) return;

    socket.emit("send-message", {
      username,
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });

  };

  const handleJoin = () => {

    if (!username.trim()) return;

    socket.connect();

    socket.emit("join-chat", username);

    setJoined(true);

  };

  useEffect(() => {

    socket.on("receive-message", (message: Message) => {

      setMessages((prev) => [...prev, message]);

    });

    // Menerima riwayat chat dari server
    socket.on("chat-history", (history: Message[]) => {

      setMessages(history);

    });

    return () => {

      socket.off("receive-message");
      socket.off("chat-history");

    };

  }, []);

  useEffect(() => {

    socket.on("typing", (user: string) => {

      setTypingUser(user);

    });

    socket.on("stop-typing", () => {

      setTypingUser("");

    });

    return () => {

      socket.off("typing");
      socket.off("stop-typing");

    };

  }, []);

  useEffect(() => {

    socket.on("users", (list: User[]) => {

      setUsers(list);

      console.log(list);

    });

    return () => {

      socket.off("users");

    };

  }, []);

  if (joined) {

    return (

      <ChatLayout
        users={users}
        username={username}
        messages={messages}
        typingUser={typingUser}
        sendMessage={sendMessage}
      />

    );

  }

  return (

    <main className="flex min-h-screen items-center justify-center bg-blue-50">

      <JoinCard
        username={username}
        setUsername={setUsername}
        handleJoin={handleJoin}
      />

    </main>

  );

}
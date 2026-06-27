"use client";

import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import { Message } from "@/types/message";

interface User {
  username: string;
  online: boolean;
}

interface Props {
  users: User[];
  messages: Message[];
  username: string;
  typingUser: string;
  sendMessage: (text: string) => void;
}

export default function ChatLayout({
  users,
  messages,
  username,
  typingUser,
  sendMessage,
}: Props) {

  const onlineCount = users.filter(
    (user) => user.online
  ).length;

  return (
    <div className="flex h-screen">

      <Sidebar users={users} />

      <div className="flex flex-1 flex-col">

        <ChatHeader total={onlineCount} />

        <ChatWindow
          messages={messages}
          username={username}
          typingUser={typingUser}
        />

        <ChatInput
          username={username}
          sendMessage={sendMessage}
        />

      </div>

    </div>
  );
}
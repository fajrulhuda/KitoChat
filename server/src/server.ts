import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

interface User {
  socketId: string;
  username: string;
  online: boolean;
}

interface ChatMessage {
  username: string;
  text: string;
  time: string;
}

const users = new Map<string, User>();

const chatHistory: ChatMessage[] = [];

io.on("connection", (socket) => {

  console.log("Client Connected:", socket.id);

  socket.on("join-chat", (username: string) => {

    users.set(username, {
      socketId: socket.id,
      username,
      online: true,
    });

    console.log(`${username} joined`);

    io.emit(
      "users",
      Array.from(users.values())
    );

    // Kirim riwayat chat hanya ke user yang baru bergabung
    socket.emit("chat-history", chatHistory);

  });
  

  socket.on("send-message", (message: ChatMessage) => {

    // Simpan pesan ke memory
    chatHistory.push(message);

    // Simpan maksimal 100 pesan
    if (chatHistory.length > 100) {
      chatHistory.shift();
    }

    io.emit("receive-message", message);

  });

  socket.on("typing", (username) => {

    socket.broadcast.emit("typing", username);

  });

  socket.on("stop-typing", () => {

    socket.broadcast.emit("stop-typing");

  });

  socket.on("disconnect", () => {

    for (const user of users.values()) {

      if (user.socketId === socket.id) {

        user.online = false;

        break;

      }

    }

    io.emit(
      "users",
      Array.from(users.values())
    );

  });

});

server.listen(5000, () => {

  console.log("Socket Server Running");

});
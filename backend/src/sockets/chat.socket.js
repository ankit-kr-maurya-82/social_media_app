import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { Message } from "../models/Message.js";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // 🔐 Socket Auth Middleware
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Unauthorized"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // { id }
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.user.id);

    // 📥 Join Channel
    socket.on("join-channel", (channelId) => {
      socket.join(channelId);
      console.log(`User joined channel ${channelId}`);
    });

    // 📤 Send Message
    socket.on("send-message", async ({ channelId, content }) => {
      try {
        // Save message to DB
        const message = await Message.create({
          channelId,
          senderId: socket.user.id,
          content,
        });

        // Broadcast message to channel
        io.to(channelId).emit("receive-message", {
          _id: message._id,
          channelId,
          senderId: socket.user.id,
          content,
          createdAt: message.createdAt,
        });
      } catch (error) {
        socket.emit("error-message", "Message not sent");
      }
    });

    // ❌ Leave Channel
    socket.on("leave-channel", (channelId) => {
      socket.leave(channelId);
    });

    // 🔌 Disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.user.id);
    });
  });
};

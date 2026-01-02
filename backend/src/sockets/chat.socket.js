import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { Message } from "../models/Message.js";
import { setUserOffline, setUserOnline } from "../utils/presence.js";

export const initSocket = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  // ===============================
  // 🔐 SOCKET AUTH (JWT)
  // ===============================
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error("Unauthorized"));

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = { id: decoded.id };

      next();
    } catch (error) {
      next(new Error("Invalid token"));
    }
  });

  // ===============================
  // 🔌 CONNECTION
  // ===============================
  io.on("connection", async (socket) => {
    console.log("✅ User connected:", socket.user.id);

      // 🟢 ONLINE
    await setUserOnline(socket.user.id);

    io.emit("presence-update", {
      userId: socket.user.id,
      status: "ONLINE"
    });

    socket.on("disconnect", async () => {
      console.log("User disconnected:", socket.user.id);
      
    });

        // 🔴 OFFLINE
      await setUserOffline(socket.user.id);

      io.emit("presence-update", {
        userId: socket.user.id,
        status: "OFFLINE"
      });


    // ===============================
    // 📥 JOIN CHANNEL
    // ===============================
    socket.on("join-channel", (channelId) => {
      socket.join(channelId);
      console.log(`➡ User ${socket.user.id} joined channel ${channelId}`);
    });

    // ===============================
    // ❌ LEAVE CHANNEL
    // ===============================
    socket.on("leave-channel", (channelId) => {
      socket.leave(channelId);
      console.log(`⬅ User ${socket.user.id} left channel ${channelId}`);
    });

    // ===============================
    // 📤 SEND MESSAGE
    // ===============================
    socket.on("send-message", async ({ channelId, content }) => {
      try {
        if (!content?.trim()) return;

        const message = await Message.create({
          channelId,
          senderId: socket.user.id,
          content,
        });

        io.to(channelId).emit("receive-message", {
          _id: message._id,
          channelId,
          senderId: socket.user.id,
          content,
          reactions: [],
          createdAt: message.createdAt,
        });
      } catch (error) {
        socket.emit("error-message", "Message send failed");
      }
    });

    // ===============================
    // ⌨️ TYPING INDICATOR
    // ===============================
    socket.on("typing", ({ channelId }) => {
      socket.to(channelId).emit("user-typing", {
        userId: socket.user.id,
      });
    });

    socket.on("stop-typing", ({ channelId }) => {
      socket.to(channelId).emit("user-stop-typing", {
        userId: socket.user.id,
      });
    });

    // ===============================
    // ❤️ MESSAGE REACTIONS
    // ===============================
    socket.on("react-message", async ({ messageId, emoji, channelId }) => {
      try {
        const message = await Message.findById(messageId);
        if (!message) return;

        let reaction = message.reactions.find((r) => r.emoji === emoji);

        if (!reaction) {
          message.reactions.push({
            emoji,
            users: [socket.user.id],
          });
        } else {
          const index = reaction.users.indexOf(socket.user.id);

          if (index > -1) {
            reaction.users.splice(index, 1);

            if (reaction.users.length === 0) {
              message.reactions = message.reactions.filter(
                (r) => r.emoji !== emoji
              );
            }
          } else {
            reaction.users.push(socket.user.id);
          }
        }

        await message.save();

        io.to(channelId).emit("reaction-updated", {
          messageId,
          reactions: message.reactions,
        });
      } catch (error) {
        socket.emit("error-message", "Reaction failed");
      }
    });

    // ===============================
    // 🔌 DISCONNECT
    // ===============================
    socket.on("disconnect", () => {
      console.log("❌ User disconnected:", socket.user.id);
    });
  });
};

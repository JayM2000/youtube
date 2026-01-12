import http from "http";
import next from "next";
import { Server as SocketIOServer } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;
const app = next({
  dev,
  port: PORT,
});
const handle = app.getRequestHandler();

app.prepare().then(() => {
  // create HTTP server
  const server = http.createServer((req, res) => {
    handle(req, res);
  });

  // attach Socket.IO to http server
  // const io = new SocketIOServer(server);
  const io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🥳 Client connected:", socket.id);

    socket.on("startEditing", (data) => {
      console.log('⚠️ calling from server.js file ', PORT, dev);
      io.emit("editingStarted", data);
    });

    socket.on("stopEditing", () => {
      io.emit("editingStopped");
    });

    socket.on("disconnect", () => {
      console.log("🟥 Client disconnected:", socket.id);
    });
  });

  server.listen(PORT, () => {
    console.log(`🚀 Running on http://localhost:${PORT}`);
  });
});

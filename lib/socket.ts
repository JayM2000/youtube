"use client";

import { io, type Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    const ui_url = process.env.NEXT_PUBLIC_REDIRECT_URL || "";
    socket = io(ui_url, {
      transports: ["websocket", "polling"], // Let it fallback if WS fails
      reconnection: true,
    });
  }
  return socket;
};

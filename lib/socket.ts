"use client";

import { io, type Socket } from "socket.io-client";

let socket: Socket;

export const getSocket = () => {
  if (!socket) {
    socket = io(`https://youtube-2-xa9z.onrender.com`, {
      transports: ["websocket"],
    });
  }
  return socket;
};

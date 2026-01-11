"use server";
import chokidar from "chokidar";
import fs from "fs";
import { io } from "socket.io-client";

// type SectionEvent = {
//   type: "editing";
//   section: "header" | "sidebar" | "body";
// };

const socket = io(`https://youtube-2-xa9z.onrender.com`);

// Mapping component names to sections:
// const sectionMap: Record<string, "header" | "sidebar" | "body"> = {
//   Header: "header",
//   Sidebar: "sidebar",
//   Body: "body",
//   Main: "body",
//   Layout: "body",
// };

function extractComponentName(content: string): string | null {
  const fnMatch = content.match(/function\s+([A-Z][A-Za-z0-9_]*)/);
  if (fnMatch) return fnMatch[1];
  const arrowMatch = content.match(/const\s+([A-Z][A-Za-z0-9_]*)\s*=/);
  if (arrowMatch) return arrowMatch[1];
  return null;
}

const watcher = chokidar.watch("./modules", { ignoreInitial: true });

watcher.on("change", (path) => {
  const content = fs.readFileSync(path, "utf-8");
  const name = extractComponentName(content);

  if (name) {
    socket.emit("startEditing", { section: name });
  }
});

watcher.on("unlink", () => {
  socket.emit("stopEditing");
});

console.log("🟡 Watching app folder...");

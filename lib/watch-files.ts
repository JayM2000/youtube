"use server";

import * as dotenv from "dotenv";
dotenv.config();

import chokidar from "chokidar";
import fs from "fs";
import { io } from "socket.io-client";

export type Section = "header" | "sidebar" | "MainView";

const ui_url = process.env.NEXT_PUBLIC_REDIRECT_URL || "";
const socket = io(ui_url);

// Mapping component names to sections:
const sectionMap: Record<string, Section> = {
  HomeNavbar: "header",
  StudioNavbar: "header",
  StudioSidebar: "sidebar",
  HomeSidebar: "sidebar",
  StudioView: "MainView",
  HomeView: "MainView",
};

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
  const now = new Date();

  if (name && sectionMap[name]) {
    // console.log(now.getTime());
    const event = "startEditing";
    const eventPayload = {
      section: sectionMap[name],
      fileName: name,
      uniqueId: now.getTime(),
    };

    socket.emit(event, eventPayload);
  }
});

watcher.on("unlink", () => {
  socket.emit("stopEditing");
});

console.log("🟡 Watching app folder...");

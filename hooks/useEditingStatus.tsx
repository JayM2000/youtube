"use client";
import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

export function useEditingStatus() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const socket = getSocket();

    socket.on("startEditing", ({ section }) => {
      setActiveSection(section);
    });

    socket.on("editingStopped", () => {
      setActiveSection(null);
    });

    return () => {
      socket.off("editingStarted");
      socket.off("editingStopped");
    };
  }, []);

  return activeSection;
}

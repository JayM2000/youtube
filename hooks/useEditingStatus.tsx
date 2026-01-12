"use client";
import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

export type SocketData = {
  section: string;
  uniqueId: string;
  name?: string;
}

export function useEditingStatus() {
  const [activeSection, setActiveSection] = useState<SocketData | null>(null);

  useEffect(() => {
    const socket = getSocket();

    socket.on("editingStarted", ({ section, uniqueId }) => {
      setActiveSection({section, uniqueId});
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

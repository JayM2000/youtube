"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button, ButtonSty_1 } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

export function ModeToggle() {
  const { setTheme } = useTheme();
  const [isLightThemeMode, setIsLightThemeMode] = useState<boolean>(true);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <ButtonSty_1 variant="style_1" size="icon"  className="w-auto p-[12] before:rounded-[8]">
          {isLightThemeMode ? <Moon  /> : <Sun  />}
        </ButtonSty_1>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => {
            setTheme("light");
            setIsLightThemeMode(true);
          }}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("dark");
            setIsLightThemeMode(false);
          }}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setTheme("system");
            setIsLightThemeMode(false);
          }}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

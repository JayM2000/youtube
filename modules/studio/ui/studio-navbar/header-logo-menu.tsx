import React from "react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface PropTypes {
  isCollapsed?: boolean;
}
const HeaderLogoMenu = ({ isCollapsed }: PropTypes) => {
  return (
    <div
      className={cn("flex items-center shrink-0", !isCollapsed ? "ml-2" : "")}
    >
      <SidebarTrigger />
      <Link href="/studio">
        <div className="p-4 flex items-center gap-1">
          <Image
            src="/web-logo.png"
            alt="Novareo icon"
            width={32}
            height={32}
          />
          <p className="inline-block text-transparent bg-clip-text bg-gradient-to-tr from-[#C70039] via-[#FFC300] to-[#FF5733] text-xl font-semibold tracking-tight">
            Studio
          </p>
        </div>
      </Link>
    </div>
  );
};

export default HeaderLogoMenu;

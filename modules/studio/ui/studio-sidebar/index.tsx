"use client";

import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { LogOutIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import StudioSidebarHeader from "./studio-sidebar-header";
import ThemeSwitcher from "@/components/Customs/theme-switcher";
import { cn } from "@/lib/utils";

const StudioSidebar = () => {
  const { isMobile } = useSidebar();
  // const isCollapsed = state === "collapsed";
  const pathname = usePathname();

  return (
    <Sidebar
      className="z-40 border-none box mt-[50px] pt-[14px] shadow-[1px_0px_5px_rgba(0,0,0,0.35)]"
      collapsible="icon"
    >
      {/* <HeaderLogoMenu isCollapsed={false} /> */}
      <SidebarContent
        className={cn(
          "bg-background pb-[15px]",
          isMobile ? "basis-[93%]" : "basis-[85%]"
        )}
      >
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <StudioSidebarHeader />

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathname === "/studio"}
                  tooltip="Exit studio"
                  asChild
                >
                  <Link href="/studio">
                    <VideoIcon className="size-5" />
                    <span className="text-sm">Content</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Separator />

              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Exit studio" asChild>
                  <Link href="/">
                    <LogOutIcon className="size-5" />
                    <span className="text-sm">Exit studio</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* theme switcher */}
      <SidebarContent
        className={cn(
          "relative bg-background pb-[15px] w-full",
          isMobile ? "basis-[8%]" : "basis-[15%]"
        )}
      >
        <ThemeSwitcher />
      </SidebarContent>
    </Sidebar>
  );
};

export default StudioSidebar;

import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import HomeNavbar from "../home-navbar";
import HomeSidebar from "../home-sidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        {/* header content */}
        <HomeNavbar />

        <div className="flex min-h-screen pt-[4rem]">
          <HomeSidebar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

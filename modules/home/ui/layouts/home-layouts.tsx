"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import React, { useState } from "react";
import HomeNavbar from "../home-navbar";
import HomeSidebar from "../home-sidebar";
import SpotlightWrapper from "@/lib/tour/spotlight-wrapper";
import { Button } from "@/components/ui/button";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="w-full">
        {/* header content */}
        <SpotlightWrapper
          tooltip="This button does something important!"
          placement="below"
          childType="header"
        >
          <HomeNavbar />
        </SpotlightWrapper>

        <div className="flex min-h-screen pt-[4rem]">
          <SpotlightWrapper
            tooltip="This button does something important!"
            placement="right"
            childType="sidebar"
          >
            <HomeSidebar />
          </SpotlightWrapper>

          <main className="main-content flex-1 overflow-y-auto">
            <SpotlightWrapper
              tooltip="This button does something important!"
              placement="above"
              childType="MainView"
            >
              {children}
            </SpotlightWrapper>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

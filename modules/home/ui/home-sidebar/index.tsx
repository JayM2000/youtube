"use client";
import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import React from "react";
import MainSection from "./main-section";
import { Separator } from "@/components/ui/separator";
import PersonalSection from "./personal-section";
import HeaderLogoMenu from "../home-navbar/header-logo-menu";

const HomeSidebar = () => {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="z-100 border-r-2">
      <HeaderLogoMenu hideText={isCollapsed} />
      <SidebarContent className="bg-background pb-[15px]">
        <MainSection />
        <Separator />
        <PersonalSection />
      </SidebarContent>
    </Sidebar>
  );
};

export default HomeSidebar;

"use client";

import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import HeaderLogoMenu from "../home-navbar/header-logo-menu";
import MainSection from "./main-section";
import PersonalSection from "./personal-section";

const HomeSidebar = () => {
  // const { state } = useSidebar();
  // const isCollapsed = state === "collapsed";

  return (
    <Sidebar className="z-100 border-r-2 mt-[64px]">
      <HeaderLogoMenu isCollapsed={false} />
      <SidebarContent className="bg-background pb-[15px]">
        <MainSection />
        <Separator />
        <PersonalSection />
      </SidebarContent>
    </Sidebar>
  );
};

export default HomeSidebar;

"use client";

import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import MainSection from "./main-section";
import PersonalSection from "./personal-section";

const HomeSidebar = () => {
  // const { state } = useSidebar();
  // const isCollapsed = state === "collapsed";

  return (
    <Sidebar
      className="z-40 border-none box mt-[50px] pt-[14px] shadow-[1px_0px_5px_rgba(0,0,0,0.35)]"
      collapsible="icon"
    >
      {/* <HeaderLogoMenu isCollapsed={false} /> */}
      <SidebarContent className="bg-background pb-[15px]">
        <MainSection />
        <Separator />
        <PersonalSection />
      </SidebarContent>
    </Sidebar>
  );
};

export default HomeSidebar;

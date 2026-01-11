"use client";

import ThemeSwitcher from "@/components/Customs/theme-switcher";
import { Separator } from "@/components/ui/separator";
import { Sidebar, SidebarContent, useSidebar } from "@/components/ui/sidebar";
import { useEditingStatus } from "@/hooks/useEditingStatus";
import { cn } from "@/lib/utils";
import MainSection from "./main-section";
import PersonalSection from "./personal-section";

const HomeSidebar = () => {
  const { isMobile } = useSidebar();
  // const isCollapsed = state === "collapsed";
  
  const activeSection = useEditingStatus();
  console.log(
    activeSection,
    "✅✅✅✅✅✅✅✅✅✅✅✅✅",
    "we got update from socket and sidebar file is getting updated"
  );

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
        <MainSection />
        <Separator />
        <PersonalSection />
      </SidebarContent>

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

export default HomeSidebar;

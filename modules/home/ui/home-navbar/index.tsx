"use client";
import { useEditingStatus } from "@/hooks/useEditingStatus";
import { cn } from "@/lib/utils";
import AuthButton from "@/modules/auth/ui/auth-button";
import { useEffect, useState } from "react";
import HeaderLogoMenu from "./header-logo-menu";
import SearchInput from "./search-input";
// import { useSidebar } from "@/components/ui/sidebar";

const HomeNavbar = () => {
  // const { state } = useSidebar();
  // const isCollapsed = state === "collapsed";

  const [isHeaderUpdated, setIsHeaderUpdated] = useState<boolean>(false);

  const activeSection= useEditingStatus();
  const { section, uniqueId } = activeSection ?? {};

  useEffect(() => {
    if (section === "header") {
      setIsHeaderUpdated(true);
      console.log('highlight started');
      setTimeout(() => {
        setIsHeaderUpdated(false);
        
      console.log('highlight stopped');
      }, 4000);
    }
  }, [uniqueId]);

  // const isHeaderUpdated = useMemo(() => {
  //   return activeSection === "header";
  // }, [activeSection]);

  return (
    <nav
      className={cn(
        "fixed shadow-[0px_1px_5px_rgba(0,0,0,0.35)] bg-background top-0 left-0 right-0 h-16 flex items-center px-2 pr-5 z-50",
        isHeaderUpdated ? "glow" : ""
      )}
    >
      <div className="flex items-center gap-4 w-full">
        {/* menu and logo */}
        <HeaderLogoMenu isCollapsed={true} />

        {/* search bar */}
        <div className="flex-1 flex justify-center max-w-[720px] mx-auto">
          <SearchInput />
        </div>

        {/* auth sign-in sign-out */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;

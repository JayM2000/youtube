"use client";
import { useEditingStatus } from "@/hooks/useEditingStatus";
import AuthButton from "@/modules/auth/ui/auth-button";
import StudioUploadModal from "../../components/studio-upload-modal";
import HeaderLogoMenu from "./header-logo-menu";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
// import { useSidebar } from "@/components/ui/sidebar";

const StudioNavbar = () => {
  // const { state } = useSidebar();
  // const isCollapsed = state === "collapsed";;
  const [isHeaderUpdated, setIsHeaderUpdated] = useState<boolean>(false);

  const activeSection = useEditingStatus();
  const { section, uniqueId } = activeSection ?? {};

  useEffect(() => {
    if (section === "header") {
      setIsHeaderUpdated(true);
      console.log("highlight started");
      setTimeout(() => {
        setIsHeaderUpdated(false);

        console.log("highlight stopped");
      }, 4000);
    }
  }, [uniqueId]);

  return (
    <nav
      className={cn(
        "fixed shadow-[0px_1px_5px_rgba(0,0,0,0.35)] bg-background top-0 left-0 right-0 h-16 flex items-center px-2 pr-5 z-50",
        isHeaderUpdated ? "glow" : ""
      )}
    >
      <div className="flex justify-between items-center gap-4 w-full">
        {/* menu and logo */}
        <HeaderLogoMenu isCollapsed={true} />

        {/* auth sign-in sign-out */}
        <div className="flex-shrink-0 flex items-center gap-4">
          <StudioUploadModal />
          <AuthButton />
        </div>
      </div>
    </nav>
  );
};

export default StudioNavbar;

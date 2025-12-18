"use client";
import AuthButton from "@/modules/auth/ui/auth-button";
import HeaderLogoMenu from "./header-logo-menu";
import StudioUploadModal from "../../components/studio-upload-modal";
// import { useSidebar } from "@/components/ui/sidebar";

const StudioNavbar = () => {
  // const { state } = useSidebar();
  // const isCollapsed = state === "collapsed";

  return (
    <nav
      className={`fixed shadow-[0px_1px_5px_rgba(0,0,0,0.35)] bg-background top-0 left-0 right-0 h-16 flex items-center px-2 pr-5 z-50 `}
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

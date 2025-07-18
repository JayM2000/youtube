import React from "react";
import SearchInput from "./search-input";
import AuthButton from "@/modules/auth/ui/auth-button";
import HeaderLogoMenu from "./header-logo-menu";

const HomeNavbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 flex items-center px-2 pr-5 z-50">
      <div className="flex items-center gap-4 w-full">
        {/* menu and logo */}
        <HeaderLogoMenu hideText={false} />

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

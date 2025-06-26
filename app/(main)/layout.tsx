import SiderMenu from "@/components/SiderBar/SiderMenu";
import { ModeToggle } from "@/components/Theming/ModeToggle";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-start items-start">
      <SiderMenu />

      <div>
        <header className="w-full text-right">
          <ModeToggle />
        </header>

        {children}
      </div>
    </div>
  );
};

export default layout;

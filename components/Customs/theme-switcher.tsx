import React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { ModeToggle } from "../Theming/ModeToggle";

const ThemeSwitcher = () => {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="flex justify-center">
            <SidebarMenuButton
              tooltip="theme mode"
              asChild
              // isActive={false}
              // onClick={(e) => {
              //   if(!isSignedIn && item.auth){
              //     e.preventDefault();
              //     return clerk.openSignIn();
              //   }
              // }}
            >
              <ModeToggle />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default ThemeSwitcher;

import { HomeLayout } from "@/modules/home/ui/layouts/home-layouts";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return <HomeLayout>{children}</HomeLayout>;
};

export default Layout;

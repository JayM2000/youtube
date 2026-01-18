"use client";
import LoadingUI from "@/components/Loading/loading";
import { SidebarProvider } from "@/components/ui/sidebar";
import SpotlightWrapper from "@/lib/tour/spotlight-wrapper";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import HomeNavbar from "../home-navbar";
import HomeSidebar from "../home-sidebar";

interface HomeLayoutProps {
  children: React.ReactNode;
}

export const HomeLayout = ({ children }: HomeLayoutProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isHomePage = searchParams.get("home");

  useEffect(() => {
    if (isHomePage !== "true") {
      setTimeout(() => {
        router.push("/under-construction");
      }, 3000);
    }
  }, [isHomePage, router]);

  // While redirecting, you can show a loading or blank UI
  if (isHomePage !== "true") {
    return <LoadingUI />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // starting animation
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <SidebarProvider>
        <div className="w-full">
          {/* header content */}
          <SpotlightWrapper
            tooltip="This button does something important!"
            placement="below"
            childType="header"
          >
            <HomeNavbar />
          </SpotlightWrapper>

          <div className="flex min-h-screen pt-[4rem]">
            <SpotlightWrapper
              tooltip="This button does something important!"
              placement="right"
              childType="sidebar"
            >
              <HomeSidebar />
            </SpotlightWrapper>

            <main className="main-content flex-1 overflow-y-auto">
              <SpotlightWrapper
                tooltip="This button does something important!"
                placement="above"
                childType="MainView"
              >
                {children}
              </SpotlightWrapper>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </motion.div>
  );
};

import { UserAvatar } from "@/components/Customs/user-avatar";
import {
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const StudioSidebarHeader = () => {
  const { user } = useUser();
  const { state } = useSidebar();

  if (!user) {
    // if in collapsed state render profile icon in skeleton
    if (state === "collapsed") {
      return (
        <SidebarHeader className="flex items-center justify-center pb-4">
          <Skeleton className="size-[16px] rounded-full" />
        </SidebarHeader>
      );
    }

    return (
      <SidebarHeader className="flex items-center justify-center pb-4">
        <Skeleton className="size-[112px] rounded-full" />
        <div className="flex flex-col items-center mt-2 gap-y-1.5">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-3.5 w-[100px]" />
        </div>
      </SidebarHeader>
    );
  }

  if (state === "collapsed") {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Your profile" asChild>
          <Link href="/users/current">
            <UserAvatar
              imageUrl={user.imageUrl}
              name={user.fullName ?? "User"}
              size="xs"
            />
            {/* <span className="text-sm">Your profile</span> */}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  }

  return (
    <SidebarHeader className="flex items-center justify-center pb-4">
      <Link href="/users/current">
        <UserAvatar
          imageUrl={user.imageUrl}
          name={user.fullName ?? "User"}
          className="size-[112px] transform transition-all duration-350 hover:opacity-50 hover:transform-[scale(1.059)]"
        />
      </Link>
      <div className="flex flex-col items-center mt-2 gap-y-1">
        <p className="text-sm font-medium">Your profile</p>
        <p className="text-xs text-muted-foreground">{user.fullName}</p>
      </div>
    </SidebarHeader>
  );
};

export default StudioSidebarHeader;

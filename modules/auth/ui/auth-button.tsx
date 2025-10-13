"use client";

import { Button, ButtonSty_1 } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ClapperboardIcon } from "lucide-react";
import Link from "next/link";

const AuthButton = () => {
  return (
    <>
      {/* if sign in state then show these ui components */}
      <SignedIn>
        <Button asChild variant="secondary">
          <Link href="/studio">
            <ClapperboardIcon />
            Studio
          </Link>
        </Button>
        <UserButton>
          <UserButton.MenuItems>
            <UserButton.Link
              label="Studio"
              href="/studio"
              labelIcon={<ClapperboardIcon className="size-4" />}
            />
          </UserButton.MenuItems>
        </UserButton>
      </SignedIn>

      {/* if sign out state then show these ui components */}
      <SignedOut>
        <SignInButton mode="modal">
          <ButtonSty_1
            variant="style_1"
            // rounded={10}
            className="px-4 py-2 text-sm font-medium rounded-full shadow-none before:rounded-[10]"
          >
            Sign in
          </ButtonSty_1>
        </SignInButton>
      </SignedOut>
    </>
  );
};

export default AuthButton;

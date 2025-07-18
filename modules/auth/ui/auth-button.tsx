import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "lucide-react";
import React from "react";

const AuthButton = () => {
  return (
    <Button
      variant="outline"
      className="px-4 py-2 text-sm font-medium rounded-full shadow-none "
    >
      <UserCircleIcon />
      Sign in
    </Button>
  );
};

export default AuthButton;

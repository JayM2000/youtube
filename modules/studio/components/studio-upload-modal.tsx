"use client";

import { Button } from "@/components/ui/button";
import CustomLoader from "@/lib/CustomLoader";
import { trpc } from "@/trpc/client";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

const StudioUploadModal = () => {
  const utils = trpc.useUtils();
  const create = trpc.videos.create.useMutation({
    onSuccess: () => {
      toast.success("Video created successfully");
      utils.studio.getMany.invalidate();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong while creating video.");
    },
  });

  return (
    <Button
      variant="secondary"
      onClick={() => {
        create.mutate();
      }}
      disabled={create.isPending}
    >
      {create.isPending ? (
        <CustomLoader height={22} width={22} />
      ) : (
        <PlusIcon />
      )}
      Createe
    </Button>
  );
};

export default StudioUploadModal;

import { DEFAULT_LIMIT } from "@/app/constants";
import StudioView from "@/modules/studio/ui/view/studio-view";
import { HydrateClient, trpc } from "@/trpc/server";
import React from "react";

const Studio = () => {
  void trpc.studio.getMany.prefetchInfinite({
    limit:  DEFAULT_LIMIT
  });

  return (
    <HydrateClient>
      <StudioView />
    </HydrateClient>
  );
};

export default Studio;

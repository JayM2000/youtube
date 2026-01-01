"use client";

import { DEFAULT_LIMIT } from "@/app/constants";
import { trpc } from "@/trpc/client";
import React from "react";

const VideosSection = () => {
  const [data] = trpc.studio.getMany.useSuspenseInfiniteQuery(
    {
      limit: DEFAULT_LIMIT,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    }
  );

  return <div> data rendering: {JSON.stringify(data)}</div>;
};

export default VideosSection;

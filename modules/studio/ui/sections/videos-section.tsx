"use client";

import { DEFAULT_LIMIT } from "@/app/constants";
import { trpc } from "@/trpc/client";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

export const VideoSection = () => {

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<p>Error</p>}>
        <VideosSectionSuspense />
      </ErrorBoundary>
    </Suspense>
  )
}

const VideosSectionSuspense = () => {
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

export default VideosSectionSuspense;

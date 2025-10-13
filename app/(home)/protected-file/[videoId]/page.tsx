import React from "react";

const page = async ({ params }: { params: Promise<{ videoId: string }> }) => {
  const { videoId } = await params;

  return (
    <div>
      Video rendering here inside protected router with video id {videoId}
    </div>
  );
};

export default page;

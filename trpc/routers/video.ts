import { db } from "@/db";
import { videos } from "@/db/schemas/videosSchema";
import { createTRPCRouter, protectedProcedure } from "../init";

export const videosRouter = createTRPCRouter({
  create: protectedProcedure.mutation(async ({ ctx }) => {
    const { id: userId } = ctx.userData;

    const [video] = await db
      .insert(videos)
      .values({
        userId,
        title: "Untitled",
      })
      .returning();

    return {
      video,
    };
  }),
});

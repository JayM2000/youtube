import { createTRPCRouter } from "../init";
import { categoriesRouter } from "./categories";
import { studioRouter } from "./studio";

export const appRouter = createTRPCRouter({
  categories: categoriesRouter,
  studio: studioRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

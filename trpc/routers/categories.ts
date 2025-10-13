import { db } from "@/db";
import { baseProcedure, createTRPCRouter } from "../init";
import { categories } from "@/db/schemas/categoriesSchema";

export const categoriesRouter = createTRPCRouter({
  getMany: baseProcedure.query(async () => {
    const categoryData = await db.select().from(categories);

    return categoryData;
  }),
});

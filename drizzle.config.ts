import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  out: "./drizzle",
  schema: [
    "./db/schemas/usersSchema.ts",
    "./db/schemas/categoriesSchema.ts",
    "./db/schemas/videosSchema.ts",
  ],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

import { db } from "@/db";
import { categories } from "@/db/schemas/categoriesSchema";
import React from "react";

const categoryNames = [
  // "Cars and vehicles",
  "Comedy",
  "Education",
  "Gaming",
  "Entertainment",
  "Film and animation",
  "How-to and style",
  "Music",
  "News and politics",
  "People and blogs",
  "Pets and animals",
  "Science and technology",
  "Sports",
  "Travel and events",
];

const SeedScripts = async () => {
  const mainFunc = async () => {
    let seedingResult = false;
    try {
      const values = categoryNames.map((name) => ({
        name,
        description: `Videos related to ${name.toLowerCase()}`,
      }));

      await db.insert(categories).values(values);

      console.log(values, "category seeded successfully!");
      seedingResult = true;
    } catch (err) {
      seedingResult = false;
      console.error("Error in seeding  categories: ", err);
      process.exit(1);
    }

    return seedingResult;
  };

  const seedingResult = await mainFunc();

  return (
    <div>
      {seedingResult ? "Seeding successfully completed" : "seeding failed"}
    </div>
  );
};

export default SeedScripts;

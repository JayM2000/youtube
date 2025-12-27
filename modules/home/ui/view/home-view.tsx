import React from "react";
import CategorySection from "../sections/category-section";

interface HomeViewProps {
  categoryId?: string;
}
const HomeView = (props: HomeViewProps) => {
  const { categoryId } = props ?? {};

  return (
    <div className="max-w-[2400px] h-auto mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
      <CategorySection categoryId={categoryId} />
    </div>
  );
};

export default HomeView;

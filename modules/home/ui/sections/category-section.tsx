"use client";
import FilterCarousal from "@/components/Customs/filter-carousal";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface CategorySectioProps {
  categoryId?: string;
}
const CategorySection = ({ categoryId }: CategorySectioProps) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();

  const router = useRouter();

  const categoryStructuredData = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);

    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }

    router.push(url.toString());
  };

  return (
    <Suspense fallback={<FilterCarousal isLoading={true} data={[]} />}>
      <ErrorBoundary fallback={<p>Error...</p>}>
        <FilterCarousal
          onSelect={onSelect}
          isLoading={false}
          data={categoryStructuredData}
          value={categoryId}
        />
      </ErrorBoundary>
    </Suspense>
  );
};

export default CategorySection;

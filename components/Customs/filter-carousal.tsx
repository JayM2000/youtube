import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

interface FilterCarousalProps {
  value?: string | null;
  isLoading?: boolean;
  onSelect?: (value: string | null) => void;
  data: {
    value: string;
    label: string;
  }[];
}
const FilterCarousal = ({
  value,
  isLoading,
  onSelect,
  data,
}: FilterCarousalProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCnt(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    const onScroll = () => {
      // you might decide to round or pick the nearest snap
      const idx = api.selectedScrollSnap();
      setCurrent(idx + 1);
      // console.log("inside api on method", idx + 1);
    };
    api.on("scroll", onScroll);
    return () => {
      api.off("scroll", onScroll);
    };
  }, [api]);

  return (
    <div className="relative w-full">
      {/* left fade */}
      <div
        className={cn(
          "absolute left-8 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-[var(--carousal-fade)] to-transparent pointer-events-none"
          // current === 1 && "hidden"
        )}
      />

      <Carousel
        setApi={setApi}
        className="w-full px-8"
        opts={{
          align: "start",
          dragFree: true,
        }}
      >
        <CarouselContent className="mx-3">
          {/* skeleton loading effect */}
          {isLoading &&
            Array.from({ length: 14 }).map((_, index) => (
              <CarouselItem key={index} className="pl-3 basis-auto">
                <Skeleton className="rounded-lg px-3 py-1 h-full w-[100px] font-semibold text-sm ">
                  &nbsp;
                </Skeleton>
              </CarouselItem>
            ))}

          {!isLoading && (
            <CarouselItem className="pl-3 basis-auto">
              <Badge
                onClick={() => {
                  if (onSelect) {
                    onSelect(null);
                  }
                }}
                variant={!value ? "default" : "secondary"}
                className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm "
              >
                All
              </Badge>
            </CarouselItem>
          )}

          {!isLoading &&
            data.map((item) => (
              <CarouselItem key={item.value} className="pl-3 basis-auto">
                <Badge
                  onClick={() => {
                    if (onSelect) {
                      onSelect(item.value);
                    }
                  }}
                  variant={value === item.value ? "default" : "secondary"}
                  className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm "
                >
                  {item.label}
                </Badge>
              </CarouselItem>
            ))}
        </CarouselContent>

        <CarouselPrevious
          className={cn("left-0 z-20", current === 1 && "hidden")}
        />
        <CarouselNext
          className={cn("right-0 z-20", current === cnt && "hidden")}
        />
      </Carousel>

      {/* right fade */}
      <div
        className={cn(
          "absolute right-8 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-[var(--carousal-fade)] to-transparent pointer-events-none"
          // current === cnt && "hidden"
        )}
      />
    </div>
  );
};

export default FilterCarousal;

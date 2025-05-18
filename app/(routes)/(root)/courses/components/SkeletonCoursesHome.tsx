import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonCoursesHome() {
  return (
    <div className="flex flex-wrap gap-2 space-y-3 my-4 mx-6 p-4">
      {Array(3)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="flex  gap-2 space-y-3 my-4 mx-6 p-4"
          >
            <div className=" gap-2">
              <Skeleton className="h-[200px] bg-gray-500/20 w-[400px] rounded-xl" />
              <div className="space-y-4 mt-2">
                <Skeleton className="h-4 bg-gray-500/20 w-[250px]" />
                <Skeleton className="h-4 bg-gray-500/20 w-[400px]" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 bg-gray-500/20 w-[50px]" />
                  <Skeleton className="h-4 bg-gray-500/20 w-[50px]" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

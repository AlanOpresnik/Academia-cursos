import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function SkeletonCardCourses() {
  return (
    <>
      {Array(4)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            className="flex justify-between gap-2 space-y-3 my-4 mx-6 p-4"
          >
            <div className="flex gap-2">
              <Skeleton className="h-[125px] bg-gray-500/20 w-[250px] rounded-xl" />
              <div className="space-y-4 mt-2">
                <Skeleton className="h-4 bg-gray-500/20 w-[250px]" />
                <Skeleton className="h-4 bg-gray-500/20 w-[400px]" />
                <div className="flex gap-2">
                  <Skeleton className="h-4 bg-gray-500/20 w-[50px]" />
                  <Skeleton className="h-4 bg-gray-500/20 w-[50px]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="bg-gray-500/20 h-[30px] w-[150px]" />
              <Skeleton className="bg-gray-500/20 h-[30px] w-[150px]" />
            </div>
          </div>
        ))}
    </>
  );
}

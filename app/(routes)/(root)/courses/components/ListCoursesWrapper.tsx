import React, { Suspense } from "react";
import ListCoursesHomePage from "./ListCoursesHomePage";
import SkeletonCoursesHome from "./SkeletonCoursesHome";

export default async function ListCoursesWrapper() {
  return (
    <div>
      <Suspense fallback={<SkeletonCoursesHome />}>
        <ListCoursesHomePage />
      </Suspense>
    </div>
  );
}

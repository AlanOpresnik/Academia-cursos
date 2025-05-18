import { RedirectToSignIn } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import Header from "./components/Header/Header";
import ListCoursesWrapper from "./components/ListCourses/ListCoursesWrapper";
import { Suspense } from "react";
import SkeletonCardCourses from "@/components/shared/SkeletonCardCourses/SkeletonCardCourses";

export default async function TeachersPage() {
  const user = await currentUser();

  if (!user) {
    return <RedirectToSignIn />;
  }
  return (
    <div>
      <Header />
      <Suspense fallback={<SkeletonCardCourses />}>
        <ListCoursesWrapper userId={user.id} />
      </Suspense>
    </div>
  );
}

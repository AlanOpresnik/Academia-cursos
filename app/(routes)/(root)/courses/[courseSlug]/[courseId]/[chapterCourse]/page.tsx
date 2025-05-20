import { getCourseByid } from "@/actions/getCourseBySlug";
import { getIsPurchasedCourse } from "@/actions/getPurchasedCourse";
import { getUserProgress } from "@/actions/getUserProgress";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";
import InfoCourse from "./components/infoCourse/InfoCourse";

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ courseId: string; chapterCourse: string }>;
}) {
  const { courseId, chapterCourse } = await params;
  const user = await currentUser();
  if (!user) return redirect("/");
  const infoCourse = await getCourseByid(courseId);
  if (!infoCourse) return <p>no hay informacion del curso</p>;

  const userProgress = await getUserProgress();

  const isPurchasedCourse = await getIsPurchasedCourse(user.id, infoCourse.id);
  console.log(isPurchasedCourse)

  const videoUrl = infoCourse.chapters.find((chapter) => chapter.id === chapterCourse)?.videoUrl

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-[65%_1fr] gap-4">
        <InfoCourse
          chapterCourseId={chapterCourse}
          infoCourse={infoCourse}
          purchaseCourse={isPurchasedCourse}
          userProgress={userProgress}
          videoUrl={videoUrl}
          />
          <p>
            Chapters
          </p>
      </div>
    </div>
  );
}

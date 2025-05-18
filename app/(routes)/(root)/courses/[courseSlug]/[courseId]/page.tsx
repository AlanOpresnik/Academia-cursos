import { getCourseByid } from "@/actions/getCourseBySlug";
import React from "react";
import BreadCrumpCourse from "./components/BreadCrumpCourse/BreadCrumpCourse";
import { getPurchaseCourseById } from "@/actions/getPurchaseCourseById";
import HeroBlockCourse from "./components/HeroBlockCourse/HeroBlockCourse";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import CourseContent from "./components/CourseContent/CourseContent";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string; courseId: string }>;
}) {
  const { courseId } = await params;
  const user = await currentUser();
  const infoCourse = await getCourseByid(courseId);
  if (!infoCourse) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="my-4 mx-6 border rounded-lg bg-white p-6">
          <h1 className="text-2xl font-bold">Curso no encontrado</h1>
        </div>
      </div>
    );
  }
  if (!user) {
    redirect("/sign-in");
  }

  const { title, id } = infoCourse;
  const purchaseCourse = await getPurchaseCourseById(user.id, id);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="my-4 mx-6 border rounded-lg bg-white p-6">
        <BreadCrumpCourse title={title} />

        <HeroBlockCourse course={infoCourse} purchaseCourse={purchaseCourse} />
      </div>
      <div className="my-4 mx-6 border rounded-lg bg-white p-6">
        <CourseContent chapters={infoCourse.chapters} />
      </div>
    </div>
  );
}

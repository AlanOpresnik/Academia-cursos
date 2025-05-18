import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import HeaderCourse from "./components/HeaderCourse/HeaderCourse";
import CourseForm from "./components/CourseForm/CourseForm";
import CourseImage from "./components/CourseImage/CourseImage";
import CoursePrice from "./components/CoursePrice/CoursePrice";
import ChaptersBlock from "./components/ChaptersBlock/ChaptersBlock";

interface Props {
  params: Promise<{ courseId: string }>;
}

export default async function CoursePage({ params }: Props) {
  const { courseId } = await params;
  const { userId } = await auth();
  if (!userId) return <p>No tienes permisos para ver este curso</p>;
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return <p>No se encontro el curso</p>;
  }

  return (
    <div className="m-6">
      <HeaderCourse courseId={course.id} isPublished={course.isPublished} />
      <CourseForm course={course} />
      <div className="grid  grid-cols-1 md:grid-cols-2 my-4 gap-4">
        <CourseImage courseId={course.id} imageCourse={course.imageUrl} />

        <CoursePrice courseId={course.id} priceCourse={course.price} />
      </div>
      <div>
        <ChaptersBlock chapters={course.chapters} courseId={course.id} />
      </div>
    </div>
  );
}

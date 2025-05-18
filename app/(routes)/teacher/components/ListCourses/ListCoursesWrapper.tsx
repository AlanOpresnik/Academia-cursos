import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import React from "react";
import ListCourses from "./ListCourses";

interface Props {
  userId: string | Prisma.StringFilter<"Course"> | undefined;
}

export default async function ListCoursesWrapper({ userId }: Props) {
  const courses = await prisma.course.findMany({
    where: {
      userId: userId,
    },
  });

  console.log(courses);
  return (
    <div>
      <ListCourses courses={courses} />
    </div>
  );
}

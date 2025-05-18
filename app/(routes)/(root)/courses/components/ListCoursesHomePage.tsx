import { getHomeCourses } from "@/actions/getHomeCourses";
import ListCourses from "@/components/shared/ListCourses/ListCourses";
import React from "react";

export default async function ListCoursesHomePage() {
  const listCourses = await getHomeCourses();
  return (
    <div>
      <ListCourses title="Todos los cursos" courses={listCourses} />
    </div>
  );
}

import React from "react";
import { listCoursesProps } from "./listCourse.types";
import CourseCard from "./CourseCard/CourseCard";

export default function ListCourses(props: listCoursesProps) {
  const { courses } = props;

  if (courses.length === 0) {
    return <p>No hay cursos creados</p>;
  }
  return (
    <div className="flex flex-col my-4 mx-6 border rounded-lg bg-white p-4 gap-10">
      {courses.map((course) => (
        <div key={course.id}>
         <CourseCard course={course}/>
        </div>
      ))}
    </div>
  );
}

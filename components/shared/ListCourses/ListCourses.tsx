import { Chapter, Course } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import IconBadge from "../IconBadge/IconBadge";
import { Book, ChartNoAxesColumn } from "lucide-react";
import ProgressCourse from "./ProgressCourse/ProgressCourse";
import ClientWrapperProgress from "./ProgressCourse/ClientWrapperProgress";

interface Props {
  title: string;
  courses: (Course & { chapters: Chapter[] })[] | null;
}

export default function ListCourses({ courses, title }: Props) {
  return (
    <div>
      <div className="my-4 mx-6 border rounded-lg bg-white p-6">
        <h2 className="text-2xl font-normal">{title}</h2>
        <div className="border-b-[1px] py-2">
          {courses && courses.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
              {courses.map((course) => (
                <Link
                  className="border rounded-lg relative transition-shadow hover:shadow-lg shadow-violet-300/40 shadow-md"
                  key={course.id}
                  href={`/courses/${course.slug}/${course.id}`}
                >
                  <span className="absolute top-2 right-2 z-10 px-2 py-1 bg-white text-violet-500 font-medium rounded-full text-xs shadow-md">
                    {course.category}
                  </span>
                  <div className="w-full h-[180px] relative">
                    <Image src={course.imageUrl || '/no-image.jpg'} alt={course.title} fill className="object-cover object-center rounded-t-lg" sizes="(max-width:500px), 100vw,1200px"/>
                  </div>
                  <div className="p-2">
                    <h2 className="text-lg font-semibold text-gray-800 truncate">{course.title}</h2>
                    <div className="flex items-center gap-2 justify-between mt-2">
                        <IconBadge Icon={Book} text={`${course.chapters.length} capitulos`}/>

                          <IconBadge Icon={ChartNoAxesColumn} text={`${course.level || ''}`}/>
                    </div>
                   <ClientWrapperProgress courseId={course.id} price={course.price} totalChapters={course.chapters.length}/>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p>No hay cursos disponibles en este momento</p>
          )}
        </div>
      </div>
    </div>
  );
}

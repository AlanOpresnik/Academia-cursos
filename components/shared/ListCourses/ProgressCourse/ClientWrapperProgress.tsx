"use client";
import ProgressCourse from "@/components/shared/ListCourses/ProgressCourse/ProgressCourse";

interface Props {
  courseId: string;
  totalChapters: number;
  price: string | null;
}

export default function ClientWrapperProgress({
  courseId,
  price,
  totalChapters,
}: Props) {
  return (
    <ProgressCourse
      courseId={courseId}
      price={price}
      totalChapters={totalChapters}
    />
  );
}

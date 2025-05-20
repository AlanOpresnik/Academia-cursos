import { Chapter, Course, UserProgress } from "@prisma/client";
import { Lock } from "lucide-react";
import React from "react";
import VideoCourse from "../VideoCourse/VideoCourse";

interface Props {
  infoCourse: Course & { chapters: Chapter[] };
  chapterCourseId: string;
  userProgress: UserProgress[];
  purchaseCourse: boolean;
  videoUrl:string | null | undefined
}

export default function InfoCourse({
  chapterCourseId,
  infoCourse,
  purchaseCourse,
  userProgress,
  videoUrl
}: Props) {
  return (
    <div className="w-full relative">
      {!purchaseCourse && (
        <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-md gap-y-2 h-full z-30 rounded-md text-secondary">
            <Lock className="w-8 h-8"/>
            <p className="text-sm">Capitulo bloqueado , compra este curso para desbloquearlo</p>
        </div>
      )}
      {videoUrl && (
        <VideoCourse videoUrl={videoUrl}/>
      )}
    </div>
  );
}

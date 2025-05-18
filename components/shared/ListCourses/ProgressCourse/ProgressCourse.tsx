"use client";

import { getUserProgressByCourse } from "@/actions/getUserProgressByCourse";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/nextjs";
import { Progress } from "@/components/ui/progress";
import { useState, useEffect } from "react";
import { formatPrice } from "@/lib/formatPrice";

interface Props {
  courseId: string;
  totalChapters: number;
  price: string | null;
}

export default function ProgressCourse({
  courseId,
  price,
  totalChapters,
}: Props) {
  const { user } = useUser();
  const [progressCourse, setProgressCourse] = useState<number>(0);
  
  useEffect(() => {
    const fetchProgress = async () => {
      if (!user?.id) return;
      
      try {
        const progress = await getUserProgressByCourse(courseId, user.id);
        setProgressCourse(progress || 0);
      } catch (error) {
        console.error("Error fetching progress:", error);
      }
    };
    
    fetchProgress();
  }, [user?.id, courseId]);

  if (!user) {
    return (
      <div className="text-xs mt-2">
        <Skeleton className="h-5 bg-gray-700/20 w-full max-w-[200px]" />
      </div>
    );
    }
  return (
    <div className="mt-4">
      {totalChapters > 0 && progressCourse > 0 ? (
        <div>
          <Progress
            value={(progressCourse / totalChapters) * 100}
            className="[&>*]:bg-violet-300"
          />
          <p className="text-xs mt-1">
            {Math.round((progressCourse / totalChapters) * 100)}% completado
          </p>
        </div>
      ) : (
        <h4>{formatPrice(price)}</h4>
      )}
    </div>
  );
}
'use server'
import prisma from "@/lib/prisma";

export const getUserProgressByCourse = async (
  courseId: string,
  userId: string
): Promise<number | undefined> => {
  try {
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId: userId,
        courseId: courseId,
      },
    });
    if (!purchase) return 0;

    const totalChapters = await prisma.chapter.count({
      where: {
        courseId: courseId,
      },
    });

    if (totalChapters === 0) return 0;

    const completedChapters = await prisma.userProgress.count({
      where: {
        userId: userId,
        isCompleted: true,
        chapter: {
          courseId: courseId,
        },
      },
    });
    const progressPercentage = Math.round(
      (completedChapters / totalChapters) * 100
    );
    return progressPercentage;
  } catch (error) {
    console.log("GET USER PROGRESS BY COURSE", error);
  }
};

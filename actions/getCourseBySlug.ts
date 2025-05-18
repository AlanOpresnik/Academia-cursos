import prisma from "@/lib/prisma";
import { Chapter, Course } from "@prisma/client";

export const getCourseByid = async (
  id: string
): Promise<(Course & { chapters: Chapter[] }) | null> => {
  try {
    const course = await prisma.course.findUnique({
      where: {
        id: id,
        isPublished: true,
      },
      include: {
        chapters: {
          where: {
            isPublished: true,
          },
          orderBy: {
            position: "asc",
          },
        },
      },
    });
    return course;
  } catch (error) {
    console.log("ERROR GET COURSE BY SLUG", error);
    return null;
  }
};

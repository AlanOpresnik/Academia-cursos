import prisma from "@/lib/prisma";

export const getPurchaseCourseById = async (
  userId: string,
  courseId: string
): Promise<boolean> => {
  try {
    const purchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId: userId,
          courseId: courseId,
        },
      },
      include: {
        Course: true,
      },
    });
    return !!purchase;
  } catch (error) {
    console.log(["ERROR GET PURCHASE COURSE BY ID", error]);
    return false;
  }
};

import prisma from "@/lib/prisma";

export async function getIsPurchasedCourse(
  userId: string,
  courseId: string
): Promise<boolean> {
  try {
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId,
        courseId,
      },
    });
    return !!purchase;
  } catch (error) {
    console.log("GET IS PURCHASED", error);
    return false;
  }
}

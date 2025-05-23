import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const { userId } = await auth();
    const { courseId, chapterId } = await params;
    const values = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const course = await prisma.chapter.update({
      where: {
        courseId: courseId,
        id: chapterId,
      },
      data: {
        ...values,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[CHAPTER_UPDATE]", error);
    new NextResponse("INTERNAL ERROR", { status: 404 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ courseId: string; chapterId: string }> }
) {
  try {
    const { userId } = await auth();
    const { courseId, chapterId } = await params;

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const course = await prisma.chapter.delete({
      where: {
        courseId: courseId,
        id: chapterId,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    console.log("[CHAPTER_DELETE]", error);
    new NextResponse("INTERNAL ERROR", { status: 404 });
  }
}

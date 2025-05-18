import prisma from "../../../lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const { courseName, slug, category } = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const course = await prisma.course.create({
      data: {
        userId,
        title: courseName,
        slug: slug,
        category: category,
      },
    });
    return NextResponse.json(course);
  } catch (error) {
    console.log("[course]" + error);
    return new NextResponse("INTERNAL ERROR");
  }
}


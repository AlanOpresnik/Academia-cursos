import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export async function getUserProgress() {
    try {
        const user = await currentUser()
        if(!user || !user.id)  {
            throw new Error("no se identifico el usuario")
        }
        const progress = await prisma.userProgress.findMany({
            where:{
                userId: user.id
            }
        })
        return progress
    } catch (error) {
        console.error("ERROR USER PROGRESS", error)
        return []
    }
}
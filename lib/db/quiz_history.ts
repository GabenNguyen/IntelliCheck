"use server"
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function fetchQuizHistoryData() {
    try {
        const { userId } = await auth();

        if(!userId) {
            throw new Error("Unauthorised access!")
        }

        const quizHistoryData = await prisma.quiz.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc" // latest => oldest
            },
            select: {
                id: true,
                title: true,
                subject: true,
                description: true,
                questionCount: true,
                timeSaved: true,
                createdAt: true,
            }

        })

        return quizHistoryData

    } catch (error) {
        console.error(error)
        throw new Error(`Error fetching data: ${error}`)
    }
}
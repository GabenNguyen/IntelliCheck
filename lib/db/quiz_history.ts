"use server"
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function fetchQuizHistoryData(page = 1, limit = 9) {
    try {
        const { userId } = await auth();

        if(!userId) {
            throw new Error("Unauthorised access!")
        }

        const skip = (page - 1) * limit;
        
        // Get total count for pagination
        const totalCount = await prisma.quiz.count({
            where: {
                userId,
            }
        });
        
        // Get paginated quiz data
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
            },
            skip,
            take: limit
        })

        return {
            data: quizHistoryData,
            totalCount,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit)
        }

    } catch (error) {
        console.error(error)
        throw new Error(`Error fetching data: ${error}`)
    }
}
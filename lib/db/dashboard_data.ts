import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";

export async function fetchDashboardData() {
    try {

        await new Promise((res) => setTimeout(res, 2000))

        const clerkUser = await currentUser();

        // if the user is not logged in, redirect to the sign-in page
        if(!clerkUser) {
            redirect("/sign-in")
        }

        // automatically save the user to the db if they dont exist
        const user = await prisma.user.upsert({
            where: {id: clerkUser.id},
            update: {},
            create: {
                id: clerkUser.id,
                email: clerkUser.emailAddresses[0]?.emailAddress || "", // Clerk saves email addressess in an array
                name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User"
            },
        })

        // total quizzes created by the user
        const totalQuizzes = await prisma.quiz.count({
            where: { userId: clerkUser.id}
        })

        // total questions across all quizzes 
        const totalQuestions = await prisma.quiz.aggregate({
            where: {userId: clerkUser.id},
            _sum: {
                questionCount: true
            }
        })

        // total time saved across all quizzes
        const totalTimeSaved = await prisma.quiz.aggregate({
            where: {userId: clerkUser.id},
            _sum: {
                timeSaved: true
            }
        })

        // get weekly activities from the past 7 days
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        
        sevenDaysAgo.setDate(today.getDate() - 6); // go back 6 days
        sevenDaysAgo.setHours(0, 0, 0, 0); // Start at midnight

        const weeklyQuizzes = await prisma.quiz.findMany({
            where: {
                userId: clerkUser.id,
                createdAt: {
                    gte: sevenDaysAgo // gte: greater than or equal to
                }
            },
            select: {
                createdAt: true
            }
            
        })
        
        // prepare data 
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

        const weeklyActivities = Array.from({ length: 7 }, (_, index) => {
            // create a date name for each of the past 7 days
            const date = new Date(sevenDaysAgo);
            date.setDate(sevenDaysAgo.getDate() + index);

            const dayName = dayNames[date.getDay()];

            // count the number of quizzes created on that day
            const numOfQuizzesCreatedInSpecificDay = weeklyQuizzes.filter(
                quiz => quiz.createdAt.toDateString() === date.toDateString()
            ).length;

            // return the data
            return {
                name: dayName,
                quizzes: numOfQuizzesCreatedInSpecificDay
            }

        })

        // Get 3 recent quizzes
        const recentGeneratedQuizzes = await prisma.quiz.findMany({
            where: { userId: clerkUser.id},
            orderBy: { createdAt: "desc"},
            take: 3, // get the latest 3 quizzes
            select: {
                id: true,
                title: true,
                subject: true,
                questionCount: true,
                createdAt: true,
            }
        })

        const subjectSummary = await prisma.quiz.groupBy({
            by: ["subject"],
            where: { userId: clerkUser.id },
            _count: { _all: true },
            _sum: { questionCount: true, timeSaved: true },
        });

        // Add a random color for each subject for the chart
        const colors = ["#6366F1", "#EC4899", "#FBBF24", "#10B981", "#3B82F6"];
        const formatedSubjectSummary = subjectSummary.map((item, index) => ({
            subject: item.subject,
            count: item._count._all,
            quizzes: item._sum.questionCount ?? 0,
            questions: item._sum.questionCount ?? 0,
            timeSaved: item._sum.timeSaved ?? 0,
            color: colors[index % colors.length]
        }))
        
        return {
            userName: user.name,
            dashboardData: {
                totalQuizzes,
                totalQuestions: totalQuestions._sum.questionCount || 0,
                totalTimeSaved: totalTimeSaved._sum.timeSaved || 0,
                weeklyActivities,
                recentGeneratedQuizzes: recentGeneratedQuizzes.map(
                    quiz => ({
                        id: quiz.id,
                        title: quiz.title.slice(0, 30),
                        subject: quiz.subject,
                        questionCount: quiz.questionCount,
                        createdAt: quiz.createdAt.toISOString(),
                    })
                ),
                subjectSummary: formatedSubjectSummary 
        }
    } 
} catch (error) {
        console.error(error)
        throw new Error("Failed to fetch data!")
    }
}


        
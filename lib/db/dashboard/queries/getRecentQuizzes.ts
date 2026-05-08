import prisma from "@/lib/db";
import type { RecentQuiz } from "../types";

export async function getRecentQuizzes(userId: string, limit: number = 3): Promise<RecentQuiz[]> {
  const quizzes = await prisma.quiz.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      title: true,
      subject: true,
      questionCount: true,
      createdAt: true,
    },
  });

  return quizzes.map((quiz) => ({
    id: quiz.id,
    title: quiz.title.slice(0, 30),
    subject: quiz.subject,
    questionCount: quiz.questionCount,
    createdAt: quiz.createdAt.toISOString(),
  }));
}
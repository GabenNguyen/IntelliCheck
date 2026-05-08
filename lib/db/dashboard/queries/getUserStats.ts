import prisma from "@/lib/db";
import type { UserStats } from "../types";

export async function getUserStats(userId: string): Promise<UserStats> {
  const [totalQuizzes, totalQuestions, totalTimeSaved] = await Promise.all([
    prisma.quiz.count({
      where: { userId },
    }),
    prisma.quiz.aggregate({
      where: { userId },
      _sum: { questionCount: true },
    }),
    prisma.quiz.aggregate({
      where: { userId },
      _sum: { timeSaved: true },
    }),
  ]);

  return {
    totalQuizzes,
    totalQuestions: totalQuestions._sum.questionCount || 0,
    totalTimeSaved: totalTimeSaved._sum.timeSaved || 0,
  };
}
import prisma from "@/lib/db";
import type { UserStats } from "../types";

export async function getUserStats(userId: string): Promise<UserStats> {
  const stats = await prisma.quiz.aggregate({
    where: { userId },
    _count: { _all: true },
    _sum: { questionCount: true, timeSaved: true },
  });

  return {
    totalQuizzes: stats._count._all,
    totalQuestions: stats._sum.questionCount || 0,
    totalTimeSaved: stats._sum.timeSaved || 0,
  };
}

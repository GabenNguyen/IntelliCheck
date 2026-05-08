import prisma from "@/lib/db";
import type { WeeklyActivity } from "../types";

export async function getWeeklyActivity(userId: string): Promise<WeeklyActivity[]> {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);
  sevenDaysAgo.setHours(0, 0, 0, 0);

  const weeklyQuizzes = await prisma.quiz.findMany({
    where: {
      userId,
      createdAt: { gte: sevenDaysAgo },
    },
    select: { createdAt: true },
  });

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(sevenDaysAgo);
    date.setDate(sevenDaysAgo.getDate() + index);
    const dayName = dayNames[date.getDay()];

    const numOfQuizzes = weeklyQuizzes.filter(
      (quiz) => quiz.createdAt.toDateString() === date.toDateString()
    ).length;

    return { name: dayName, quizzes: numOfQuizzes };
  });
}
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import type { DashboardResult } from "./types";
import { getUserStats, getWeeklyActivity, getRecentQuizzes, getSubjectData, getTopicDistribution } from "./queries";
import { formatDashboardData } from "./transformers";

export async function fetchDashboardData(): Promise<DashboardResult> {
  try {
    await new Promise((res) => setTimeout(res, 2000));

    const clerkUser = await currentUser();
    if (!clerkUser) {
      redirect("/sign-in");
    }

    const user = await prisma.user.upsert({
      where: { id: clerkUser.id },
      update: {},
      create: {
        id: clerkUser.id,
        email: clerkUser.emailAddresses[0]?.emailAddress || "",
        name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User",
      },
    });

    const userWithStreak = await prisma.user.findUnique({
      where: { id: clerkUser.id },
      select: {
        currentStreak: true,
        longestStreak: true,
        achievements: true,
      },
    });

    const [userStats, weeklyActivities, recentQuizzes, subjectData, topicDistribution] = await Promise.all([
      getUserStats(clerkUser.id),
      getWeeklyActivity(clerkUser.id),
      getRecentQuizzes(clerkUser.id),
      getSubjectData(clerkUser.id),
      getTopicDistribution(clerkUser.id),
    ]);

    return formatDashboardData({
      user,
      userStats,
      weeklyActivities,
      recentQuizzes,
      subjectData,
      topicDistribution,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch dashboard data!");
  }
}
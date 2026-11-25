import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import type { DashboardResult } from "./types";
import { getUserStats, getWeeklyActivity, getRecentQuizzes, getSubjectData } from "./queries";
import { formatDashboardData } from "./transformers";
import { buildTopicDistribution } from "./queries/getTopicDistribution";

export async function fetchDashboardData(): Promise<DashboardResult> {
  try {
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
      select: {
        name: true,
        currentStreak: true,
        longestStreak: true,
        achievements: true,
      },
    });

    const [userStats, weeklyActivities, recentQuizzes, subjectData] = await Promise.all([
      getUserStats(clerkUser.id),
      getWeeklyActivity(clerkUser.id),
      getRecentQuizzes(clerkUser.id),
      getSubjectData(clerkUser.id),
    ]);

    return formatDashboardData({
      user,
      userStats,
      weeklyActivities,
      recentQuizzes,
      subjectData,
      topicDistribution: buildTopicDistribution(subjectData),
    });
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch dashboard data!");
  }
}

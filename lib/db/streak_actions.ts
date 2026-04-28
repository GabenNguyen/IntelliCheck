"use server";
import prisma from "../db";
import { auth } from "@clerk/nextjs/server";
import { Achievement, checkNewAchievementUnlocked, type UserStats } from "@/utils/achievements";

export const updateStreakAchievement = async (
    quizScorePercent: number
): Promise<{ streak: number; newAchievements: Achievement[] }> => {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorised");

    const existingUser = await prisma.user.findUnique({
        where: { id: userId }
    })

    if (!existingUser) throw new Error("User not found!");

    // for calculating day difference
    const now = new Date();
    const today = now.toDateString();
    const lastDay = existingUser.lastQuizDate?.toDateString();

    // calculate streak
    let newStreak = existingUser.currentStreak;

    if (lastDay != today) {
        const dayDifference = existingUser.lastQuizDate
            ? Math.floor((now.getTime() - existingUser.lastQuizDate.getTime()) / MS_PER_DAY)
            : -1;

        if (dayDifference === 1) {
            newStreak += 1;
        } else if (dayDifference > 1 || lastDay === undefined) {
            newStreak = 1; // lost streak
        }
    }

    const newLongestStreak = Math.max(existingUser.longestStreak, newStreak);

    const totalQuizzes = await prisma.quiz.count({
        where: { userId }
    })

    // update user stats
    const newStats: UserStats = {
        totalQuizzes,
        averageScore: quizScorePercent,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
    };


    const existingAchievements = JSON.parse(existingUser.achievements || "[]");
    const newAchievements = checkNewAchievementUnlocked(newStats, existingAchievements)

    const allAchievements = [
        ...existingAchievements,
        ...newAchievements.map(achievement => achievement.id)
    ]

    // update the user streak
    await prisma.user.update({
        where: { id: userId },
        data: {
            currentStreak: newStreak,
            longestStreak: newLongestStreak,
            lastQuizDate: now,
            achievements: JSON.stringify(allAchievements)
        }
    })

    return {
        streak: newStreak,
        newAchievements
    };
}
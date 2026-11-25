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

    return prisma.$transaction(async (tx) => {
        // Lock the row so two quiz finishes cannot overwrite each other's streak.
        const [existingUser] = await tx.$queryRaw<Array<{
            currentStreak: number;
            longestStreak: number;
            lastQuizDate: Date | null;
            achievements: string;
        }>>`
            SELECT "currentStreak", "longestStreak", "lastQuizDate", "achievements"
            FROM users WHERE id = ${userId} FOR UPDATE
        `;

        if (!existingUser) throw new Error("User not found!");

        const now = new Date();
        const utcDay = (date: Date) =>
            Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());

        const today = utcDay(now);
        const lastDay = existingUser.lastQuizDate ? utcDay(existingUser.lastQuizDate) : null;
        const dayDifference = lastDay === null ? -1 : (today - lastDay) / MS_PER_DAY;

        let newStreak = existingUser.currentStreak;
        if (dayDifference === 1) {
            newStreak += 1;
        } else if (dayDifference > 1 || dayDifference < 0) {
            newStreak = 1;
        }

        const newLongestStreak = Math.max(existingUser.longestStreak, newStreak);
        const totalQuizzes = await tx.quiz.count({ where: { userId } });

        const newStats: UserStats = {
            totalQuizzes,
            averageScore: quizScorePercent,
            currentStreak: newStreak,
            longestStreak: newLongestStreak,
        };

        const existingAchievements = JSON.parse(existingUser.achievements || "[]") as string[];
        const newAchievements = checkNewAchievementUnlocked(newStats, existingAchievements);
        const allAchievements = [
            ...existingAchievements,
            ...newAchievements.map((achievement) => achievement.id),
        ];

        await tx.user.update({
            where: { id: userId },
            data: {
                currentStreak: newStreak,
                longestStreak: newLongestStreak,
                lastQuizDate: now,
                achievements: JSON.stringify(allAchievements),
            },
        });

        return { streak: newStreak, newAchievements };
    });
};

export interface UserStats {
    totalQuizzes: number,
    averageScore: number,
    currentStreak: number,
    longestStreak: number,
}

export interface Achievement {
    id: string,
    name: string,
    description: string,
    icon: string,
    condition: (stat: UserStats) => boolean
}

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: "first_quiz",
        name: "First Steps",
        description: "Complete your first quiz",
        icon: "🚀",
        condition: (stat) => stat.totalQuizzes >= 1,
    },
    {
        id: "five_quizzes",
        name: "Getting Started",
        description: "Complete 5 quizzes",
        icon: "📚",
        condition: (stat) => stat.totalQuizzes >= 5,
    },
    {
        id: "ten_quizzes",
        name: "Quiz Master",
        description: "Complete 10 quizzes",
        icon: "🏆",
        condition: (stat) => stat.totalQuizzes >= 10,
    },
    {
        id: "perfect_score",
        name: "Perfectionist",
        description: "Get a perfect score on any quiz",
        icon: "💯",
        condition: (stat) => stat.averageScore === 100,
    },
    {
        id: "three_day_streak",
        name: "Consistent Learner",
        description: "Maintain a 3-day streak",
        icon: "🔥",
        condition: (stat) => stat.currentStreak >= 3,
    },
    {
        id: "seven_day_streak",
        name: "Week Warrior",
        description: "Maintain a 7-day streak",
        icon: "⚡",
        condition: (stat) => stat.currentStreak >= 7,
    },
];

/**
 * Compares current user statistics against the global achievement list to identify
 * rewards that have been earned but not yet recorded.
 * @param stats - The current numerical or state data for the user.
 * @param existingIds - An array of unique identifiers for achievements already unlocked.
 * @returns An array of Achievement objects that meet their criteria for the first time.
*/
export const checkNewAchievementUnlocked = (
    stats: UserStats,
    existingIds: string[]
): Achievement[] => {
    return ACHIEVEMENTS.filter(
        (achievement) => !existingIds.includes(achievement.id) && achievement.condition(stats)
    );
}


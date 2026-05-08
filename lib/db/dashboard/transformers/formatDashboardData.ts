import type {
  UserStats,
  WeeklyActivity,
  RecentQuiz,
  SubjectData,
  TopicDistribution,
  StreakData,
  DashboardData,
} from "../types";

export interface RawUserData {
  name: string;
  currentStreak?: number | null;
  longestStreak?: number | null;
  achievements?: string | null;
}

export interface FormatOptions {
  user: RawUserData;
  userStats: UserStats;
  weeklyActivities: WeeklyActivity[];
  recentQuizzes: RecentQuiz[];
  subjectData: SubjectData[];
  topicDistribution: TopicDistribution[];
}

export function formatDashboardData(options: FormatOptions): {
  userName: string;
  dashboardData: DashboardData;
} {
  const {
    user,
    userStats,
    weeklyActivities,
    recentQuizzes,
    subjectData,
    topicDistribution,
  } = options;

  const streakData: StreakData = {
    currentStreak: user.currentStreak || 0,
    longestStreak: user.longestStreak || 0,
    achievements: JSON.parse(user.achievements || "[]"),
  };

  return {
    userName: user.name,
    dashboardData: {
      ...userStats,
      weeklyActivities,
      recentGeneratedQuizzes: recentQuizzes,
      subjectSummary: subjectData,
      topicDistribution,
      streakData,
    },
  };
}
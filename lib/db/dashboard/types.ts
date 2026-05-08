export interface UserStats {
  totalQuizzes: number;
  totalQuestions: number;
  totalTimeSaved: number;
}

export interface WeeklyActivity {
  name: string;
  quizzes: number;
}

export interface RecentQuiz {
  id: string;
  title: string;
  subject: string;
  questionCount: number;
  createdAt: string;
}

export interface SubjectData {
  subject: string;
  count: number;
  quizzes: number;
  questions: number;
  timeSaved: number;
  color: string;
}

export interface TopicDistribution {
  subject: string;
  count: number;
  percentage: number;
  color: string;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  achievements: unknown[];
}

export interface DashboardData {
  totalQuizzes: number;
  totalQuestions: number;
  totalTimeSaved: number;
  weeklyActivities: WeeklyActivity[];
  recentGeneratedQuizzes: RecentQuiz[];
  subjectSummary: SubjectData[];
  topicDistribution: TopicDistribution[];
  streakData: StreakData;
}

export interface DashboardResult {
  userName: string;
  dashboardData: DashboardData;
}
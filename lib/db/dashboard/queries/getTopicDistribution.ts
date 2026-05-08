import prisma from "@/lib/db";
import type { SubjectData, TopicDistribution } from "../types";

const CHART_COLORS = ["#6366F1", "#EC4899", "#FBBF24", "#10B981", "#3B82F6"];

export async function getSubjectData(userId: string): Promise<SubjectData[]> {
  const subjectSummary = await prisma.quiz.groupBy({
    by: ["subject"],
    where: { userId },
    _count: { _all: true },
    _sum: { questionCount: true, timeSaved: true },
  });

  return subjectSummary.map((item, index) => ({
    subject: item.subject,
    count: item._count._all,
    quizzes: item._sum.questionCount ?? 0,
    questions: item._sum.questionCount ?? 0,
    timeSaved: item._sum.timeSaved ?? 0,
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));
}

export async function getTopicDistribution(userId: string): Promise<TopicDistribution[]> {
  const subjectData = await getSubjectData(userId);

  const sortedSubjects = [...subjectData].sort((a, b) => b.count - a.count).slice(0, 5);

  const totalCount = sortedSubjects.reduce((sum, s) => sum + s.count, 0);

  return sortedSubjects.map((item) => ({
    subject: item.subject,
    count: item.count,
    percentage: totalCount > 0 ? Math.round((item.count / totalCount) * 100) : 0,
    color: item.color,
  }));
}
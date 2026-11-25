"use client";

import { DashboardHeader } from "./DashboardHeader";
import { DashboardStats } from "./DashboardStats";
import { ActivityChart } from "./ActivityChart";
import { TopicProgressBars } from "./TopicProgressBars";
import { RecentQuizzes } from "./RecentQuizzes";
import type { DashboardProps } from "./types";

export function Dashboard({ userName, dashboardData }: DashboardProps) {
  return (
    <div className="min-h-screen w-full px-4 py-8 md:px-8 md:py-12">
      <div className="mx-auto max-w-6xl space-y-10">
        <DashboardHeader userName={userName} />

        <DashboardStats dashboardData={dashboardData} />

        <ActivityChart weeklyActivities={dashboardData.weeklyActivities} />

        <TopicProgressBars subjectSummary={dashboardData.subjectSummary} />

        <RecentQuizzes recentQuizzes={dashboardData.recentGeneratedQuizzes} />
      </div>
    </div>
  );
}

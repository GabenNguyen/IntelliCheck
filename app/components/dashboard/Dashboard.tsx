"use client";

import { DashboardHeader } from "./DashboardHeader";
import { DashboardStats } from "./DashboardStats";
import { ActivityChart } from "./ActivityChart";
import { TopicPieChart } from "./TopicPieChart";
import { TopicProgressBars } from "./TopicProgressBars";
import { RecentQuizzes } from "./RecentQuizzes";
import type { DashboardProps } from "./types";

export function Dashboard({ userName, dashboardData }: DashboardProps) {
  return (
    <div className="min-h-screen w-full p-4 md:p-8 lg:p-12 bg-background font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader userName={userName} />
        
        <DashboardStats dashboardData={dashboardData} />

        <div className="grid gap-6 lg:grid-cols-2">
          <ActivityChart weeklyActivities={dashboardData.weeklyActivities} />
          <TopicPieChart topicDistribution={dashboardData.topicDistribution} />
        </div>

        <TopicProgressBars subjectSummary={dashboardData.subjectSummary} />

        <RecentQuizzes recentQuizzes={dashboardData.recentGeneratedQuizzes} />
      </div>
    </div>
  );
}
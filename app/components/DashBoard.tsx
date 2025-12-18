"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Activity, Sparkles, Clock, Layers } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  TooltipContentProps,
} from "recharts";
import Link from "next/link";
import formatRelativeTime from "@/utils/format_time";

interface DashboardData {
  totalQuizzes: number;
  totalQuestions: number;
  totalTimeSaved: number;
  weeklyActivities: { name: string; quizzes: number }[];
  recentGeneratedQuizzes: {
    id: string;
    title: string;
    subject: string;
    questionCount: number;
    createdAt: string;
  }[];
  subjectSummary: {
    subject: string;
    count: number;
    quizzes: number;
    questions: number;
    timeSaved: number;
    color: string;
  }[];
}

const CustomTooltip = ({
  active,
  payload,
}: TooltipContentProps<string | number, string>) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-gray-200 bg-white/90 px-4 py-2 shadow-xl backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        {payload[0].payload.name}
      </p>
      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
        {payload[0].value} quizzes
      </p>
    </div>
  );
};

function Dashboard({
  userName,
  dashboardData,
}: {
  userName: string;
  dashboardData: DashboardData;
}) {
  return (
    <div className="relative w-full space-y-12 p-8">
      {/* PAGE HEADER */}
      <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-primary">
            Welcome back, {userName}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Here&apos;s your learning progress so far
          </p>
        </div>

        <Link href="/quiz">
          <Button className="cursor-pointer h-14 gap-2 rounded-xl px-8 text-lg font-bold shadow-lg active:scale-95 hover:bg-gray-400">
            <Plus className="h-5 w-5" />
            Create Quiz
          </Button>
        </Link>
      </section>

      {/* STATS */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl bg-white/80 backdrop-blur shadow-lg dark:bg-gray-900/70">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
              <Sparkles />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Quizzes</p>
              <p className="text-3xl font-bold">{dashboardData.totalQuizzes}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-white/80 backdrop-blur shadow-lg dark:bg-gray-900/70">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-purple-500/10 p-3 text-purple-600 dark:text-purple-400">
              <Layers />
            </div>
            <div>
              <p className="text-sm text-gray-500">Questions Generated</p>
              <p className="text-3xl font-bold">
                {dashboardData.totalQuestions}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-white/80 backdrop-blur shadow-lg dark:bg-gray-900/70">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-pink-500/10 p-3 text-pink-600 dark:text-pink-400">
              <Clock />
            </div>
            <div>
              <p className="text-sm text-gray-500">
                Est. Total Time Saved From Auto-Generated
              </p>
              <p className="text-3xl font-bold">
                {dashboardData.totalTimeSaved} min(s)
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* TOP SUBJECTS TABLE */}
      <section>
        <Card className="rounded-2xl bg-white/80 dark:bg-gray-900/70 shadow-lg">
          <CardHeader>
            <CardTitle>Top Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.subjectSummary.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  {/* Subject Name */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.subject}</span>
                  </div>

                  {/* Count + progress bar */}
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item.count} quizzes
                    </span>
                    <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${
                            (item.count /
                              Math.max(
                                ...dashboardData.subjectSummary.map(
                                  (s) => s.count
                                )
                              )) *
                            100
                          }%`,
                          backgroundColor: item.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ACTIVITY */}
      <section>
        <Card className="rounded-3xl bg-white/80 backdrop-blur shadow-xl dark:bg-gray-900/70">
          <CardHeader className="flex flex-row items-center gap-3 border-b border-gray-200 dark:border-gray-800">
            <div className="rounded-xl bg-blue-600/10 p-2 text-blue-600 dark:text-blue-400">
              <Activity />
            </div>
            <CardTitle>This Week’s Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px] pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.weeklyActivities}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={CustomTooltip} />
                <Bar dataKey="quizzes" radius={[10, 10, 0, 0]} fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* RECENT QUIZZES */}
      <section>
        <h2 className="mb-4 text-2xl font-bold">Recent Quizzes</h2>
        {dashboardData.recentGeneratedQuizzes.length === 0 ? (
          <Card className="rounded-2xl p-10 text-center text-gray-500">
            No quizzes yet. Create your first one 🚀
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {dashboardData.recentGeneratedQuizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="group rounded-2xl bg-white/80 backdrop-blur shadow-md transition hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900/70"
              >
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                    {quiz.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                  {quiz.questionCount} questions ·{" "}
                  {formatRelativeTime(quiz.createdAt)}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;

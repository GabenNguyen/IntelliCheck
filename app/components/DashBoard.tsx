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
    <div className="rounded-xl border border-gray-200 bg-white/90 px-4 py-2 shadow-lg backdrop-blur dark:border-gray-800 dark:bg-gray-950/90">
      <p className="text-sm font-semibold text-gray-900 dark:text-white">
        {payload[0].payload.name}
      </p>
      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
    <div className="relative w-full space-y-12 p-8 bg-gray-50 dark:bg-gray-950">
      {/* PAGE HEADER */}
      <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Welcome back, {userName}!
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Here&apos;s your learning progress so far
          </p>
        </div>

        <Link href="/quiz">
          <Button className="cursor-pointer h-14 gap-2 rounded-xl px-8 text-lg font-bold bg-gray-800 text-white shadow-md hover:bg-gray-700 active:scale-95 transition-all">
            <Plus className="h-5 w-5" />
            Create Quiz
          </Button>
        </Link>
      </section>

      {/* STATS */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl bg-white/90 backdrop-blur shadow-md dark:bg-gray-900/80">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-gray-200/50 p-3 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200">
              <Sparkles />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Quizzes</p>
              <p className="text-3xl font-bold">{dashboardData.totalQuizzes}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-white/90 backdrop-blur shadow-md dark:bg-gray-900/80">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-gray-200/50 p-3 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200">
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

        <Card className="rounded-2xl bg-white/90 backdrop-blur shadow-md dark:bg-gray-900/80">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-xl bg-gray-200/50 p-3 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200">
              <Clock />
            </div>
            <div>
              <p className="text-sm text-gray-500">Est. Time Saved</p>
              <p className="text-3xl font-bold">
                {dashboardData.totalTimeSaved} min
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* TOP SUBJECTS TABLE */}
      <section>
        <Card className="rounded-2xl bg-white/90 dark:bg-gray-900/80 shadow-md">
          <CardHeader>
            <CardTitle>Top Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData.subjectSummary.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium">{item.subject}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
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
        <Card className="rounded-3xl bg-white/90 backdrop-blur shadow-lg dark:bg-gray-900/80">
          <CardHeader className="flex flex-row items-center gap-3 border-b border-gray-200 dark:border-gray-800">
            <div className="rounded-xl bg-gray-200/50 p-2 text-gray-800 dark:bg-gray-700/50 dark:text-gray-200">
              <Activity />
            </div>
            <CardTitle>This Week&apos;s Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[260px] pt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboardData.weeklyActivities}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="name" tickLine={true} axisLine={true} />
                <YAxis allowDecimals={false} tickLine={true} axisLine={true} />
                <Tooltip content={CustomTooltip} />
                <Bar
                  dataKey="quizzes"
                  radius={[10, 10, 0, 0]}
                  fill="#4B5563" // subtle gray-blue for modern feel
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* RECENT QUIZZES */}
      <section>
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
          Recent Quizzes
        </h2>
        {dashboardData.recentGeneratedQuizzes.length === 0 ? (
          <Card className="rounded-2xl p-10 text-center text-gray-500 dark:text-gray-400">
            No quizzes yet. Create your first one 🚀
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {dashboardData.recentGeneratedQuizzes.map((quiz) => (
              <Card
                key={quiz.id}
                className="group rounded-2xl bg-white/90 backdrop-blur shadow-md hover:-translate-y-1 hover:shadow-zinc-500 dark:bg-gray-900/80 transition-transform duration-300"
              >
                <CardHeader>
                  <CardTitle className="text-lg group-hover:text-gray-800 dark:group-hover:text-white transition-colors">
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

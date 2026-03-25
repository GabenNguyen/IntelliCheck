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
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-950/90 px-4 py-3 shadow-xl backdrop-blur-md">
      <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
        {payload[0].payload.name}
      </p>
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-zinc-100" />
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
    <div className="min-h-screen w-full p-4 md:p-8 lg:p-12 bg-zinc-50 dark:bg-zinc-950 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* PAGE HEADER */}
        <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Welcome back, {userName}
            </h1>
            <p className="mt-3 text-base md:text-lg text-zinc-500 dark:text-zinc-400 font-medium">
              Here&apos;s an overview of your learning progress.
            </p>
          </div>

          <Link href="/quiz">
            <Button className="h-12 md:h-14 px-6 md:px-8 rounded-xl text-base font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Quiz
            </Button>
          </Link>
        </section>

        {/* STATS */}
        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-[1.5rem] border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
            <CardContent className="flex items-center gap-6 p-6 md:p-8">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Quizzes</p>
                <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">{dashboardData.totalQuizzes}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.5rem] border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
            <CardContent className="flex items-center gap-6 p-6 md:p-8">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50">
                <Layers className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1">Questions</p>
                <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {dashboardData.totalQuestions}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.5rem] border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900 overflow-hidden">
            <CardContent className="flex items-center gap-6 p-6 md:p-8">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50">
                <Clock className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 tracking-wider uppercase mb-1 truncate">
                  Time Saved (min)
                </p>
                <p className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {dashboardData.totalTimeSaved}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* ACTIVITY */}
          <Card className="rounded-[2rem] border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900 w-full overflow-hidden flex flex-col">
            <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50 p-6 md:p-8">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-zinc-400" />
                <CardTitle className="text-xl text-zinc-800 dark:text-zinc-100 font-bold">Activity Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-6 md:p-8 min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.weeklyActivities} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e4e4e7" className="dark:stroke-zinc-800" strokeOpacity={0.5} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#71717a', fontSize: 13, fontWeight: 500 }} dy={10} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: '#71717a', fontSize: 13, fontWeight: 500 }} dx={-10} />
                  <Tooltip cursor={{ fill: 'transparent' }} content={CustomTooltip} />
                  <Bar
                    dataKey="quizzes"
                    radius={[6, 6, 0, 0]}
                    fill="currentColor"
                    className="fill-zinc-900 dark:fill-zinc-100"
                    maxBarSize={45}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* TOP SUBJECTS TABLE */}
          <Card className="rounded-[2rem] border-zinc-200/80 dark:border-zinc-800/80 shadow-sm bg-white dark:bg-zinc-900 w-full overflow-hidden">
            <CardHeader className="border-b border-zinc-100 dark:border-zinc-800/50 p-6 md:p-8">
              <CardTitle className="text-xl text-zinc-800 dark:text-zinc-100 font-bold">Top Subjects</CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="space-y-6">
                {dashboardData.subjectSummary.map((item, index) => (
                  <div key={index} className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3.5 h-3.5 rounded-full shadow-sm"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-semibold text-base text-zinc-900 dark:text-zinc-50">{item.subject}</span>
                      </div>
                      <span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                        {item.count} quizzes
                      </span>
                    </div>
                    <div className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
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
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RECENT QUIZZES */}
        <section className="pt-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Recent Quizzes
            </h2>
            {dashboardData.recentGeneratedQuizzes.length > 0 && (
              <Link href="/quiz-history" className="text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                View all history &rarr;
              </Link>
            )}
          </div>
          
          {dashboardData.recentGeneratedQuizzes.length === 0 ? (
            <Card className="rounded-[2rem] border-dashed border-2 border-zinc-200 dark:border-zinc-800 bg-transparent shadow-none">
              <CardContent className="p-12 text-center flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400">
                <p className="text-lg font-semibold mb-1">No quizzes yet</p>
                <p className="text-sm">Create your first quiz to see it here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dashboardData.recentGeneratedQuizzes.map((quiz) => (
                <Link key={quiz.id} href={`/quiz-history`} className="group outline-none block h-full">
                  <Card
                    className="rounded-[1.5rem] bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm group-hover:shadow-lg group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-all duration-300 h-full flex flex-col hover:-translate-y-1"
                  >
                    <CardHeader className="p-6 md:p-8 pb-4">
                      <CardTitle className="text-xl font-bold text-zinc-900 dark:text-zinc-50 line-clamp-2 leading-snug">
                        {quiz.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8 pt-0 mt-auto flex items-center justify-between text-sm">
                      <span className="px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-semibold tracking-wide flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100"></span>
                        {quiz.questionCount} Qs
                      </span>
                      <span className="text-zinc-400 dark:text-zinc-500 font-medium">
                        {formatRelativeTime(quiz.createdAt)}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;

"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Activity, Sparkles, Clock, Layers, TrendingUp, Brain, Terminal } from "lucide-react";
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
    <div className="rounded-xl border border-violet-500/30 dark:border-violet-500/30 bg-white/95 dark:bg-slate-900/95 px-4 py-3 shadow-xl backdrop-blur-md">
      <p className="text-sm font-bold text-slate-900 dark:text-white mb-1">
        {payload[0].payload.name}
      </p>
      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-400" />
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
    <div className="min-h-screen w-full p-4 md:p-8 lg:p-12 bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/20 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">
                Welcome back
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              Hello, {userName}
            </h1>
            <p className="mt-3 text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium">
              Ready to continue your learning journey? Let&apos;s generate some new quizzes.
            </p>
          </div>

          <Link href="/quiz">
            <Button className="h-12 md:h-14 px-6 md:px-8 rounded-xl text-base font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2">
              <Plus className="h-5 w-5" />
              New Quiz
            </Button>
          </Link>
        </section>

        <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="rounded-[1.5rem] border border-violet-500/20 shadow-lg shadow-violet-500/10 bg-white dark:bg-slate-900 overflow-hidden relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardContent className="flex items-center gap-6 p-6 md:p-8 relative">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-lg shadow-violet-500/30">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Quizzes</p>
                <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{dashboardData.totalQuizzes}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.5rem] border border-indigo-500/20 shadow-lg shadow-indigo-500/10 bg-white dark:bg-slate-900 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardContent className="flex items-center gap-6 p-6 md:p-8 relative">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30">
                <Layers className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1">Questions</p>
                <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {dashboardData.totalQuestions}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[1.5rem] border border-cyan-500/20 shadow-lg shadow-cyan-500/10 bg-white dark:bg-slate-900 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            <CardContent className="flex items-center gap-6 p-6 md:p-8 relative">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-lg shadow-cyan-500/30">
                <Clock className="w-7 h-7" />
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase mb-1 truncate">
                  Time Saved (min)
                </p>
                <p className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {dashboardData.totalTimeSaved}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-[2rem] border border-violet-500/20 shadow-lg shadow-violet-500/10 bg-white dark:bg-slate-900 w-full overflow-hidden flex flex-col relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500" />
            <CardHeader className="border-b border-violet-500/10 dark:border-violet-500/10 p-6 md:p-8">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                <CardTitle className="text-xl text-slate-800 dark:text-slate-100 font-bold">Activity Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-6 md:p-8 min-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.weeklyActivities} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e4e4e7" className="dark:stroke-slate-700" strokeOpacity={0.5} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#71717a', fontSize: 13, fontWeight: 500 }} dy={10} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: '#71717a', fontSize: 13, fontWeight: 500 }} dx={-10} />
                  <Tooltip cursor={{ fill: 'transparent' }} content={CustomTooltip} />
                  <Bar
                    dataKey="quizzes"
                    radius={[6, 6, 0, 0]}
                    fill="url(#gradient)"
                    maxBarSize={45}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="rounded-[2rem] border border-indigo-500/20 shadow-lg shadow-indigo-500/10 bg-white dark:bg-slate-900 w-full overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-500" />
            <CardHeader className="border-b border-indigo-500/10 dark:border-indigo-500/10 p-6 md:p-8">
              <CardTitle className="text-xl text-slate-800 dark:text-slate-100 font-bold flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Top Subjects
              </CardTitle>
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
                        <span className="font-semibold text-base text-slate-900 dark:text-white">{item.subject}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 bg-violet-100 dark:bg-violet-900/30 px-3 py-1 rounded-full">
                        {item.count} quizzes
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
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

        <section className="pt-2">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              Recent Quizzes
            </h2>
            {dashboardData.recentGeneratedQuizzes.length > 0 && (
              <Link href="/quiz-history" className="text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 transition-colors">
                View all history &rarr;
              </Link>
            )}
          </div>
          
          {dashboardData.recentGeneratedQuizzes.length === 0 ? (
            <Card className="rounded-[2rem] border-dashed border-2 border-violet-200 dark:border-violet-800 bg-transparent shadow-none">
              <CardContent className="p-12 text-center flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                <div className="h-16 w-16 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-4">
                  <Terminal className="w-8 h-8 text-violet-600 dark:text-violet-400" />
                </div>
                <p className="text-lg font-semibold mb-1">No quizzes yet</p>
                <p className="text-sm">Create your first quiz to see it here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {dashboardData.recentGeneratedQuizzes.map((quiz) => (
                <Link key={quiz.id} href={`/quiz-history`} className="group outline-none block h-full">
                  <Card
                    className="rounded-[1.5rem] bg-white dark:bg-slate-900 border border-violet-500/20 shadow-lg shadow-violet-500/10 group-hover:shadow-violet-500/20 transition-all duration-300 h-full flex flex-col hover:-translate-y-1"
                  >
                    <CardHeader className="p-6 md:p-8 pb-4">
                      <CardTitle className="text-xl font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                        {quiz.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 md:p-8 pt-0 mt-auto flex items-center justify-between text-sm">
                      <span className="px-3.5 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 font-semibold tracking-wide flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-600 dark:bg-violet-400"></span>
                        {quiz.questionCount} Qs
                      </span>
                      <span className="text-slate-400 dark:text-slate-500 font-medium">
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
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, BarChart3, Brain, Clock, Layers, TrendingUp, Sparkles } from "lucide-react";
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
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-sm">
      <p className="text-sm font-medium text-foreground">
        {payload[0].payload.name}
      </p>
      <p className="text-sm text-muted-foreground">
        {payload[0].value} quizzes
      </p>
    </div>
  );
};

const stats = [
  { key: "totalQuizzes", label: "Quizzes", icon: Sparkles, color: "bg-primary text-primary-foreground" },
  { key: "totalQuestions", label: "Questions", icon: Layers, color: "bg-secondary text-secondary-foreground" },
  { key: "totalTimeSaved", label: "Time Saved (min)", icon: Clock, color: "bg-muted text-muted-foreground" },
] as const;

function Dashboard({
  userName,
  dashboardData,
}: {
  userName: string;
  dashboardData: DashboardData;
}) {
  return (
    <div className="min-h-screen w-full p-4 md:p-8 lg:p-12 bg-background font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">
              Welcome back
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Hello, {userName}
            </h1>
            <p className="mt-2 text-muted-foreground">
              Ready to continue your learning journey?
            </p>
          </div>

          <Link href="/quiz">
            <Button className="h-11 px-6 rounded-lg font-medium flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Quiz
            </Button>
          </Link>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const value = dashboardData[stat.key as keyof DashboardData];
            return (
              <Card key={stat.key} className="border-border">
                <CardContent className="flex items-center gap-4 p-6">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {String(value)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-lg font-semibold">Activity Overview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-6 min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dashboardData.weeklyActivities} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} dy={10} />
                  <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
                  <Tooltip cursor={{ fill: 'transparent' }} content={CustomTooltip} />
                  <Bar dataKey="quizzes" radius={[4, 4, 0, 0]} fill="var(--primary)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Brain className="h-5 w-5 text-muted-foreground" />
                Top Subjects
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {dashboardData.subjectSummary.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="font-medium text-foreground">{item.subject}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {item.count} quizzes
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div
                        className="h-full rounded-full"
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

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-muted-foreground" />
              Recent Quizzes
            </h2>
            {dashboardData.recentGeneratedQuizzes.length > 0 && (
              <Link href="/quiz-history" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            )}
          </div>
          
          {dashboardData.recentGeneratedQuizzes.length === 0 ? (
            <Card className="border-dashed border-2 border-border">
              <CardContent className="p-12 text-center text-muted-foreground">
                <p className="font-medium mb-1">No quizzes yet</p>
                <p className="text-sm">Create your first quiz to see it here.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dashboardData.recentGeneratedQuizzes.map((quiz) => (
                <Link key={quiz.id} href="/quiz-history" className="block">
                  <Card className="h-full border-border hover:border-primary/50 transition-colors cursor-pointer">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base font-semibold line-clamp-2">
                        {quiz.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 flex items-center justify-between text-sm text-muted-foreground">
                      <span className="px-2 py-1 rounded bg-muted text-xs">
                        {quiz.questionCount} Qs
                      </span>
                      <span>{formatRelativeTime(quiz.createdAt)}</span>
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
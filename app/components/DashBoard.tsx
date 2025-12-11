"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid, Tooltip, TooltipContentProps } from "recharts";
import { Activity } from "lucide-react";
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
  
}

// custom tooltip for the activity chart, from Recharts
const CustomTooltip = ({ active, payload }: TooltipContentProps<string | number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-white px-3 py-2 shadow-md dark:bg-gray-950 dark:border-gray-800">
        <p className="text-sm font-semibold text-gray-900 dark:text-white">
          {payload[0].payload.name}
        </p>
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          {payload[0].value} {payload[0].value === 1 ? 'quiz' : 'quizzes'}
        </p>
      </div>
    );
  }
  return null;
};

function Dashboard( {userName, dashboardData } : {userName: string, dashboardData: DashboardData} ) {
  return (
    <div className="w-full p-6 space-y-8">
      {/* HEADER */}
      <section>
        <h1 className="text-3xl font-bold mb-4">
            {`Welcome, ${userName}!`}

        </h1>

        <div className="max-w-xs">
          <Link href="/quiz">
            <Button className="w-full h-20 text-lg gap-2 cursor-pointer">
              <Plus size={20} />
              Create Quiz
            </Button>
          </Link>
        </div>
      </section>

      {/* ANALYTICS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Quizzes</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{dashboardData.totalQuizzes}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Questions Generated</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{dashboardData.totalQuestions}</CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Time Saved</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold">{dashboardData.totalTimeSaved} minutes</CardContent>
        </Card>
      </section>

      {/* ACTIVITY CHART */}
     <section>
        <Card className="overflow-hidden border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200">
          
          <CardHeader className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 pb-4">
            <div className="flex items-center gap-3">
              {/* Icon badge */}
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-lg font-semibold">
                  This Week&apos;s Activity
                </CardTitle>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  Your quiz creation journey
                </p>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            
            <ResponsiveContainer width="100%" height={240}>
              <BarChart 
                data={dashboardData.weeklyActivities}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                {/* Grid lines for readability */}
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e5e7eb" 
                  className="dark:stroke-gray-700"
                  vertical={false}
                />
                
                
                <XAxis 
                  dataKey="name"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                />
                
                <YAxis 
                  allowDecimals={false}
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={false}
                />
                
                <Tooltip 
                  content={<CustomTooltip active={false} payload={[]} coordinate={undefined} accessibilityLayer={false} activeIndex={undefined} />} 
                  cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                />

                <Bar 
                  dataKey="quizzes"
                  fill="url(#colorGradient)"
                  radius={[8, 8, 0, 0]}
                  maxBarSize={50}
                />
                
                {/* Gradient definition */}
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* RECENT QUIZZES */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Recent Quizzes</h2>
        {dashboardData.recentGeneratedQuizzes.length === 0 ? (
          <Card className="p-6 text-center text-gray-500">
            No quizzes yet. Create your first quiz to get started!
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {dashboardData.recentGeneratedQuizzes.map((quiz) => (
              <Card key={quiz.id} className="hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="text-lg">{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 dark:text-gray-400">
                  {quiz.questionCount} questions • Created {formatRelativeTime(quiz.createdAt)}
                  
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard
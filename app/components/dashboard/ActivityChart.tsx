"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { BarChartTooltip } from "./charts/BarChartTooltip";
import type { WeeklyActivity } from "./types";

interface ActivityChartProps {
  weeklyActivities: WeeklyActivity[];
}

export function ActivityChart({ weeklyActivities }: ActivityChartProps) {
  const hasData = weeklyActivities.some((day) => day.quizzes > 0);

  return (
    <Card className="border-border">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-base font-semibold">Quizzes this week</CardTitle>
      </CardHeader>
      <CardContent className="h-64 pt-6">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyActivities} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis
                dataKey="name"
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                dy={10}
              />
              <YAxis
                allowDecimals={false}
                tickLine={false}
                axisLine={false}
                tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              />
              <Tooltip cursor={{ fill: "transparent" }} content={<BarChartTooltip />} />
              <Bar dataKey="quizzes" radius={[4, 4, 0, 0]} fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
            <p className="text-sm text-muted-foreground">No quizzes this week yet.</p>
            <Link href="/quiz" className="text-sm font-medium text-primary hover:underline">
              Start one
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

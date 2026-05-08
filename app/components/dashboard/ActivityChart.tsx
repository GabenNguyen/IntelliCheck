"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
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
  return (
    <Card className="border-border">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg font-semibold">Weekly Activity</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6 min-h-[280px]">
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
      </CardContent>
    </Card>
  );
}
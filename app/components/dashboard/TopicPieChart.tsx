"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PieChartTooltip, ChartLegend } from "./charts";
import type { TopicDistribution } from "./types";

interface TopicPieChartProps {
  topicDistribution: TopicDistribution[];
}

export function TopicPieChart({ topicDistribution }: TopicPieChartProps) {
  const hasData = topicDistribution.length > 0;

  return (
    <Card className="border-border">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Brain className="h-5 w-5 text-muted-foreground" />
          Top Topics
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 min-h-70">
        {!hasData ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p className="text-sm">No quiz data yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topicDistribution as unknown as { name: string; value: number }[]}
                dataKey="count"
                nameKey="subject"
                cx="50%"
                cy="45%"
                outerRadius={90}
                innerRadius={50}
                paddingAngle={3}
              >
                {topicDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<PieChartTooltip />} />
              <Legend content={<ChartLegend />} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
import { Card, CardContent } from "@/components/ui/card";
import { STATS_CONFIG, type StatConfig } from "./config";
import type { DashboardData } from "./types";

interface DashboardStatsProps {
  dashboardData: DashboardData;
}

export function DashboardStats({ dashboardData }: DashboardStatsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {STATS_CONFIG.map((stat) => {
        const Icon = stat.icon;
        const value = dashboardData[stat.key];
        return (
          <Card key={stat.key} className="border-border">
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${stat.colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{String(value)}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
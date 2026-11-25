import { Card, CardContent } from "@/components/ui/card";
import { STATS_CONFIG } from "./config";
import type { DashboardData } from "./types";

interface DashboardStatsProps {
  dashboardData: DashboardData;
}

export function DashboardStats({ dashboardData }: DashboardStatsProps) {
  return (
    <section className="grid gap-4 sm:grid-cols-3" aria-label="Quiz totals">
      {STATS_CONFIG.map((stat) => (
        <Card key={stat.key} className="border-border">
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-foreground">
              {String(dashboardData[stat.key])}
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

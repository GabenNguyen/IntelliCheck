interface PieChartTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { subject: string; percentage: number; count: number } }>;
}

export function PieChartTooltip({ active, payload }: PieChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-sm">
      <p className="text-sm font-medium text-foreground">{payload[0].payload.subject}</p>
      <p className="text-sm text-muted-foreground">
        {payload[0].payload.percentage}% ({payload[0].payload.count} quizzes)
      </p>
    </div>
  );
}
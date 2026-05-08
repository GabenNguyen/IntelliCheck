interface BarChartTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: { name: string; quizzes: number } }>;
}

export function BarChartTooltip({ active, payload }: BarChartTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 shadow-sm">
      <p className="text-sm font-medium text-foreground">{payload[0].payload.name}</p>
      <p className="text-sm text-muted-foreground">{payload[0].payload.quizzes} quizzes</p>
    </div>
  );
}
import type { LucideIcon } from "lucide-react";
import { Sparkles, Layers, Clock } from "lucide-react";

export interface StatConfig {
  key: keyof Pick<
    { totalQuizzes: number; totalQuestions: number; totalTimeSaved: number },
    "totalQuizzes" | "totalQuestions" | "totalTimeSaved"
  >;
  label: string;
  icon: LucideIcon;
  colorClass: string;
}

export const STATS_CONFIG: StatConfig[] = [
  {
    key: "totalQuizzes",
    label: "Quizzes",
    icon: Sparkles,
    colorClass: "bg-primary text-primary-foreground",
  },
  {
    key: "totalQuestions",
    label: "Questions",
    icon: Layers,
    colorClass: "bg-secondary text-secondary-foreground",
  },
  {
    key: "totalTimeSaved",
    label: "Time Saved (min)",
    icon: Clock,
    colorClass: "bg-muted text-muted-foreground",
  },
];

export const CHART_COLORS = ["#6366F1", "#EC4899", "#FBBF24", "#10B981", "#3B82F6"];
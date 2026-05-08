import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Brain } from "lucide-react";
import type { SubjectData } from "./types";

interface TopicProgressBarsProps {
  subjectSummary: SubjectData[];
}

export function TopicProgressBars({ subjectSummary }: TopicProgressBarsProps) {
  if (subjectSummary.length === 0) return null;

  const maxCount = Math.max(...subjectSummary.map((s) => s.count));

  return (
    <Card className="border-border">
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Brain className="h-5 w-5 text-muted-foreground" />
          Subject Distribution
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {subjectSummary.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-foreground">{item.subject}</span>
                </div>
                <span className="text-sm text-muted-foreground">{item.count} quizzes</span>
              </div>
              <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(item.count / maxCount) * 100}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
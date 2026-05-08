import Link from "next/link";
import { TrendingUp } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import formatRelativeTime from "@/utils/format_time";
import type { RecentQuiz } from "./types";

interface RecentQuizzesProps {
  recentQuizzes: RecentQuiz[];
}

export function RecentQuizzes({ recentQuizzes }: RecentQuizzesProps) {
  const isEmpty = recentQuizzes.length === 0;

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          Recent Quizzes
        </h2>
        {!isEmpty && (
          <Link href="/quiz-history" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        )}
      </div>

      {isEmpty ? (
        <Card className="border-dashed border-2 border-border">
          <CardContent className="p-12 text-center text-muted-foreground">
            <p className="font-medium mb-1">No quizzes yet</p>
            <p className="text-sm">Create your first quiz to see it here.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentQuizzes.map((quiz) => (
            <Link key={quiz.id} href="/quiz-history" className="block">
              <Card className="h-full border-border hover:border-primary/50 transition-colors cursor-pointer">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base font-semibold line-clamp-2">{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex items-center justify-between text-sm text-muted-foreground">
                  <span className="px-2 py-1 rounded bg-muted text-xs">{quiz.questionCount} Qs</span>
                  <span>{formatRelativeTime(quiz.createdAt)}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
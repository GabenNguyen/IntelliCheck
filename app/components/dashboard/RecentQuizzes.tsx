import Link from "next/link";
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
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-base font-semibold text-foreground">Recent quizzes</h2>
        {!isEmpty && (
          <Link href="/quiz-history" className="text-sm font-medium text-primary hover:underline">
            View all
          </Link>
        )}
      </div>

      {isEmpty ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
            <p className="text-sm font-medium text-foreground">No quizzes yet</p>
            <p className="text-sm text-muted-foreground">Create one to see it here.</p>
            <Link href="/quiz" className="text-sm font-medium text-primary hover:underline">
              Create a quiz
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {recentQuizzes.map((quiz) => (
            <Link key={quiz.id} href="/quiz-history" className="block rounded-lg">
              <Card className="h-full border-border transition-colors hover:bg-muted/40">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium leading-snug">{quiz.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-3 pt-0 text-xs text-muted-foreground">
                  <span className="tabular-nums">{quiz.questionCount} questions</span>
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

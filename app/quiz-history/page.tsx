"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { fetchQuizHistoryData } from "@/lib/db/quiz_history";
import QuizHistory from "../components/quiz_related/QuizHistory";
import { useState, useEffect } from "react";

type QuizHistoryData = {
  data: Array<{
    id: string;
    title: string;
    subject: string;
    description: string | null;
    questionCount: number;
    timeSaved: number;
    createdAt: Date;
  }>;
  totalCount: number;
  currentPage: number;
  totalPages: number;
};

const emptyData: QuizHistoryData = {
  data: [],
  totalCount: 0,
  currentPage: 1,
  totalPages: 0,
};

export default function QuizHistoryPage() {
  const [quizData, setQuizData] = useState<QuizHistoryData>(emptyData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadQuizHistory = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      setQuizData(await fetchQuizHistoryData(page, 9));
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setQuizData(emptyData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuizHistory();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <p className="text-sm text-muted-foreground" role="status">Loading quiz history…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Couldn&apos;t load quiz history</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <button
            onClick={() => loadQuizHistory()}
            className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Quiz history</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Quizzes you have generated, with their topics and question counts.
        </p>

        {quizData.totalCount === 0 ? (
          <div className="mt-10 rounded-lg border border-dashed border-border p-12 text-center">
            <p className="text-sm font-medium text-foreground">You haven&apos;t created any quizzes yet.</p>
            <p className="mt-1 text-sm text-muted-foreground">Create one to start building your history.</p>
            <Link
              href="/quiz"
              className="mt-5 inline-flex rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Create a quiz
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quizData.data.map((quiz) => (
                <QuizHistory key={quiz.id} {...quiz} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-5">
              <p className="text-sm text-muted-foreground tabular-nums">
                Showing {(quizData.currentPage - 1) * 9 + 1}–
                {Math.min(quizData.currentPage * 9, quizData.totalCount)} of {quizData.totalCount}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => loadQuizHistory(quizData.currentPage - 1)}
                  disabled={quizData.currentPage === 1}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-muted disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <span className="px-2 text-sm text-muted-foreground tabular-nums">
                  {quizData.currentPage} / {quizData.totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => loadQuizHistory(quizData.currentPage + 1)}
                  disabled={quizData.currentPage === quizData.totalPages}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm transition-colors hover:bg-muted disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

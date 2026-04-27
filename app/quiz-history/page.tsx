"use client";

import { fetchQuizHistoryData } from "@/lib/db/quiz_history";
import QuizHistory from "../components/quiz_related/QuizHistory";
import { useState, useEffect } from "react";

export default function QuizHistoryPage() {
  const [quizData, setQuizData] = useState<{
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
  }>({
    data: [],
    totalCount: 0,
    currentPage: 1,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadQuizHistory();
  }, []);

  const loadQuizHistory = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchQuizHistoryData(page, 9);
      setQuizData(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      setQuizData({
        data: [],
        totalCount: 0,
        currentPage: 1,
        totalPages: 0
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 font-sans flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-pulse rounded-full bg-zinc-400/30 dark:bg-zinc-600/30 w-12 h-12 mb-4"></div>
          <p className="text-zinc-500 dark:text-zinc-400">Loading quiz history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 font-sans flex items-center justify-center">
        <div className="text-center">
          <span className="inline-block text-4xl mb-4 opacity-50">⚠️</span>
          <p className="text-zinc-500 dark:text-zinc-400">Error loading quiz history</p>
          <p className="text-zinc-400 dark:text-zinc-500 mt-2 max-w-xl">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-6 md:p-12 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Quiz History
          </h1>
          <p className="mt-4 text-lg md:text-xl text-zinc-500 dark:text-zinc-400 font-medium">
            Review your past quizzes and achievements.
          </p>
        </div>

        {/* Empty State */}
        {quizData.totalCount === 0 ? (
          <div className="flex items-center justify-center p-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-4xl bg-zinc-50/50 dark:bg-zinc-900/50 h-100">
            <div className="text-center flex flex-col items-center">
              <span className="text-4xl mb-4 opacity-50">📚</span>
              <p className="text-zinc-500 text-xl font-semibold dark:text-zinc-400">
                You haven&apos;t created any quizzes yet.
              </p>
              <p className="text-zinc-400 dark:text-zinc-500 mt-2">
                Head over to the dashboard to generate your first quiz!
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              {quizData.data.map((quiz) => (
                <QuizHistory key={quiz.id} {...quiz} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-50 dark:bg-zinc-900/20 rounded-xl border border-zinc-200 dark:border-zinc-800/20">
              <div className="flex items-center gap-2 text-sm font-mono text-zinc-500 dark:text-zinc-400">
                Showing {quizData.currentPage > 1 ? ((quizData.currentPage - 1) * 9 + 1) : 1}-{Math.min(quizData.currentPage * 9, quizData.totalCount)} of {quizData.totalCount} quizzes
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (quizData.currentPage > 1) {
                      loadQuizHistory(quizData.currentPage - 1);
                    }
                  }}
                  disabled={quizData.currentPage === 1}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/30 dark:bg-zinc-700/30 text-xs font-semibold text-zinc-300 dark:text-zinc-400 border border-zinc-700/30 dark:border-zinc-600/40 hover:bg-zinc-700/40 dark:hover:bg-zinc-600/30 transition-all duration-200 font-mono"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900"></span>
                  Previous
                </button>

                <span className="px-2 py-0.5 rounded bg-zinc-800/30 dark:bg-zinc-700/30 text-xs font-mono">
                  {quizData.currentPage} / {quizData.totalPages}
                </span>

                <button
                  onClick={() => {
                    if (quizData.currentPage < quizData.totalPages) {
                      loadQuizHistory(quizData.currentPage + 1);
                    }
                  }}
                  disabled={quizData.currentPage === quizData.totalPages}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/30 dark:bg-zinc-700/30 text-xs font-semibold text-zinc-300 dark:text-zinc-400 border border-zinc-700/30 dark:border-zinc-600/40 hover:bg-zinc-700/40 dark:hover:bg-zinc-600/30 transition-all duration-200 font-mono"
                >
                  Next
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900"></span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

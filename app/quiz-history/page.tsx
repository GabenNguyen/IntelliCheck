import { fetchQuizHistoryData } from "@/lib/db/quiz_history";
import QuizHistory from "../components/quiz_related/QuizHistory";

export default async function QuizHistoryPage() {
  const quizzes = await fetchQuizHistoryData();

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
        {quizzes.length === 0 ? (
          <div className="flex items-center justify-center p-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[2rem] bg-zinc-50/50 dark:bg-zinc-900/50 h-[400px]">
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quizzes.map((quiz) => (
              <QuizHistory key={quiz.id} {...quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

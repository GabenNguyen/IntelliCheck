import { fetchQuizHistoryData } from "@/lib/db/quiz_history";
import QuizHistory from "../components/quiz_related/QuizHistory";

export default async function QuizHistoryPage() {
  const quizzes = await fetchQuizHistoryData();

  return (
    <div className="min-h-screen bg-linear-to-b from-indigo-50 via-white to-indigo-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 p-8">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-extrabold mb-12 text-center text-indigo-700 dark:text-indigo-300">
        📚 Your Quiz History
      </h1>

      {/* Empty State */}
      {quizzes.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10 dark:text-gray-400">
          You haven&apos;t created any quizzes yet.
        </p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <QuizHistory key={quiz.id} {...quiz} />
          ))}
        </div>
      )}
    </div>
  );
}

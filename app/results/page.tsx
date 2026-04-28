"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle2, XCircle, BrainCircuit, Sparkles, Award } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Answer from "@/type/answer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { updateStreakAchievement } from "@/lib/db/streak_actions";

import AchievementUnlocked from "../components/AchievementUnlocked";

import type { Achievement } from "@/utils/achievements";

// Custom Circular Progress for score
const ScoreRing = ({ percentage }: { percentage: number }) => {
  const strokeWidth = 8;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-40 h-40 mx-auto">
      <svg className="transform -rotate-90 w-40 h-40" viewBox="0 0 140 140">
        <circle
          className="text-zinc-200 dark:text-zinc-800"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="70"
          cy="70"
        />
        <motion.circle
          className="text-indigo-500"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="70"
          cy="70"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-4xl font-bold text-zinc-900 dark:text-white">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
};

export default function ResultPage() {
  const EXPIRY_TIME = 5 * 60 * 1000;

  const [quizData, setQuizData] = useState<{
    topic: string;
    finalScore: number;
    totalQuestion: number;
    userAnswers: Answer[];
  } | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("quizData");
      if (storedData && storedData !== "{}") {
        const parsedData = JSON.parse(storedData);
        if (Date.now() - parsedData.savedAt > EXPIRY_TIME) {
          localStorage.removeItem("quizData");
          setQuizData(null);
        } else {
          setQuizData(parsedData);
        }
      }
    } catch {
      setQuizData(null);
    }
    setIsLoaded(true);
  }, [EXPIRY_TIME]);

  useEffect(() => {
    if (!quizData) return;

    const wrongAnswers = quizData.userAnswers
      .map((answer, originalIndex) => ({ ...answer, originalIndex }))
      .filter((answer) => answer.userAnswer !== answer.correctAnswer && !answer.explanation);

    wrongAnswers.forEach(async (wrongAnswer) => {
      try {
        const response = await fetch("/api/generate-explanation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: wrongAnswer.question,
            userSelectedAnswer: wrongAnswer.userAnswer,
            correctAnswer: wrongAnswer.correctAnswer,
          }),
        });

        const outputData = await response.json();

        setQuizData((prev) => {
          if (!prev) return prev;
          const updatedAnswers = [...prev.userAnswers];
          updatedAnswers[wrongAnswer.originalIndex] = {
            ...updatedAnswers[wrongAnswer.originalIndex],
            explanation: outputData.outputExplanation,
          };
          return { ...prev, userAnswers: updatedAnswers };
        });
      } catch {
        toast.error("Failed to generate explanation for some questions.");
      }
    });
    // We only want to trigger this when the userAnswers array length changes in a meaningful way
    // or when the quizData is first loaded.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizData?.userAnswers.length]);

  useEffect(() => {
    if (quizData && isLoaded) {
      const percentage = (finalScore / totalQuestion) * 100;
      updateStreakAchievement(percentage).then((result) => {
        if (result.newAchievements.length > 0) {
          setUnlockedAchievement(result.newAchievements[0]);
        }
      });
    }
  }, [quizData, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="w-8 h-8 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin"></div>
      </div>
    );
  }



  if (!quizData || quizData.totalQuestion === 0) {
    return (
      <main className="relative flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-lg w-full p-8 md:p-12 text-center bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl"
        >
          <div className="mx-auto w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
            <BrainCircuit className="w-8 h-8 text-zinc-400" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-3">No Results Found</h1>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
            Looks like you haven&apos;t completed any quizzes recently, or your session has expired. Ready to test your knowledge?
          </p>
          <Link href="/quiz" className="inline-block w-full">
            <button className="group w-full relative h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] transition-all hover:shadow-[0_0_60px_-15px_rgba(79,70,229,0.7)] flex items-center justify-center gap-2 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                Return to Quiz
              </span>
            </button>
          </Link>
        </motion.div>
      </main>
    );
  }

  const { topic, finalScore, totalQuestion, userAnswers } = quizData;
  const percentage = totalQuestion > 0 ? (finalScore / totalQuestion) * 100 : 0;

  let performanceMessage = "Good effort!";
  if (percentage === 100) performanceMessage = "Perfect Score!";
  else if (percentage >= 80) performanceMessage = "Outstanding Work!";
  else if (percentage >= 60) performanceMessage = "Well Done!";

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 py-12 px-4 sm:px-6 relative overflow-hidden">

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-96 bg-linear-to-b from-indigo-500/10 to-transparent dark:from-indigo-500/5" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">

        {/* Header / Score Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-zinc-900 rounded-3xl p-8 sm:p-10 border border-zinc-200 dark:border-zinc-800 shadow-xl text-center relative overflow-hidden"
        >
          {/* Subtle glow behind score */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 text-sm font-medium mb-8">
            <Award className="w-4 h-4 text-indigo-500" />
            <span className="uppercase tracking-wider">{topic}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-8">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-500">
              {performanceMessage}
            </span>
          </h1>

          <ScoreRing percentage={percentage} />

          <p className="mt-8 text-lg font-medium text-zinc-600 dark:text-zinc-400">
            You correctly answered <span className="text-zinc-900 dark:text-white font-bold">{finalScore}</span> out of <span className="text-zinc-900 dark:text-white font-bold">{totalQuestion}</span> questions.
          </p>
        </motion.div>

        {/* Detailed Answers Section */}
        <div className="space-y-6">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold px-2 py-4 border-b border-zinc-200 dark:border-zinc-800"
          >
            Review Your Answers
          </motion.h2>

          <div className="space-y-6">
            {userAnswers.map((answer, i) => {
              const isCorrect = answer.userAnswer === answer.correctAnswer;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i + 0.4 }}
                  className={`relative p-6 sm:p-8 rounded-3xl border overflow-hidden ${isCorrect
                    ? "bg-green-50/50 dark:bg-green-950/20 border-green-200 dark:border-green-900/50"
                    : "bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50"
                    }`}
                >
                  {/* Decorative faint icon */}
                  <div className="absolute -right-6 -top-6 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
                    {isCorrect ? <CheckCircle2 className="w-40 h-40" /> : <XCircle className="w-40 h-40" />}
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 mt-1">
                        {isCorrect ? (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400">
                            <CheckCircle2 className="h-5 w-5" />
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-400">
                            <XCircle className="h-5 w-5" />
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-4">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">Question {i + 1}</p>
                          <p className="text-lg font-medium text-zinc-900 dark:text-zinc-100 leading-relaxed">
                            {answer.question}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4">
                          <div className="space-y-1 relative pr-4">
                            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Your Answer</p>
                            <p className={`font-medium ${isCorrect ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400 line-through decoration-red-500/50"
                              }`}>
                              {answer.userAnswer}
                            </p>
                          </div>

                          {!isCorrect && (
                            <div className="space-y-1">
                              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Correct Answer</p>
                              <p className="font-medium text-green-700 dark:text-green-400">
                                {answer.correctAnswer}
                              </p>
                            </div>
                          )}
                        </div>

                        {!isCorrect && (
                          <div className="mt-6 pt-6 border-t border-red-200/50 dark:border-red-900/30">
                            <div className="flex items-center gap-2 mb-3">
                              <Sparkles className="w-4 h-4 text-indigo-500" />
                              <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">AI Explanation</span>
                            </div>
                            <div className="text-sm text-zinc-700 dark:text-zinc-300 bg-white/50 dark:bg-black/20 p-4 rounded-xl leading-relaxed">
                              {answer.explanation ? (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                >
                                  {answer.explanation}
                                </motion.div>
                              ) : (
                                <div className="flex items-center gap-2 text-zinc-500">
                                  <div className="w-3 h-3 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
                                  Generating insights...
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
        {unlockedAchievement && (
          <AchievementUnlocked
            achievement={unlockedAchievement}
            onClose={() => setUnlockedAchievement(null)}
          />
        )}
        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 pb-16"
        >
          <Button asChild size="lg" className="rounded-full px-8 h-14 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg w-full sm:w-auto">
            <Link href="/quiz">
              Take Another Quiz
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full px-8 h-14 border-zinc-200 hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900 w-full sm:w-auto">
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}

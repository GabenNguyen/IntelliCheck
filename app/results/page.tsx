"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle2, XCircle, Sparkles, Award } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import Answer from "@/type/answer";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { updateStreakAchievement } from "@/lib/db/streak_actions";

import AchievementUnlocked from "../components/AchievementUnlocked";

import type { Achievement } from "@/utils/achievements";

const ScoreRing = ({ percentage }: { percentage: number }) => {
  const strokeWidth = 8;
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-36 h-36 mx-auto">
      <svg className="transform -rotate-90 w-36 h-36" viewBox="0 0 120 120">
        <circle
          className="text-muted"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
        />
        <motion.circle
          className="text-primary"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="60"
          cy="60"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        />
      </svg>
      <div className="absolute">
        <span className="text-3xl font-bold text-foreground">
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
  }, [quizData?.userAnswers.length]);

  useEffect(() => {
    if (quizData && isLoaded) {
      const percentage = (quizData.finalScore / quizData.totalQuestion) * 100;
      updateStreakAchievement(percentage).then((result) => {
        if (result.newAchievements.length > 0) {
          setUnlockedAchievement(result.newAchievements[0]);
        }
      });
    }
  }, [quizData, isLoaded]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!quizData || quizData.totalQuestion === 0) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-6 bg-background">
        <Card className="max-w-lg w-full p-8 text-center border-border">
          <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4">
            <Award className="w-7 h-7 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">No Results Found</h1>
          <p className="text-muted-foreground mb-6">
            Looks like you haven't completed any quizzes recently, or your session has expired.
          </p>
          <Link href="/quiz" className="block">
            <Button className="w-full rounded-lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Quiz
            </Button>
          </Link>
        </Card>
      </main>
    );
  }

  const { topic, finalScore, totalQuestion, userAnswers } = quizData;
  const percentage = totalQuestion > 0 ? (finalScore / totalQuestion) * 100 : 0;

  let performanceMessage = "Good effort!";
  if (percentage === 100) performanceMessage = "Perfect Score!";
  else if (percentage >= 80) performanceMessage = "Outstanding!";
  else if (percentage >= 60) performanceMessage = "Well Done!";

  return (
    <main className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground mb-6">
            <Award className="w-4 h-4" />
            <span>{topic}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold mb-6">
            {performanceMessage}
          </h1>

          <ScoreRing percentage={percentage} />

          <p className="mt-6 text-muted-foreground">
            You correctly answered <span className="font-semibold text-foreground">{finalScore}</span> out of <span className="font-semibold text-foreground">{totalQuestion}</span> questions.
          </p>
        </motion.div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold px-2">
            Review Your Answers
          </h2>

          <div className="space-y-4">
            {userAnswers.map((answer, i) => {
              const isCorrect = answer.userAnswer === answer.correctAnswer;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className={`p-5 rounded-xl border ${
                    isCorrect
                      ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-900"
                      : "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-0.5">
                      {isCorrect ? (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50 text-green-600">
                          <CheckCircle2 className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50 text-red-600">
                          <XCircle className="h-4 w-4" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 space-y-3">
                      <div>
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Question {i + 1}</p>
                        <p className="text-foreground mt-1 leading-relaxed">
                          {answer.question}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-2">
                        <div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Your Answer</p>
                          <p className={`font-medium ${
                            isCorrect ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400 line-through"
                          }`}>
                            {answer.userAnswer}
                          </p>
                        </div>

                        {!isCorrect && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Correct Answer</p>
                            <p className="font-medium text-green-700 dark:text-green-400">
                              {answer.correctAnswer}
                            </p>
                          </div>
                        )}
                      </div>

                      {!isCorrect && (
                        <div className="pt-4 mt-4 border-t border-border">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            <span className="text-sm font-semibold">AI Explanation</span>
                          </div>
                          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg leading-relaxed">
                            {answer.explanation ? (
                              <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                              >
                                {answer.explanation}
                              </motion.div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                                <span>Generating insights...</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <Button asChild size="lg" className="rounded-lg w-full sm:w-auto">
            <Link href="/quiz">
              Take Another Quiz
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-lg w-full sm:w-auto">
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </main>
  );
}
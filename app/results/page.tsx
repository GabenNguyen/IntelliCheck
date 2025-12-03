"use client";
import { useState, useEffect } from 'react';
import { ArrowLeft } from "lucide-react";
import { toast } from 'sonner';
import Link from "next/link";
import Answer from '@/type/answer';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function ResultPage() {

  const EXPIRY_TIME = 5 * 60 * 1000;

  const [quizData, setQuizData] = useState<{
    topic: string,
    finalScore: number,
    totalQuestion: number,
    userAnswers: Answer[]
  } | null>(() => {
      
    const storedData = localStorage.getItem("quizData");
    if(!storedData || storedData === "{}") return null;

    const parsedData = JSON.parse(storedData);

    if(Date.now() - parsedData.savedAt > EXPIRY_TIME) {
      localStorage.removeItem("quizData");
      return null;
    }

    return parsedData
      
  });

  // Fetch explanations for wrong answers (only once)
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
        toast.error("Failed to generate explanation!");
      }
    });
  }, [quizData]);

  if (!quizData || quizData.totalQuestion === 0) {
    return (
      <div className="flex justify-center items-start min-h-screen bg-linear-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black p-6">
        <Card className="w-full max-w-lg shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
          <CardHeader className="text-center space-y-3">
            <CardTitle className="text-4xl font-extrabold tracking-tight">
              You have not taken a quiz yet!
            </CardTitle>
            <CardDescription className="text-lg text-black dark:text-white">
              Please attend a quiz first and see your results here.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Link href="/quiz" className="flex items-center">
              <button className="group cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-2 border border-blue-500 hover:border-transparent rounded active:scale-90 transition-all flex items-center gap-2">
                <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 mx-1" />
                Return to Quiz Page
              </button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const { topic = "", finalScore = 0, totalQuestion = 0, userAnswers = [] } = quizData;
  const percentage = totalQuestion > 0 ? ((finalScore / totalQuestion) * 100).toFixed(2) : "0";

  return (
    <div className="flex justify-center items-start min-h-screen bg-linear-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black p-6">
      <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-4xl font-extrabold tracking-tight">
            Your final score!
          </CardTitle>
          <CardDescription className="text-lg text-black dark:text-white">
            You have correctly answered <span className='font-bold'>{finalScore}</span> out of <span className='font-bold'>{totalQuestion}</span> question(s) <br />
            Knowledge on <span className='font-bold'>{topic.toUpperCase()}</span>: <span className='font-bold'>{percentage}%</span>
          </CardDescription>
        </CardHeader>

        {/* Scrollable content for long questions */}
        <CardContent className="space-y-6 text-left max-h-[70vh] overflow-auto">
          {userAnswers.map((answer: Answer, idx: number) => {
            const isCorrect = answer.userAnswer === answer.correctAnswer;
            return (
              <div
                key={idx}
                className={`p-4 space-y-3 rounded-lg border ${isCorrect ? "bg-green-500 text-white" : "bg-red-700 text-white"}`}
              >
                <p className='font-semibold'>Question {idx + 1}: {answer.question}</p>
                <p className='font-semibold'>Your answer: {answer.userAnswer}</p>
                {!isCorrect && (
                  <div className='mt-2 space-y-3'>
                    <p className='font-semibold'>Correct Answer: {answer.correctAnswer}</p> <br></br>
                    <p className='font-semibold'>Explanation: {answer.explanation || "Loading explanation..."}</p>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>

        <CardFooter className="flex justify-center">
          <Link href="/quiz" className="flex items-center">
            <button className="cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-2 border border-blue-500 hover:border-transparent rounded active:scale-90 transition-all flex items-center">
              <ArrowLeft className="w-5 h-5 mx-1" />
              Try again
            </button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default ResultPage;

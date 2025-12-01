"use client";
import { useState, useEffect} from 'react';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Answer from '@/type/answer';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function ResultPage() {
    const [quizData, setQuizData] = useState<{
        topic: string,
        finalScore: number,
        totalQuestion: number,
        userAnswers: Answer[]
    } | null>(null)

    useEffect(() => {
      const checkExpiryInterval = setInterval(() => {
         const storedData = localStorage.getItem("quizData");
      
        if(!storedData || storedData === "{}") return;

        const parsedData = JSON.parse(storedData)

        // save the results in the local storage for 5 minutes
        const EXPIRY_TIME = 5 * 60 * 1000;

        if(Date.now() - Number(parsedData.savedAt) > EXPIRY_TIME) {
          localStorage.removeItem("quizData");
          setQuizData(null);
          window.location.reload();
        } else {
          setQuizData(parsedData);
        }

      }, 1000)
      
      return () => clearInterval(checkExpiryInterval);

    }, []);

    if(!quizData || quizData.totalQuestion === 0) {
      return (
        <div className="flex justify-center items-center w-full bg-linear-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black p-6">
          <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-4xl font-extrabold tracking-tight">
                You have not taken a quiz yet!
              </CardTitle>
              <CardDescription className="text-lg text-black dark:text-white">
                Please attend a quiz first and see your results here.
              </CardDescription>
            </CardHeader>
                <CardFooter className="flex justify-center">
                   <Link className="flex items-center" href={`/quiz`}> 
                      <button className="group cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-2 border border-blue-500 hover:border-transparent rounded active:scale-90 transition-all flex flex-row items-center gap-2">
                          <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 mx-1"/> 
                          <span>Return to Quiz Page </span>
                      </button>
                    </Link>
              </CardFooter> 
          </Card>
      </div>
      )
    }
    const { topic = "", finalScore = 0, totalQuestion = 0, userAnswers = []} = quizData || {};
    const percentage = totalQuestion > 0 ? (((finalScore / totalQuestion) * 100).toFixed(2)) : "0";

    return (
         <div className="flex justify-center items-center max-h-screen bg-linear-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black p-6">
            <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
              <CardHeader className="text-center space-y-3">
                <CardTitle className="text-4xl font-extrabold tracking-tight">
                  Your final score!
                </CardTitle>
                <CardDescription className="text-lg text-black dark:text-white">
                    You have correctly answered <span className='font-bold'>{finalScore} </span> out of <span className='font-bold'>{totalQuestion}</span> question(s) <br></br>
                    Knowledge on <span className='font-bold'>{topic?.toUpperCase()}</span>: <span className='font-bold'>{percentage}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-center text-lg">
                <div className='space-y-4'>
                  {userAnswers?.map((answer: Answer, answerIndex: number) => {
                    const isCorrect: boolean = answer.userAnswer === answer.correctAnswer;
                    return (
                      <div
                        key={answerIndex}
                        className={`p-4 rounded-lg border ${isCorrect ? `bg-green-500 text-white` : `bg-red-700 text-white` }`}
                      >
                        <p className='font-semibold'>Question {answerIndex + 1}: {answer.question}</p>
                        <p className='font-semibold'>Your answer: {answer.userAnswer}</p>

                        {!isCorrect && <p className='font-semibold'>Correct Answer: {answer.correctAnswer}</p>}
                      </div>
                    )
                  })}

                </div>
               <CardFooter className="flex justify-center">
                  <Link className="flex items-center" href={`/quiz`}> 
                      <button className="cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-2 border border-blue-500 hover:border-transparent rounded active:scale-90 transition-all flex items-center">
                        <ArrowLeft className="w-5 h-5 active:scale-90 transition-all duration-200 mx-1"/> 
                        Try again
                      </button>
                  </Link>
                </CardFooter>
            </CardContent>
          </Card>
      </div>
      )
    }

export default ResultPage
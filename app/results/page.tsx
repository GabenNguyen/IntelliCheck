"use client";
import React from 'react'
import { useState, useEffect} from 'react';
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function ResultPage() {
    const [finalScore, setFinalScore] = useState<number | 0>(0);
    const [totalQuestions, setTotalQuestions] = useState<number | 0>(0);
    const [selectedTopic, setSelectedTopic] = useState<string | null>("")

    useEffect(() => {
      setFinalScore(Number(localStorage.getItem("score")));
      setTotalQuestions(Number(localStorage.getItem("total")));
      setSelectedTopic(localStorage.getItem("topic"));
    }, [])

    return (
      <>
       {!finalScore && !totalQuestions ? (
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
      ) : (
           <div className="flex justify-center items-center max-h-screen bg-linear-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black p-6">
            <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
              <CardHeader className="text-center space-y-3">
                <CardTitle className="text-4xl font-extrabold tracking-tight">
                  Your final score!
                </CardTitle>
                <CardDescription className="text-lg text-black dark:text-white">
                    You have correctly answered <span className='font-bold'>{finalScore} </span> out of <span className='font-bold'>{totalQuestions}</span> question(s) <br></br>
                    Knowledge on <span className='font-bold'>{selectedTopic}</span>: <span className='font-bold'>{((finalScore / totalQuestions) * 100).toFixed(2)}%</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-center text-lg">
              <CardFooter className="flex justify-center">
                   <Link className="flex items-center" href={`/quiz`}> 
                      <button className="group cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-2 border border-blue-500 hover:border-transparent rounded active:scale-90 transition-all flex flex-row items-center gap-2">
                          <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 mx-1"/> 
                          <span>Return to Quiz Page </span>
                      </button>
                    </Link>
              </CardFooter>
            </CardContent>
          </Card>
      </div>
      )}
    )
      </>
    )
}

export default ResultPage
"use client";
import React from 'react'
import Question from '@/type/question'
import CountDown from '../components/CountDown';
import Answer from '@/type/answer';
import shuffleQuestions from '@/utils/shuffle';
import validateInput from '@/utils/validate_input';
import sampleQuestions from '@/utils/sample_questions';
import QuizSetup from '../components/QuizSetup';
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { Button } from '@/components/ui/button';
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

function QuizPage() {
    // Form state
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [showAsianAlert, setShowAsianAlert] = useState(false);
    const [numOfQuestions, setNumOfQuestions] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Quiz state
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [optionSelected, setOptionSelected] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0)
    const [quizFinished, setQuizFinished] = useState(false)
    const [showResultDialog, setShowResultDialog] = useState(false)
    const [timeUpDialog, setTimeUpDialog] = useState(false)
    const [userAnswer, setUserAnswer] = useState<(string | null)[]>([])

    // navigating to results page
    const router = useRouter();

    const startQuiz = () => {
        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
          // Randomise the questions
          const selectedQuestions = shuffleQuestions([...sampleQuestions].slice(0, parseInt(numOfQuestions)));
          setQuestions(selectedQuestions);
          setUserAnswer(Array(selectedQuestions.length).fill(null))
          setQuizStarted(true);
          setIsLoading(false);
        }, 2000);
    }

    const handleStartQuiz = () => {
        if(!topic || !difficulty || !numOfQuestions) {
            return toast.warning("Please fill in the blank!")
        }

        if(!validateInput(topic)) {
            return toast.error("Invalid topic!");
        }        
        
        if(Number(numOfQuestions) > sampleQuestions.length || Number(numOfQuestions) < 1) {
            return toast.error(`Please choose a number between 1 and ${sampleQuestions.length}`);
        }
        
        if(difficulty === "asian") {
          setShowAsianAlert(true);
          return;
        }

        
        startQuiz();
    }

    const handleMovePrevQuestion = () => {
      if(currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1)
      }
    }

  return (
  
   <div className="flex justify-center items-center max-h-screen bg-linear-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black p-6">
     
        {!quizStarted ? (
          <>
           <QuizSetup
              topic={topic}
              difficulty={difficulty}
              numberOfQuestions={numOfQuestions}
              setTopic={setTopic}
              setDifficulty={setDifficulty}
              setNumberOfQuestions={setNumOfQuestions}
              handleStartQuiz={handleStartQuiz}
              isLoading={isLoading}
            />
            
            <AlertDialog open={showAsianAlert} onOpenChange={setShowAsianAlert}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Asian Difficulty Selected</AlertDialogTitle>
                    <AlertDialogDescription>
                      Yo! You've selected the <span className="text-red-600 font-semibold text-xl">"Asian"</span> difficulty level. Less time but with Asian-difficult questions. Are you sure you want to proceed?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                    
                    <AlertDialogFooter>
                      <AlertDialogCancel
                        className='cursor-pointer'
                        onClick={() => setShowAsianAlert(false)}
                      >
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className='cursor-pointer'
                        onClick={() => {
                          startQuiz()
                        }}
                      
                      > 
                        Proceed
                      </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </>
           
        ) : 
          <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
            {!quizFinished ? (
              <CardHeader className="text-center space-y-3"> 
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    Question: {currentQuestionIndex + 1} / {questions.length}
                </div>
                <div className='flex justify-around gap-2'>
                  <Button
                    className='cursor-pointer text-black border border-black bg-transparent hover:text-white mb-2 transition-all active:scale-90'
                    onClick={handleMovePrevQuestion}
                  >
                    <ArrowLeft className="w-5 h-5 mx-1"/> 
                  </Button>
                  <Progress className="h-2 rounded-full mt-3" value={(((currentQuestionIndex + 1) / questions.length)) * 100} />
                </div>
                <CountDown
                    difficulty={difficulty}
                    onTimeUp={() => {
                      setTimeUpDialog(true)
                      setTimeout(() => {
                        setQuizFinished(true);
                      }, 2000)
                    }}
                />
                 <AlertDialog open={timeUpDialog} onOpenChange={setTimeUpDialog}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                            <div className="flex items-center justify-between">
                              <span className='text-xl'>Time's up! System is cleaning up your mess</span>
                              <Spinner className='size-8'/>
                            </div>
                        </AlertDialogTitle>
                      </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
                <AnimatePresence>
                  <motion.div
                    key={currentQuestionIndex}       // triggers animation on question change
                    initial={{ opacity: 0, x: 100 }} // slide in from right
                    animate={{ opacity: 1, x: 0 }} // slide out to left
                    transition={{ duration: 0.3, ease: "easeIn" }}
                    className="grid gap-4"
                  >
                     <CardTitle className='className="text-5xl font-bold mt-4"'>
                      {questions[currentQuestionIndex].question}
                  </CardTitle>
                  <CardContent className="grid gap-4 mt-4">
                    {questions[currentQuestionIndex].options.map((option: string) => (
                      <Button
                        key={option}
                        variant={optionSelected === option ? "default" : "outline"}
                        className="w-full cursor-pointer active:scale-95 border-black transition-all"
                        onClick={() => {
                          setOptionSelected(option);

                          const updatedAnswer = [...userAnswer] 

                          updatedAnswer[currentQuestionIndex] = option
                          setUserAnswer(updatedAnswer)
                          
                          
                        }}
                      >
                        {option}
                      </Button>
                    ))}
                  </CardContent>
                  <CardFooter className="flex justify-center mt-4">
                          <Button
                              className="cursor-pointer active:scale-90 transition-all"
                              onClick={() => {
                                  if(difficulty === "asian" && !userAnswer[currentQuestionIndex]) {
                                    return toast.warning("Please select an option!");
                                  }


                                  if (currentQuestionIndex + 1 < questions.length) {
                                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                                  
                                  } else {
                                    
                                    // Map user answers to the Answer object
                                    const savedUserAnswers: Answer[] = questions.map((question, answerIndex) => ({
                                      question: question.question,
                                      userAnswer: userAnswer[answerIndex] || "",
                                      correctAnswer: question.correctAnswer
                                    }))

                                    const correctAnswersCount = savedUserAnswers.filter((answer: Answer) => answer.userAnswer === answer.correctAnswer).length
                                    
                                    const finalScore = score + correctAnswersCount
                                    
                                    localStorage.setItem("topic", topic)
                                    localStorage.setItem("score", finalScore.toString())                                  
                                    localStorage.setItem("total", questions.length.toString())                                  
                                    localStorage.setItem("answers", JSON.stringify(savedUserAnswers))
                                    
                                    setScore(finalScore);
                                    setQuizFinished(true);
                                  }
                              }}
                              disabled={difficulty === "asian" && !userAnswer[currentQuestionIndex]}
                            >
                              {currentQuestionIndex + 1 < questions.length ? "Next Question" : "Finish Quiz"}
                        </Button>
                  </CardFooter>
                </motion.div>
              </AnimatePresence>
            </CardHeader>
            ) : (
               <div className="text-center space-y-4 mt-4">
                        <CardTitle className="text-3xl font-bold">
                          🎉 Congratulations! You have finished the quiz
                        </CardTitle>
                        <Button
                          className="cursor-pointer mt-4 active:scale-90 transition-all"
                          onClick={() => {
                              setShowResultDialog(true)
                              setTimeout(() => {
                                setQuizFinished(false);
                                setQuizStarted(false);
                                setCurrentQuestionIndex(0);
                                setScore(0);
                                setQuestions([]);
                                setOptionSelected(null);
                                router.push("/results")
                            }, 1500)
                      
                          }}
                        >
                          Show Results
                          
                        </Button>
                        <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                   <div className="flex items-center justify-between">
                                      <span className='text-xl'>Result being calculated</span>
                                      <Spinner className='size-8'/>
                                    </div>
                                </AlertDialogTitle>
                              </AlertDialogHeader>
                            </AlertDialogContent>
                        </AlertDialog>
                </div>
            ) }
          </Card>
        }
       
    </div>
)
}

export default QuizPage
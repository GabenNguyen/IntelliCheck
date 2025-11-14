"use client";
import React from 'react'
import Question from '@/type/question'
import { useState } from 'react'
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';


const sampleQuestions: Question[] = [
  {
    id: "q1",
    question: "What does React primarily help developers build?",
    options: ["User Interfaces", "Mobile Games", "Databases", "Operating Systems"],
    correctAnswer: "User Interfaces",
  },
  {
    id: "q2",
    question: "Which language runs in a web browser?",
    options: ["Java", "C++", "Python", "JavaScript"],
    correctAnswer: "JavaScript",
  },
  {
    id: "q3",
    question: "Which hook is used to manage state in React?",
    options: ["useEffect", "useState", "useRef", "useReducer"],
    correctAnswer: "useState",
  },
];


function QuizPage() {
    // Form state
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("medium");
    const [numOfQuestions, setNumOfQuestions] = useState(5);

    // Quiz state
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [optionSelected, setOptionSelected] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0)


    const handleStartQuiz = () => {
        if(!topic) {
            return toast.warning("Please enter a topic!")
        }

        setQuestions(sampleQuestions.slice(0, numOfQuestions));
        setQuizStarted(true);
    }


  return (
   <div className="flex justify-center items-center max-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black p-6">
     
        {!quizStarted ? (
          <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-4xl font-extrabold tracking-tight">
                <span className="text-blue-600">What are you up to?</span> 
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
                Select a topic, choose the difficulty and the number of questions then you're all good to go
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center text-lg">
            <Input 
                type='text'
                placeholder="Enter a topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            
            <Select value={difficulty} onValueChange={(difficulty) => setDifficulty(difficulty)}>
                <SelectTrigger>
                    <SelectValue placeholder="Choose your difficulty"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulty</SelectLabel>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Input 
                type='number'
                min={`1`}
                max={sampleQuestions.length}
                placeholder="Choose the number of questions"
                value={numOfQuestions}
                onChange={(e) => setNumOfQuestions(parseInt(e.target.value))}
            />
            <CardFooter className="flex justify-center">
              <Button type='submit' onClick={handleStartQuiz}>Generate Quiz</Button>
            </CardFooter>
          </CardContent>
        </Card>
        ) : 
          <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
            <CardHeader className="text-center space-y-3"> 
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    Question: {currentQuestionIndex + 1} / {questions.length}
                </div>
            
                <Progress className="h-2 rounded-full mt-2" value={(currentQuestionIndex + 1 / questions.length) * 100} />
                <CardTitle className='className="text-2xl font-bold mt-4"'>
                    {questions[currentQuestionIndex].question}
                </CardTitle>
            </CardHeader>
          </Card>
        }
    </div>
  )
}

export default QuizPage
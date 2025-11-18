"use client";
import React from 'react'
import Question from '@/type/question'
import CountDown from '../components/CountDown';
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
import { Progress } from "@/components/ui/progress"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label"
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
  {
    id: "q4",
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Style Syntax",
      "Colorful Styling Script"
    ],
    correctAnswer: "Cascading Style Sheets",
  },
  {
    id: "q5",
    question: "Which HTML tag is used to define the largest heading?",
    options: ["<h6>", "<header>", "<h1>", "<title>"],
    correctAnswer: "<h1>",
  },
  {
    id: "q6",
    question: "Which HTTP method is commonly used to submit form data?",
    options: ["PUT", "POST", "DELETE", "OPTIONS"],
    correctAnswer: "POST",
  },
  {
    id: "q7",
    question: "Which of the following is a JavaScript framework?",
    options: ["Laravel", "Django", "React", "Flask"],
    correctAnswer: "React",
  },
  {
    id: "q8",
    question: "What does JSON stand for?",
    options: [
      "JavaScript Oriented Notation",
      "Java Standard Output Notation",
      "JavaScript Object Notation",
      "Joined Syntax Object Network"
    ],
    correctAnswer: "JavaScript Object Notation",
  },
  {
    id: "q9",
    question: "Which command initializes a new Node.js project?",
    options: ["node create", "npm init", "npm install", "node start"],
    correctAnswer: "npm init",
  },
  {
    id: "q10",
    question: "Which CSS property controls text size?",
    options: ["font-style", "font-size", "text-size", "text-style"],
    correctAnswer: "font-size",
  },
  {
    id: "q11",
    question: "Which part of a URL is responsible for identifying the resource path?",
    options: ["Protocol", "Domain", "Pathname", "Query String"],
    correctAnswer: "Pathname",
  },
  {
    id: "q12",
    question: "Which hook runs after every render by default?",
    options: ["useState", "useEffect", "useContext", "useMemo"],
    correctAnswer: "useEffect",
  }
];


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

    // navigating to results page
    const router = useRouter();

    const shuffleQuestions = (questions: Question[]) => {
       const shuffledQuestion = [...questions]
       for(let i = shuffledQuestion.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledQuestion[i], shuffledQuestion[j]] = [shuffledQuestion[j], shuffledQuestion[i]];
       }
       return shuffledQuestion;
    }

    const validateInput = (input: string) => {
        const sanitisedInput = input.trim()

        if(sanitisedInput.length < 3 || sanitisedInput.length > 50) {
            return false;
        }

        // Reject ONLY Number
        if(/^\d+$/.test(sanitisedInput)) {
          return false;
        }

        // Only letters and spaces allowed
        if(!/^[A-Za-z\s]/.test(sanitisedInput)) {
          return false;
        }

        // Need at least one vowel and one consonant
        if(!/[ueoai]/i.test(sanitisedInput)) {
          return false;
        }

        if(!/[bcdfghjklmnpqrstvwxyz]/i.test(sanitisedInput)) {
          return false;
        }

        if(/(.)\1{2,}/.test(sanitisedInput)) {
          return false;
        }

        if(/(\w{2,})\1/.test(sanitisedInput)) {
          return false;
        }

        return true;
    }


    const startQuiz = () => {
        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
          // Randomise the questions
          setQuestions(shuffleQuestions([...sampleQuestions].slice(0, parseInt(numOfQuestions))));
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


  return (
   <div className="flex justify-center items-center max-h-screen bg-linear-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black p-6">
     
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
            <Label htmlFor='topic' className='flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold text-lg mb-2'>Topic</Label>
            <Input
                className="shadow-lg"
                type="text"
                placeholder="E.g. Art, History, Programming Languages."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <Label htmlFor='difficulty' className='flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold text-lg mb-2'>Difficulty</Label>
            <Select value={difficulty} onValueChange={(difficulty) => setDifficulty(difficulty)}>
                <SelectTrigger className="w-full shadow-lg cursor-pointer">
                    <SelectValue placeholder="Choose your difficulty"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Difficulty</SelectLabel>
                        <SelectItem value="easy" className='cursor-pointer hover:font-bold hover:text-lg'>Easy</SelectItem>
                        <SelectItem value="medium" className='cursor-pointer hover:font-bold hover:text-lg'>Medium</SelectItem>
                        <SelectItem value="hard" className='cursor-pointer hover:font-bold hover:text-lg'>Hard</SelectItem>
                        <SelectItem value="asian" className='cursor-pointer hover:font-bold hover:text-lg'>Asian</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>

            <Label htmlFor='numOfQuestions' className='flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold text-lg mb-2'>Number of Questions</Label>
            <Input 
                className="shadow-lg"
                type='number'
                min={`1`}
                max={sampleQuestions.length}
                placeholder="Choose the number of questions"
                value={numOfQuestions}
                onChange={(e) => setNumOfQuestions(e.target.value)}
            />
            <CardFooter className="flex justify-center">
              <Button 
              className="cursor-pointer active:scale-90 transition-all" 
              type='submit' 
              onClick={handleStartQuiz}
              disabled={isLoading}
              >
                {isLoading ? <> Generating Quiz<Spinner /> </> : "Generate Quiz"}
              </Button>
            </CardFooter>
          </CardContent>
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
        </Card>
        ) : 
          <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
            {!quizFinished ? (
              <CardHeader className="text-center space-y-3"> 
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                    Question: {currentQuestionIndex + 1} / {questions.length}
                </div>
            
                <Progress className="h-2 rounded-full mt-2" value={(((currentQuestionIndex + 1) / questions.length)) * 100} />
                <CountDown
                    difficulty={difficulty}
                    onTimeUp={() => {
                      setTimeout(() => {
                        setQuizFinished(true);
                        toast.success("Time's up! Calculating your total score");
                      }, 1500)
                    }}
                />
                <CardTitle className='className="text-5xl font-bold mt-4"'>
                    {questions[currentQuestionIndex].question}
                </CardTitle>
                <CardContent className="grid gap-4 mt-4">
                  {questions[currentQuestionIndex].options.map((option) => (
                    <Button
                      key={option}
                      variant={optionSelected === option ? "default" : "outline"}
                      className="w-full cursor-pointer active:scale-95 transition-all"
                      onClick={() => setOptionSelected(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </CardContent>
                 <CardFooter className="flex justify-center mt-4">
                        <Button
                            className="cursor-pointer active:scale-90 transition-all"
                            onClick={() => {
                                if (optionSelected === null) {
                                  return toast.warning("Please select an option!");
                                }
                              
                                if (currentQuestionIndex + 1 < questions.length) {
                                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                                
                                } else {
                                  const finalScore = score + (optionSelected === questions[currentQuestionIndex].correctAnswer ? 1 : 0)
                                  setScore(finalScore);
                                  setQuizFinished(true);
                                }
                            }}
                          >
                            {currentQuestionIndex + 1 < questions.length ? "Next Question" : "Finish Quiz"}
                      </Button>
                    </CardFooter>
            </CardHeader>
            ) : (
               <div className="text-center space-y-4 mt-4">
                        <CardTitle className="text-3xl font-bold">
                          🎉 Congratulations! You have finished the quiz
                        </CardTitle>
                        <Button
                          className="cursor-pointer mt-4"
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
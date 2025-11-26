"use client";
import React from 'react'
import Question from '@/type/question'
import Answer from '@/type/answer';

import shuffleQuestions from '@/utils/shuffle';
import validateInput from '@/utils/validate_input';
import sampleQuestions from '@/utils/sample_questions';

import QuizSetup from '../components/quiz_related/QuizSetup';
import QuizQuestions from '../components/quiz_related/QuizQuestions';
import QuizFinished from '../components/quiz_related/QuizFinished';

import AsianAlertDialog from '../components/dialogs/AsianAlertDialog';
import TimeUpDialog from '../components/dialogs/TimeUpDialog';
import ResultPageDialog from '../components/dialogs/ResultPageDialog';

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from "sonner"
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
    const [numOfQuestions, setNumOfQuestions] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Quiz state
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [optionSelected, setOptionSelected] = useState<string | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0)

    // Dialogs state
    const [showAsianAlert, setShowAsianAlert] = useState(false);
    const [showResultDialog, setShowResultDialog] = useState(false)
    const [showTimeUpDialog, setShowTimeUpDialog] = useState(false)
    
    // User answers state
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

    const handleFinishQuiz = () => {
    }




  return (
  
    <div className="flex justify-center items-center max-h-screen bg-linear-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black p-6">
        {!quizStarted && (
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
        )}

        {}

    </div>
)
}

export default QuizPage
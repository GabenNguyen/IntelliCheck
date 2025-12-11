"use client";

import saveQuizToDB from '@/lib/quiz-action';

import Question from '@/type/question'
import Answer from '@/type/answer';

import validateInput from '@/utils/validate_input';

import QuizSetup from '../components/quiz_related/QuizSetup';
import QuizQuestions from '../components/quiz_related/QuizQuestions';

import AsianAlertDialog from '../components/dialogs/AsianAlertDialog';
import TimeUpDialog from '../components/dialogs/TimeUpDialog';
import ResultPageDialog from '../components/dialogs/ResultPageDialog';

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { toast } from "sonner"


function QuizPage() {
    // Form state
    const [topic, setTopic] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [numOfQuestions, setNumOfQuestions] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Quiz state
    const [quizStarted, setQuizStarted] = useState(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    // Dialogs state
    const [showAsianAlert, setShowAsianAlert] = useState(false);
    const [showResultDialog, setShowResultDialog] = useState(false);
    const [showTimeUpDialog, setShowTimeUpDialog] = useState(false);
    
    // User answers state
    const [userAnswer, setUserAnswer] = useState<(string | null)[]>([])

    const [saveQuizId, setSaveQuizId] = useState<(string | null)>(null);

    // navigating to results page
    const router = useRouter();

    const startQuiz = async () => {
        setIsLoading(true);
      try {
        
        const res = await fetch('/api/generate-questions', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, difficulty, numOfQuestions }),
        });

        const outputData = await res.json();

        if(!res.ok || !outputData.outputQuestion) {
          setIsLoading(false);
          return toast.error("Failed to generate questions!");
        }

        // save the generated quiz to the db
        const saveResult = await saveQuizToDB(topic, difficulty, outputData.outputQuestion);

        if(saveResult.success) {
          setSaveQuizId(saveResult.quizId || null);
          console.log("Quiz saved with ID:", saveResult.quizId);
        };

        setIsLoading(true);
        setQuestions(outputData.outputQuestion)
        setUserAnswer(Array(outputData.outputQuestion.length).fill(null))
        setQuizStarted(true);
      
      } catch {
        return toast.error(`Failed to generate questions!`)
      
      } finally {
        setIsLoading(false)
      }
    }

    const handleStartQuiz = () => {
        if(!topic || !difficulty || !numOfQuestions) {
            return toast.warning("Please fill in the blank!")
        }

        if(!validateInput(topic)) {
            return toast.error("Invalid topic!");
        }        
        
        if(Number(numOfQuestions) < 1) {
            return toast.error("The number of questions must be at least 1");
        }
        
        if(difficulty === "asian") {
          setShowAsianAlert(true);
          return;
        }

        
        startQuiz();
    }

    const handleFinishQuiz = () => {
      setShowResultDialog(true);
      
      // map the user answers to the Answer obj
      const savedUserAnswers: Answer[] = questions.map((question: Question, answerIndex: number) => ({
        question: question.question,
        userAnswer: userAnswer[answerIndex] || "",
        correctAnswer: question.options.find((option) => option.trim().startsWith(`${question.correctAnswer}`)) || "" // store full answers
      }));

      const finalScore = questions.reduce(
        (acc: number, question: Question, answerIndex: number) => acc + (userAnswer[answerIndex]?.charAt(0) === question.correctAnswer.charAt(0) ? 1 : 0),
        
        0
      );
      
      try {
        localStorage.setItem("quizData", JSON.stringify({
          topic,
          finalScore,
          savedAt: Date.now(), // for clearing the localStorage after 5 minutes
          quizId: saveQuizId,
          totalQuestion: numOfQuestions,
          userAnswers: savedUserAnswers,
        }));
      } catch (error) {
        console.error(`Failed to store the results! Error: ${error}`)
        return toast.error("Failed to save quiz result!")
      }
     

      setTimeout(() => {
        setQuizFinished(true);
        setQuizStarted(false);
        setCurrentQuestionIndex(0);
        setQuestions([]);
        router.push("/results")
      }, 1500)
    }

  return (
  
    <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black p-6">
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

        {quizStarted && !quizFinished && questions.length > 0 && (
          <QuizQuestions 
            questions={questions}
            userAnswer={userAnswer}
            setUserAnswer={setUserAnswer}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            countDownBasedOnDifficulty={difficulty}
            onFinish={handleFinishQuiz}
          />
        )}

        <AsianAlertDialog open={showAsianAlert} setOpen={setShowAsianAlert} onProceed={startQuiz}/>
        <TimeUpDialog open={showTimeUpDialog} setOpen={setShowTimeUpDialog} />
        <ResultPageDialog open={showResultDialog} setOpen={setShowResultDialog}/>
    </div>
)
}

export default QuizPage
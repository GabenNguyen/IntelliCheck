"use client";
import saveQuizToDB from "@/lib/quiz-action";

import Question from "@/type/question";
import Answer from "@/type/answer";

import validateInput from "@/utils/validate_input";

import QuizSetup from "../components/quiz_related/QuizSetup";
import QuizQuestions from "../components/quiz_related/QuizQuestions";
import PdfUpload from "../components/quiz_related/PdfUpload";

import AsianAlertDialog from "../components/dialogs/AsianAlertDialog";
import TimeUpDialog from "../components/dialogs/TimeUpDialog";
import ResultPageDialog from "../components/dialogs/ResultPageDialog";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function QuizPage() {
  // Form state
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numOfQuestions, setNumOfQuestions] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

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
  const [userAnswer, setUserAnswer] = useState<(string | null)[]>([]);

  const [saveQuizId, setSaveQuizId] = useState<string | null>(null);

  const router = useRouter();

  const startQuiz = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty, numOfQuestions }),
      });

      const outputData = await res.json();

      if (!res.ok || !outputData.outputQuestion) {
        setIsLoading(false);
        return toast.error("Failed to generate questions!");
      }

      const saveResult = await saveQuizToDB(
        topic,
        difficulty,
        outputData.outputQuestion,
      );

      if (saveResult.success) {
        setSaveQuizId(saveResult.quizId || null);
        console.log("Quiz saved with ID:", saveResult.quizId);
      }

      setQuestions(outputData.outputQuestion);
      setUserAnswer(Array(outputData.outputQuestion.length).fill(null));
      setQuizStarted(true);
    } catch {
      return toast.error(`Failed to generate questions!`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = () => {
    if (!topic || !difficulty || !numOfQuestions) {
      return toast.warning("Please fill in the blank!");
    }

    if (!validateInput(topic)) {
      return toast.error("Invalid topic!");
    }

    if (Number(numOfQuestions) < 1) {
      return toast.error("The number of questions must be at least 1");
    }

    if (difficulty === "asian") {
      setShowAsianAlert(true);
      return;
    }

    startQuiz();
  };

  const handleFinishQuiz = () => {
    setShowResultDialog(true);

    const savedUserAnswers: Answer[] = questions.map(
      (question: Question, answerIndex: number) => ({
        question: question.question,
        userAnswer: userAnswer[answerIndex] || "",
        correctAnswer:
          question.options.find((option) =>
            option.trim().startsWith(`${question.correctAnswer}`),
          ) || "",
      }),
    );

    const finalScore = questions.reduce(
      (acc: number, question: Question, answerIndex: number) =>
        acc +
        (userAnswer[answerIndex]?.charAt(0) === question.correctAnswer.charAt(0)
          ? 1
          : 0),
      0,
    );

    try {
      localStorage.setItem(
        "quizData",
        JSON.stringify({
          topic,
          finalScore,
          savedAt: Date.now(),
          quizId: saveQuizId,
          totalQuestion: numOfQuestions,
          userAnswers: savedUserAnswers,
        }),
      );
    } catch (error) {
      console.error(`Failed to store the results! Error: ${error}`);
      return toast.error("Failed to save quiz result!");
    }

    setTimeout(() => {
      setQuizFinished(true);
      setQuizStarted(false);
      setCurrentQuestionIndex(0);
      setQuestions([]);
      router.push("/results");
    }, 1500);
  };

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50 dark:bg-gray-900 flex justify-center items-start">
      {!quizStarted && (
        <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 border dark:border-gray-700">
          {/* Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              Create Your Quiz
            </h1>
            <p className="text-gray-500 dark:text-gray-300 mt-2">
              Upload a PDF or generate questions from a topic
            </p>
          </div>

          <div className="space-y-10">
            {/* PDF Upload */}
            <div className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-xl p-6">
              <h2 className="font-semibold mb-3 text-xl text-gray-800 dark:text-gray-100">
                Upload a PDF
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                Generate quiz questions from your document.
              </p>
              <PdfUpload pdfFile={pdfFile} setPdfFile={setPdfFile} />
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-300">
                OR
              </span>
              <div className="flex-1 h-px bg-gray-300 dark:bg-gray-600"></div>
            </div>

            {/* Manual Setup */}
            <div className="bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 rounded-xl p-6">
              <h2 className="font-semibold mb-3 text-xl text-gray-800 dark:text-gray-100">
                Manual Setup
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">
                Generate questions from a topic instead.
              </p>
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
            </div>
          </div>
        </div>
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

      <AsianAlertDialog
        open={showAsianAlert}
        setOpen={setShowAsianAlert}
        onProceed={startQuiz}
      />
      <TimeUpDialog open={showTimeUpDialog} setOpen={setShowTimeUpDialog} />
      <ResultPageDialog open={showResultDialog} setOpen={setShowResultDialog} />
    </div>
  );
}

export default QuizPage;

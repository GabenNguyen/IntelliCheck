"use client";

import saveQuizToDB from "@/lib/quiz-action";

import Answer from "@/type/answer";

import QuizSetup from "../components/quiz_related/QuizSetup";
import QuizQuestions from "../components/quiz_related/QuizQuestions";

import AsianAlertDialog from "../components/dialogs/AsianAlertDialog";
import TimeUpDialog from "../components/dialogs/TimeUpDialog";
import ResultPageDialog from "../components/dialogs/ResultPageDialog";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { FormState, QuizState, InteractionState, UiState, QuestionUI } from "./types";
import { quizFormSchema, generateQuestionResponseSchema } from "./schema";

function QuizPage() {
  // Form state
  const [formState, setFormState] = useState<FormState>({
    topic: "",
    difficulty: "",
    numOfQuestions: 0,
    isLoading: false

  })
  // Quiz state
  const [quizState, setQuizState] = useState<QuizState>({
    quizStarted: false,
    questions: [],
    currentQuestionIndex: 0,
    quizFinished: false
  })
  // Dialogs state
  const [uiState, setUiState] = useState<UiState>({
    dialogs: {
      showAsianAlert: false,
      showTimeUpDialog: false,
      showResultDialog: false
    },
    savedQuizId: null
  })

  // User answers state
  const [interactionState, setInteractionState] = useState<InteractionState>({
    userAnswer: []
  })


  // navigating to results page
  const router = useRouter();

  const startQuiz = async () => {
    const parsedFormFields = quizFormSchema.safeParse(formState);

    if (!parsedFormFields.success) {
      return toast.error(parsedFormFields.error.issues[0]?.message || "Invalid input");
    }

    const { topic, difficulty, numOfQuestions } = parsedFormFields.data;

    setFormState((prev) => ({ ...prev, isLoading: true }));
    try {
      const res = await fetch("/api/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          difficulty,
          numOfQuestions
        }),
      });

      const responseData = await res.json();

      const parsedResult = generateQuestionResponseSchema.safeParse(responseData);

      if (!res.ok || !parsedResult.success) {
        setFormState((prev) => ({ ...prev, isLoading: false }));
        return toast.error("Failed to generate questions!");
      }

      const validatedData = parsedResult.data;

      // save the generated quiz to the db
      const savedResult = await saveQuizToDB(
        topic,
        difficulty,
        validatedData.outputQuestion
      );

      if (savedResult.success) {
        setUiState((prev) => ({ ...prev, savedQuizId: savedResult.quizId ?? null }));
      }

      setQuizState({
        quizStarted: true,
        quizFinished: false,
        currentQuestionIndex: 0,
        questions: validatedData.outputQuestion
      });

      setInteractionState({ userAnswer: Array(validatedData.outputQuestion.length).fill(null) });
    } catch {
      return toast.error(`Failed to generate questions!`);
    } finally {
      setFormState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const handleStartQuiz = () => {
    const parsed = quizFormSchema.safeParse(formState);

    if (!parsed.success) {
      const message = parsed.error.issues
        .map((issue) => issue.message)
        .join("\n");

      toast.error(message);
      return;
    }
    const validatedData = parsed.data;

    if (validatedData.difficulty === "asian") {
      setUiState((prev) => ({
        ...prev,
        dialogs: { ...prev.dialogs, showAsianAlert: true },
      }));
      return;
    }

    startQuiz();
  }

  const handleFinishQuiz = () => {
    setUiState((prev) => ({ ...prev, dialogs: { ...prev.dialogs, showResultDialog: true } }));

    // map the user answers to the Answer obj
    const savedUserAnswers: Answer[] = quizState.questions.map(
      (question: QuestionUI, answerIndex: number) => ({
        question: question.question,
        userAnswer: interactionState.userAnswer[answerIndex] || "",
        correctAnswer:
          question.options.find((option) =>
            option.trim().startsWith(`${question.correctAnswer}`)
          ) || "", // store full answers
      })
    );

    const finalScore = quizState.questions.reduce(
      (acc: number, question: QuestionUI, answerIndex: number) =>
        acc +
        (interactionState.userAnswer[answerIndex]?.charAt(0) === question.correctAnswer.charAt(0)
          ? 1
          : 0),

      0
    );

    try {
      localStorage.setItem(
        "quizData",
        JSON.stringify({
          topic: formState.topic,
          finalScore,
          savedAt: Date.now(), // for clearing the localStorage after 5 minutes
          quizId: uiState.savedQuizId,
          totalQuestion: formState.numOfQuestions,
          userAnswers: savedUserAnswers,
        })
      );
    } catch (error) {
      console.error(`Failed to store the results! Error: ${error}`);
      return toast.error("Failed to save quiz result!");
    }

    setTimeout(() => {
      setQuizState((prev) => ({ ...prev, quizFinished: true }));
      setQuizState((prev) => ({ ...prev, quizStarted: false }));
      setQuizState((prev) => ({ ...prev, currentQuestionIndex: 0 }));
      setQuizState((prev) => ({ ...prev, questions: [] }));
      router.push("/results");
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      {!quizState.quizStarted && (
        <QuizSetup
          topic={formState.topic}
          difficulty={formState.difficulty}
          numberOfQuestions={String(formState.numOfQuestions)}
          setTopic={(value: string) => setFormState((prev) => ({ ...prev, topic: value }))}
          setDifficulty={(value: string) => setFormState((prev) => ({ ...prev, difficulty: value }))}
          setNumberOfQuestions={(value: number) => setFormState((prev) => ({ ...prev, numOfQuestions: value }))}
          handleStartQuiz={handleStartQuiz}
          isLoading={formState.isLoading}
        />
      )}

      {quizState.quizStarted && !quizState.quizFinished && quizState.questions.length > 0 && (
        <QuizQuestions
          questions={quizState.questions}
          userAnswer={interactionState.userAnswer}
          setUserAnswer={(value: (string | null)[]) => setInteractionState((prev) => ({ ...prev, userAnswer: value }))}
          currentQuestionIndex={quizState.currentQuestionIndex}
          setCurrentQuestionIndex={(value: number) => setQuizState((prev) => ({ ...prev, currentQuestionIndex: value }))}
          countDownBasedOnDifficulty={formState.difficulty}
          onFinish={handleFinishQuiz}
        />
      )}

      <AsianAlertDialog
        open={uiState.dialogs.showAsianAlert}
        setOpen={(value) => setUiState((prev) => ({ ...prev, dialogs: { ...prev.dialogs, showAsianAlert: value } }))}
        onProceed={startQuiz}
      />
      <TimeUpDialog open={uiState.dialogs.showTimeUpDialog} setOpen={(value) => setUiState((prev) => ({ ...prev, dialogs: { ...prev.dialogs, showTimeUpDialog: value } }))} />
      <ResultPageDialog open={uiState.dialogs.showResultDialog} setOpen={(value) => setUiState((prev) => ({ ...prev, dialogs: { ...prev.dialogs, showResultDialog: value } }))} />
    </div>
  );
}

export default QuizPage;

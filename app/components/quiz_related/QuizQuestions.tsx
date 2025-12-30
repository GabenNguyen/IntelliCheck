import CountDown from "../CountDown";
import Question from "@/type/question";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  questions: Question[];
  userAnswer: (string | null)[];
  setUserAnswer: (answer: (string | null)[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  countDownBasedOnDifficulty: string;
  onFinish: () => void;
}

export default function QuizQuestions({
  questions,
  userAnswer,
  setUserAnswer,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  countDownBasedOnDifficulty,
  onFinish,
}: Props) {
  const currentQuestion = questions[currentQuestionIndex];

  if (!currentQuestion || !currentQuestion.options) {
    return (
      <div className="flex justify-center items-center p-12">
        <Spinner />
      </div>
    );
  }

  const selectedUserAnswer = userAnswer[currentQuestionIndex];

  const handleSelect = (option: string) => {
    const updated = [...userAnswer];
    updated[currentQuestionIndex] = `${option.charAt(0)}) ${option.slice(3)}`;
    setUserAnswer(updated);
  };

  const handleNext = () => {
    if (!selectedUserAnswer) {
      toast.warning("Please select an answer!");
      return;
    }
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-6 bg-gray-50 dark:bg-slate-900">
      <Card className="w-full max-w-3xl min-h-125 rounded-3xl shadow-md dark:shadow-lg bg-white dark:bg-slate-900 overflow-visible flex flex-col">
        {/* Header */}
        <CardHeader className="flex flex-col md:flex-row items-center justify-between px-6 py-4 gap-4">
          <div className="flex items-center gap-2">
            <span className="px-4 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-200">
              Question {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          <CountDown
            difficulty={countDownBasedOnDifficulty}
            onTimeUp={onFinish}
          />
        </CardHeader>

        {/* Progress */}
        <div className="px-6 pb-4">
          <Progress
            value={((currentQuestionIndex + 1) / questions.length) * 100}
            className="h-2 rounded-full bg-gray-200 dark:bg-slate-700"
          />
        </div>

        {/* Question + Options */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="px-6 pb-6 grid gap-6 flex-1 overflow-auto"
          >
            <CardTitle className="text-xl md:text-2xl font-semibold text-center text-gray-900 dark:text-white leading-relaxed">
              {currentQuestion.question}
            </CardTitle>

            <CardContent className="grid gap-3">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedUserAnswer === option;
                return (
                  <Button
                    key={option}
                    variant="outline"
                    onClick={() => handleSelect(option)}
                    className={`flex w-full p-4 text-left rounded-xl border transition-all ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                        : "bg-gray-50 dark:bg-slate-800/50 border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-300 hover:border-blue-400 hover:bg-gray-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <span
                      className={`w-8 h-8 mr-3 flex items-center justify-center rounded-full font-bold text-sm ${
                        isSelected
                          ? "bg-white/20 text-white"
                          : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {/* 65: A from ASCII */}
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option.slice(3)}</span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 ml-2" />}
                  </Button>
                );
              })}
            </CardContent>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <CardFooter className="flex justify-between px-6 py-4">
          <Button
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Prev
          </Button>

          <Button
            onClick={handleNext}
            className="px-6 py-3 rounded-xl bg-blue-600 text-white shadow-sm hover:shadow-md transition flex items-center gap-2"
          >
            {currentQuestionIndex + 1 < questions.length ? (
              <>
                Next
                <ArrowRight className="w-5 h-5" />
              </>
            ) : (
              <>
                Finish
                <CheckCircle2 className="w-5 h-5" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

import CountDown from "../CountDown";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2, Cpu } from "lucide-react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import type { QuestionUI } from "@/app/quiz/types"

interface Props {
  questions: QuestionUI[];
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
      <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/20">
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

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="flex justify-center items-start min-h-screen p-4 md:p-8 bg-linear-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/20 font-sans">
      <div className="w-full max-w-3xl flex flex-col pt-8 md:pt-12">

        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold tracking-wider text-violet-600 dark:text-violet-400 uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className="w-32 md:w-48 h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-linear-to-r from-violet-500 via-indigo-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl shadow-lg shadow-violet-500/10 border border-violet-500/20">
            <CountDown
              difficulty={countDownBasedOnDifficulty}
              onTimeUp={onFinish}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1 w-full"
          >
            <div className="bg-white dark:bg-slate-900 rounded-4xl p-6 md:p-10 shadow-xl shadow-violet-500/10 border border-violet-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-violet-500 via-indigo-500 to-cyan-500" />
              <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white leading-snug mb-8">
                {currentQuestion.question}
              </h2>

              <div className="flex flex-col gap-4">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedUserAnswer === option;
                  const letter = String.fromCharCode(65 + index);
                  const text = option.slice(3);

                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`group relative w-full text-left flex items-center p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 outline-none
                        ${isSelected
                          ? "border-violet-500 bg-linear-to-r from-violet-500 to-indigo-500 text-white dark:border-violet-400"
                          : "border-violet-200 dark:border-violet-800 bg-transparent text-slate-700 dark:text-slate-300 hover:border-violet-400 dark:hover:border-violet-600 hover:bg-violet-50 dark:hover:bg-violet-900/20"
                        }
                      `}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 text-sm font-semibold transition-colors
                        ${isSelected ? "bg-white/20" : "bg-violet-100 dark:bg-violet-900/30 group-hover:bg-violet-200 dark:group-hover:bg-violet-800"}
                      `}>
                        {letter}
                      </div>
                      <span className="flex-1 text-base md:text-lg">{text}</span>

                      {isSelected ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-4"
                        >
                          <CheckCircle2 className="w-6 h-6" />
                        </motion.div>
                      ) : (
                        <div className="ml-4 w-6 h-6 rounded-full border-2 border-violet-300 dark:border-violet-700 group-hover:border-violet-500 dark:group-hover:border-violet-500 transition-colors" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-8 w-full gap-4">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="h-14 px-6 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-violet-100 dark:hover:bg-violet-900/20 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            className="h-14 px-8 rounded-xl bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium transition-all shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 disabled:opacity-50"
          >
            {currentQuestionIndex + 1 < questions.length ? (
              <span className="flex items-center">
                Next <ArrowRight className="w-5 h-5 ml-2" />
              </span>
            ) : (
              <span className="flex items-center">
                Complete <CheckCircle2 className="w-5 h-5 ml-2" />
              </span>
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}
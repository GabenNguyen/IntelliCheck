import CountDown from "../CountDown";
import Question from "@/type/question";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";

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
      <div className="flex justify-center items-center min-h-screen bg-zinc-50 dark:bg-zinc-950">
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
    <div className="flex justify-center items-start min-h-screen p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 font-sans">
      <div className="w-full max-w-3xl flex flex-col pt-8 md:pt-12">
        
        {/* Top Info Header */}
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold tracking-wider text-zinc-500 dark:text-zinc-400 uppercase">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className="w-32 md:w-48 h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-zinc-900 dark:bg-zinc-100"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 px-4 py-2 rounded-2xl shadow-sm border border-zinc-200/50 dark:border-zinc-800/50">
            <CountDown
              difficulty={countDownBasedOnDifficulty}
              onTimeUp={onFinish}
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="flex-1 w-full"
          >
            <div className="bg-white dark:bg-zinc-900 rounded-[2rem] p-6 md:p-10 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 border border-zinc-200/80 dark:border-zinc-800/80">
              <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 dark:text-zinc-50 leading-snug mb-8">
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
                        ${
                          isSelected
                            ? "border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900"
                            : "border-zinc-200 dark:border-zinc-800 bg-transparent text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
                        }
                      `}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-4 text-sm font-semibold transition-colors
                        ${isSelected ? "bg-white/20 dark:bg-black/20" : "bg-zinc-100 dark:bg-zinc-800 group-hover:bg-zinc-200 dark:group-hover:bg-zinc-700"}
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
                        <div className="ml-4 w-6 h-6 rounded-full border-2 border-zinc-300 dark:border-zinc-700 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div className="flex items-center justify-between mt-8 w-full gap-4">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="h-14 px-6 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            className="h-14 px-8 rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-50"
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

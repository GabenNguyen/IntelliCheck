import CountDown from "../CountDown";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
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
      <div className="flex justify-center items-center min-h-screen bg-background">
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
    <div className="flex justify-center items-start min-h-screen p-4 md:p-8 bg-background font-sans">
      <div className="w-full max-w-2xl flex flex-col pt-8">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <div className="w-32 h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className="bg-card border border-border px-4 py-2 rounded-lg">
            <CountDown
              difficulty={countDownBasedOnDifficulty}
              onTimeUp={onFinish}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed mb-6">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedUserAnswer === option;
                  const letter = String.fromCharCode(65 + index);
                  const text = option.slice(3);

                  return (
                    <button
                      key={option}
                      onClick={() => handleSelect(option)}
                      className={`group relative w-full text-left flex items-center p-4 rounded-lg border-2 transition-all duration-200 outline-none
                        ${isSelected
                          ? "border-primary bg-primary/10 text-foreground"
                          : "border-border bg-transparent hover:border-primary/50 hover:bg-muted/50"
                        }
                      `}
                    >
                      <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 text-sm font-medium
                        ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground group-hover:bg-primary/20"}
                      `}>
                        {letter}
                      </div>
                      <span className="flex-1 text-base">{text}</span>

                      {isSelected ? (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </motion.div>
                      ) : (
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center justify-between mt-6 w-full gap-4">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="h-11 px-5 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            className="h-11 px-6 rounded-lg"
          >
            {currentQuestionIndex + 1 < questions.length ? (
              <>
                Next <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Complete <CheckCircle2 className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

      </div>
    </div>
  );
}
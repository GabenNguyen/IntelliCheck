import CountDown from "../CountDown";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import type { QuestionUI } from "@/app/quiz/types";

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
      <div className="flex min-h-[50vh] items-center justify-center">
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
      toast.warning("Select an answer to continue");
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
    <div className="flex justify-center px-4 py-10 md:py-14">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1 space-y-2">
            <p className="text-sm text-muted-foreground tabular-nums">
              Question {currentQuestionIndex + 1} of {questions.length}
            </p>
            <div
              className="h-1 max-w-48 overflow-hidden rounded-full bg-muted"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Quiz progress"
            >
              <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="rounded-md border border-border bg-card px-3 py-1.5">
            <CountDown difficulty={countDownBasedOnDifficulty} onTimeUp={onFinish} />
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 md:p-8">
          <h2 className="text-xl font-medium leading-relaxed text-foreground md:text-2xl">
            {currentQuestion.question}
          </h2>

          <div className="mt-6 space-y-2" role="group" aria-label="Answer options">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedUserAnswer === option;
              const letter = String.fromCharCode(65 + index);
              const text = option.slice(3);

              return (
                <button
                  key={option}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleSelect(option)}
                  className={`flex w-full items-center rounded-md border p-3 text-left text-sm transition-colors
                    ${isSelected
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                    }
                  `}
                >
                  <span
                    className={`mr-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-medium
                      ${isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}
                    `}
                  >
                    {letter}
                  </span>
                  <span className="flex-1 text-foreground">{text}</span>
                  {isSelected && <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
            className="h-10 px-4"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>

          <Button onClick={handleNext} className="h-10 px-5">
            {currentQuestionIndex + 1 < questions.length ? (
              <>
                Next
                <ArrowRight className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Complete
                <CheckCircle2 className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

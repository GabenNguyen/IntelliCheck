import CountDown from '../CountDown';
import Question from '@/type/question';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from "sonner";
import { AnimatePresence, motion } from 'framer-motion';
import { Spinner } from '@/components/ui/spinner';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Props {
    questions: Question[]
    userAnswer: (string | null)[]
    setUserAnswer: ((answer: (string | null)[]) => void)
    currentQuestionIndex: number
    setCurrentQuestionIndex: (index: number) => void
    countDownBasedOnDifficulty: string
    onFinish: () => void
}

function QuizQuestions( {
  questions, 
  userAnswer, 
  setUserAnswer, 
  currentQuestionIndex, 
  setCurrentQuestionIndex,
  countDownBasedOnDifficulty,
  onFinish
}: Props) {
  const currentQuestion = questions[currentQuestionIndex];
  
  // prevent undefined (empty questions)
  if (!currentQuestion || !currentQuestion.options) {
    return <div className="flex justify-center items-center"><Spinner /></div>;
  }
  
  const selectedUserAnswer = userAnswer[currentQuestionIndex];
  
  const handleSelect = (option: string) => {
    const updatedSelectedUserAnswer = [...userAnswer];
    updatedSelectedUserAnswer[currentQuestionIndex] = `${option.charAt(0)}) ${option.slice(3)}`; // store full answer
    setUserAnswer(updatedSelectedUserAnswer);
  };
  
  const handleMoveNextQuestion = () => {
    if(!selectedUserAnswer) {
      return toast.warning("Please select an answer!");
    }
    if(currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onFinish();
    }
  };
  
  const handleMovePrevQuestion = () => {
    if(currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  return (
    <Card className="w-full max-w-4xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_70px_-15px_rgba(0,0,0,0.8)] border-0 rounded-4xl overflow-hidden backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 relative">
        <CardHeader className='space-y-4 pt-8 pb-4 px-6 md:px-12'>
          {/* Question Counter & Timer */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <span className='px-4 py-2 bg-linear-to-r from-blue-100 to-purple-100 dark:from-blue-950/30 dark:to-purple-950/30 rounded-full text-sm font-semibold text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900'>
                Question {currentQuestionIndex + 1} / {questions.length}
              </span>
            </div>
            <CountDown 
              difficulty={countDownBasedOnDifficulty}
              onTimeUp={onFinish}
            />
          </div>

          {/* Progress Bar */}
          <div className='flex items-center gap-3'>
            <Button
              className='h-10 w-10 p-0 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all active:scale-90 shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={handleMovePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="w-5 h-5"/> 
            </Button>
            
            <div className="flex-1 space-y-2">
              <Progress className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-800" value={(((currentQuestionIndex + 1) / questions.length)) * 100} />
              <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>Progress</span>
                <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
              </div>
            </div>
            
            <Button
              className='h-10 w-10 p-0 rounded-full border-2 border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all active:scale-90 shadow-md disabled:opacity-50 disabled:cursor-not-allowed'
              onClick={handleMoveNextQuestion}
              disabled={!selectedUserAnswer}
            >
              {currentQuestionIndex + 1 < questions.length ? (
                <ArrowRight className="w-5 h-5"/>
              ) : (
                <CheckCircle2 className="w-5 h-5"/>
              )}
            </Button>
          </div>
        </CardHeader>

        <AnimatePresence mode='wait'>
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeIn"  }}
            className="grid gap-6"
          >
            {/* Question */}
            <CardTitle className='text-2xl md:text-3xl font-bold text-center text-slate-900 dark:text-white max-h-40 overflow-auto px-6 md:px-12 leading-relaxed'>
              {currentQuestion.question}
            </CardTitle>
            
            {/* Options */}
            <CardContent className="grid gap-3 px-6 md:px-12 max-h-96 overflow-auto">
              {currentQuestion.options.map((option: string, index: number) => {
                const isSelected = selectedUserAnswer === option;
                return (
                  <Button 
                    key={option}
                    variant="outline"
                    className={`cursor-pointer w-full min-h-16 p-4 text-left justify-start rounded-xl border-2 transition-all duration-200 active:scale-[0.98] text-base ${
                      isSelected 
                        ? "bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-transparent shadow-lg font-semibold" 
                        : "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20 text-slate-700 dark:text-slate-300"
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    <span className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold ${
                      isSelected 
                        ? "bg-white/20 text-white" 
                        : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option.slice(3)}</span>
                    {isSelected && <CheckCircle2 className="w-5 h-5 ml-2 shrink-0" />}
                  </Button>
                );
              })}
            </CardContent>
            
            <CardFooter className="flex justify-center px-6 md:px-12 pb-8 pt-2">
              <Button 
                className='w-full md:w-auto px-8 py-6 rounded-xl font-semibold text-base bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                onClick={handleMoveNextQuestion}
              >
                {currentQuestionIndex + 1 < questions.length ? (
                  <span className="flex items-center gap-2">
                    Next Question <ArrowRight className="w-5 h-5" />
                  </span>
                ) : (
                  <span className="cursor-pointer flex items-center gap-2">
                    Finish Quiz <CheckCircle2 className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </CardFooter>
          </motion.div>
        </AnimatePresence>
      </Card>
  );
}

export default QuizQuestions
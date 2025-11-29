import CountDown from '../CountDown';
import Question from '@/type/question';
import { Button } from '@/components/ui/button';
import { Progress } from "@/components/ui/progress"
import { ArrowLeft } from 'lucide-react';
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
      <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
        <CardHeader className='text-center space-y-3'>
          <div className='flex justify-between text-sm text-gray-500 dark:text-gray-400'>
              Question: {currentQuestionIndex + 1} / {questions.length}
          </div>
          </CardHeader>
          <div className='flex justify-around gap-2'>
              <Button
                className='cursor-pointer text-black border border-black bg-transparent hover:text-white mb-2 transition-all active:scale-90'
                onClick={handleMovePrevQuestion}
              >
                  <ArrowLeft className="w-5 h-5 mx-1"/> 
              </Button>
              <Progress className="h-2 rounded-full mt-3" value={(((currentQuestionIndex + 1) / questions.length)) * 100} />
          </div>
          <CountDown 
            difficulty={countDownBasedOnDifficulty}
            onTimeUp={onFinish}
          />
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, ease: "easeIn"  }}
              className="grid gap-4"
            >
              <CardTitle className='text-3xl font-bold mt-3 text-center'>{currentQuestion.question}</CardTitle>
              <CardContent className="grid gap-4 mt-4">
                {currentQuestion.options.map((option: string) => (
                  <Button 
                    key={option}
                    variant={ selectedUserAnswer === option ? "default" : "outline"}
                    className="w-full cursor-pointer active:scale-95 border-black transition-all"
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </Button>
                ))}
              </CardContent>
              <CardFooter className="flex justify-center mt-3">
                <Button 
                  className='cursor-pointer active:scale-90 flex justify-center mt-3'
                  onClick={handleMoveNextQuestion}
                >
                  {currentQuestionIndex + 1 < questions.length ? "Next question" : "Finish quiz"}
                </Button>
              </CardFooter>
            </motion.div>
          </AnimatePresence>
      </Card>

  );

}

export default QuizQuestions
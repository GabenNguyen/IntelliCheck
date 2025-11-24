import Question from '@/type/question';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { toast } from "sonner"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface QuizSetupProps {
    topic: string
    difficulty: string
    numberOfQuestions: string
    setTopic: (topic: string) => void
    setDifficulty: (difficulty: string) => void
    setNumberOfQuestions: (number: string) => void
    handleStartQuiz: () =>  void
    isLoading: boolean
}

function QuizSetup( {} ) {

}

export default QuizSetup;
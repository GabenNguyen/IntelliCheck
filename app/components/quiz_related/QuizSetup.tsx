import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";

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

interface Props {
    topic: string
    difficulty: string
    numberOfQuestions: string
    setTopic: (topic: string) => void
    setDifficulty: (difficulty: string) => void
    setNumberOfQuestions: (number: string) => void
    handleStartQuiz: () =>  void
    isLoading: boolean
}

function QuizSetup({ 
  topic, 
  difficulty, 
  numberOfQuestions, 
  setTopic, 
  setDifficulty, 
  setNumberOfQuestions, 
  handleStartQuiz, 
  isLoading 
}: Props ) {
  return (
        <Card className="w-full max-w-3xl shadow-2xl border border-gray-400 dark:border-gray-700 rounded-2xl p-6">
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-4xl font-extrabold tracking-tight">
                <span className="text-blue-600">What are you up to?</span> 
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
                Select a topic, choose the difficulty and the number of questions then you're all good to go
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleStartQuiz}>
              <CardContent className="space-y-6 text-center text-lg">
                <Label htmlFor='topic' className='flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold text-lg mb-1'>Topic</Label>
                <Input
                    id='topic'
                    className="shadow-lg border-black"
                    type="text"
                    placeholder="E.g. Art, History, Programming Languages."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <Label htmlFor='difficulty' className='flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold text-lg mb-1'>Difficulty</Label>
                <Select value={difficulty} onValueChange={(difficulty) => setDifficulty(difficulty)}>
                    <SelectTrigger id='difficulty' className="w-full shadow-lg cursor-pointer border-black">
                        <SelectValue placeholder="Choose your difficulty"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Difficulty</SelectLabel>
                            <SelectItem value="easy" className='cursor-pointer hover:font-bold hover:text-lg'>Easy</SelectItem>
                            <SelectItem value="medium" className='cursor-pointer hover:font-bold hover:text-lg'>Medium</SelectItem>
                            <SelectItem value="hard" className='cursor-pointer hover:font-bold hover:text-lg'>Hard</SelectItem>
                            <SelectItem value="asian" className='cursor-pointer hover:font-bold hover:text-lg'>Asian</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Label htmlFor='numOfQuestions' className='flex items-center gap-2 text-gray-700 dark:text-gray-300 font-semibold text-lg mb-1'>Number of Questions</Label>
                <Input 
                    id='numOfQuestions'
                    className="shadow-lg border-black"
                    type='number'
                    min={1}
                    max={50}
                    placeholder="Choose the number of questions"
                    value={numberOfQuestions}
                    onChange={(e) => setNumberOfQuestions(e.target.value)}
                    required
                />
                <CardFooter className="flex justify-center">
                  <Button 
                  className="cursor-pointer active:scale-90 transition-all" 
                  type='submit' 
                  onClick={handleStartQuiz}
                  disabled={isLoading}
                  >
                    {isLoading ? <> Generating Quiz<Spinner /> </> : "Generate Quiz"}
                  </Button>
                </CardFooter>
            </CardContent>
        </form>
      </Card>
  )
}

export default QuizSetup;
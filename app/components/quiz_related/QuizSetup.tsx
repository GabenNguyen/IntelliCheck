import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  topic: string;
  difficulty: string;
  numberOfQuestions: string;
  setTopic: (topic: string) => void;
  setDifficulty: (difficulty: string) => void;
  setNumberOfQuestions: (number: string) => void;
  handleStartQuiz: () => void;
  isLoading: boolean;
}

function QuizSetup({
  topic,
  difficulty,
  numberOfQuestions,
  setTopic,
  setDifficulty,
  setNumberOfQuestions,
  handleStartQuiz,
  isLoading,
}: Props) {
  return (
    <>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>
      <Card className="w-full max-w-3xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_70px_-15px_rgba(0,0,0,0.8)] border-0 rounded-4xl overflow-hidden backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 relative">
        <CardHeader className="text-center space-y-6 pt-12 pb-8 px-6 md:px-12">
          <CardTitle className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            <span className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              What are you up to?
            </span>
          </CardTitle>
          <CardDescription className="text-base md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Select a topic, choose the difficulty and the number of questions
            then you&apos;re all good to go
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleStartQuiz}>
          <CardContent className="space-y-6 px-6 md:px-12 pb-8">
            {/* Topic Input */}
            <div className="space-y-2">
              <Label
                htmlFor="topic"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-base"
              >
                <span className="text-lg">📚</span> Topic
              </Label>
              <Input
                id="topic"
                className="h-12 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400"
                type="text"
                placeholder="E.g. Art, History, Programming Languages"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
              />
            </div>

            {/* Difficulty Select */}
            <div className="space-y-2">
              <Label
                htmlFor="difficulty"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-base"
              >
                <span className="text-lg">🎯</span> Difficulty
              </Label>
              <Select
                value={difficulty}
                onValueChange={(difficulty) => setDifficulty(difficulty)}
              >
                <SelectTrigger
                  id="difficulty"
                  className="h-12 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 dark:bg-slate-800/50 cursor-pointer hover:border-slate-300 dark:hover:border-slate-600"
                >
                  <SelectValue placeholder="Choose your difficulty" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <SelectGroup>
                    <SelectLabel className="text-slate-500 dark:text-slate-400 font-semibold">
                      Difficulty Level
                    </SelectLabel>
                    <SelectItem
                      value="easy"
                      className="cursor-pointer hover:bg-green-50 dark:hover:bg-green-950/20 rounded-lg my-1 focus:bg-green-100 dark:focus:bg-green-900/30"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-green-600 dark:text-green-400">
                          ●
                        </span>{" "}
                        Easy
                      </span>
                    </SelectItem>
                    <SelectItem
                      value="medium"
                      className="cursor-pointer hover:bg-yellow-50 dark:hover:bg-yellow-950/20 rounded-lg my-1 focus:bg-yellow-100 dark:focus:bg-yellow-900/30"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-yellow-600 dark:text-yellow-400">
                          ●
                        </span>{" "}
                        Medium
                      </span>
                    </SelectItem>
                    <SelectItem
                      value="hard"
                      className="cursor-pointer hover:bg-orange-50 dark:hover:bg-orange-950/20 rounded-lg my-1 focus:bg-orange-100 dark:focus:bg-orange-900/30"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-orange-600 dark:text-orange-400">
                          ●
                        </span>{" "}
                        Hard
                      </span>
                    </SelectItem>
                    <SelectItem
                      value="asian"
                      className="cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg my-1 focus:bg-red-100 dark:focus:bg-red-900/30"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-red-600 dark:text-red-400">
                          ●
                        </span>{" "}
                        Asian
                      </span>
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Number of Questions Input */}
            <div className="space-y-2">
              <Label
                htmlFor="numOfQuestions"
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold text-base"
              >
                <span className="text-lg">🔢</span> Number of Questions
              </Label>
              <Input
                id="numOfQuestions"
                className="h-12 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder:text-slate-400"
                type="number"
                min={1}
                max={50}
                placeholder="Choose the number of questions"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
                required
              />
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-1">
                Choose between 1-50 questions
              </p>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center px-6 md:px-12 pb-12">
            <Button
              className="
              cursor-pointer w-full md:w-auto px-8 py-6 text-base md:text-lg font-semibold
              rounded-xl text-white
              bg-linear-to-r from-blue-600 via-purple-600 to-pink-600
              hover:from-blue-700 hover:via-purple-700 hover:to-pink-700
              shadow-lg shadow-purple-500/30
              hover:shadow-xl hover:shadow-purple-500/40
              active:scale-95
              transition-all duration-200
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            "
              type="button"
              onClick={handleStartQuiz}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <Spinner />
                  <span>Generating Quiz...</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>Generate Quiz</span>
                  <span className="text-xl">✨</span>
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
export default QuizSetup;

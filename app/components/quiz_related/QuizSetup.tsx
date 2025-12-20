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

const difficulties = [
  { value: "easy", color: "green" },
  { value: "medium", color: "yellow" },
  { value: "hard", color: "orange" },
  { value: "asian", color: "red" },
];

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
    <div className="relative flex flex-col min-h-screen w-full items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
      {/* Subtle background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 dark:bg-blue-900/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/20 dark:bg-purple-900/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Card */}
      <Card
        className="
        relative z-10 w-full max-w-4xl min-w-[360px] min-h-[70vh] rounded-3xl
        border border-zinc-200/50 dark:border-zinc-800/50
        bg-white/90 dark:bg-zinc-900/80 backdrop-blur-xl
        shadow-md"
      >
        {/* Header */}
        <CardHeader className="text-center space-y-4 pt-12 pb-8 px-6 md:px-12">
          <CardTitle className="text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            <span className="text-black dark:text-white">
              What are you up to?
            </span>
          </CardTitle>
          <CardDescription className="text-base md:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Choose your topic, difficulty, and number of questions to get
            started.
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <form onSubmit={handleStartQuiz}>
          <CardContent className="flex flex-col justify-between space-y-6 px-6 md:px-12 py-8">
            {/* Topic Input */}
            <div className="space-y-2">
              <Label
                htmlFor="topic"
                className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300 text-base"
              >
                📚 Topic
              </Label>
              <Input
                id="topic"
                type="text"
                placeholder="E.g. History, Art, Programming"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="h-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-slate-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full"
              />
            </div>

            {/* Difficulty Select */}
            <div className="space-y-2">
              <Label
                htmlFor="difficulty"
                className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300 text-base"
              >
                🎯 Difficulty
              </Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger
                  id="difficulty"
                  className="h-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-600 w-full"
                >
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800">
                  <SelectGroup>
                    <SelectLabel className="text-zinc-500 dark:text-zinc-400 font-semibold">
                      Levels
                    </SelectLabel>
                    {difficulties.map((level) => (
                      <SelectItem
                        key={level.value}
                        value={level.value}
                        className={`rounded-lg my-1 cursor-pointer
                          ${
                            level.value === "easy"
                              ? "hover:bg-green-50 dark:hover:bg-green-950/20 focus:bg-green-100 dark:focus:bg-green-900/30"
                              : ""
                          }
                          ${
                            level.value === "medium"
                              ? "hover:bg-yellow-50 dark:hover:bg-yellow-950/20 focus:bg-yellow-100 dark:focus:bg-yellow-900/30"
                              : ""
                          }
                          ${
                            level.value === "hard"
                              ? "hover:bg-orange-50 dark:hover:bg-orange-950/20 focus:bg-orange-100 dark:focus:bg-orange-900/30"
                              : ""
                          }
                          ${
                            level.value === "asian"
                              ? "hover:bg-red-50 dark:hover:bg-red-950/20 focus:bg-red-100 dark:focus:bg-red-900/30"
                              : ""
                          }
                        `}
                      >
                        <span className="flex items-center gap-2">
                          {/* Colored Dot */}
                          <span
                            className={
                              level.value === "easy"
                                ? "h-3 w-3 rounded-full bg-green-600 dark:bg-green-400 inline-block"
                                : level.value === "medium"
                                ? "h-3 w-3 rounded-full bg-yellow-600 dark:bg-yellow-400 inline-block"
                                : level.value === "hard"
                                ? "h-3 w-3 rounded-full bg-orange-600 dark:bg-orange-400 inline-block"
                                : "h-3 w-3 rounded-full bg-red-600 dark:bg-red-400 inline-block"
                            }
                          />
                          {level.value.charAt(0).toUpperCase() +
                            level.value.slice(1)}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Number of Questions */}
            <div className="space-y-2">
              <Label
                htmlFor="numOfQuestions"
                className="flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300 text-base"
              >
                🔢 Number of Questions
              </Label>
              <Input
                id="numOfQuestions"
                type="number"
                min={1}
                max={50}
                placeholder="1-50 questions"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(e.target.value)}
                required
                className="h-12 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50 text-slate-900 dark:text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 w-full"
              />
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 ml-1">
                Choose between 1–50 questions
              </p>
            </div>
          </CardContent>

          {/* Start Quiz Button */}
          <CardFooter className="flex justify-center px-6 md:px-12 pb-12">
            <Button
              type="button"
              onClick={handleStartQuiz}
              disabled={isLoading}
              className="
                cursor-pointer w-full md:w-auto px-8 py-4 font-semibold rounded-xl
                text-white bg-linear-to-r from-blue-600 to-purple-600
                hover:from-blue-700 hover:to-purple-700
                shadow-lg shadow-purple-400/30 hover:shadow-xl
                active:scale-95 transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {isLoading ? (
                <span className="flex items-center gap-3">
                  <Spinner />
                  Generating Quiz...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Generate Quiz ✨
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default QuizSetup;

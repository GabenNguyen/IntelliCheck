import { motion } from "framer-motion";
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
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sparkles, BookOpen, Target, Hash } from "lucide-react";

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
  { value: "easy", color: "bg-emerald-500", label: "Easy" },
  { value: "medium", color: "bg-amber-500", label: "Medium" },
  { value: "hard", color: "bg-orange-500", label: "Hard" },
  { value: "asian", color: "bg-red-600", label: "Asian" },
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
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-zinc-50 dark:bg-zinc-950 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <Card className="border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl shadow-zinc-200/50 dark:shadow-black/50 bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStartQuiz();
            }}
          >
            <CardHeader className="text-center pt-10 pb-6 px-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                className="w-16 h-16 mx-auto bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6"
              >
                <Sparkles className="w-8 h-8 text-blue-500" />
              </motion.div>
              <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
                Configure Your Quiz
              </CardTitle>
              <CardDescription className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base">
                Customize the parameters below to generate a tailored testing experience.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8 px-8 pb-8">
              {/* Topic */}
              <div className="space-y-3">
                <Label htmlFor="topic" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  <BookOpen className="w-4 h-4 text-zinc-400" /> Topic
                </Label>
                <div className="relative">
                  <Input
                    id="topic"
                    type="text"
                    placeholder="e.g. React Native, European History..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                    className="h-14 pl-4 rounded-xl border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 hover:dark:bg-zinc-800 focus-visible:ring-blue-500 transition-all text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
                  />
                </div>
              </div>

              {/* Difficulty */}
              <div className="space-y-3">
                <Label htmlFor="difficulty" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  <Target className="w-4 h-4 text-zinc-400" /> Difficulty Level
                </Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="h-14 px-4 text-base rounded-xl border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 focus:ring-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:focus:ring-zinc-300">
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl">
                    <SelectGroup>
                      {difficulties.map((level) => (
                        <SelectItem
                          key={level.value}
                          value={level.value}
                          className="rounded-lg my-1 cursor-pointer focus:bg-zinc-100 dark:focus:bg-zinc-800 transition-colors py-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${level.color}`} />
                            <span className="font-medium text-base text-zinc-700 dark:text-zinc-200">{level.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Number of Questions */}
              <div className="space-y-3">
                <Label htmlFor="numOfQuestions" className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  <Hash className="w-4 h-4 text-zinc-400" /> Question Count
                </Label>
                <div className="relative">
                  <Input
                    id="numOfQuestions"
                    type="number"
                    min={1}
                    max={50}
                    placeholder="Between 1 and 50"
                    value={numberOfQuestions}
                    onChange={(e) => setNumberOfQuestions(e.target.value)}
                    required
                    className="h-14 pl-4 rounded-xl border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 hover:bg-zinc-100 hover:dark:bg-zinc-800 focus-visible:ring-blue-500 transition-all text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-950 dark:ring-offset-zinc-950 dark:placeholder:text-zinc-400 dark:focus-visible:ring-zinc-300"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="px-8 pb-10 pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 text-base font-semibold rounded-xl bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-50 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 shadow-lg shadow-zinc-900/20 dark:shadow-white/10"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Spinner /> Creating Session...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Generate Quiz
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
}

export default QuizSetup;

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
import { Sparkles, BookOpen, Target, Hash, Terminal, Cpu, Zap } from "lucide-react";

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
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-slate-50 via-white to-violet-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950/20 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-xl"
      >
        <Card className="border border-violet-500/20 shadow-xl shadow-violet-500/10 bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-indigo-500 to-cyan-500" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-violet-500/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
          
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
                className="w-16 h-16 mx-auto bg-gradient-to-br from-violet-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-violet-500/30"
              >
                <Terminal className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                Configure Your Quiz
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400 text-sm md:text-base">
                Customize the parameters below to generate a tailored testing experience.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8 px-8 pb-8">
              <div className="space-y-3">
                <Label htmlFor="topic" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <BookOpen className="w-4 h-4 text-violet-500" /> Topic
                </Label>
                <div className="relative">
                  <Input
                    id="topic"
                    type="text"
                    placeholder="e.g. React Native, European History..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    required
                    className="input-tech h-14 pl-4 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 hover:dark:bg-slate-800 focus-visible:ring-violet-500 transition-all text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:ring-offset-slate-900 dark:placeholder:text-slate-500 dark:focus-visible:ring-violet-400"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="difficulty" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <Target className="w-4 h-4 text-indigo-500" /> Difficulty Level
                </Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="input-tech h-14 px-4 text-base rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800/50 focus:ring-violet-500 transition-all focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:ring-offset-slate-900 dark:focus:ring-violet-400">
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border border-violet-500/20 bg-white dark:bg-slate-900 shadow-xl shadow-violet-500/10">
                    <SelectGroup>
                      {difficulties.map((level) => (
                        <SelectItem
                          key={level.value}
                          value={level.value}
                          className="rounded-lg my-1 cursor-pointer focus:bg-violet-50 dark:focus:bg-violet-900/20 transition-colors py-3"
                        >
                          <div className="flex items-center gap-3">
                            <span className={`w-2 h-2 rounded-full ${level.color}`} />
                            <span className="font-medium text-base text-slate-700 dark:text-slate-200">{level.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="numOfQuestions" className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  <Hash className="w-4 h-4 text-cyan-500" /> Question Count
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
                    className="input-tech h-14 pl-4 rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 hover:dark:bg-slate-800 focus-visible:ring-violet-500 transition-all text-base file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:ring-offset-slate-900 dark:placeholder:text-slate-500 dark:focus-visible:ring-violet-400"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="px-8 pb-10 pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-14 text-base font-semibold rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Spinner /> Creating Session...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
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
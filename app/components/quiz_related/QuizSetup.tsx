import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
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
import { BookOpen, Target, Hash, Sparkles } from "lucide-react";
import { IT_FUN_FACTS } from "@/utils/it-facts";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogCancel } from "@/components/ui/alert-dialog";

interface Props {
  topic: string;
  difficulty: string;
  numberOfQuestions: string;
  setTopic: (topic: string) => void;
  setDifficulty: (difficulty: string) => void;
  setNumberOfQuestions: (number: number) => void;
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
  const [showFactAlert, setShowFactAlert] = useState(false);

  const getRandomFact = () => {
    const shuffled = [...IT_FUN_FACTS].sort(() => 0.5 - Math.random());
    return shuffled[0];
  };

  useEffect(() => {
    if (isLoading) {
      setShowFactAlert(true);
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-background font-sans">
      <div className="w-full max-w-lg">
        <Card className="border-border">
          <CardHeader className="text-center pt-8 pb-6">
            <div className="w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <CardTitle className="text-2xl font-bold">Configure Your Quiz</CardTitle>
            <CardDescription>
              Customize the parameters below to generate a tailored testing experience.
            </CardDescription>
          </CardHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleStartQuiz();
            }}
          >
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="topic" className="flex items-center gap-2 text-sm font-medium">
                  <BookOpen className="w-4 h-4 text-muted-foreground" /> Topic
                </Label>
                <Input
                  id="topic"
                  type="text"
                  placeholder="e.g. React Native, European History..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  required
                  className="h-11 rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty" className="flex items-center gap-2 text-sm font-medium">
                  <Target className="w-4 h-4 text-muted-foreground" /> Difficulty Level
                </Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger className="h-11 rounded-lg">
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {difficulties.map((level) => (
                        <SelectItem
                          key={level.value}
                          value={level.value}
                          className="rounded-md"
                        >
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${level.color}`} />
                            <span>{level.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numOfQuestions" className="flex items-center gap-2 text-sm font-medium">
                  <Hash className="w-4 h-4 text-muted-foreground" /> Question Count
                </Label>
                <Input
                  id="numOfQuestions"
                  type="number"
                  min={1}
                  max={50}
                  placeholder="Between 1 and 50"
                  value={numberOfQuestions}
                  onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                  required
                  className="h-11 rounded-lg"
                />
              </div>
            </CardContent>

            <CardFooter className="pb-8 pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 rounded-lg"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="h-4 w-4" />
                    Creating Session...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Generate Quiz
                  </span>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <AlertDialog open={showFactAlert} onOpenChange={setShowFactAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>IT Fun Fact</AlertDialogTitle>
              <AlertDialogDescription>
                Interesting tech tidbit to enjoy while we prepare your quiz
              </AlertDialogDescription>
            </AlertDialogHeader>
            <p className="text-foreground">{getRandomFact()}</p>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setShowFactAlert(false)}>
                Got it!
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default QuizSetup;
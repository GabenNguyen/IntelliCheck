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
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
  { value: "asian", label: "Asian" },
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
    <div className="flex min-h-[calc(100vh-4rem)] w-full items-start justify-center px-4 py-10 md:py-16">
      <Card className="w-full max-w-lg border-border">
        <CardHeader className="pb-6">
          <CardTitle className="text-2xl font-semibold tracking-tight">Create a quiz</CardTitle>
          <CardDescription>
            Choose a topic and IntelliCheck will write the questions.
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
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                type="text"
                placeholder="e.g. React Native, European History"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger id="difficulty" className="h-10">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {difficulties.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="numOfQuestions">Questions</Label>
              <Input
                id="numOfQuestions"
                type="number"
                min={1}
                max={50}
                placeholder="Between 1 and 50"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                required
                className="h-10"
              />
            </div>
          </CardContent>

          <CardFooter className="flex-col items-stretch gap-3 pb-8 pt-2">
            <Button type="submit" disabled={isLoading} className="h-10 w-full">
              {isLoading ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Generating questions
                </>
              ) : (
                "Generate quiz"
              )}
            </Button>
            {isLoading && (
              <p className="text-center text-xs text-muted-foreground" role="status">
                This can take a moment. Please keep this tab open.
              </p>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default QuizSetup;

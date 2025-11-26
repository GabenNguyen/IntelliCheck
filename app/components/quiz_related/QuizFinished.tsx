import { Card, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';

interface Props {
    onShowResult: () => void
}

function QuizFinished( { onShowResult }: Props ) {
    return (
        <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
            <CardTitle className="text-3xl font-bold">
                🎉 Congratulations! You have finished the quiz
            </CardTitle>
            <Button 
                className="cursor-pointer mt-4 active:scale-90 transition-all"
                onClick={onShowResult}
            >
                Show Results
            </Button>
        </Card>
    )
}

export default QuizFinished
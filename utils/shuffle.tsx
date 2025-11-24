import Question from "@/type/question";

const shuffleQuestions = (questions: Question[]): Question[] => {
    const shuffledQuestions = [...questions];
    for (let originalIndex = shuffledQuestions.length - 1; originalIndex > 0; originalIndex--) {
        const randomIndex = Math.floor(Math.floor(Math.random() * (originalIndex + 1)));
        [shuffledQuestions[originalIndex], shuffledQuestions[randomIndex]] = [shuffledQuestions[randomIndex], shuffledQuestions[originalIndex]];
    }

    return shuffledQuestions;
}

export default shuffleQuestions;
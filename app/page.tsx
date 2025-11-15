import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ArrowRight } from "lucide-react";

import Link from "next/link";


export default function Home() {
  return (
    <div className="flex justify-center items-center max-h-screen bg-linear-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black p-6">
      <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-4xl font-extrabold tracking-tight">
            Welcome to <span className="text-blue-600">QuizGenie</span> 🧠
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
            Generate AI-powered quizzes on any topic. Learn faster, test smarter.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-center text-lg">
          <p className="text-gray-700 dark:text-gray-300">
            Type a topic, pick your difficulty, and let AI create a custom quiz just for you.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Whether you are revising for exams or just having fun — <span className="text-blue-600 font-semibold">QuizGenie</span> got you covered.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <button className="cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-3 px-2 border border-blue-500 hover:border-transparent rounded active:scale-90 transition-all">
            <Link className="flex items-center" href={`/quiz`}> Start a Quiz <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1 mx-1"/> </Link>
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}

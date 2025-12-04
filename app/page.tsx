import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { currentUser } from "@clerk/nextjs/server";

import { ArrowRight } from "lucide-react";

import Link from "next/link";

export default async function Home() {

  // display user name when signing in
  const user = await currentUser();
  
  const userName = user?.username || user?.firstName|| "";


  return (
    <div className="min-h-screen flex justify-center items-center bg-linear-to-br from-blue-50 via-purple-50 to-white dark:from-gray-950 dark:via-blue-950 dark:to-gray-900 p-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      <Card className="w-full max-w-3xl shadow-2xl border-2 border-blue-100 dark:border-gray-700 rounded-3xl p-8 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 relative z-10 hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 transition-all duration-300">
        <CardHeader className="text-center space-y-4 pb-6">
          <CardTitle className="text-5xl md:text-6xl font-extrabold tracking-tight bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent animate-gradient">
            {userName ? `Welcome, ${userName}!` : "Welcome to IntelliCheck!" }
          </CardTitle>
          <CardDescription className="text-xl text-gray-600 dark:text-gray-300 font-medium max-w-2xl mx-auto">
            Generate AI-powered quizzes on any topic. Learn faster, test smarter.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-center text-lg pb-8">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Type a topic, pick your difficulty, and let AI create a custom quiz just for you.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Whether you are revising for exams or just having fun — <span className="text-blue-600 dark:text-blue-400 font-bold">IntelliCheck</span> got you covered.
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold border border-blue-200 dark:border-blue-800">
              ✨ AI-Powered
            </span>
            <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold border border-purple-200 dark:border-purple-800">
              🎯 Customizable
            </span>
            <span className="px-4 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold border border-green-200 dark:border-green-800">
              ⚡ Instant Results
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center pt-4">
          <Link className="flex items-center" href={`/quiz`}> 
              <button className="group relative cursor-pointer bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl active:scale-95 transition-all duration-200 flex items-center overflow-hidden">
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></span>
                <span className="relative z-10">Start a Quiz</span>
                <ArrowRight className="relative z-10 w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-2"/> 
              </button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
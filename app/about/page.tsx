import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

function About() {
    return (
      <div className="flex justify-center items-center max-h-screen bg-gradient-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black p-6">
      <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-4xl font-extrabold tracking-tight">
            Hi there 👋
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-white">
            Are you preparing for your exam, or just simply want to test your knowledge?
            <span className="text-blue-600 text-xl font-semibold"> QuizGenie </span> got you covered ✅
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-center text-lg">
          <p className="text-gray-700 dark:text-gray-300">
            We created this AI-powered quiz app to make learning smarter, faster, and more fun. 
            Instead of static question banks, our app uses artificial intelligence to generate 
            quizzes that adapt to your knowledge level. Every question comes with clear 
            explanations, so you don’t just memorize answers—you truly understand them.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Whether you’re preparing for exams, sharpening your skills, or exploring new 
            topics out of curiosity, our app is designed to keep you engaged and motivated. 
            We’re passionate about using technology to make education interactive and 
            accessible for everyone.
          </p>

          <p className="text-gray-700 dark:text-gray-300 text-2xl">
              Happy Learning!
          </p>
        </CardContent>
      </Card>
    </div>
    );
}
export default About
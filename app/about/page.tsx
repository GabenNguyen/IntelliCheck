import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

function About() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-blue-100 to-white dark:from-gray-900 dark:to-black p-6">
      <Card className="w-full max-w-3xl shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-6">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-4xl font-extrabold tracking-tight">
            Hi there 👋
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-white">
            Are you preparing for your exam, or just simply want to test your knowledge?
            <span className="text-blue-600 text-xl font-semibold"> IntelliCheck </span> got you covered ✅
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-center text-lg">
          <p className="text-gray-700 dark:text-gray-300">
            I created this AI-powered quiz app to make learning smarter, faster, and more fun. 
            Instead of static question banks, the app uses artificial intelligence to generate 
            quizzes that adapt to your knowledge level. Every question comes with 
            explanations, so you don&apos;t just memorize the answers but truly understand them.
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            Whether you&apos;re preparing for exams, sharpening your skills, or exploring new 
            topics out of curiosity, this application is designed to keep you engaged and motivated.
            <br></br> I&apos;m passionate about using technology to make education interactive and 
            accessible for everyone.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 border-2 border-red-600">
            <span className='text-red-500 font-bold'>❗ Caution:</span> Please be aware that AI Generated  <span className='font-bold text-lg'>answers</span> could be <span className='font-bold text-lg'>wrong</span>  and so is the <span className='font-bold text-lg'>explanations</span>. 
            Always double-check with other trusted sources if there is any doubt. <br></br> <span className='text-lg font-semibold'>Thank you for your understanding!</span>
          </p>
          
          <p className="text-black dark:text-white font-bold text-3xl">
              Good luck on your study and HAPPY LEARNING!
          </p>
        </CardContent>
      </Card>
    </div>
    );
}
export default About
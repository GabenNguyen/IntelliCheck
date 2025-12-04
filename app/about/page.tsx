import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

function About() {
    return (
      <div className="flex justify-center items-center min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-white dark:from-gray-950 dark:via-blue-950 dark:to-gray-900 p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute bottom-32 left-20 w-96 h-96 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        </div>

        <Card className="w-full max-w-3xl shadow-2xl border-2 border-blue-100 dark:border-gray-700 rounded-3xl p-8 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80 relative z-10 hover:shadow-blue-200/50 dark:hover:shadow-blue-900/50 transition-all duration-300">
          <CardHeader className="text-center space-y-4 pb-6">
            <CardTitle className="text-5xl md:text-6xl font-extrabold tracking-tight bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Hi there!
            </CardTitle>
            <CardDescription className="text-xl text-gray-700 dark:text-gray-200 leading-relaxed max-w-2xl mx-auto">
              Are you preparing for your exam, or just simply want to test your knowledge?
              <span className="block mt-4 text-2xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent"> IntelliCheck </span> 
              <span className="text-lg">got you covered ✅</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 text-center text-lg">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              I created this AI-powered quiz app to make learning smarter, faster, and more fun. 
              Instead of static question banks, the app uses artificial intelligence to generate 
              quizzes that adapt to your knowledge level. Every question comes with 
              explanations, so you don&apos;t just memorize the answers but truly understand them.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Whether you&apos;re preparing for exams, sharpening your skills, or exploring new 
              topics out of curiosity, this application is designed to keep you engaged and motivated.
              <br className="my-2"></br> I&apos;m passionate about using technology to make education interactive and 
              accessible for everyone.
            </p>
            
            {/* Caution box */}
            <div className="relative mt-8 mb-8">
              <div className="absolute inset-0 bg-linear-to-r from-red-500 to-orange-500 dark:from-red-600 dark:to-orange-600 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-red-50 dark:bg-red-950/30 border-2 border-red-400 dark:border-red-600 rounded-2xl p-6 shadow-lg">
                <div className="flex items-start gap-3 mb-3">
                  <span className='text-3xl'>⚠️</span>
                  <span className='text-red-600 dark:text-red-400 font-bold text-xl'>Important Notice</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  Please be aware that AI Generated <span className='font-bold text-red-600 dark:text-red-400 text-lg'>answers</span> could be <span className='font-bold text-red-600 dark:text-red-400 text-lg'>wrong</span> and so are the <span className='font-bold text-red-600 dark:text-red-400 text-lg'>explanations</span>. 
                  Always double-check with other trusted sources if there is any doubt.
                </p>
                <p className='text-lg font-semibold text-red-700 dark:text-red-300 mt-3'>Thank you for your understanding!</p>
              </div>
            </div>
            
            {/* closing message */}
            <div className="mt-8 p-6 bg-linear-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl border-2 border-blue-200 dark:border-blue-800">
              <p className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 font-bold text-3xl md:text-4xl leading-relaxed">
                Good luck on your study and HAPPY LEARNING!
              </p>
              <div className="flex justify-center gap-2 mt-4 text-3xl">
                <span className="animate-bounce">📚</span>
                <span className="animate-bounce delay-100">✨</span>
                <span className="animate-bounce delay-200">🎓</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
}
export default About
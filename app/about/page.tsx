"use client";

import { motion } from "framer-motion";

function About() {
  return (
    <div className="min-h-screen w-full flex justify-center py-20 px-6 md:px-12 bg-zinc-50 dark:bg-zinc-950 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl w-full"
      >
        {/* HEADER */}
        <div className="space-y-6 pb-12 border-b border-zinc-200 dark:border-zinc-800">
          <h1 className="flex items-center text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Hi there <span className="ml-3 motion-rotate-loop-6">👋</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
            Preparing for exams or simply testing your knowledge?{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              IntelliCheck helps you learn smarter with AI-generated quizzes.
            </span>
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-10 py-12 text-base md:text-lg">
          <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
            I built IntelliCheck to make learning more effective and engaging.
            Instead of static question banks, the app uses artificial
            intelligence to generate quizzes that adapt to your level. Each
            question includes explanations so you understand the concept — not
            just the answer.
          </p>

          <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
            Whether you&apos;re studying for exams, improving your skills, or
            exploring new topics out of curiosity, IntelliCheck is designed to
            keep you motivated and focused.
          </p>

          {/* Warning */}
          <div className="rounded-[1.5rem] border border-amber-200/50 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-900/10 p-8 shadow-sm">
            <h3 className="mb-3 text-lg flex items-center gap-2 font-bold text-amber-900 dark:text-amber-500">
              ⚠️ Important notice
            </h3>
            <p className="text-base leading-relaxed text-amber-800/80 dark:text-amber-200/70">
              AI-generated answers and explanations may occasionally be
              inaccurate. Always verify important information with trusted,
              reliable sources.
            </p>
          </div>

          {/* Footer Card */}
          <div className="mt-12 rounded-[1.5rem] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-8 md:p-12 text-center shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Good luck with your studies
            </h2>
            <p className="mt-3 text-zinc-500 dark:text-zinc-400 font-medium tracking-wide">
              Learn consistently. Learn confidently.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default About;

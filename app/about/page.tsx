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
            IntelliCheck was born from a simple observation:{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              traditional learning is often static, while the human brain is dynamic.
            </span>
          </p>
        </div>

        {/* CONTENT */}
        <div className="space-y-10 py-12 text-base md:text-lg">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Beyond the Question Bank</h2>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              Most study platforms rely on fixed question banks that eventually become predictable,
              leading to memorization rather than true mastery. At the core of IntelliCheck is a
              sophisticated AI engine designed to understand your unique learning curve. Instead
              of following a linear path, the platform generates adaptive quizzes that evolve alongside you.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Understanding the &quot;Why&quot;</h2>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              We believe that a correct answer is only half the victory. Every question includes
              deep-dive explanations so you understand the underlying concept—not just the answer.
              If you hit a roadblock, the system intelligently pivots to reinforce the fundamentals,
              turning every quiz into a conversation between you and the material.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Designed for Every Journey</h2>
            <p className="leading-relaxed text-zinc-700 dark:text-zinc-300">
              Whether you&apos;re studying for high-stakes exams, upskilling in a competitive market,
              or exploring new topics out of curiosity, IntelliCheck is designed to remove the
              friction of finding study materials. We provide the instant, tailored content you
              need to stay motivated and focused.
            </p>
          </section>

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
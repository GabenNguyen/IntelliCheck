"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Brain, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();

  const ctaHref = !isLoaded ? "/sign-in" : isSignedIn ? "/dashboard" : "/sign-up";
  const ctaText = isSignedIn ? "Go to Dashboard" : "Start Learning";

  return (
    <main className="min-h-screen bg-white dark:bg-black text-zinc-950 dark:text-white selection:bg-zinc-200 dark:selection:bg-zinc-800">
      {/* Structural subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-sm font-medium"
          >
            <span className="flex h-2 w-2 rounded-full bg-zinc-900 dark:bg-white animate-pulse" />
            IntelliCheck Core 2.0 is live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1]"
          >
            Learn anything.<br />
            <span className="text-zinc-400 dark:text-zinc-500">Perfectly.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400"
          >
            Don&apos;t guess what you know. Generate adaptive quizzes powered by state-of-the-art AI, track your mastery, and learn faster without the friction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button asChild size="lg" className="h-12 px-8 rounded-full bg-zinc-950 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 text-base">
              <Link href={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-base">
              <Link href="#features">
                How it works
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* DASHBOARD MOCKUP / BENTO GRID */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Main Large Visual Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-2 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 overflow-hidden flex flex-col"
          >
            <div className="p-8 pb-0">
              <h3 className="text-2xl font-semibold tracking-tight">AI-Generated Quizzes</h3>
              <p className="max-w-md mt-2 text-zinc-600 dark:text-zinc-400">Instantly create deep, thoughtful questions on any topic. From High School biology to Quantum Computing.</p>
            </div>
            <div className="flex-1 mt-8 mx-8 bg-white dark:bg-zinc-950 rounded-t-2xl border-x border-t border-zinc-200 dark:border-zinc-800 p-6 flex flex-col gap-4">
              <div className="h-6 w-1/3 bg-zinc-100 dark:bg-zinc-900 rounded-md"></div>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800">
                    <div className="h-4 w-4 rounded-full border border-zinc-300 dark:border-zinc-700 shrink-0"></div>
                    <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-900 rounded-md"></div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Small Feature Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-8 flex flex-col justify-between"
          >
            <div>
              <div className="h-12 w-12 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-zinc-900 dark:text-white" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">Adaptive Explanations</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">If you get an answer wrong, AI drops in to explain exactly why and how to think about it next time.</p>
            </div>
          </motion.div>

          {/* Small Feature Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-8 flex flex-col justify-between"
          >
            <div>
              <div className="h-12 w-12 rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-zinc-900 dark:text-white" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">Mastery Tracking</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">See your progress visually. IntelliCheck charts your success rate over time across different topics.</p>
            </div>
          </motion.div>

          {/* Wide Feature Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-8 flex flex-col sm:flex-row items-center gap-8 overflow-hidden relative"
          >
            <div className="flex-1 z-10">
              <h3 className="text-2xl font-semibold tracking-tight">Zero-friction setup.</h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">You don&apos;t need to craft questions yourself. Enter a subject, select the difficulty, and let the AI generate the entire test within seconds.</p>
            </div>
            <div className="w-full sm:w-1/2 relative bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm z-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Topic</span>
                  <span className="text-sm text-zinc-500">React Hooks</span>
                </div>
                <div className="h-px w-full bg-zinc-100 dark:bg-zinc-900" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Count</span>
                  <span className="text-sm text-zinc-500">10 Questions</span>
                </div>
                <div className="h-px w-full bg-zinc-100 dark:bg-zinc-900" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Level</span>
                  <span className="text-sm text-zinc-500">Advanced</span>
                </div>
              </div>
            </div>

            {/* Background accent */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-gradient-to-l from-zinc-200/50 to-transparent dark:from-zinc-800/50 opacity-50 mix-blend-multiply dark:mix-blend-screen pointer-events-none" />
          </motion.div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-[3rem] bg-zinc-950 dark:bg-zinc-900 text-white p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">Ready to accelerate?</h2>
            <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto">
              Drop the flashcards. Experience the power of AI-driven interactive learning today.
            </p>
            <Button asChild size="lg" className="h-14 px-10 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 text-base font-medium">
              <Link href={ctaHref}>Start for free</Link>
            </Button>
          </div>
          {/* Subtle noise/texture in CTA */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 max-w-6xl mx-auto border-t border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="font-medium tracking-tight">
          IntelliCheck
        </div>
        <div className="text-sm text-zinc-500">
          © {new Date().getFullYear()} IntelliCheck Inc.
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-zinc-500">
          <Link href="https://github.com/GabenNguyen/IntelliCheck.git" className="hover:text-zinc-950 dark:hover:text-white transition-colors">GitHub</Link>
        </div>
      </footer>
    </main>
  );
}

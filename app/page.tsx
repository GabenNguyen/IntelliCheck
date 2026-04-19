"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Brain, Target, Cpu, Terminal, Zap, Code, Database, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();

  const ctaHref = !isLoaded ? "/sign-in" : isSignedIn ? "/dashboard" : "/sign-up";
  const ctaText = isSignedIn ? "Go to Dashboard" : "Start Learning";

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-violet-200 dark:selection:bg-violet-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_60%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-violet-900/20 text-sm font-medium"
          >
            <span className="flex h-2 w-2 rounded-full bg-violet-600 dark:bg-violet-400 animate-pulse" />
            <span className="text-violet-700 dark:text-violet-300">IntelliCheck Core 2.0 is live</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-[1.1]"
          >
            Learn anything.<br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">Perfectly.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-700 dark:text-slate-300"
          >
            Don&apos;t guess what you know. Generate adaptive quizzes powered by state-of-the-art AI, track your mastery, and learn faster without the friction.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button asChild size="lg" className="btn-tech h-12 px-8 rounded-full text-base text-white font-semibold">
              <Link href={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 rounded-full border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-900/20 text-base">
              <Link href="#features">
                How it works
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="features" className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-2 rounded-3xl border border-violet-200 dark:border-violet-800/50 bg-linear-to-br from-white to-violet-50 dark:from-slate-900 dark:to-violet-950/20 overflow-hidden flex flex-col relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-violet-500 via-indigo-500 to-cyan-500" />
            <div className="p-8 pb-0">
              <div className="flex items-center gap-2 mb-2">
                <Cpu className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">AI-Powered</span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">AI-Generated Quizzes</h3>
              <p className="max-w-md mt-2 text-slate-700 dark:text-slate-300">Instantly create deep, thoughtful questions on any topic. From High School biology to Quantum Computing.</p>
            </div>
            <div className="flex-1 mt-8 mx-8 bg-white dark:bg-slate-900 rounded-t-2xl border-x border-t border-violet-200 dark:border-violet-800 p-6 flex flex-col gap-4">
              <div className="h-6 w-1/3 bg-violet-100 dark:bg-violet-900/30 rounded-md"></div>
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-xl border border-violet-100 dark:border-violet-900/50">
                    <div className="h-4 w-4 rounded-full border-2 border-violet-500"></div>
                    <div className="h-4 w-full bg-violet-50 dark:bg-violet-900/20 rounded-md"></div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl border border-violet-200 dark:border-violet-800/50 bg-linear-to-br from-white to-violet-50 dark:from-slate-900 dark:to-violet-950/20 p-8 flex flex-col justify-between relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-violet-500 to-indigo-500" />
            <div>
              <div className="h-12 w-12 rounded-xl bg-linear-to-br from-violet-500 to-indigo-500 flex items-center justify-center mb-6">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">Adaptive Explanations</h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300">If you get an answer wrong, AI drops in to explain exactly why and how to think about it next time.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl border border-indigo-200 dark:border-indigo-800/50 bg-linear-to-r from-white to-indigo-50 dark:from-slate-900 dark:to-indigo-950/20 p-8 flex flex-col justify-between relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 to-cyan-500" />
            <div>
              <div className="h-12 w-12 rounded-xl bg-linear-to-r from-indigo-500 to-cyan-500 flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight">Mastery Tracking</h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300">See your progress visually. IntelliCheck charts your success rate over time across different topics.</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 rounded-3xl border border-cyan-200 dark:border-cyan-800/50 bg-linear-to-br from-white to-cyan-50 dark:from-slate-900 dark:to-cyan-950/20 p-8 flex flex-col sm:flex-row items-center gap-8 overflow-hidden relative"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-cyan-500 to-teal-500" />
            <div className="flex-1 z-10">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Quick Setup</span>
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">Zero-friction setup.</h3>
              <p className="mt-2 text-slate-700 dark:text-slate-300">You don&apos;t need to craft questions yourself. Enter a subject, select the difficulty, and let the AI generate the entire test within seconds.</p>
            </div>
            <div className="w-full sm:w-1/2 relative bg-white dark:bg-slate-950 border border-cyan-200 dark:border-cyan-800/50 rounded-2xl p-6 shadow-sm z-10">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Topic</span>
                  <span className="text-sm text-violet-600 dark:text-violet-400">React Hooks</span>
                </div>
                <div className="h-px w-full bg-cyan-100 dark:bg-cyan-900/30" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Count</span>
                  <span className="text-sm text-violet-600 dark:text-violet-400">10 Questions</span>
                </div>
                <div className="h-px w-full bg-cyan-100 dark:bg-cyan-900/30" />
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Level</span>
                  <span className="text-sm text-violet-600 dark:text-violet-400">Advanced</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-[3rem] bg-linear-to-br from-violet-900 via-indigo-900 to-slate-900 p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[32px_32px]" />
          <div className="absolute inset-0 bg-linear-to-t from-violet-900/50 to-transparent" />

          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-yellow-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">Get Started</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">Ready to accelerate?</h2>
            <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto">
              Drop the flashcards. Experience the power of AI-driven interactive learning today.
            </p>
            <Button asChild size="lg" className="btn-tech h-14 px-10 text-white rounded-full text-base font-semibold">
              <Link href={ctaHref}>Start for free</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <footer className="py-12 px-6 max-w-6xl mx-auto border-t border-violet-200 dark:border-violet-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-600 to-indigo-600">
            <Cpu className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold tracking-tight">IntelliCheck</span>
        </div>
        <div className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} IntelliCheck Inc.
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
          <Link href="https://github.com/GabenNguyen/IntelliCheck.git" className="hover:text-violet-600 dark:hover:text-violet-400 transition-colors">GitHub</Link>
        </div>
      </footer>
    </main>
  );
}
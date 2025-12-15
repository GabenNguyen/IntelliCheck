"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Brain, Gauge, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

/**
 * FIXES APPLIED
 * 1) Use Button `asChild` with Next <Link> to avoid invalid nesting/runtime issues.
 * 2) Safely coerce `isSignedIn` to a boolean to prevent null/undefined reads.
 * 3) Render icons via React.createElement instead of dynamic JSX (<f.icon />)
 *    to avoid edge cases where the reference is null at runtime.
 */

export default function LandingPage() {
  const auth = useAuth();
  const isSignedIn = Boolean(auth?.isSignedIn);

  const ctaHref = isSignedIn ? "/quiz" : "/sign-up";
  const ctaText = isSignedIn ? "Start a Quiz" : "Sign up & Get Started";

  const features = [
    {
      icon: Brain,
      title: "AI-Generated Quizzes",
      desc: "Questions tailored to your topic and difficulty using AI.",
    },
    {
      icon: Gauge,
      title: "Instant Feedback",
      desc: "See results immediately and reinforce learning faster.",
    },
    {
      icon: CheckCircle,
      title: "Progress Tracking",
      desc: "Track your quiz history and improvement over time.",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-linear-to-br from-blue-50 via-purple-50 to-white dark:from-gray-950 dark:via-blue-950 dark:to-gray-900">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-400/30 blur-3xl" />
        <div className="absolute top-1/3 -right-32 h-122 w-122 rounded-full bg-purple-400/30 blur-3xl" />
      </div>

      {/* HERO */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pt-28 pb-24 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/70 px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm backdrop-blur dark:border-blue-800 dark:bg-gray-900/60 dark:text-blue-300"
        >
          <Sparkles className="h-4 w-4" />
          AI-powered quiz generation
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-8 bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-7xl"
        >
          Learn Smarter with IntelliCheck
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-xl text-gray-600 dark:text-gray-300"
        >
          Create an account to generate intelligent quizzes, track results, and
          improve faster with AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            asChild
            size="lg"
            className="group rounded-xl bg-linear-to-r from-blue-600 to-purple-600 px-8 py-6 text-lg font-bold shadow-xl transition-all hover:from-blue-700 hover:to-purple-700 hover:text-white"
          >
            <Link href={ctaHref}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Free account required · Save progress & results
          </span>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full rounded-2xl border border-blue-100 bg-white/80 p-6 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-900/70">
                <CardContent className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-purple-600 text-white shadow-lg">
                    {React.createElement(f.icon, { className: "h-6 w-6" })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {f.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-28 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white"
        >
          How IntelliCheck Works
        </motion.h2>

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {[
            "Create an account",
            "Choose a topic, difficulty and the number of questions",
            "Take quizzes & track progress",
          ].map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl border border-gray-200 bg-white/80 p-8 shadow-md backdrop-blur dark:border-gray-700 dark:bg-gray-900/70"
            >
              <div className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-lg font-bold text-white">
                {i + 1}
              </div>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {step}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 border-t border-gray-200 bg-white/70 px-6 py-20 backdrop-blur dark:border-gray-800 dark:bg-gray-900/60">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Create your free IntelliCheck account
          </h3>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Sign up to generate quizzes, save results, and learn smarter with
            AI.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="hover:text-white rounded-xl bg-linear-to-r from-blue-600 to-purple-600 px-10 py-6 text-lg font-bold shadow-xl hover:from-blue-700 hover:to-purple-700"
            >
              <Link href={ctaHref}>{ctaText}</Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

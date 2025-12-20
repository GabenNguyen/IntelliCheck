"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles, Brain, Gauge, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();

  const ctaHref = !isLoaded ? "/sign-in" : isSignedIn ? "/quiz" : "/sign-up";

  const ctaText = isSignedIn ? "Start a Quiz" : "Get Started Free";

  const features = [
    {
      icon: Brain,
      title: "AI-Generated Quizzes",
      desc: "Thoughtfully generated questions based on your topic and level.",
    },
    {
      icon: Gauge,
      title: "Instant Feedback",
      desc: "Immediate results to reinforce understanding.",
    },
    {
      icon: CheckCircle,
      title: "Progress Tracking",
      desc: "Monitor performance and improve consistently.",
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-white">
      {/* Subtle Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-32 -left-32 h-104 w-104 rounded-full bg-zinc-200/40 blur-[120px] dark:bg-zinc-800/30"
          animate={{ y: [0, 25, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 -right-32 h-104 w-104 rounded-full bg-zinc-200/30 blur-[120px] dark:bg-zinc-800/30"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* HERO */}
      <header className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-28 text-center">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-zinc-300/60 bg-white/60 px-5 py-2 text-sm font-medium backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/50"
        >
          <Sparkles className="h-4 w-4 opacity-70" />
          AI-powered learning
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-10 text-5xl font-semibold tracking-tight md:text-7xl"
        >
          Learn smarter,
          <span className="block text-zinc-500 dark:text-zinc-400">
            not harder
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-400"
        >
          IntelliCheck helps you generate intelligent quizzes, track progress,
          and improve efficiently using AI.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Button
            asChild
            size="lg"
            aria-label="Get started"
            className="rounded-xl bg-zinc-900 px-10 py-6 text-base font-medium text-white shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <Link href={ctaHref}>
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>

          <span className="text-sm text-zinc-500">Free account required</span>
        </motion.div>
      </header>

      {/* FEATURES */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-28">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="hover:-translate-y-2 hover:shadow-lg dark:shadow-zinc-500 group h-full rounded-2xl border border-zinc-200/60 bg-white/70 p-6 backdrop-blur transition hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60">
                <CardContent className="space-y-5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-300/60 bg-white text-zinc-900 transition group-hover:scale-105 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white">
                    {React.createElement(f.icon, {
                      className: "h-5 w-5",
                    })}
                  </div>

                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {f.desc}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-32 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-semibold tracking-tight md:text-4xl"
        >
          How it works
        </motion.h2>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {[
            "Create an account",
            "Choose topic, difficulty and number of questions",
            "Practice and track progress",
          ].map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="hover:-translate-y-2 hover:shadow-lg group transition-all dark:shadow-zinc-500 rounded-2xl border border-zinc-200/60 bg-white/70 p-8 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/60"
            >
              <div className="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-sm font-medium dark:border-zinc-700">
                {i + 1}
              </div>
              <p className="text-zinc-700 dark:text-zinc-300">{step}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Zap,
  Sparkles,
  BarChart3,
  Shield,
  Clock,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

const features = [
  {
    icon: Sparkles,
    title: "AI-Generated Quizzes",
    description: "Create unlimited quizzes on any topic instantly with cutting-edge AI technology.",
    gradient: "from-violet-500 to-purple-600",
    colSpan: "md:col-span-2"
  },
  {
    icon: Brain,
    title: "Smart Explanations",
    description: "Get detailed explanations for every wrong answer to learn and improve.",
    gradient: "from-indigo-500 to-blue-600",
    colSpan: ""
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visualize your learning journey with detailed analytics and mastery charts.",
    gradient: "from-cyan-500 to-teal-600",
    colSpan: ""
  },
  {
    icon: Clock,
    title: "Timed Practice",
    description: "Challenge yourself with timed quizzes that simulate real exam conditions.",
    gradient: "from-amber-500 to-orange-600",
    colSpan: "md:col-span-2"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security and privacy controls.",
    gradient: "from-emerald-500 to-green-600",
    colSpan: ""
  }
];

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();

  const ctaHref = !isLoaded ? "/sign-in" : isSignedIn ? "/dashboard" : "/sign-up";
  const ctaText = isSignedIn ? "Go to Dashboard" : "Start Learning Free";

  return (
    <main className="min-h-screen bg-[#EEF2FF] dark:bg-slate-950 selection:bg-indigo-200 dark:selection:bg-indigo-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-indigo-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-violet-300/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#6366f11a_1px,transparent_1px),linear-gradient(to_bottom,#6366f11a_1px,transparent_1px)] bg-size-[40px_40px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-indigo-200 dark:border-indigo-800 shadow-lg shadow-indigo-500/10 cursor-pointer hover:scale-105 transition-transform"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">AI-Powered Learning Platform</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Learn smarter with
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 via-violet-600 to-indigo-600"> AI Quizzes</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 dark:text-slate-300"
          >
            Generate personalized quizzes on any topic. Track your progress, get AI-powered explanations, and master any subject faster.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button asChild size="lg" className="h-14 px-8 rounded-full text-base font-semibold bg-green-500 hover:bg-green-600 text-white cursor-pointer shadow-lg shadow-green-500/25 transition-all hover:-translate-y-1">
              <Link href={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 rounded-full text-base border-indigo-200 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 cursor-pointer">
              <Link href="#features">
                See Features
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section id="features" className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything you need to learn effectively
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Powerful features designed to help you learn faster and retain more knowledge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${feature.colSpan}`}
              >
                <div className={`absolute inset-0 rounded-3xl bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className={`inline-flex h-14 w-14 rounded-2xl bg-linear-to-br ${feature.gradient} items-center justify-center mb-6 shadow-lg`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              How IntelliCheck works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Choose a Topic", desc: "Enter any subject you want to learn about, from history to quantum physics." },
              { step: "02", title: "AI Generates Quiz", desc: "Our AI creates personalized questions tailored to your chosen difficulty." },
              { step: "03", title: "Learn & Track", desc: "Take the quiz, get instant feedback, and watch your progress over time." }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-3xl bg-linear-to-br from-indigo-50 to-violet-50 dark:from-slate-800 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/50"
              >
                <span className="text-6xl font-bold text-indigo-200 dark:text-indigo-800">{item.step}</span>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-4 mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-300">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto rounded-[3rem] bg-linear-to-br from-indigo-600 via-violet-600 to-indigo-800 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-500/25"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMtOS45NDEgMC0xOCA4LjA1OS0xOCAxOHM4LjA1OSAxOCAxOCAxOCAxOC04LjA1OSAxOC0xOC04LjA1OS0xOC0xOC0xOHptMCAzMmMtNy43MzIgMC0xNC02LjI2OC0xNC0xNHM2LjI2OC0xNCAxNC0xNCAxNCA2LjI2OCAxNCAxNC02LjI2OCAxNC0xNCAxNHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-30" />

          <div className="relative z-10 space-y-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
              <span className="text-sm font-bold uppercase tracking-wider text-yellow-400">Start Today</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white">Ready to master any topic?</h2>
            <p className="text-indigo-100 text-lg md:text-xl max-w-xl mx-auto">
              Join thousands of learners using AI to accelerate their education. No credit card required.
            </p>
            <Button asChild size="lg" className="h-14 px-10 text-lg font-semibold bg-white text-indigo-600 rounded-full hover:bg-indigo-50 cursor-pointer shadow-lg">
              <Link href={ctaHref}>Start Learning Free</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 max-w-6xl mx-auto border-t border-indigo-200 dark:border-indigo-800/50">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-indigo-600 to-violet-600">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">IntelliCheck</span>
          </div>
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} IntelliCheck. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
            <Link href="https://github.com/GabenNguyen/IntelliCheck.git" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">GitHub</Link>
            <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">About</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
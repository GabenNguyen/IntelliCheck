"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Sparkles,
  BarChart3,
  Shield,
  Clock,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

const features = [
  {
    icon: Sparkles,
    title: "AI-Generated Quizzes",
    description: "Create unlimited quizzes on any topic instantly with AI technology.",
    colSpan: "md:col-span-2"
  },
  {
    icon: Brain,
    title: "Smart Explanations",
    description: "Get detailed explanations for every wrong answer to learn and improve.",
    colSpan: ""
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Visualize your learning journey with detailed analytics and mastery charts.",
    colSpan: ""
  },
  {
    icon: Clock,
    title: "Timed Practice",
    description: "Challenge yourself with timed quizzes that simulate real exam conditions.",
    colSpan: "md:col-span-2"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your data is protected with enterprise-grade security and privacy controls.",
    colSpan: ""
  }
];

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();

  const ctaHref = !isLoaded ? "/sign-in" : isSignedIn ? "/dashboard" : "/sign-up";
  const ctaText = isSignedIn ? "Go to Dashboard" : "Start Learning Free";

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20">
      {/* Hero Section */}
      <section className="pt-20 pb-24 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm text-muted-foreground"
          >
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" />
            AI-Powered Learning Platform
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-foreground"
          >
            Learn smarter with <span className="text-primary">AI Quizzes</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="max-w-xl mx-auto text-lg text-muted-foreground"
          >
            Generate personalized quizzes on any topic. Track your progress, get AI-powered explanations, and master any subject faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4"
          >
            <Button asChild size="lg" className="h-12 px-6 rounded-lg">
              <Link href={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-6 rounded-lg">
              <Link href="#features">
                See Features
                <ChevronDown className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Everything you need to learn effectively
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Powerful features designed to help you learn faster and retain more knowledge.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer ${feature.colSpan}`}
              >
                <div className="w-11 h-11 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              How IntelliCheck works
            </h2>
            <p className="text-muted-foreground">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "01", title: "Choose a Topic", desc: "Enter any subject you want to learn about." },
              { step: "02", title: "AI Generates Quiz", desc: "Our AI creates questions tailored to your difficulty." },
              { step: "03", title: "Learn & Track", desc: "Take the quiz, get feedback, and track progress." }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-xl bg-card border border-border"
              >
                <span className="text-4xl font-bold text-muted-foreground/30">{item.step}</span>
                <h3 className="text-lg font-semibold text-foreground mt-3 mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto rounded-2xl bg-primary p-8 md:p-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
            Ready to master any topic?
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            Join learners using AI to accelerate their education. No credit card required.
          </p>
          <Button asChild size="lg" className="h-12 px-8 bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-lg">
            <Link href={ctaHref}>Start Learning Free</Link>
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Brain className="h-4 w-4" />
            </div>
            <span className="font-semibold text-foreground">IntelliCheck</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} IntelliCheck. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm font-medium">
            <Link href="https://github.com/GabenNguyen/IntelliCheck.git" className="text-muted-foreground hover:text-foreground transition-colors">
              GitHub
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

const features = [
  {
    title: "Quizzes built for your topic",
    description: "Pick a subject, a difficulty and a question count. IntelliCheck writes the questions when you need them.",
  },
  {
    title: "Explanations where you need them",
    description: "Every incorrect answer comes with an explanation of the concept, so a miss turns into a correction.",
  },
  {
    title: "A record of what you've covered",
    description: "Your history, streaks and topic breakdown stay with you, making it easy to see what to revisit next.",
  },
];

const steps = [
  { title: "Choose a topic", description: "Name a subject and set the difficulty and length." },
  { title: "Answer the questions", description: "Work through the quiz at your own pace, within a time limit." },
  { title: "Review the gaps", description: "Read the explanations and check your progress in the dashboard." },
];

function QuizPreview() {
  return (
    <div className="w-full max-w-md rounded-lg border border-border bg-card p-5 shadow-none">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <span className="text-xs font-medium text-muted-foreground">Sample quiz</span>
        <span className="text-xs text-muted-foreground tabular-nums">3 of 8</span>
      </div>
      <div className="mt-4 h-1 w-full rounded-full bg-muted">
        <div className="h-1 w-[37.5%] rounded-full bg-primary" />
      </div>
      <p className="mt-6 text-base font-medium leading-relaxed">
        Which data structure gives average O(1) lookup by key?
      </p>
      <div className="mt-5 space-y-2">
        <div className="rounded-md border border-border bg-muted/40 px-3 py-2.5 text-sm">
          <span className="mr-3 text-muted-foreground">A</span> Binary search tree
        </div>
        <div className="rounded-md border border-primary bg-primary/5 px-3 py-2.5 text-sm font-medium">
          <span className="mr-3 text-primary">B</span> Hash table
        </div>
        <div className="rounded-md border border-border px-3 py-2.5 text-sm">
          <span className="mr-3 text-muted-foreground">C</span> Linked list
        </div>
      </div>
      <div className="mt-5 border-t border-border pt-4 text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Explanation:</span> a hash table maps keys to
        bucket positions, giving constant-time lookup on average.
      </div>
    </div>
  );
}

export default function LandingPage() {
  const { isSignedIn, isLoaded } = useAuth();

  const ctaHref = !isLoaded ? "/sign-in" : isSignedIn ? "/dashboard" : "/sign-up";
  const ctaText = isSignedIn ? "Open dashboard" : "Create a quiz";

  return (
    <main className="bg-background">
      <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-[1fr_1fr] md:items-center md:gap-16 md:py-24 lg:px-8">
        <div className="max-w-xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Practice anything. Remember more.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            IntelliCheck generates a short quiz on any topic, then explains the answers you miss.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="h-11 px-5">
              <Link href={ctaHref}>
                {ctaText}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-11 px-5">
              <Link href="#how-it-works">See how it works</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          <QuizPreview />
        </div>
      </section>

      <section id="features" className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
            Built around the part that matters: getting better
          </h2>
          <div className="mt-10 grid gap-x-10 gap-y-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <div key={feature.title} className="border-t border-border pt-5">
                <span className="text-xs font-medium text-muted-foreground tabular-nums">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-base font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">How it works</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border text-xs font-medium text-muted-foreground tabular-nums">
                {i + 1}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-14 md:flex-row md:items-end md:justify-between lg:px-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Pick a topic and start practicing</h2>
            <p className="mt-2 text-sm text-muted-foreground">One quiz is enough to see where you stand.</p>
          </div>
          <Button asChild size="lg" className="h-11 px-5 self-start md:self-auto">
            <Link href={ctaHref}>Create a quiz</Link>
          </Button>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between lg:px-8">
          <span className="font-medium text-foreground">IntelliCheck</span>
          <span>© {new Date().getFullYear()} IntelliCheck</span>
          <nav className="flex gap-5" aria-label="Footer">
            <Link href="https://github.com/GabenNguyen/IntelliCheck.git" className="transition-colors hover:text-foreground">
              GitHub
            </Link>
            <Link href="/about" className="transition-colors hover:text-foreground">
              About
            </Link>
          </nav>
        </div>
      </footer>
    </main>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function About() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-50 p-6 dark:bg-zinc-950">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-104 w-104 -translate-x-1/2 rounded-full bg-zinc-200/40 blur-[120px] dark:bg-zinc-800/30" />
      </div>

      <Card
        className="
          relative z-10 w-full max-w-3xl
          rounded-3xl border border-zinc-200/60
          bg-white/70 backdrop-blur
          shadow-sm
          transition-all duration-300
          hover:-translate-y-1 hover:shadow-md
          dark:border-zinc-800 dark:bg-zinc-900/70
        "
      >
        {/* HEADER */}
        <CardHeader className="space-y-6 pb-6 text-center">
          <CardTitle className="text-4xl font-semibold tracking-tight md:text-6xl">
            Hi there 👋
          </CardTitle>

          <CardDescription className="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Preparing for exams or simply testing your knowledge?
            <span className="mt-3 block font-medium text-zinc-900 dark:text-zinc-100">
              IntelliCheck helps you learn smarter with AI-generated quizzes.
            </span>
          </CardDescription>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="space-y-8 text-center text-base">
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

          <div className="rounded-2xl border border-amber-300/60 bg-amber-50/70 p-6 dark:border-amber-600/40 dark:bg-amber-900/20">
            <div className="mb-2 text-xl flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300">
              ⚠️ Important notice
            </div>
            <p className="text-sm leading-relaxed text-amber-800/90 dark:text-amber-200/80">
              AI-generated answers and explanations may occasionally be
              inaccurate. Always verify important information with trusted,
              reliable sources.
            </p>
          </div>

          <div className="mt-10 rounded-2xl border border-blue-200/60 bg-blue-50/60 p-6 dark:border-blue-800/40 dark:bg-blue-900/20">
            <p className="text-2xl font-semibold tracking-tight text-blue-900 dark:text-blue-200 md:text-3xl">
              Good luck with your studies
            </p>
            <p className="mt-2 text-blue-700/80 dark:text-blue-300/80">
              Learn consistently. Learn confidently.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default About;

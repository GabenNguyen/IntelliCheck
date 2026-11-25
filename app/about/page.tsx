import { CircleAlert } from "lucide-react";

function About() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <div className="space-y-5 border-b border-border pb-10">
        <p className="text-xs font-medium text-muted-foreground">About</p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          About IntelliCheck
        </h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Traditional study material stays the same while your understanding changes. IntelliCheck
          generates a new quiz for the topic you are working on, so practice follows your progress.
        </p>
      </div>

      <div className="space-y-12 py-12 text-base leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Beyond a fixed question bank</h2>
          <p className="text-muted-foreground">
            Fixed question sets become predictable, and memorising answers is not the same as knowing
            a subject. IntelliCheck writes questions when you ask for them, at the difficulty you
            choose, so each session is based on the topic rather than a stored list.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Understanding the answer</h2>
          <p className="text-muted-foreground">
            A correct answer is only part of learning. Incorrect answers come with an explanation of
            the underlying concept, so you can see where your reasoning went wrong before moving on.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">A record of your practice</h2>
          <p className="text-muted-foreground">
            Your quiz history, streaks and topic breakdown stay available, which makes it easier to
            decide what to revisit next, whether you are preparing for an exam or exploring a topic.
          </p>
        </section>

        <aside className="rounded-lg border border-border bg-muted/40 p-6">
          <div className="flex items-start gap-3">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <div>
              <h3 className="text-sm font-medium text-foreground">On AI-generated answers</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Generated questions and explanations can be inaccurate. Check important information
                against a reliable source before relying on it.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default About;

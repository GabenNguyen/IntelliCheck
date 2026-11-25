import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="text-xs font-medium text-muted-foreground">Your practice</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Welcome back, {userName}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A summary of the quizzes you have taken and the topics you have covered.
        </p>
      </div>
      <Button asChild className="h-10 gap-2 px-4 self-start sm:self-auto">
        <Link href="/quiz">
          <Plus className="h-4 w-4" />
          New quiz
        </Link>
      </Button>
    </section>
  );
}

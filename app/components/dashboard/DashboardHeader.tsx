import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
  return (
    <section className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">Welcome back</p>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Hello, {userName}</h1>
        <p className="mt-2 text-muted-foreground">Ready to continue your learning journey?</p>
      </div>
      <Link href="/quiz">
        <Button className="h-11 px-6 rounded-lg font-medium flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Quiz
        </Button>
      </Link>
    </section>
  );
}
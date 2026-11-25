"use client";

import { Button } from "@/components/ui/button";

interface Props {
  error: Error;
  reset: () => void;
}

const DashboardError = ({ error, reset }: Props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Couldn&apos;t load the dashboard</h1>
      <p className="max-w-md text-sm text-muted-foreground">{error.message}</p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
};

export default DashboardError;

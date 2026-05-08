"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import Link from "next/link";

interface Props {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  const [reloading, setReloading] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#EEF2FF] dark:bg-slate-950 px-6">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
        <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Something went wrong
        </h1>
        <p className="text-slate-600 dark:text-slate-300 max-w-md">
          {error.message || "An unexpected error occurred. Please try again."}
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={() => {
            reset();
            setReloading(true);
          }}
          disabled={reloading}
          className="cursor-pointer"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${reloading ? "animate-spin" : ""}`} />
          {reloading ? "Reloading..." : "Try again"}
        </Button>
        <Button asChild variant="outline" className="cursor-pointer">
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
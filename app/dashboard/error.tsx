"use client";
import { useState } from "react";

interface Props {
  error: Error;
  reset: () => void;
}

const DashboardError = ({ error, reset }: Props) => {
  const [reloading, setReloading] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Something went wrong</h1>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={() => {
          reset();
          setReloading(true);
        }}
        className="cursor-pointer rounded-xl bg-blue-600 px-6 py-2 text-white"
        disabled={reloading}
      >
        {reloading ? "Reloading..." : "Try again"}
      </button>
    </div>
  );
};

export default DashboardError;

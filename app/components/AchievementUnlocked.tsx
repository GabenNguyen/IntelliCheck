"use client";
import { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { type Achievement } from "@/utils/achievements";
import Confetti from "react-confetti";
import useWindowSize from "@/hooks/use-window";

interface Props {
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementUnlocked({ achievement, onClose }: Props) {
  const { width, height } = useWindowSize();
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!achievement) return null;

  return (
    <>
      {showConfetti && width && height && (
        <Confetti
          width={width}
          height={height}
          numberOfPieces={60}
          recycle={false}
          gravity={0.2}
        />
      )}

      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 px-4"
        onClick={onClose}
        role="presentation"
      >
        <div
          className="w-full max-w-sm rounded-lg border border-border bg-card p-8 text-center"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="achievement-title"
        >
          <Trophy className="mx-auto h-7 w-7 text-primary" />
          <p className="mt-4 text-xs font-medium text-muted-foreground">Achievement unlocked</p>
          <h2 id="achievement-title" className="mt-2 text-xl font-semibold text-foreground">
            {achievement.name}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{achievement.description}</p>
          <button
            type="button"
            onClick={onClose}
            className="mt-6 rounded-md bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
}

"use client";

import { motion } from "framer-motion";

interface Props {
  id: string;
  title: string;
  subject: string;
  description?: string | null;
  questionCount: number;
  timeSaved: number;
  createdAt: string | Date;
}

export default function QuizHistory({
  id,
  title,
  subject,
  description,
  questionCount,
  timeSaved,
  createdAt,
}: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col rounded-lg p-6 md:p-8 bg-zinc-950/50 dark:bg-zinc-900/30 border border-zinc-800/20 dark:border-zinc-700/30 shadow-inner hover:shadow-lg hover:-translate-y-1 border-l-4 border-l-zinc-400 dark:border-l-zinc-300 transition-all duration-300 h-full backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between items-start gap-4">
          <h2 className="text-xl font-bold text-zinc-50 dark:text-zinc-100 line-clamp-2 leading-snug font-mono">
            {title}
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-800/30 dark:bg-zinc-700/30 text-zinc-300 dark:text-zinc-400 whitespace-nowrap font-mono">
            {new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <p className="text-sm font-semibold text-zinc-300 dark:text-zinc-400">
          {subject}
        </p>
      </div>

      {/* Description */}
      {description && (
        <p className="mt-2 mb-6 text-sm text-zinc-300 dark:text-zinc-400 line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>
      )}

      {/* Stats */}
      <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-zinc-800/20 dark:border-zinc-700/30">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/30 dark:bg-zinc-700/30 text-xs font-semibold text-zinc-300 dark:text-zinc-400 border border-zinc-700/30 dark:border-zinc-600/40 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-900"></span>
          {questionCount} Qs
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-800/30 dark:bg-zinc-700/30 text-xs font-semibold text-zinc-300 dark:text-zinc-400 border border-zinc-700/30 dark:border-zinc-600/40 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
          {timeSaved}s saved
        </span>
      </div>
      
      {/* Tech decorative elements */}
      <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
        <span>[</span>
        <span className="animate-pulse">•</span>
        <span className="animate-pulse animate-delay-100">•</span>
        <span className="animate-pulse animate-delay-200">•</span>
        <span>]</span>
      </div>
    </motion.div>
  );
}

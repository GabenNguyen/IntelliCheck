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
      className="group relative flex flex-col rounded-[1.5rem] p-6 md:p-8 bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 h-full"
    >
      {/* Header */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex justify-between items-start gap-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 line-clamp-2 leading-snug">
            {title}
          </h2>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
            {new Date(createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
        <p className="text-sm font-semibold text-zinc-500 dark:text-zinc-400">
          {subject}
        </p>
      </div>

      {/* Description */}
      {description && (
        <p className="mt-2 mb-6 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-3 leading-relaxed flex-1">
          {description}
        </p>
      )}

      {/* Stats */}
      <div className="mt-auto flex flex-wrap gap-2 pt-6 border-t border-zinc-100 dark:border-zinc-800/50">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-800/50 text-xs font-semibold text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100"></span>
          {questionCount} Qs
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-50 dark:bg-zinc-800/50 text-xs font-semibold text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/50">
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
          {timeSaved}s saved
        </span>
      </div>
    </motion.div>
  );
}

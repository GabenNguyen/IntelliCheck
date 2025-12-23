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
      key={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative rounded-xl p-6 hover:-translate-y-2 hover:shadow-zinc-500 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {subject}
          </p>
        </div>
        <span className="text-xs text-gray-400 dark:text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      {/* Description */}
      {description && (
        <p className="mt-3 text-gray-600 dark:text-gray-300 line-clamp-3">
          {description}
        </p>
      )}

      {/* Stats */}
      <div className="mt-4 flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
          🧠 {questionCount} question(s)
        </span>
        <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800">
          ⏱ {timeSaved} sec saved (Estimated)
        </span>
      </div>
    </motion.div>
  );
}

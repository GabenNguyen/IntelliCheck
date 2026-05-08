export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#EEF2FF] dark:bg-slate-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 dark:border-white dark:border-t-transparent border-t-transparent" />
        <p className="text-indigo-600 dark:text-indigo-300 font-medium">
          Loading IntelliCheck...
        </p>
      </div>
    </div>
  );
}
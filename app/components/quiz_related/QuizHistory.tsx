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
  title,
  subject,
  description,
  questionCount,
  timeSaved,
  createdAt,
}: Props) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:bg-muted/30">
      <div className="mb-3 flex items-start justify-between gap-3">
        <h2 className="text-base font-medium leading-snug text-foreground">{title}</h2>
        <time className="shrink-0 text-xs text-muted-foreground tabular-nums">
          {new Date(createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
      </div>

      <p className="text-sm text-muted-foreground">{subject}</p>

      {description && (
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      <div className="mt-auto flex flex-wrap gap-4 border-t border-border pt-4 text-xs text-muted-foreground tabular-nums">
        <span>{questionCount} questions</span>
        <span>{timeSaved}s saved</span>
      </div>
    </article>
  );
}

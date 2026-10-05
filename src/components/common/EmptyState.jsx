import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function EmptyState({
  icon: Icon,
  title,
  message,
  actionLabel,
  actionTo,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed bg-card px-6 py-16 text-center">
      {Icon && (
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--cream)]">
          <Icon className="h-7 w-7" />
        </div>
      )}
      <h2 className="text-lg font-semibold">{title}</h2>
      {message && <p className="max-w-sm text-sm text-muted-foreground">{message}</p>}
      {actionLabel && actionTo && (
        <Button asChild className="mt-2 hover:scale-105">
          <Link to={actionTo}>{actionLabel}</Link>
        </Button>
      )}
    </div>
  );
}

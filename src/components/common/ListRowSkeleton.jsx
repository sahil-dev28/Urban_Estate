import { Skeleton } from "@/components/ui/skeleton";

export default function ListRowSkeleton() {
  return (
    <div
      className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-4 sm:flex-row"
      aria-hidden="true"
    >
      <Skeleton className="h-[190px] rounded-xl sm:flex-[2]" />
      <div className="flex flex-col justify-between gap-3 sm:flex-[3]">
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-7 w-28" />
        <div className="flex gap-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}

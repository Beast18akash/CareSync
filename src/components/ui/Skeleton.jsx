export default function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-slate-200/80 ${className}`}
      aria-hidden="true"
    />
  )
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200/60 p-6 bg-white/80">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Skeleton className="h-4 w-24 mb-3" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="h-14 w-14 rounded-2xl" />
      </div>
    </div>
  )
}

export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-6 shadow-sm" aria-label="Loading flight">
      <div className="mb-5 flex items-center justify-between"><div className="h-5 w-32 rounded bg-slate-200" /><div className="h-5 w-14 rounded bg-slate-200" /></div>
      <div className="grid grid-cols-3 items-center gap-5">
        <div><div className="mb-2 h-7 w-20 rounded bg-slate-200" /><div className="h-4 w-24 rounded bg-slate-200" /></div>
        <div><div className="mb-2 h-3 w-full rounded bg-slate-200" /><div className="mx-auto h-3 w-20 rounded bg-slate-200" /></div>
        <div><div className="mb-2 h-7 w-20 rounded bg-slate-200" /><div className="h-4 w-24 rounded bg-slate-200" /></div>
      </div>
    </div>
  );
}
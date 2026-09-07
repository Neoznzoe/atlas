function CardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="aspect-16/10 w-full bg-surface-hover" />
      <div className="flex flex-col gap-2.5 p-4">
        <div className="h-4 w-2/3 rounded bg-surface-hover" />
        <div className="h-3 w-4/5 rounded bg-surface-hover" />
        <div className="h-3 w-3/5 rounded bg-surface-hover" />
      </div>
    </div>
  );
}

export default CardSkeleton;

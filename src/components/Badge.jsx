function Badge({ grand }) {
  return (
    <span
      className={`inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        grand ? "bg-accent-soft text-accent" : "bg-surface-hover text-fg-muted"
      }`}
    >
      {grand ? "Grand pays" : "Petit pays"}
    </span>
  );
}

export default Badge;

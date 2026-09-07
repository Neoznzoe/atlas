function Badge({ grand }) {
  const classes = grand
    ? "bg-blue-600 text-white"
    : "bg-gray-200 text-gray-800";

  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-semibold ${classes}`}>
      {grand ? "Grand pays" : "Petit pays"}
    </span>
  );
}

export default Badge;

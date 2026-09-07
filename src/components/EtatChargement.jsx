import CardSkeleton from "./CardSkeleton.jsx";

function EtatChargement() {
  return (
    <div className="min-h-dvh bg-bg">
      <div className="sticky top-0 z-40 h-16 border-b border-border bg-bg/85 backdrop-blur-md" />
      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EtatChargement;

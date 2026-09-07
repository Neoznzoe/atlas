import { WarningCircle } from "@phosphor-icons/react";

function EtatErreur({ message }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-bg px-6 text-center">
      <span className="flex size-12 items-center justify-center rounded-full bg-danger-soft text-danger">
        <WarningCircle size={24} />
      </span>
      <p className="text-base font-medium text-fg">Une erreur est survenue</p>
      <p className="max-w-sm text-sm text-fg-subtle">{message}</p>
    </div>
  );
}

export default EtatErreur;

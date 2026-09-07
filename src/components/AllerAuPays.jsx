import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, MapPinLine } from "@phosphor-icons/react";

function AllerAuPays({ pays }) {
  const inputRef = useRef(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), 3500);
    return () => clearTimeout(id);
  }, [message]);

  function gererSoumission(e) {
    e.preventDefault();
    const terme = inputRef.current.value.trim().toLowerCase();
    const paysTrouve = pays.find((country) => country.name.toLowerCase() === terme);

    if (paysTrouve) {
      setMessage({ type: "succes", texte: `${paysTrouve.name} · capitale ${paysTrouve.capital ?? "inconnue"}` });
    } else {
      setMessage({ type: "erreur", texte: `Aucun pays ne correspond à « ${inputRef.current.value} »` });
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <form onSubmit={gererSoumission} className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface p-2">
        <div className="relative min-w-[14rem] flex-1">
          <MapPinLine size={16} className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-fg-subtle" />
          <input
            id="aller-au-pays-input"
            type="text"
            ref={inputRef}
            placeholder="Nom exact d'un pays…"
            aria-label="Aller directement à un pays"
            className="w-full rounded-lg bg-transparent py-1.5 pl-8 text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="flex items-center gap-1 rounded-lg bg-surface-hover px-3 py-1.5 text-sm font-medium text-fg transition-colors hover:bg-surface-active"
        >
          Aller <ArrowRight size={14} />
        </button>
      </form>

      <AnimatePresence>
        {message && (
          <motion.p
            key={message.texte}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className={`mt-2 pl-1 text-sm ${message.type === "succes" ? "text-success" : "text-danger"}`}
          >
            {message.texte}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default AllerAuPays;

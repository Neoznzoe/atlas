import { motion } from "motion/react";

function ToggleSwitch({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-fg-muted select-none">
      <span
        role="switch"
        aria-checked={checked}
        tabIndex={0}
        onClick={onChange}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onChange())}
        className="relative inline-flex h-6 w-10 shrink-0 items-center rounded-full transition-colors"
        style={{ backgroundColor: checked ? "var(--accent)" : "var(--border-strong)" }}
      >
        <motion.span
          layout
          transition={{ type: "spring", stiffness: 500, damping: 32 }}
          className="size-4.5 rounded-full bg-white shadow-sm"
          style={{ marginLeft: checked ? "1.375rem" : "0.25rem" }}
        />
      </span>
      {label}
    </label>
  );
}

export default ToggleSwitch;

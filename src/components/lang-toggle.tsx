"use client";

import { useLanguage, type Lang } from "@/lib/language";
import { cn } from "@/lib/utils";

const OPTIONS: { value: Lang; label: string }[] = [
  { value: "id", label: "ID" },
  { value: "en", label: "EN" },
];

export function LangToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className={cn("inline-flex rounded-lg border border-border bg-card p-1", className)}
    >
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          data-lang={opt.value}
          aria-pressed={lang === opt.value}
          onClick={() => setLang(opt.value)}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer",
            lang === opt.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

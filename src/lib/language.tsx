"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { id, type Messages } from "@/messages/id";
import { en } from "@/messages/en";

export type Lang = "id" | "en";

const dictionaries: Record<Lang, Messages> = { id, en };
const STORAGE_KEY = "acecourt-lang";

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Messages;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Default is Indonesian — the language the app was originally written in.
  const [lang, setLangState] = useState<Lang>("id");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "id" || saved === "en") setLangState(saved);
    } catch {
      // localStorage unavailable (private mode, etc.) — stay on default.
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

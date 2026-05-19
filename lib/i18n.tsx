"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { type Lang, type Dictionary, getDictionary } from "./dictionaries";

export type { Lang };

type I18nContextValue = {
  lang: Lang;
  dict: Dictionary;
  setLang: (lang: Lang) => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "nyumbani-lang";

/**
 * Resolve the initial language on the client.
 *
 * Uses the server-provided `initialLang` when available (so SSR and the first
 * client render agree), falling back to localStorage, then finally 'en'.
 */
function getClientLang(ssrLang?: Lang): Lang {
  if (ssrLang && (ssrLang === "en" || ssrLang === "fr")) return ssrLang;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "fr") return stored;
  } catch {
    // localStorage unavailable (private browsing, storage quota, etc.)
  }
  return "en";
}

/**
 * Persist the language choice to both `localStorage` (for client-side
 * persistence) and a cookie (so the Next.js server can read it on the
 * next SSR request and avoid hydration mismatches).
 */
function persistLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // localStorage unavailable – cookie still works below
  }

  // Set a session-scoped cookie so the server can read the language on the
  // next full-page load.  Max-Age is deliberately omitted so browsers treat
  // it as a session cookie (survives refreshes but not full restarts).
  try {
    document.cookie = `${STORAGE_KEY}=${lang};path=/;SameSite=Lax`;
  } catch {
    // Silently ignore – the app still works; only SSR may fall back to 'en'
  }
}

type I18nProviderProps = {
  children: ReactNode;
  /**
   * Language resolved by the server (e.g. from a cookie in `layout.tsx`).
   * When provided, the first client render uses this value so React can
   * successfully hydrate the SSR output.
   */
  initialLang?: Lang;
};

export function I18nProvider({ children, initialLang }: I18nProviderProps) {
  const [lang, setLangState] = useState<Lang>(() => getClientLang(initialLang));

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    persistLang(newLang);
  }, []);

  const dict = getDictionary(lang);

  return (
    <I18nContext.Provider value={{ lang, dict, setLang }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

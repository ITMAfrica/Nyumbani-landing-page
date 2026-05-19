'use client';

import { Globe } from 'lucide-react';
import { useI18n, type Lang } from '@/lib/i18n';

const LABELS: Record<Lang, string> = {
  en: 'EN',
  fr: 'FR',
};

type LanguageSwitcherProps = {
  variant?: 'light' | 'dark';
};

export function LanguageSwitcher({ variant = 'light' }: LanguageSwitcherProps) {
  const { lang, setLang } = useI18n();
  const nextLang: Lang = lang === 'en' ? 'fr' : 'en';

  const isLight = variant === 'light';

  return (
    <button
      type="button"
      onClick={() => setLang(nextLang)}
      aria-label={`Switch language to ${nextLang === 'en' ? 'English' : 'Français'}`}
      className={`
        inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase
        px-3 py-1.5 rounded-full transition
        ${isLight
          ? 'border border-white/30 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 hover:border-white/50'
          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-navy'
        }
      `}
    >
      <Globe className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden />
      <span>{LABELS[lang]}</span>
    </button>
  );
}

'use client';

import { FormEvent, useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';

export function SiteFooter() {
  const { dict } = useI18n();
  const [submitted, setSubmitted] = useState(false);

  function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <footer className="relative bg-navy text-white overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      
      <div className="mx-auto w-full max-w-[1600px] px-8 py-16 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {/* Brand & address */}
          <div className="max-w-sm">
            <Image 
              src="https://auzyjcdanenhoqyrbjxg.supabase.co/storage/v1/object/public/images/users/7a23a808-8309-4bff-b922-1a9db7482400/e38b6f4a-4227-48e6-8f6d-b3acea7daa8c.png" 
              alt="Nyumbani Logo" 
              width={140} 
              height={48} 
              className="object-contain w-[120px] h-auto mb-6 brightness-0 invert"
              referrerPolicy="no-referrer"
            />
            <address className="not-italic">
              <p className="text-sm font-light leading-relaxed text-white/60">
                7th floor, Highway Heights
                <br />
                Marcus Garvey road
                <br />
                Kilimani, Nairobi, Kenya
              </p>
              <div className="mt-5 flex flex-col gap-2 text-sm font-medium text-white/80">
                <a
                  href="mailto:client@nyumbani-africa.com"
                  className="transition hover:text-gold"
                >
                  client@nyumbani-africa.com
                </a>
                <a href="tel:+243833843380" className="transition hover:text-gold">
                  +243 833 843 380
                </a>
                <a href="tel:+254791564429" className="transition hover:text-gold">
                  +254 791 564 429
                </a>
              </div>
            </address>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-5">{dict.footer.explore}</h2>
            <nav className="flex flex-col gap-3">
              <a href="#how-we-work" className="text-sm font-light text-white/60 transition hover:text-white hover:pl-1">
                {dict.footer.howWeWork}
              </a>
              <a href="#" className="text-sm font-light text-white/60 transition hover:text-white hover:pl-1">
                {dict.footer.platinumCollection}
              </a>
              <a href="#" className="text-sm font-light text-white/60 transition hover:text-white hover:pl-1">
                {dict.footer.goldCollection}
              </a>
            </nav>
          </div>

          {/* Subscribe & social */}
          <div>
        
            <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold mb-5">{dict.footer.stayUpdated}</h2>
            <p className="text-sm font-light text-white/50 mb-4">
              {dict.footer.stayUpdatedDesc}
            </p>
            <form className="mb-8" onSubmit={onSubscribe} noValidate>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
                <label htmlFor="footer-email" className="sr-only">
                  Email
                </label>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  required
                  placeholder={dict.footer.enterEmail}
                  className="min-w-0 flex-1 border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold/50 focus:outline-none focus:ring-1 focus:ring-gold/30 rounded-lg transition"
                />
                <button
                  type="submit"
                  className="shrink-0 bg-gold hover:bg-gold-dark px-6 py-3 text-[11px] font-semibold uppercase tracking-wider text-white transition rounded-lg"
                >
                  {dict.footer.subscribe}
                </button>
              </div>
              {submitted ? (
                  <p className="mt-3 text-xs text-gold" role="status">
                  {dict.footer.thankYou}
                </p>
              ) : null}
            </form>

          </div>
        </div>
      </div>
    </footer>
  );
}

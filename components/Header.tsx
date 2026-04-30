'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getApartmentBySlug } from '@/lib/apartments';

const LOGO_URL =
  'https://auzyjcdanenhoqyrbjxg.supabase.co/storage/v1/object/public/images/users/7a23a808-8309-4bff-b922-1a9db7482400/e38b6f4a-4227-48e6-8f6d-b3acea7daa8c.png';

export function SiteHeader() {
  const pathname = usePathname();

  const apartmentMatch = pathname.match(/^\/apartements\/(.+)$/);
  const apt = apartmentMatch ? getApartmentBySlug(apartmentMatch[1]) : null;

  if (apt) {
    return (
      <header className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-x-4 gap-y-3 px-6 py-4 sm:px-10">
          <Link
            href="/"
            className="inline-flex shrink-0 items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 focus-visible:ring-offset-2 rounded"
            aria-label="Nyumbani — accueil"
          >
            <Image
              src={LOGO_URL}
              alt=""
              width={128}
              height={44}
              className="h-8 w-[104px] object-contain object-left sm:h-9 sm:w-[120px]"
              sizes="(max-width: 640px) 104px, 120px"
              referrerPolicy="no-referrer"
            />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-slate-500 transition hover:text-navy"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden />
            Home
          </Link>
          <div className="hidden h-4 w-px bg-slate-200 sm:block" aria-hidden />
          <div>
            <h1 className="font-serif text-xl font-normal text-slate-900 sm:text-2xl">{apt.title}</h1>
            {apt.subtitle ? (
              <p className="text-[11px] uppercase tracking-[0.15em] text-gold-dark mt-0.5">{apt.subtitle}</p>
            ) : null}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-8 py-6 w-full max-w-[1600px] mx-auto">
      <div className="flex items-center gap-3 text-white">
        <Link
          href="/"
          className="inline-flex shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
          aria-label="Nyumbani — accueil"
        >
          <Image
            src={LOGO_URL}
            alt=""
            width={160}
            height={54}
            className="object-contain w-[140px] h-auto sm:w-[160px] drop-shadow-lg"
            priority
            referrerPolicy="no-referrer"
          />
        </Link>
      </div>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event('nyumbani:open-enquire'))}
        className="hidden sm:inline-flex items-center gap-2 border border-white/30 bg-white/10 backdrop-blur-sm text-white text-[10px] font-semibold tracking-wider uppercase px-6 py-2.5 rounded-full transition hover:bg-white/20 hover:border-white/50"
      >
        Enquire Now
      </button>
    </header>
  );
}

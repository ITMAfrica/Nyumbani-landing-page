'use client';

import { useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { useI18n } from '@/lib/i18n';

function tierImageUnoptimized(src: StaticImageData | string): boolean {
  return typeof src === 'string' && src.startsWith('/api/');
}

type PricingPageLayoutProps = {
  heroImage: StaticImageData;
  heroAlt: string;
  homeHref: string;
  homeLabel: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children: React.ReactNode;
};

export function PricingPageLayout({
  heroImage,
  heroAlt,
  homeHref,
  homeLabel,
  eyebrow,
  title,
  subtitle,
  children,
}: PricingPageLayoutProps) {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <section className="relative isolate min-h-[min(420px,52vh)] w-full overflow-hidden bg-slate-900">
        <Image
          src={heroImage}
          alt={heroAlt}
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/40 to-black/25" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/20" aria-hidden />

        <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-8 px-6 pb-20 pt-6 sm:px-10 lg:px-16">
          <Link
            href={homeHref}
            className="inline-flex w-fit items-center gap-2 text-[13px] font-medium tracking-wide text-white/85 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
            {homeLabel}
          </Link>

          <div className="max-w-3xl pt-6 sm:pt-8 md:pt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-light">{eyebrow}</p>
            <h1 className="mt-4 font-serif text-3xl font-normal leading-[1.12] tracking-tight text-white sm:text-4xl md:text-[2.85rem] [text-shadow:0_2px_28px_rgba(0,0,0,0.42)]">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-sm font-light leading-relaxed text-white/92 sm:text-base [text-shadow:0_1px_14px_rgba(0,0,0,0.3)]">
              {subtitle}
            </p>
          </div>
        </div>
      </section>

      <div className="relative z-10 -mt-12 mx-auto max-w-[1600px] px-5 pb-20 sm:px-10 lg:-mt-16 lg:px-16 lg:pb-28">
        <div className="rounded-[1.85rem] border border-white/70 bg-white/95 px-5 py-9 shadow-[0_28px_90px_-32px_rgba(31,45,61,0.28)] ring-1 ring-slate-200/80 backdrop-blur-md sm:p-10 md:rounded-[2rem] lg:p-12">
          {children}
        </div>
      </div>
    </main>
  );
}

type PricingTierCardProps = {
  /** Single hero image when not using `images`. */
  image?: StaticImageData | string;
  /** Multiple sources (e.g. gallery URLs): cycles with a subtle cross-fade when length &gt; 1. */
  images?: (StaticImageData | string)[];
  imageAlt: string;
  title: React.ReactNode;
  children: React.ReactNode;
};

export function PricingTierCard({ image, images, imageAlt, title, children }: PricingTierCardProps) {
  const { dict } = useI18n();
  const resolved =
    images && images.length > 0 ? images : image !== undefined ? [image] : [];
  const slideshow = resolved.length > 1;
  const [slide, setSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!slideshow || lightboxOpen) return;
    const id = window.setInterval(() => {
      setSlide((i) => (i + 1) % resolved.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, [slideshow, resolved.length, lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setLightboxOpen(false);
        return;
      }
      const n = resolved.length;
      if (n <= 1) return;
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLightboxIndex((i) => (i - 1 + n) % n);
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        setLightboxIndex((i) => (i + 1) % n);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxOpen, resolved.length]);

  const openLightboxAtCurrentSlide = () => {
    if (resolved.length === 0) return;
    setLightboxIndex(slideshow ? slide : 0);
    setLightboxOpen(true);
  };

  const lightboxSrc = resolved[lightboxIndex];

  return (
    <>
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_22px_55px_-28px_rgba(31,45,61,0.2)] ring-1 ring-black/[0.04] transition-[box-shadow,border-color] hover:border-gold/35 hover:shadow-[0_32px_70px_-24px_rgba(31,45,61,0.26)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
          {slideshow ? (
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={slide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.05, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={resolved[slide]}
                  alt={`${imageAlt} — ${slide + 1} / ${resolved.length}`}
                  fill
                  unoptimized={tierImageUnoptimized(resolved[slide])}
                  className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 520px"
                />
              </motion.div>
            </AnimatePresence>
          ) : (
            resolved[0] !== undefined && (
              <Image
                src={resolved[0]}
                alt={imageAlt}
                fill
                unoptimized={tierImageUnoptimized(resolved[0])}
                className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 520px"
              />
            )
          )}
          {slideshow && resolved.length > 1 && (
            <div
              className="pointer-events-none absolute bottom-2.5 right-2.5 z-[4] flex gap-1.5 rounded-full bg-black/35 px-2 py-1.5 backdrop-blur-[6px]"
              aria-hidden
            >
              {resolved.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${i === slide ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-navy/55 via-navy/[0.08] to-transparent"
            aria-hidden
          />
          {resolved.length > 0 && (
            <button
              type="button"
              onClick={openLightboxAtCurrentSlide}
              aria-label={dict.gallery.expandPhotoAria}
              className="absolute inset-0 z-[3] cursor-zoom-in rounded-none bg-transparent outline-none ring-inset transition hover:bg-black/[0.03] focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-0"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <h2 className="text-lg font-semibold uppercase tracking-[0.14em] text-navy">{title}</h2>
          {children}
        </div>
      </article>

      <AnimatePresence>
        {lightboxOpen && lightboxSrc !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-5 sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label={imageAlt}
          >
            <button
              type="button"
              aria-label={dict.gallery.lightboxClose}
              className="absolute inset-0 bg-black/88 backdrop-blur-[2px]"
              onClick={() => setLightboxOpen(false)}
            />
            <button
              type="button"
              className="absolute right-4 top-4 z-[102] rounded-full border border-white/35 bg-black/55 p-2.5 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/75"
              aria-label={dict.gallery.lightboxClose}
              onClick={() => setLightboxOpen(false)}
            >
              <X className="h-5 w-5" strokeWidth={1.5} aria-hidden />
            </button>
            {resolved.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label={dict.gallery.lightboxPrev}
                  className="absolute left-3 top-1/2 z-[102] -translate-y-1/2 rounded-full border border-white/35 bg-black/55 p-3 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/75 sm:left-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i - 1 + resolved.length) % resolved.length);
                  }}
                >
                  <ChevronLeft className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label={dict.gallery.lightboxNext}
                  className="absolute right-3 top-1/2 z-[102] -translate-y-1/2 rounded-full border border-white/35 bg-black/55 p-3 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/75 sm:right-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i + 1) % resolved.length);
                  }}
                >
                  <ChevronRight className="h-6 w-6" strokeWidth={1.5} aria-hidden />
                </button>
              </>
            )}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative z-[101] mx-auto flex h-[min(58vh,480px)] w-full max-w-xl items-center justify-center sm:h-[min(64vh,540px)] sm:max-w-2xl lg:max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-full w-full min-h-[180px]">
                <Image
                  key={lightboxIndex}
                  src={lightboxSrc}
                  alt={`${imageAlt} — ${lightboxIndex + 1} / ${resolved.length}`}
                  fill
                  unoptimized={tierImageUnoptimized(lightboxSrc)}
                  className="object-contain"
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 672px, 768px"
                  priority
                />
              </div>
            </motion.div>
            {resolved.length > 1 && (
              <p className="pointer-events-none absolute bottom-6 left-1/2 z-[102] -translate-x-1/2 rounded-full bg-black/55 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/95 backdrop-blur-sm">
                {lightboxIndex + 1}
                {' / '}
                {resolved.length}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

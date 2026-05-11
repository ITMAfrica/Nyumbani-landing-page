'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  X,
  ImageIcon,
  DoorOpen,
  Sofa,
  CookingPot,
  Bath,
  Ruler,
  Building2,
  ShieldCheck,
  Sparkles,
  TreePine,
  Gem,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { getApartmentBySlug } from '@/lib/apartments';
import { useI18n } from '@/lib/i18n';

function getIconForFeature(label: string): React.ElementType {
  const lower = label.toLowerCase();
  if (lower.includes('bedroom') || lower.includes('bed')) return DoorOpen;
  if (lower.includes('living') || lower.includes('lounge')) return Sofa;
  if (lower.includes('kitchen')) return CookingPot;
  if (lower.includes('bath') || lower.includes('toilet')) return Bath;
  if (lower.includes('multi') || lower.includes('level')) return Ruler;
  if (lower.includes('entrance')) return ShieldCheck;
  if (lower.includes('modern') || lower.includes('spacious')) return Sparkles;
  if (lower.includes('community') || lower.includes('gated')) return Building2;
  if (lower.includes('amenities') || lower.includes('pool') || lower.includes('gym')) return TreePine;
  if (lower.includes('security') || lower.includes('cctv') || lower.includes('access')) return ShieldCheck;
  if (lower.includes('outdoor') || lower.includes('balcony') || lower.includes('garden') || lower.includes('terrace')) return TreePine;
  if (lower.includes('layout') || lower.includes('open')) return Ruler;
  if (lower.includes('family') || lower.includes('professional')) return Gem;
  return DoorOpen;
}

export function ApartmentDetailView({ slug }: { slug: string }) {
  const { dict } = useI18n();
  const apt = slug ? getApartmentBySlug(slug) : undefined;
  const [files, setFiles] = useState<string[] | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!slug || !apt) return;
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/apartements/${encodeURIComponent(slug)}/files`);
      if (!res.ok) {
        if (!cancelled) notFound();
        return;
      }
      const data = (await res.json()) as { files: string[] };
      if (cancelled) return;
      setFiles(data.files);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, apt]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightboxIndex === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [lightboxIndex]);

  // Keyboard navigation in lightbox
  useEffect(() => {
    if (lightboxIndex === null || !files) return;
    const n = files.length;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setLightboxIndex(null); return; }
      if (n <= 1) return;
      if (e.key === 'ArrowLeft') { setLightboxIndex((i) => i !== null ? (i - 1 + n) % n : 0); }
      if (e.key === 'ArrowRight') { setLightboxIndex((i) => i !== null ? (i + 1) % n : 0); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, files]);

  if (!apt) {
    notFound();
  }

  const coverSrc = `/api/photo/${apt.slug}/${encodeURIComponent(apt.coverFile)}`;
  const galleryFiles = files ?? [];
  const lightboxSrc = lightboxIndex !== null
    ? `/api/photo/${apt.slug}/${encodeURIComponent(galleryFiles[lightboxIndex])}`
    : null;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 antialiased">

      {/* ═══════════════════════════════════════════════
          SECTION 1 — VISUAL GALLERY (2-column editorial)
          ═══════════════════════════════════════════════ */}
      <section className="relative w-full bg-white">
        {/* Back link — floating over hero */}
        <div className="absolute top-0 left-0 right-0 z-30 mx-auto max-w-[1600px] px-6 pt-6 sm:px-10 sm:pt-6 lg:px-16">
          <Link
            href="/pricing/platinum"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-[13px] font-medium tracking-wide text-slate-700 backdrop-blur-md transition hover:bg-slate-100 hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
            {dict.gallery.home}
          </Link>
        </div>

        {/* Photo count badge — floating top-right */}
        <div className="absolute top-4 right-4 z-30 sm:top-6 sm:right-6 lg:right-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1.5 text-[11px] font-medium text-slate-600 backdrop-blur-sm ring-1 ring-slate-200">
            <ImageIcon className="h-3 w-3" strokeWidth={2} aria-hidden />
            {galleryFiles.length} photo{galleryFiles.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Two-column gallery */}
        <div className="mx-auto flex max-w-[1600px] flex-col gap-1.5 px-1.5 pt-20 pb-2 sm:gap-2 sm:px-2 sm:pt-24 md:flex-row md:gap-2 md:pt-28 lg:gap-2.5 lg:px-3 lg:pt-32">
          {/* ── Left column: Main hero image (62%) ── */}
          <div className="relative w-full overflow-hidden bg-white shadow-2xl md:w-[61.8%]">
            <button
              type="button"
              onClick={() => setLightboxIndex(0)}
              className="group relative block w-full aspect-[4/3] md:aspect-auto md:h-[520px] lg:h-[600px] outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <Image
                src={coverSrc}
                alt={apt.title}
                fill
                priority
                className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 62vw"
                unoptimized
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/15" aria-hidden />

              {/* Title + subtitle overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-8 lg:p-10">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-light">
                  {apt.subtitle}
                </p>
                <h1 className="mt-3 max-w-2xl font-serif text-3xl font-normal leading-[1.12] tracking-tight text-white sm:text-4xl md:text-5xl [text-shadow:0_2px_28px_rgba(0,0,0,0.42)]">
                  {apt.title}
                </h1>
              </div>
            </button>
          </div>

          {/* ── Right column: 2x2 grid (38%) ── */}
          {galleryFiles.length > 1 && (
            <div className="grid w-full grid-cols-2 gap-1.5 sm:gap-2 md:w-[38.2%] lg:gap-2.5">
              {(() => {
                const gridPhotos = galleryFiles.filter((f) => f !== apt.coverFile).slice(0, 4);
                const remainingCount = galleryFiles.length - 1; // minus the cover already shown
                const hasMore = remainingCount > 4;

                return gridPhotos.map((filename, i) => {
                  const src = `/api/photo/${apt.slug}/${encodeURIComponent(filename)}`;
                  const isLast = i === gridPhotos.length - 1;
                  // Find the original index in full gallery for lightbox
                  const originalIndex = galleryFiles.indexOf(filename);

                  return (
                    <button
                      key={filename}
                      type="button"
                      onClick={() => setLightboxIndex(originalIndex)}
                      className="group relative overflow-hidden bg-white outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                    >
                      <div className="aspect-[4/3] md:aspect-auto md:h-[254px] lg:h-[294px] relative">
                        <Image
                          src={src}
                          alt={`${apt.title} — photo ${i + 2}`}
                          fill
                          className="object-cover transition duration-500 ease-out group-hover:scale-[1.06]"
                          sizes="(max-width: 768px) 50vw, 19vw"
                          unoptimized
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* "View all photos" overlay on last cell */}
                        {isLast && hasMore && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
                            <span className="inline-flex flex-col items-center gap-1 text-white">
                              <ImageIcon className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} aria-hidden />
                              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs">
                                {dict.gallery.viewAll}
                              </span>
                              <span className="text-[10px] font-light text-white/40">
                                +{remainingCount - 3} photos
                              </span>
                            </span>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                });
              })()}
            </div>
          )}
        </div>
      </section>

      {/* Loading state */}
      {files === null && (
        <div className="flex items-center justify-center py-32 bg-white">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-400 font-light">{dict.gallery.loading}</p>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════
          SECTION 2 — PRICING & DETAILS
          ═══════════════════════════════════════════════ */}
      <section className="relative bg-white">
        {/* Subtle top transition */}
        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-slate-100/80 to-transparent pointer-events-none" aria-hidden />

        <div className="mx-auto max-w-[1600px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">

            {/* ── Left column: Pricing ── */}
            <div className="lg:col-span-2">
              <div className="sticky top-24">
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[2px] w-8 bg-gold" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-platinum-dark">
                    Price
                  </span>
                </div>

                <div className="space-y-4">
                  {/* KES Card */}
                  <div className="rounded-2xl border border-gold/20 bg-gradient-to-br from-navy/[0.03] to-gold/[0.06] px-7 py-6">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="inline-flex items-center justify-center rounded-[5px] bg-navy px-2.5 py-[3px] text-[10px] font-bold leading-[1.5] tracking-[0.08em] text-white">
                        {dict.pricing.Kes}
                      </span>
                    </div>
                    <p className="font-serif text-[2.2rem] leading-none tracking-tight text-navy sm:text-[2.8rem]">
                      {apt.kesPrice}
                    </p>
                    <p className="mt-1.5 text-xs font-light text-slate-400">
                      {dict.pricing.from} {dict.pricing.Kes}
                    </p>
                  </div>

                  {/* USD Card */}
                  <div className="rounded-2xl border border-platinum-light/70 bg-white px-7 py-6 shadow-sm">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="inline-flex items-center justify-center rounded-[5px] bg-navy/80 px-2.5 py-[3px] text-[10px] font-bold leading-[1.5] tracking-[0.08em] text-white">
                        {dict.pricing.Usd}
                      </span>
                    </div>
                    <p className="font-serif text-[2.2rem] leading-none tracking-tight text-navy sm:text-[2.8rem]">
                      {apt.usdPrice}
                    </p>
                    <p className="mt-1.5 text-xs font-light text-slate-400">
                      {dict.pricing.from} {dict.pricing.Usd}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right column: Details & Features ── */}
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[2px] w-8 bg-gold" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-platinum-dark">
                  Overview
                </span>
              </div>

              {/* Description */}
              <p className="text-base font-normal leading-relaxed text-slate-600 sm:text-lg">
                {apt.description}
              </p>

              {/* Divider */}
              <div className="relative my-10">
                <div className="h-px bg-gradient-to-r from-gold/20 via-platinum-light to-transparent" />
                <div className="absolute -top-[3px] left-0 h-[6px] w-[28px] rounded-full bg-gold/40" />
              </div>

              {/* Features */}
              <h2 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-navy mb-6">
                Features
              </h2>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                {apt.features.map((feature) => {
                  const Icon = getIconForFeature(feature.label);
                  return (
                    <li
                      key={feature.label}
                      className="flex items-start gap-3.5 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm font-normal leading-relaxed text-slate-700 transition-colors hover:border-gold/20 hover:bg-gold/[0.03]"
                    >
                      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy/[0.06] text-navy">
                        <Icon className="h-4 w-4" strokeWidth={1.5} />
                      </span>
                      {feature.label}
                    </li>
                  );
                })}
              </ul>

              {/* Amenities note */}
              <div className="mt-10 rounded-xl border border-platinum-light/50 bg-gradient-to-br from-cream/70 via-white to-platinum-light/20 px-6 py-5">
                <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-platinum-dark mb-3">
                  {dict.pricing.generalAmenitiesHeading}
                </h3>
                <p className="text-sm font-light leading-relaxed text-slate-500">
                  {dict.pricing.amenitiesBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          LIGHTBOX — Full-screen photo viewer
          ═══════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxIndex !== null && lightboxSrc !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] flex flex-col bg-black/98"
            role="dialog"
            aria-modal="true"
            aria-label={`${apt.title} — photo ${lightboxIndex + 1} / ${galleryFiles.length}`}
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-[110] flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50 sm:text-xs">
                {apt.title}
              </span>
              <button
                type="button"
                aria-label="Close gallery"
                className="rounded-full border border-white/20 bg-white/8 p-2.5 text-white backdrop-blur-md transition hover:bg-white/20"
                onClick={() => setLightboxIndex(null)}
              >
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </button>
            </div>

            {/* Main image */}
            <div className="flex flex-1 items-center justify-center px-4 sm:px-10">
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative h-[55vh] w-full min-h-[200px] sm:h-[70vh] lg:h-[80vh]"
              >
                <Image
                  src={lightboxSrc}
                  alt={`${apt.title} — ${lightboxIndex + 1} / ${galleryFiles.length}`}
                  fill
                  unoptimized
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 85vw"
                  priority
                />
              </motion.div>
            </div>

            {/* Prev / Next arrows */}
            {galleryFiles.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 z-[110] -translate-y-1/2 rounded-full border border-white/15 bg-black/35 p-3 text-white backdrop-blur-md transition hover:bg-white/15 sm:left-5 sm:p-3.5"
                  onClick={() => setLightboxIndex((i) => i !== null ? (i - 1 + galleryFiles.length) % galleryFiles.length : 0)}
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} aria-hidden />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 z-[110] -translate-y-1/2 rounded-full border border-white/15 bg-black/35 p-3 text-white backdrop-blur-md transition hover:bg-white/15 sm:right-5 sm:p-3.5"
                  onClick={() => setLightboxIndex((i) => i !== null ? (i + 1) % galleryFiles.length : 0)}
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.5} aria-hidden />
                </button>
              </>
            )}

            {/* Counter */}
            <p className="pointer-events-none absolute bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-white/8 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
              {lightboxIndex + 1} / {galleryFiles.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

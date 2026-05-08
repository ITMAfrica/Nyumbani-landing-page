"use client";

import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useI18n } from "@/lib/i18n";

function tierImageUnoptimized(src: StaticImageData | string): boolean {
  return typeof src === "string" && src.startsWith("/api/");
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
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/40 to-black/25"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/20"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-8 px-6 pb-20 pt-6 sm:px-10 lg:px-16">
          <Link
            href={homeHref}
            className="inline-flex w-fit items-center gap-2 text-[13px] font-medium tracking-wide text-white/85 transition hover:text-white"
          >
            <ArrowLeft
              className="h-4 w-4 shrink-0"
              strokeWidth={1.5}
              aria-hidden
            />
            {homeLabel}
          </Link>

          <div className="max-w-3xl pt-6 sm:pt-8 md:pt-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-light">
              {eyebrow}
            </p>
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
  /** Optional className for the card wrapper */
  className?: string;
  /** Optional className for the image container */
  imageClassName?: string;
};

export function PricingTierCard({
  image,
  images,
  imageAlt,
  title,
  children,
  className,
  imageClassName,
}: PricingTierCardProps) {
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
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [lightboxOpen]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const n = resolved.length;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setLightboxOpen(false);
        return;
      }
      if (n <= 1) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setLightboxIndex((i) => (i - 1 + n) % n);
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setLightboxIndex((i) => (i + 1) % n);
      }
    };

    let wheelAccumulator = 0;
    const onWheel = (e: WheelEvent) => {
      if (n <= 1) return;
      e.preventDefault();
      wheelAccumulator += e.deltaX !== 0 ? e.deltaX : e.deltaY;
      if (Math.abs(wheelAccumulator) >= 80) {
        if (wheelAccumulator > 0) {
          setLightboxIndex((i) => (i + 1) % n);
        } else {
          setLightboxIndex((i) => (i - 1 + n) % n);
        }
        wheelAccumulator = 0;
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("wheel", onWheel);
    };
  }, [lightboxOpen, resolved.length]);

  const openLightboxAtCurrentSlide = () => {
    if (resolved.length === 0) return;
    setLightboxIndex(slideshow ? slide : 0);
    setLightboxOpen(true);
  };

  const lightboxSrc = resolved[lightboxIndex];

  return (
    <>
      <article
        className={`group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_22px_55px_-28px_rgba(31,45,61,0.2)] ring-1 ring-black/[0.04] transition-[box-shadow,border-color] hover:border-gold/35 hover:shadow-[0_32px_70px_-24px_rgba(31,45,61,0.26)] ${className ?? ""}`}
      >
        <button
          type="button"
          onClick={openLightboxAtCurrentSlide}
          aria-label={dict.gallery.expandPhotoAria}
          className={`relative w-full block cursor-zoom-in overflow-hidden bg-slate-200 text-left outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-0 ${imageClassName ?? "aspect-[16/10]"}`}
        >
          {slideshow ? (
            <AnimatePresence initial={false} mode="sync">
              <motion.div
                key={slide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.05, ease: [0.4, 0, 0.2, 1] }}
                className="absolute inset-0 pointer-events-none"
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
                className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.04] pointer-events-none"
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
                  className={`h-1.5 w-1.5 rounded-full transition-colors ${i === slide ? "bg-white" : "bg-white/40"}`}
                />
              ))}
            </div>
          )}
          <div
            className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-navy/55 via-navy/[0.08] to-transparent"
            aria-hidden
          />
          {/* View gallery indicator on hover */}
          {resolved.length > 1 && (
            <span className="pointer-events-none absolute bottom-2.5 left-2.5 z-[5] rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {dict.gallery.view} {resolved.length} photos
            </span>
          )}
        </button>
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <h2 className="text-lg font-semibold uppercase tracking-[0.14em] text-navy">
            {title}
          </h2>
          {children}
        </div>
      </article>

      <AnimatePresence>
        {lightboxOpen && lightboxSrc !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[100] flex flex-col bg-black"
            role="dialog"
            aria-modal="true"
            aria-label={imageAlt}
          >
            {/* ── Top bar ── */}
            <div className="absolute top-0 left-0 right-0 z-[110] flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/60 sm:text-xs">
                {imageAlt}
              </span>
              <button
                type="button"
                aria-label={dict.gallery.lightboxClose}
                className="rounded-full border border-white/25 bg-white/10 p-2.5 text-white backdrop-blur-md transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                onClick={() => setLightboxOpen(false)}
              >
                <X className="h-5 w-5" strokeWidth={1.5} aria-hidden />
              </button>
            </div>

            {/* ── Main image area + arrows ── */}
            <div className="flex flex-1 items-center justify-center px-4 sm:px-10 lg:pr-28">
              {/* Prev arrow */}
              {resolved.length > 1 && (
                <button
                  type="button"
                  aria-label={dict.gallery.lightboxPrev}
                  className="absolute left-3 top-1/2 z-[110] -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-white/20 sm:left-5"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (i) => (i - 1 + resolved.length) % resolved.length,
                    );
                  }}
                >
                  <ChevronLeft
                    className="h-6 w-6"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </button>
              )}

              {/* Image */}
              <motion.div
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.15}
                onDragEnd={(_e, info) => {
                  if (resolved.length <= 1) return;
                  if (info.offset.x < -60) {
                    setLightboxIndex((i) => (i + 1) % resolved.length);
                  } else if (info.offset.x > 60) {
                    setLightboxIndex(
                      (i) => (i - 1 + resolved.length) % resolved.length,
                    );
                  }
                }}
                className="relative flex h-full w-full max-w-4xl items-center justify-center touch-pan-y"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-[55vh] w-full min-h-[220px] sm:h-[65vh] lg:h-[75vh]">
                  <Image
                    src={lightboxSrc}
                    alt={`${imageAlt} — ${lightboxIndex + 1} / ${resolved.length}`}
                    fill
                    unoptimized={tierImageUnoptimized(lightboxSrc)}
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 85vw, 70vw"
                    priority
                  />
                </div>
              </motion.div>

              {/* Next arrow */}
              {resolved.length > 1 && (
                <button
                  type="button"
                  aria-label={dict.gallery.lightboxNext}
                  className="absolute right-3 top-1/2 z-[110] -translate-y-1/2 rounded-full border border-white/20 bg-black/40 p-3 text-white backdrop-blur-md transition hover:bg-white/20 sm:right-5 lg:right-28"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i + 1) % resolved.length);
                  }}
                >
                  <ChevronRight
                    className="h-6 w-6"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </button>
              )}
            </div>

            {/* ── Thumbnail strip — desktop: right sidebar ── */}
            {resolved.length > 1 && (
              <>
                <aside
                  className="hidden lg:flex absolute right-0 top-0 bottom-0 z-[105] w-24 flex-col items-center gap-2 overflow-y-auto px-2 py-24"
                  aria-label="Gallery thumbnails"
                >
                  {resolved.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className={`relative w-[72px] h-[54px] shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                        i === lightboxIndex
                          ? "border-gold shadow-[0_0_12px_rgba(212,175,55,0.5)] scale-105"
                          : "border-white/15 hover:border-white/40 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        unoptimized={tierImageUnoptimized(src)}
                        className="object-cover"
                        sizes="72px"
                      />
                    </button>
                  ))}
                </aside>

                {/* ── Thumbnail strip — mobile: bottom bar ── */}
                <div
                  className="lg:hidden absolute bottom-16 left-4 right-4 z-[110] flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
                  aria-label="Gallery thumbnails"
                >
                  {resolved.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      className={`relative w-[56px] h-[42px] shrink-0 overflow-hidden rounded-md border-2 transition-all duration-300 ${
                        i === lightboxIndex
                          ? "border-gold shadow-[0_0_10px_rgba(212,175,55,0.45)] scale-105"
                          : "border-white/20 hover:border-white/50 opacity-55 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        unoptimized={tierImageUnoptimized(src)}
                        className="object-cover"
                        sizes="56px"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* ── Counter ── */}
            {resolved.length > 1 && (
              <p className="pointer-events-none absolute bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-md lg:bottom-8">
                {lightboxIndex + 1}
                {" / "}
                {resolved.length}
              </p>
            )}

            {/* ── Tap areas: left/right edges navigate (mobile-friendly) ── */}
            {resolved.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label={dict.gallery.lightboxPrev}
                  className="absolute left-0 top-[10%] bottom-[10%] z-[102] w-[18%] max-w-[80px] cursor-w-resize bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (i) => (i - 1 + resolved.length) % resolved.length,
                    );
                  }}
                />
                <button
                  type="button"
                  aria-label={dict.gallery.lightboxNext}
                  className="absolute right-0 top-[10%] bottom-[10%] z-[102] w-[18%] max-w-[80px] lg:right-24 cursor-e-resize bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/50"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((i) => (i + 1) % resolved.length);
                  }}
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

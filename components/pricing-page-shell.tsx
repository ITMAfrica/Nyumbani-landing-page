'use client';

import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type PricingPageShellProps = {
  heroImage: StaticImageData;
  heroAlt: string;
  homeHref: string;
  homeLabel: string;
  eyebrow: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  children: React.ReactNode;
};

export function PricingPageShell({
  heroImage,
  heroAlt,
  homeHref,
  homeLabel,
  eyebrow,
  title,
  subtitle,
  children,
}: PricingPageShellProps) {
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
  image: StaticImageData | string;
  imageAlt: string;
  title: React.ReactNode;
  children: React.ReactNode;
};

export function PricingTierCard({ image, imageAlt, title, children }: PricingTierCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_22px_55px_-28px_rgba(31,45,61,0.2)] ring-1 ring-black/[0.04] transition-[box-shadow,border-color] hover:border-gold/35 hover:shadow-[0_32px_70px_-24px_rgba(31,45,61,0.26)]">
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 520px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/[0.08] to-transparent" aria-hidden />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <h2 className="text-lg font-semibold uppercase tracking-[0.14em] text-navy">{title}</h2>
        {children}
      </div>
    </article>
  );
}

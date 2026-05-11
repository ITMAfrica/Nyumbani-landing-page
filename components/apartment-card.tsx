"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Apartment } from "@/lib/apartments";
import type { StaticImageData } from "next/image";

type ApartmentCardProps = {
  apartment: Apartment;
  imageSrc?: StaticImageData | string;
};

export function ApartmentCard({ apartment, imageSrc }: ApartmentCardProps) {
  const { dict } = useI18n();
  const imgSrc =
    imageSrc ?? `/api/photo/${apartment.slug}/${encodeURIComponent(apartment.coverFile)}`;

  return (
    <Link
      href={`/apartements/${apartment.slug}`}
      className="group relative flex flex-col overflow-hidden bg-white shadow-[0_22px_55px_-28px_rgba(31,45,61,0.2)] ring-1 ring-black/[0.04] transition-all duration-500 hover:shadow-[0_32px_80px_-20px_rgba(31,45,61,0.35)] hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-200">
        <Image
          src={imgSrc}
          alt={apartment.title}
          fill
          className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.06]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 520px"
          unoptimized={typeof imgSrc === "string"}
        />
        {/* Gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"
          aria-hidden
        />

        {/* Content on image */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-6 sm:p-7">
          <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-light">
            {apartment.subtitle}
          </span>
          <h2 className="mt-1.5 font-serif text-xl font-normal leading-tight text-white sm:text-2xl [text-shadow:0_1px_12px_rgba(0,0,0,0.3)]">
            {apartment.title}
          </h2>

          {/* Price pills */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-white backdrop-blur-sm ring-1 ring-white/20">
              <span className="rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-bold tracking-[0.08em]">
                {dict.pricing.Kes}
              </span>
              {apartment.kesPrice}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold tracking-[0.06em] text-white backdrop-blur-sm ring-1 ring-white/20">
              <span className="rounded bg-white/20 px-1.5 py-0.5 text-[9px] font-bold tracking-[0.08em]">
                {dict.pricing.Usd}
              </span>
              {apartment.usdPrice}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-4 sm:px-7 sm:py-5">
        <span className="text-xs font-medium tracking-wide text-slate-400 transition-colors duration-300 group-hover:text-navy">
          {dict.gallery.view} details
        </span>
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/5 text-navy transition-all duration-300 group-hover:bg-gold group-hover:text-white group-hover:shadow-[0_4px_16px_rgba(212,175,55,0.35)]">
          <ChevronRight className="h-4 w-4" strokeWidth={2} />
        </span>
      </div>
    </Link>
  );
}

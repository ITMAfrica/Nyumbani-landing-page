"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Apartment } from "@/lib/apartments";
import type { StaticImageData } from "next/image";
import { ImageWithSkeleton } from "@/components/image-with-skeleton";

import {
  DoorOpen,
  Sofa,
  CookingPot,
  Bath,
  ShieldCheck,
  TreePine,
  Sparkles,
  Ruler,
  Building2,
} from "lucide-react";

type ApartmentCardProps = {
  apartment: Apartment;
  imageSrc?: StaticImageData | string;
};

/* ─── Feature icon mapping ─── */

const ICON_MAP: Record<string, string> = {
  door: "DoorOpen",
  bedroom: "DoorOpen",
  chambre: "DoorOpen",
  living: "Sofa",
  lounge: "Sofa",
  salon: "Sofa",
  kitchen: "CookingPot",
  cuisine: "CookingPot",
  bath: "Bath",
  security: "ShieldCheck",
  secure: "ShieldCheck",
  sécurité: "ShieldCheck",
  terrace: "TreePine",
  balcony: "TreePine",
  outdoor: "TreePine",
  garden: "TreePine",
  jardin: "TreePine",
  community: "ShieldCheck",
  gated: "ShieldCheck",
  entrance: "ShieldCheck",
  entrée: "ShieldCheck",
  "open plan": "Sparkles",
  layout: "Sparkles",
  family: "Sparkles",
  multi: "Ruler",
  level: "Ruler",
  amenities: "Building2",
};

const iconComponents: Record<string, React.ElementType> = {
  DoorOpen,
  Sofa,
  CookingPot,
  Bath,
  ShieldCheck,
  TreePine,
  Sparkles,
  Ruler,
  Building2,
};

function resolveIconKey(label: string): string {
  const lower = label.toLowerCase();
  for (const [keyword, icon] of Object.entries(ICON_MAP)) {
    if (lower.includes(keyword)) return icon;
  }
  return "";
}

function FeatureIcon({ label }: { label: string }) {
  const iconKey = resolveIconKey(label);
  const Icon = iconKey ? iconComponents[iconKey] : null;
  if (!Icon) {
    return (
      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy/[0.07] text-navy">
        <span className="text-[10px] font-bold">·</span>
      </span>
    );
  }
  return (
    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy/[0.07] text-navy">
      <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
    </span>
  );
}

export function ApartmentCard({ apartment, imageSrc }: ApartmentCardProps) {
  const { dict } = useI18n();
  const imgSrc =
    imageSrc ??
    `/api/photo/${apartment.slug}/${encodeURIComponent(apartment.coverFile)}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_22px_55px_-28px_rgba(31,45,61,0.2)] ring-1 ring-black/[0.04] transition-[box-shadow,border-color] hover:border-gold/35 hover:shadow-[0_32px_70px_-24px_rgba(31,45,61,0.26)]">
      {/* Image */}
      <Link
        href={`/apartements/${apartment.slug}`}
        className="relative aspect-[16/10] w-full block overflow-hidden bg-slate-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-0"
        aria-label={`${dict.gallery.view} ${apartment.title}`}
      >
        <ImageWithSkeleton
          src={imgSrc}
          alt={apartment.title}
          fill
          className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 520px"
          unoptimized={typeof imgSrc === "string"}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/55 via-navy/[0.08] to-transparent"
          aria-hidden
        />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 sm:p-8">
        {/* Title area — Platinum style */}
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 mb-1.5">
            <div className="h-[3px] w-5 rounded-full bg-gold" />
            <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-platinum-dark">
              {apartment.subtitle || "Residence Type"}
            </span>
          </div>
          <h2 className="block text-lg font-semibold uppercase tracking-[0.12em] text-navy">
            {apartment.title}
          </h2>
        </div>

        {/* Price — Platinum style grid */}
        <div className="mt-5 grid grid-cols-2 gap-0 rounded-xl border border-platinum-light/70 overflow-hidden">
          <div className="relative border-r border-platinum-light/70 px-[18px] py-[14px]">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center rounded-[4px] bg-navy px-[7px] py-px text-[9px] font-bold leading-[1.5] tracking-[0.08em] text-white">
                {dict.pricing.Kes}
              </span>
            </div>
            <p className="font-serif text-[1.5rem] leading-none tracking-tight text-navy mt-1.5">
              {apartment.kesPrice}
            </p>
            <p className="text-[11px] font-light text-slate-400 mt-0.5">
              {dict.pricing.from}
            </p>
          </div>
          <div className="px-[18px] py-[14px]">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center justify-center rounded-[4px] bg-navy px-[7px] py-px text-[9px] font-bold leading-[1.5] tracking-[0.08em] text-white">
                {dict.pricing.Usd}
              </span>
            </div>
            <p className="font-serif text-[1.5rem] leading-none tracking-tight text-navy mt-1.5">
              {apartment.usdPrice}
            </p>
            <p className="text-[11px] font-light text-slate-400 mt-0.5">
              {dict.pricing.from}
            </p>
          </div>
        </div>

        {/* Divider — Platinum style */}
        <div className="relative mt-5">
          <div className="h-px bg-gradient-to-r from-platinum-light via-platinum-light to-transparent" />
          <div className="absolute -top-[3px] left-0 h-[6px] w-[28px] rounded-full bg-gold/40" />
        </div>

        {/* Features — Platinum style with icons */}
        <div className="mt-4">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-navy">
            {dict.pricing.descriptionHeading}
          </h3>
          <ul className="mt-[14px] space-y-[10px]">
            {apartment.features.map((f) => (
              <li
                key={f.label}
                className="flex items-start gap-[14px] text-sm font-normal leading-relaxed text-slate-700"
              >
                <FeatureIcon label={f.label} />
                {f.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer — View details link */}
        <div className="mt-6 pt-4 border-t border-platinum-light/40">
          <Link
            href={`/apartements/${apartment.slug}`}
            className="inline-flex items-center gap-2 text-xs font-medium tracking-wide text-slate-400 transition-colors duration-300 group/link hover:text-navy"
          >
            {dict.gallery.view} details
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy/5 text-navy transition-all duration-300 group-hover/link:bg-gold group-hover/link:text-white group-hover/link:shadow-[0_4px_16px_rgba(212,175,55,0.35)]">
              <ChevronRight className="h-4 w-4" strokeWidth={2} />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

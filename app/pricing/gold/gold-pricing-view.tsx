'use client';

import { useI18n } from '@/lib/i18n';
import { PricingPageLayout, PricingTierCard } from '@/components/pricing-page-layout';
import {
  DoorOpen,
  Sofa,
  CookingPot,
  Bath,
  Building2,
  Gem,
} from 'lucide-react';

import heroGold from '../../../photos/hero-2.jpg';

/** Mi Vida 5B4 gallery — used for the 1 bedroom pricing card. */
const GOLD_1BED_GALLERY = [
  '/api/photo/5b4-mi-vida/IMG_4343.webp',
  '/api/photo/5b4-mi-vida/IMG_4350.webp',
  '/api/photo/5b4-mi-vida/IMG_4379.webp',
  '/api/photo/5b4-mi-vida/IMG_4381.webp',
  '/api/photo/5b4-mi-vida/IMG_4428.webp',
  '/api/photo/5b4-mi-vida/IMG_4434.webp',
] as const;

/** Imagine by Benaa gallery — used for the 2 bedroom pricing card. */
const GOLD_2BED_GALLERY = [
  '/api/photo/imagine-by-benaa/IMG_4434.webp',
  '/api/photo/imagine-by-benaa/IMG_4442.webp',
  '/api/photo/imagine-by-benaa/IMG_4450.webp',
  '/api/photo/imagine-by-benaa/IMG_4455.webp',
  '/api/photo/imagine-by-benaa/IMG_4464.webp',
  '/api/photo/imagine-by-benaa/IMG_4469.webp',
] as const;

export function GoldPricingView() {
  const { dict } = useI18n();

  return (
    <PricingPageLayout
      heroImage={heroGold}
      heroAlt={`${dict.hero.alt} — ${dict.modal.gold}`}
      homeHref="/"
      homeLabel={dict.gallery.home}
      eyebrow={
        <span className="inline-flex items-center gap-2">
          <Gem className="h-3.5 w-3.5 text-gold-light" strokeWidth={2} />
          {dict.modal.livingCollection}
        </span>
      }
      title={dict.modal.gold}
      subtitle={dict.hero.gold.description}
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 lg:gap-10">
        {/* Studio */}
        <PricingTierCard
          image={heroGold}
          imageAlt={`${dict.pricing.tierStudio} — Nyumbani Gold`}
          imageClassName="aspect-[3/2]"
          title={
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="h-[3px] w-5 rounded-full bg-gold" />
                <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-platinum-dark">
                  Residence Type
                </span>
              </div>
              <span className="block text-lg font-semibold uppercase tracking-[0.12em] text-navy">
                {dict.pricing.tierStudio}
              </span>
            </div>
          }
        >
          {/* Price */}
          <div className="mt-5 grid grid-cols-2 gap-0 rounded-xl border border-platinum-light/70 overflow-hidden">
            <div className="relative border-r border-platinum-light/70 px-[18px] py-[14px]">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center rounded-[4px] bg-navy px-[7px] py-px text-[9px] font-bold leading-[1.5] tracking-[0.08em] text-white">
                  {dict.pricing.Kes}
                </span>
              </div>
              <p className="font-serif text-[1.5rem] leading-none tracking-tight text-navy mt-1.5">
                2.1M – 2.7M
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
                16,300 – 21,000
              </p>
              <p className="text-[11px] font-light text-slate-400 mt-0.5">
                {dict.pricing.from}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mt-5">
            <div className="h-px bg-gradient-to-r from-platinum-light via-platinum-light to-transparent" />
            <div className="absolute -top-[3px] left-0 h-[6px] w-[28px] rounded-full bg-gold/40" />
          </div>

          {/* Features */}
          <div className="mt-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-navy">
              {dict.pricing.descriptionHeading}
            </h3>
            <ul className="mt-[14px] space-y-[10px]">
              {[
                { icon: Building2, label: 'Open-plan layout' },
                { icon: CookingPot, label: 'Includes kitchenette' },
                { icon: Bath, label: 'Separate bathroom' },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-[14px] text-sm font-normal leading-relaxed text-slate-700"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy/[0.07] text-navy">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </PricingTierCard>

        {/* 1 Bedroom */}
        <PricingTierCard
          images={[...GOLD_1BED_GALLERY]}
          imageAlt={`${dict.pricing.tier1Bed} — Nyumbani Gold`}
          imageClassName="aspect-[3/2]"
          title={
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="h-[3px] w-5 rounded-full bg-gold" />
                <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-platinum-dark">
                  Residence Type
                </span>
              </div>
              <span className="block text-lg font-semibold uppercase tracking-[0.12em] text-navy">
                {dict.pricing.tier1Bed}
              </span>
            </div>
          }
        >
          {/* Price */}
          <div className="mt-5 grid grid-cols-2 gap-0 rounded-xl border border-platinum-light/70 overflow-hidden">
            <div className="relative border-r border-platinum-light/70 px-[18px] py-[14px]">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center rounded-[4px] bg-navy px-[7px] py-px text-[9px] font-bold leading-[1.5] tracking-[0.08em] text-white">
                  {dict.pricing.Kes}
                </span>
              </div>
              <p className="font-serif text-[1.5rem] leading-none tracking-tight text-navy mt-1.5">
                3.1M – 5.9M
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
                24,030 – 45,735
              </p>
              <p className="text-[11px] font-light text-slate-400 mt-0.5">
                {dict.pricing.from}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mt-5">
            <div className="h-px bg-gradient-to-r from-platinum-light via-platinum-light to-transparent" />
            <div className="absolute -top-[3px] left-0 h-[6px] w-[28px] rounded-full bg-gold/40" />
          </div>

          {/* Features */}
          <div className="mt-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-navy">
              {dict.pricing.descriptionHeading}
            </h3>
            <ul className="mt-[14px] space-y-[10px]">
              {[
                { icon: DoorOpen, label: 'Separate bedroom' },
                { icon: Sofa, label: 'Living room / lounge area' },
                { icon: CookingPot, label: 'Open plan kitchen' },
                { icon: Bath, label: '1 bathroom' },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-[14px] text-sm font-normal leading-relaxed text-slate-700"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy/[0.07] text-navy">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </PricingTierCard>

        {/* 2 Bedroom */}
        <PricingTierCard
          images={[...GOLD_2BED_GALLERY]}
          imageAlt={`${dict.pricing.tier2Bed} — Nyumbani Gold`}
          imageClassName="aspect-[3/2]"
          title={
            <div className="space-y-1">
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="h-[3px] w-5 rounded-full bg-gold" />
                <span className="block text-[10px] font-semibold uppercase tracking-[0.24em] text-platinum-dark">
                  Residence Type
                </span>
              </div>
              <span className="block text-lg font-semibold uppercase tracking-[0.12em] text-navy">
                {dict.pricing.tier2Bed}
              </span>
            </div>
          }
        >
          {/* Price */}
          <div className="mt-5 grid grid-cols-2 gap-0 rounded-xl border border-platinum-light/70 overflow-hidden">
            <div className="relative border-r border-platinum-light/70 px-[18px] py-[14px]">
              <div className="flex items-center gap-1.5">
                <span className="inline-flex items-center justify-center rounded-[4px] bg-navy px-[7px] py-px text-[9px] font-bold leading-[1.5] tracking-[0.08em] text-white">
                  {dict.pricing.Kes}
                </span>
              </div>
              <p className="font-serif text-[1.5rem] leading-none tracking-tight text-navy mt-1.5">
                7.6M – 9.4M
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
                61,240 – 72,100
              </p>
              <p className="text-[11px] font-light text-slate-400 mt-0.5">
                {dict.pricing.from}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="relative mt-5">
            <div className="h-px bg-gradient-to-r from-platinum-light via-platinum-light to-transparent" />
            <div className="absolute -top-[3px] left-0 h-[6px] w-[28px] rounded-full bg-gold/40" />
          </div>

          {/* Features */}
          <div className="mt-4">
            <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-navy">
              {dict.pricing.descriptionHeading}
            </h3>
            <ul className="mt-[14px] space-y-[10px]">
              {[
                { icon: DoorOpen, label: 'Two separate bedrooms' },
                { icon: Sofa, label: 'Living room / lounge area' },
                { icon: CookingPot, label: 'Kitchen (open or separate)' },
                { icon: Bath, label: 'One or more bathrooms' },
              ].map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-start gap-[14px] text-sm font-normal leading-relaxed text-slate-700"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy/[0.07] text-navy">
                    <Icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </PricingTierCard>
      </div>

      {/* Amenities — Platinum style */}
      <div className="mt-10 rounded-[1.25rem] border border-platinum-light/70 bg-gradient-to-br from-cream via-white to-platinum-light/30 p-6 sm:p-8">
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-platinum-dark">
          {dict.pricing.generalAmenitiesHeading}
        </h3>
        <p className="mt-4 max-w-3xl font-serif text-sm leading-relaxed text-slate-500 sm:text-base">
          {dict.pricing.amenitiesBody}
        </p>
      </div>
    </PricingPageLayout>
  );
}

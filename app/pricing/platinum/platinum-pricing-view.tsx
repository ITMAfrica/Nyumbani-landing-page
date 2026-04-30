'use client';

import { useI18n } from '@/lib/i18n';
import { PricingPageLayout, PricingTierCard } from '@/components/pricing-page-layout';

import heroPlatinum from '../../../photos/hero-1.jpg';
import heroAccent from '../../../photos/hero-2.jpg';

export function PlatinumPricingView() {
  const { dict } = useI18n();

  return (
    <PricingPageLayout
      heroImage={heroPlatinum}
      heroAlt={`${dict.hero.alt} — ${dict.modal.platinum}`}
      homeHref="/"
      homeLabel={dict.gallery.home}
      eyebrow={dict.modal.investmentCollection}
      title={dict.modal.platinum}
      subtitle={dict.hero.platinum.description}
    >
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:gap-12">
        <PricingTierCard
          image={heroPlatinum}
          imageAlt={`${dict.pricing.tier3Bed} — Nyumbani Platinum`}
          title={dict.pricing.tier3Bed}
        >
          <div className="mt-6 flex flex-wrap gap-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {dict.pricing.Kes}
              </p>
              <p className="mt-1 font-serif text-2xl text-navy">{dict.pricing.from} 13.9M</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {dict.pricing.Usd}
              </p>
              <p className="mt-1 font-serif text-2xl text-navy">{dict.pricing.from} 107,750</p>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              {dict.pricing.descriptionHeading}
            </h3>
            <ul className="mt-4 space-y-2 text-sm font-light leading-relaxed text-slate-600">
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>3 separate bedrooms
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Living room / lounge area
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Kitchen (open or separate)
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                One or more bathrooms
              </li>
            </ul>
          </div>
        </PricingTierCard>

        <PricingTierCard
          image={heroAccent}
          imageAlt={`${dict.pricing.tierTownhouse} — Nyumbani Platinum`}
          title={dict.pricing.tierTownhouse}
        >
          <div className="mt-6 flex flex-wrap gap-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {dict.pricing.Kes}
              </p>
              <p className="mt-1 font-serif text-2xl text-navy">{dict.pricing.from} 23M</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {dict.pricing.Usd}
              </p>
              <p className="mt-1 font-serif text-2xl text-navy">{dict.pricing.from} 178,300</p>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              {dict.pricing.descriptionHeading}
            </h3>
            <ul className="mt-4 space-y-2 text-sm font-light leading-relaxed text-slate-600">
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Multi-level homes
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                From 3 bedrooms
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Private entrance for each unit
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Modern layouts with spacious rooms
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Part of a gated community
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Shared amenities (pool, gym, gardens)
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                24/7 security (CCTV, access control, guards)
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Private outdoor space (balcony, garden, terrace)
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Suitable for families and professionals
              </li>
            </ul>
          </div>
        </PricingTierCard>
      </div>

      <div className="mt-10 rounded-2xl border border-slate-200/90 bg-slate-50/80 p-6 sm:p-8">
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
          {dict.pricing.generalAmenitiesHeading}
        </h3>
        <p className="mt-4 text-sm font-light leading-relaxed text-slate-600">{dict.pricing.amenitiesBody}</p>
      </div>
    </PricingPageLayout>
  );
}

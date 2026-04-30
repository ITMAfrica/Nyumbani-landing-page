'use client';

import { useI18n } from '@/lib/i18n';
import { PricingPageLayout, PricingTierCard } from '@/components/pricing-page-layout';

import heroGold from '../../../photos/hero-2.jpg';
import heroPlatinum from '../../../photos/hero-1.jpg';

export function GoldPricingView() {
  const { dict } = useI18n();

  return (
    <PricingPageLayout
      heroImage={heroGold}
      heroAlt={`${dict.hero.alt} — ${dict.modal.gold}`}
      homeHref="/"
      homeLabel={dict.gallery.home}
      eyebrow={dict.modal.livingCollection}
      title={dict.modal.gold}
      subtitle={dict.hero.gold.description}
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 lg:gap-10">
        <PricingTierCard image={heroGold} imageAlt={`${dict.pricing.tierStudio} — Nyumbani Gold`} title={dict.pricing.tierStudio}>
          <div className="mt-6 flex flex-wrap gap-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {dict.pricing.Kes}
              </p>
              <p className="mt-1 font-serif text-2xl text-navy">2.1M - 2.7M</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {dict.pricing.Usd}
              </p>
              <p className="mt-1 font-serif text-2xl text-navy">16,300 - 21,000</p>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              {dict.pricing.descriptionHeading}
            </h3>
            <ul className="mt-4 space-y-2 text-sm font-light leading-relaxed text-slate-600">
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Open-plan layout
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Includes kitchenette
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Separate bathroom
              </li>
            </ul>
          </div>
        </PricingTierCard>

        <PricingTierCard
          image={heroPlatinum}
          imageAlt={`${dict.pricing.tier1Bed} — Nyumbani Gold`}
          title={dict.pricing.tier1Bed}
        >
          <div className="mt-6 flex flex-wrap gap-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {dict.pricing.Kes}
              </p>
              <p className="mt-1 font-serif text-2xl text-navy">3.1M - 5.9M</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {dict.pricing.Usd}
              </p>
              <p className="mt-1 font-serif text-2xl text-navy">24,030 - 45,735</p>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              {dict.pricing.descriptionHeading}
            </h3>
            <ul className="mt-4 space-y-2 text-sm font-light leading-relaxed text-slate-600">
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Separate bedroom
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Living room / lounge area
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Open plan kitchen
              </li>
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>1 bathroom
              </li>
            </ul>
          </div>
        </PricingTierCard>

        <PricingTierCard
          image="/hero-new.jpg"
          imageAlt={`${dict.pricing.tier2Bed} — Nyumbani Gold`}
          title={dict.pricing.tier2Bed}
        >
          <div className="mt-6 flex flex-wrap gap-8">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {dict.pricing.Kes}
              </p>
              <p className="mt-1 font-serif text-2xl text-navy">7.6M - 9.4M</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {dict.pricing.Usd}
              </p>
              <p className="mt-1 font-serif text-2xl text-navy">61,240 - 72,100</p>
            </div>
          </div>
          <div className="mt-8 border-t border-slate-200 pt-8">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-dark">
              {dict.pricing.descriptionHeading}
            </h3>
            <ul className="mt-4 space-y-2 text-sm font-light leading-relaxed text-slate-600">
              <li className="flex gap-2">
                <span className="font-medium text-navy">·</span>
                Two separate bedrooms
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

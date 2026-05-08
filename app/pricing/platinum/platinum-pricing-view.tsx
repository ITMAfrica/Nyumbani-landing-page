"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n";
import {
  PricingPageLayout,
  PricingTierCard,
} from "@/components/pricing-page-layout";
import {
  Building2,
  ShieldCheck,
  Sparkles,
  TreePine,
  ArrowRight,
  Gem,
  MapPin,
  Ruler,
} from "lucide-react";

import heroPlatinum from "../../../photos/hero-1.jpg";

/** Garden City Residence 302 — Platinum townhouses card. */
const PLATINUM_TOWNHOUSE_GALLERY = [
  "/api/photo/garden-city-302/IMG_4155.webp",
  "/api/photo/garden-city-302/IMG_4165.webp",
  "/api/photo/garden-city-302/IMG_4191.webp",
  "/api/photo/garden-city-302/IMG_4223.webp",
  "/api/photo/garden-city-302/IMG_4235.webp",
  "/api/photo/garden-city-302/IMG_4332.webp",
] as const;

/* ─── Animated Price (fade + blur on scroll into view) ─── */

function AnimatedPrice({
  value,
  suffix = "",
}: {
  value: string;
  suffix?: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`inline-block transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible
          ? "translate-y-0 opacity-100 blur-0"
          : "translate-y-3 opacity-0 blur-[2px]"
      }`}
    >
      {value}
      {suffix}
    </span>
  );
}

/* ─── Distinction Pill ─── */

function DistinctionPill({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-platinum-dark/30 bg-cream/80 px-5 py-2.5 backdrop-blur-sm">
      <Icon className="h-4 w-4 shrink-0 text-navy" strokeWidth={1.5} />
      <span className="text-[13px] font-medium tracking-wide text-navy">
        {label}
      </span>
    </div>
  );
}

/* ─── Animated Section Wrapper ─── */

type MotionDivProps = {
  children: React.ReactNode;
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
  transition?: Record<string, unknown>;
  className?: string;
};

function MotionDiv({
  children,
  initial,
  transition: t,
  className,
}: MotionDivProps) {
  const delay =
    t && typeof t === "object" && "delay" in t
      ? (t as { delay: number }).delay
      : undefined;

  return (
    <div
      className={className}
      style={
        initial
          ? {
              animation:
                "slide-up 0.7s cubic-bezier(0.25, 0.1, 0.25, 1) forwards",
              animationDelay: delay !== undefined ? `${delay}s` : undefined,
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Platinum Pricing View
   ═══════════════════════════════════════════════════════════════ */

export function PlatinumPricingView() {
  const { dict } = useI18n();

  return (
    <PricingPageLayout
      heroImage={heroPlatinum}
      heroAlt={`${dict.hero.alt} — ${dict.modal.platinum}`}
      homeHref="/"
      homeLabel={dict.gallery.home}
      eyebrow={
        <span className="inline-flex items-center gap-2">
          <Gem className="h-3.5 w-3.5 text-gold-light" strokeWidth={2} />
          {dict.modal.investmentCollection}
        </span>
      }
      title={dict.modal.platinum}
      subtitle={dict.hero.platinum.description}
    >
      {/* ── Property Cards ── */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {/* 3 Bedroom */}
        <MotionDiv initial={{ opacity: 0, y: 40 }} transition={{ delay: 0.25 }}>
          <PricingTierCard
            image={heroPlatinum}
            imageAlt={`${dict.pricing.tier3Bed} — Nyumbani Platinum`}
            imageClassName="aspect-[3/2]"
            title={
              <div className="space-y-1">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-platinum-dark">
                  Residence Type
                </span>
                <span className="block text-lg font-semibold uppercase tracking-[0.14em] text-navy">
                  {dict.pricing.tier3Bed}
                </span>
              </div>
            }
          >
            {/* Price */}
            <div className="mt-5 grid grid-cols-2 gap-5">
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-platinum-dark">
                  {dict.pricing.Kes}
                </p>
                <p className="font-serif text-[1.35rem] leading-none tracking-tight text-navy">
                  <AnimatedPrice value="13.9M" />
                </p>
                <p className="text-[11px] font-light text-slate-400">
                  {dict.pricing.from}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-platinum-dark">
                  {dict.pricing.Usd}
                </p>
                <p className="font-serif text-[1.35rem] leading-none tracking-tight text-navy">
                  <AnimatedPrice value="107,750" />
                </p>
                <p className="text-[11px] font-light text-slate-400">
                  {dict.pricing.from}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 border-t border-platinum-light pt-5">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-platinum-dark">
                {dict.pricing.descriptionHeading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  { icon: Building2, label: "3 separate bedrooms" },
                  { icon: Building2, label: "Living room / lounge area" },
                  { icon: Building2, label: "Kitchen (open or separate)" },
                  { icon: Building2, label: "One or more bathrooms" },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-start gap-3 text-sm font-light leading-relaxed text-slate-600"
                  >
                    <Icon
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy/40"
                      strokeWidth={1.5}
                    />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </PricingTierCard>
        </MotionDiv>

        {/* Townhouses */}
        <MotionDiv initial={{ opacity: 0, y: 40 }} transition={{ delay: 0.4 }}>
          <PricingTierCard
            images={[...PLATINUM_TOWNHOUSE_GALLERY]}
            imageAlt={`${dict.pricing.tierTownhouse} — Nyumbani Platinum`}
            imageClassName="aspect-[3/2]"
            title={
              <div className="space-y-1">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-platinum-dark">
                  Residence Type
                </span>
                <span className="block text-lg font-semibold uppercase tracking-[0.14em] text-navy">
                  {dict.pricing.tierTownhouse}
                </span>
              </div>
            }
          >
            {/* Price */}
            <div className="mt-5 grid grid-cols-2 gap-5">
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-platinum-dark">
                  {dict.pricing.Kes}
                </p>
                <p className="font-serif text-[1.35rem] leading-none tracking-tight text-navy">
                  <AnimatedPrice value="23M" />
                </p>
                <p className="text-[11px] font-light text-slate-400">
                  {dict.pricing.from}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-platinum-dark">
                  {dict.pricing.Usd}
                </p>
                <p className="font-serif text-[1.35rem] leading-none tracking-tight text-navy">
                  <AnimatedPrice value="178,300" />
                </p>
                <p className="text-[11px] font-light text-slate-400">
                  {dict.pricing.from}
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 border-t border-platinum-light pt-5">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.22em] text-platinum-dark">
                {dict.pricing.descriptionHeading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  { icon: Ruler, label: "Multi-level homes" },
                  { icon: Building2, label: "From 3 bedrooms" },
                  {
                    icon: ShieldCheck,
                    label: "Private entrance for each unit",
                  },
                  {
                    icon: Sparkles,
                    label: "Modern layouts with spacious rooms",
                  },
                  { icon: ShieldCheck, label: "Part of a gated community" },
                  {
                    icon: TreePine,
                    label: "Shared amenities (pool, gym, gardens)",
                  },
                  {
                    icon: ShieldCheck,
                    label: "24/7 security (CCTV, access control, guards)",
                  },
                  {
                    icon: TreePine,
                    label: "Private outdoor space (balcony, garden, terrace)",
                  },
                  {
                    icon: Sparkles,
                    label: "Suitable for families and professionals",
                  },
                ].map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-start gap-3 text-sm font-light leading-relaxed text-slate-600"
                  >
                    <Icon
                      className="mt-0.5 h-3.5 w-3.5 shrink-0 text-navy/40"
                      strokeWidth={1.5}
                    />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </PricingTierCard>
        </MotionDiv>
      </div>

      {/* ── Amenities ── */}
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        transition={{ delay: 0.65 }}
        className="mt-10 rounded-[1.25rem] border border-platinum-light/70 bg-gradient-to-br from-cream via-white to-platinum-light/30 p-6 sm:p-8"
      >
        <h3 className="text-[10px] font-semibold uppercase tracking-[0.25em] text-platinum-dark">
          {dict.pricing.generalAmenitiesHeading}
        </h3>
        <p className="mt-4 max-w-3xl font-serif text-sm leading-relaxed text-slate-500 sm:text-base">
          {dict.pricing.amenitiesBody}
        </p>
      </MotionDiv>

      {/* ── CTA ── */}
      <MotionDiv
        initial={{ opacity: 0, y: 30 }}
        transition={{ delay: 0.75 }}
        className="mt-10 text-center"
      >
        <a
          href="/?enquire=platinum"
          className="group inline-flex items-center gap-3 rounded-full border border-navy/15 bg-navy px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_18px_45px_-18px_rgba(31,45,61,0.45)] transition-all duration-500 hover:scale-[1.02] hover:bg-navy-light hover:shadow-[0_24px_55px_-18px_rgba(31,45,61,0.55)] active:scale-[0.98]"
        >
          {dict.hero.enquireNow}
          <ArrowRight
            className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
            strokeWidth={1.5}
          />
        </a>
        <p className="mt-5 text-[12px] font-light tracking-wide text-slate-400">
          Our investment advisors will reach out within 24 hours.
        </p>
      </MotionDiv>
    </PricingPageLayout>
  );
}

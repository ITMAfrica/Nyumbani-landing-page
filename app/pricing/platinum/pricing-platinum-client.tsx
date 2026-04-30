'use client';

import { useI18n } from '@/lib/i18n';

export function PricingPlatinumClient() {
  const { dict } = useI18n();

  return (
    <div className="min-h-screen bg-slate-900">
      <main className="pt-24 pb-16 px-5 sm:px-10 lg:px-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold mb-2">
              {dict.modal.enquire}
            </p>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white">
              NYUMBANI PLATINUM
            </h1>
            <p className="mt-4 text-white/70 max-w-2xl">
              Explore our exclusive collection of 3-bedroom apartments and townhouses for discerning investors and families.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* 3 Bedroom */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
              <h3 className="text-lg font-semibold uppercase tracking-wider text-white mb-4">3 Bedroom</h3>
              <div className="flex gap-6 mb-4">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">KES</p>
                  <p className="text-xl font-medium text-white">from 13.9M</p>
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">USD</p>
                  <p className="text-xl font-medium text-white">from 107,750</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">Description</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• 3 separate bedrooms</li>
                  <li>• Living room/lounge area</li>
                  <li>• Kitchen (open or separate)</li>
                  <li>• One or more bathrooms</li>
                </ul>
              </div>
            </div>

            {/* Townhouses */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
              <h3 className="text-lg font-semibold uppercase tracking-wider text-white mb-4">Townhouses</h3>
              <div className="flex gap-6 mb-4">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">KES</p>
                  <p className="text-xl font-medium text-white">from 23M</p>
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">USD</p>
                  <p className="text-xl font-medium text-white">from 178,300</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">Description</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Multi-level homes</li>
                  <li>• From 3 bedrooms</li>
                  <li>• Private entrance for each unit</li>
                  <li>• Modern layouts with spacious rooms</li>
                  <li>• Part of a gated community</li>
                  <li>• Shared amenities (pool, gym, gardens)</li>
                  <li>• 24/7 security (CCTV, access control, guards)</li>
                  <li>• Private outdoor space (balcony, garden, terrace)</li>
                  <li>• Suitable for families and professionals</li>
                </ul>
              </div>
            </div>
          </div>

          {/* General Amenities */}
          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.05] p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gold mb-4">General Amenities</h3>
            <p className="text-white/70">
              CCTV surveillance, chill spots, ample parking, elevators, rooftopia, swimming pool, cascading gardens, community centre, common area generator, borehole water, access control, step-up terraces.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <a
              href="/?enquire=1"
              className="inline-flex items-center gap-2 border border-gold/50 bg-gold/15 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-white backdrop-blur-sm transition hover:bg-gold/25 rounded-full"
            >
              Enquire Now
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

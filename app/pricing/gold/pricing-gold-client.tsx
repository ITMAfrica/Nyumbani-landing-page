'use client';

import { useI18n } from '@/lib/i18n';

export function PricingGoldClient() {
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
              NYUMBANI GOLD
            </h1>
            <p className="mt-4 text-white/70 max-w-2xl">
              Discover our premium collection of studios, 1, and 2 bedroom apartments designed for modern living.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Studios */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
              <h3 className="text-lg font-semibold uppercase tracking-wider text-white mb-4">Studios</h3>
              <div className="flex gap-6 mb-4">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">KES</p>
                  <p className="text-xl font-medium text-white">2.1M - 2.7M</p>
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">USD</p>
                  <p className="text-xl font-medium text-white">16,300 - 21,000</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">Description</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Open-plan layout</li>
                  <li>• Includes kitchenette</li>
                  <li>• Separate bathroom</li>
                </ul>
              </div>
            </div>

            {/* 1 Bedroom */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
              <h3 className="text-lg font-semibold uppercase tracking-wider text-white mb-4">1 Bedroom</h3>
              <div className="flex gap-6 mb-4">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">KES</p>
                  <p className="text-xl font-medium text-white">3.1M - 5.9M</p>
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">USD</p>
                  <p className="text-xl font-medium text-white">24,030 - 45,735</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">Description</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Separate bedroom</li>
                  <li>• Living room/lounge area</li>
                  <li>• Open plan Kitchen</li>
                  <li>• 1 Bathroom</li>
                </ul>
              </div>
            </div>

            {/* 2 Bedroom */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6">
              <h3 className="text-lg font-semibold uppercase tracking-wider text-white mb-4">2 Bedroom</h3>
              <div className="flex gap-6 mb-4">
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">KES</p>
                  <p className="text-xl font-medium text-white">7.6M - 9.4M</p>
                </div>
                <div>
                  <p className="text-xs text-white/50 uppercase tracking-wider mb-1">USD</p>
                  <p className="text-xl font-medium text-white">61,240 - 72,100</p>
                </div>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">Description</h4>
                <ul className="text-sm text-white/70 space-y-1">
                  <li>• Two separate bedrooms</li>
                  <li>• Living room/lounge area</li>
                  <li>• Kitchen (open or separate)</li>
                  <li>• One or more bathrooms</li>
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
        </div>
      </main>
    </div>
  );
}

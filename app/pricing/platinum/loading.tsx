import { PricingHeroSkeleton, PricingCardSkeleton } from "@/components/skeleton";

export default function PlatinumPricingLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <PricingHeroSkeleton />
      <div className="relative z-10 -mt-12 mx-auto max-w-[1600px] px-5 pb-20 sm:px-10 lg:-mt-16 lg:px-16 lg:pb-28">
        <div className="rounded-[1.85rem] border border-white/70 bg-white/95 px-5 py-9 shadow-[0_28px_90px_-32px_rgba(31,45,61,0.28)] ring-1 ring-slate-200/80 backdrop-blur-md sm:p-10 md:rounded-[2rem] lg:p-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8 lg:gap-10">
            <PricingCardSkeleton />
            <PricingCardSkeleton />
            <PricingCardSkeleton />
          </div>
        </div>
      </div>
    </main>
  );
}

"use client";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Base skeleton with shimmer animation                               */
/* ------------------------------------------------------------------ */

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate overflow-hidden rounded-lg bg-slate-200/70",
        /* shimmer overlay */
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:animate-[shimmer_1.6s_ease-in-out_infinite]",
        "before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent",
        className,
      )}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Preset variants                                                    */
/* ------------------------------------------------------------------ */

export function TextSkeleton({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => {
        const isLast = i === lines - 1;
        const widthClass =
          i === 0
            ? "w-full"
            : i === 1
              ? "w-[85%]"
              : isLast
                ? "w-[55%]"
                : "w-[70%]";
        return (
          <Skeleton
            key={i}
            className={cn("h-4 rounded-md", widthClass)}
          />
        );
      })}
    </div>
  );
}

export function HeadingSkeleton({
  lines = 1,
  className,
}: {
  lines?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-3", className)} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn(
            "h-8 rounded-md sm:h-9 md:h-10",
            i === lines - 1 ? "w-[65%]" : "w-[85%]",
          )}
        />
      ))}
    </div>
  );
}

export function ImageSkeleton({
  aspectRatio = "16/10",
  className,
}: {
  aspectRatio?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("relative w-full overflow-hidden rounded-2xl bg-slate-200/70", className)}
      style={{ aspectRatio }}
    >
      <Skeleton className="absolute inset-0 rounded-none" />
    </div>
  );
}

export function CardSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_22px_55px_-28px_rgba(31,45,61,0.2)]",
        className,
      )}
    >
      {/* Image placeholder */}
      <ImageSkeleton aspectRatio="16/10" className="rounded-none" />

      {/* Content placeholders */}
      <div className="flex flex-1 flex-col p-6 sm:p-8 gap-4">
        {/* Label */}
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-[3px] w-5 rounded-full" />
          <Skeleton className="h-3 w-24 rounded-md" />
        </div>

        {/* Title */}
        <Skeleton className="h-5 w-3/4 rounded-md" />

        {/* Price grid */}
        <div className="grid grid-cols-2 rounded-xl border border-slate-200 overflow-hidden">
          <div className="border-r border-slate-200 px-[18px] py-[14px] space-y-2">
            <Skeleton className="h-4 w-10 rounded-[4px]" />
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-3 w-12 rounded-md" />
          </div>
          <div className="px-[18px] py-[14px] space-y-2">
            <Skeleton className="h-4 w-10 rounded-[4px]" />
            <Skeleton className="h-6 w-20 rounded-md" />
            <Skeleton className="h-3 w-12 rounded-md" />
          </div>
        </div>

        {/* Features */}
        <div className="space-y-2.5 pt-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="h-7 w-7 shrink-0 rounded-lg" />
              <Skeleton className="h-4 flex-1 rounded-md" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-3 pt-4 border-t border-slate-100">
          <Skeleton className="h-8 w-32 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative h-[100dvh] min-h-[650px] sm:min-h-[700px] bg-slate-900 overflow-hidden",
        className,
      )}
    >
      <Skeleton className="absolute inset-0 rounded-none" />

      {/* Simulated top bar */}
      <div className="relative z-10 flex items-center justify-between px-8 pt-16 pb-4 sm:px-16 lg:px-32 w-full max-w-[1600px] mx-auto">
        <Skeleton className="h-11 w-[180px] rounded-md sm:h-14 sm:w-[200px]" />
        <Skeleton className="h-8 w-16 rounded-full" />
      </div>

      {/* Simulated hero text */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-32 max-w-[1600px] mx-auto w-full mt-12">
        <div className="max-w-xl space-y-6">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-10 w-full rounded-md sm:h-12 md:h-14 lg:h-16" />
          <Skeleton className="h-10 w-[80%] rounded-md sm:h-12 md:h-14 lg:h-16" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-[75%] rounded-md" />
          <Skeleton className="h-10 w-44 rounded-full mt-2" />
        </div>
      </div>
    </div>
  );
}

export function HowWeWorkSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative py-24 md:py-32 px-8 md:px-16 lg:px-32 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 bg-white overflow-hidden",
        className,
      )}
    >
      {/* Left: image stack skeleton */}
      <div className="relative h-[550px] sm:h-[750px] md:h-[700px] w-full">
        <Skeleton className="absolute top-[4%] left-0 w-[72%] h-[52%] z-10 rounded-2xl" />
        <Skeleton className="absolute bottom-[3%] right-0 w-[68%] h-[55%] z-20 rounded-2xl" />
      </div>

      {/* Right: text skeleton */}
      <div className="flex flex-col max-w-[480px] space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-[2px] w-12" />
          <Skeleton className="h-3 w-24 rounded-md" />
        </div>
        <HeadingSkeleton lines={2} />
        <div className="flex flex-wrap gap-2.5">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-28 rounded-full" />
        </div>
        <TextSkeleton lines={4} />
        <div className="border-l-2 border-slate-200 pl-5">
          <TextSkeleton lines={2} />
        </div>
      </div>
    </div>
  );
}

export function PricingHeroSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate min-h-[min(420px,52vh)] w-full overflow-hidden bg-slate-900",
        className,
      )}
    >
      <Skeleton className="absolute inset-0 rounded-none" />
      <div className="relative z-10 mx-auto flex max-w-[1600px] flex-col gap-8 px-6 pb-20 pt-6 sm:px-10 lg:px-16">
        <Skeleton className="h-5 w-28 rounded-md" />
        <div className="max-w-3xl pt-6 sm:pt-8 md:pt-12 space-y-4">
          <Skeleton className="h-4 w-40 rounded-full" />
          <Skeleton className="h-8 w-[70%] rounded-md sm:h-10 md:h-12" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-[80%] rounded-md" />
        </div>
      </div>
    </div>
  );
}

export function PricingCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm",
        className,
      )}
    >
      <ImageSkeleton aspectRatio="3/2" className="rounded-none" />
      <div className="p-6 sm:p-8 space-y-5">
        <Skeleton className="h-5 w-2/3 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-[85%] rounded-md" />
        <Skeleton className="h-4 w-[60%] rounded-md" />
        <div className="pt-2">
          <Skeleton className="h-10 w-28 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function PageSkeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("min-h-screen bg-slate-50", className)}
    >
      {/* Simulated header */}
      <div className="sticky top-0 z-20 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-6 py-4 sm:px-10">
          <Skeleton className="h-8 w-[104px] rounded-md sm:h-9 sm:w-[120px]" />
          <Skeleton className="h-5 w-16 rounded-md" />
          <Skeleton className="h-4 w-px" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-6 w-64 rounded-md sm:h-7" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="mx-auto max-w-[1600px] px-6 py-10 sm:px-10 sm:py-14 space-y-8">
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-20 rounded-md" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ImageSkeleton key={i} aspectRatio="4/3" />
          ))}
        </div>
      </div>
    </div>
  );
}

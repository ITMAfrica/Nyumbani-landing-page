import { HeroSkeleton, HowWeWorkSkeleton } from "@/components/skeleton";

export default function HomeLoading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <HeroSkeleton />
      <HowWeWorkSkeleton />
    </main>
  );
}

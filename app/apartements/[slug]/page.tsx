'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

import { getApartmentBySlug } from '@/lib/apartments';

function useSegmentSlug(): string | undefined {
  const params = useParams();
  const raw = params?.slug;
  if (typeof raw === 'string') return raw;
  if (Array.isArray(raw) && raw[0]) return raw[0];
  return undefined;
}

export default function ApartmentGalleryPage() {
  const slug = useSegmentSlug();
  const apt = slug ? getApartmentBySlug(slug) : undefined;
  const [files, setFiles] = useState<string[] | null>(null);

  useEffect(() => {
    if (!slug || !apt) return;
    let cancelled = false;
    (async () => {
      const res = await fetch(`/api/apartements/${encodeURIComponent(slug)}/files`);
      if (!res.ok) {
        if (!cancelled) notFound();
        return;
      }
      const data = (await res.json()) as { files: string[] };
      if (cancelled) return;
      setFiles(data.files);
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, apt]);

  if (slug === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900">
        <p className="text-sm text-slate-600">Loading…</p>
      </main>
    );
  }

  if (!apt) {
    notFound();
  }

  if (files === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900">
        <p className="text-sm text-slate-600">Loading…</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-6 py-4 sm:px-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium tracking-wide text-slate-600 transition hover:text-[#1f2d3d]"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} aria-hidden />
            Home
          </Link>
          <div className="ml-2 h-4 w-px bg-slate-300" aria-hidden />
          <div>
            <h1 className="font-serif text-xl font-normal text-slate-900 sm:text-2xl">{apt.title}</h1>
            {apt.subtitle ? (
              <p className="text-xs uppercase tracking-widest text-slate-500 sm:text-sm">{apt.subtitle}</p>
            ) : null}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-6 py-10 sm:px-10 sm:py-14">
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-slate-600">
          {files.length} photo{files.length !== 1 ? 's' : ''} — open any image in a new tab for full size.
        </p>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {files.map((filename) => {
            const src = `/api/photo/${apt.slug}/${encodeURIComponent(filename)}`;
            return (
              <li
                key={filename}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-200 shadow-sm ring-1 ring-slate-200/80"
              >
                <a href={src} target="_blank" rel="noopener noreferrer" className="block h-full w-full outline-none">
                  <Image
                    src={src}
                    alt={`${apt.title} — ${filename}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                  />
                  <span className="sr-only">Open {filename}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Images } from 'lucide-react';

import { getApartmentBySlug } from '@/lib/apartments';
import { useI18n } from '@/lib/i18n';

export function ApartmentGalleryView({ slug }: { slug: string }) {
  const { dict } = useI18n();
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

  if (!apt) {
    notFound();
  }

  if (files === null) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-slate-500 font-light">{dict.gallery.loading}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-[1600px] px-6 py-10 sm:px-10 sm:py-14">
        <div className="flex items-center gap-3 mb-8">
          <Images className="h-4 w-4 text-gold" strokeWidth={1.5} />
          <p className="text-sm text-slate-500 font-light">
            {files.length} {dict.gallery.photos}
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {files.map((filename) => {
            const src = `/api/photo/${apt.slug}/${encodeURIComponent(filename)}`;
            return (
              <li
                key={filename}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200/80 shadow-sm ring-1 ring-slate-200/60 transition-all duration-300 hover:shadow-xl hover:ring-gold/20"
              >
                <a href={src} target="_blank" rel="noopener noreferrer" className="block h-full w-full outline-none">
                  <Image
                    src={src}
                    alt={`${apt.title} — ${filename}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.05]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full shadow-lg">
                      {dict.gallery.view}
                    </span>
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}

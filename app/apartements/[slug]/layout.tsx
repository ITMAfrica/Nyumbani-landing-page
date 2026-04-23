import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { APARTMENTS, getApartmentBySlug } from '@/lib/apartments';

export function generateStaticParams() {
  return APARTMENTS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const apt = getApartmentBySlug(slug);
  if (!apt) return { title: 'Apartment' };
  return {
    title: `${apt.title} | Nyumbani Platinum`,
    description: `Photo gallery — ${apt.title}`,
  };
}

export default async function ApartementsSlugLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) {
  await params;
  return children;
}

import { ApartmentGalleryClient } from './apartment-gallery-client';

export default async function ApartmentGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ApartmentGalleryClient slug={slug} />;
}

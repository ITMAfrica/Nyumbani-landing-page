import { ApartmentGalleryView } from './apartment-gallery-view';

export default async function ApartmentGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ApartmentGalleryView slug={slug} />;
}

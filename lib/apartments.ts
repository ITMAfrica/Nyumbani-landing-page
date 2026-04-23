/** Maps URL slugs to folders under /photos and optional cover image for menus. */

export type Apartment = {
  slug: string;
  folder: string;
  title: string;
  subtitle?: string;
  coverFile: string;
};

export const APARTMENTS: Apartment[] = [
  {
    slug: 'garden-city-302',
    folder: 'GARDEN_CITY_RESIDENCE_302_SERVICED_APARTMENTS',
    title: 'Garden City Residence 302',
    subtitle: 'Serviced apartments',
    coverFile: 'IMG_4191.webp',
  },
  {
    slug: '5b4-mi-vida',
    folder: '5B4_MI_VIDA_SERVICED_APARTMENT',
    title: '5B4 Mi Vida',
    subtitle: 'Serviced apartment',
    coverFile: 'IMG_4379.webp',
  },
  {
    slug: '11b8-mi-vida',
    folder: '11B8_MI_VIDA_SERVICED_APARTMENT',
    title: '11B8 Mi Vida',
    subtitle: 'Serviced apartment',
    coverFile: 'IMG_4781.webp',
  },
  {
    slug: '105-marcus-garden',
    folder: '105_MARCUS_GARDEN_SERVICED_APARTMENT',
    title: '105 Marcus Garden',
    subtitle: 'Serviced apartment',
    coverFile: 'IMG_5001.webp',
  },
  {
    slug: 'imagine-by-benaa',
    folder: 'IMAGINE_BY_BENAA_SERVICED_APARTMENT',
    title: 'Imagine by Benaa',
    subtitle: 'Serviced apartment',
    coverFile: 'IMG_4450.webp',
  },
];

const bySlug = new Map(APARTMENTS.map((a) => [a.slug, a]));

export function getApartmentBySlug(slug: string): Apartment | undefined {
  return bySlug.get(slug);
}

export function getApartmentFolderBySlug(slug: string): string | undefined {
  return bySlug.get(slug)?.folder;
}

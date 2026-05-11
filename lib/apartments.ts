/** Maps URL slugs to folders under /photos and optional cover image for menus. */

export type Apartment = {
  slug: string;
  folder: string;
  title: string;
  subtitle?: string;
  coverFile: string;
  kesPrice: string;
  usdPrice: string;
  description: string;
  features: { label: string }[];
};

export const APARTMENTS: Apartment[] = [
  {
    slug: 'garden-city-302',
    folder: 'GARDEN_CITY_RESIDENCE_302_SERVICED_APARTMENTS',
    title: 'Garden City Residence 302',
    subtitle: 'Serviced apartments',
    coverFile: 'IMG_4191.webp',
    kesPrice: '23M',
    usdPrice: '178,300',
    description:
      'Nestled in the prestigious Garden City estate, Residence 302 offers an exceptional blend of contemporary design and serene living. This meticulously maintained serviced apartment complex provides spacious, light-filled interiors with premium finishes throughout, ideal for discerning professionals and families seeking elevated urban living with resort-style amenities.',
    features: [
      { label: '3 Bedrooms' },
      { label: 'Spacious Living Room' },
      { label: 'Modern Kitchen' },
      { label: 'En-suite Bathroom' },
      { label: 'Gated Community' },
      { label: 'Outdoor Terrace' },
      { label: '24/7 Security' },
      { label: 'Open Plan Layout' },
    ],
  },
  {
    slug: '5b4-mi-vida',
    folder: '5B4_MI_VIDA_SERVICED_APARTMENT',
    title: '5B4 Mi Vida',
    subtitle: 'Serviced apartment',
    coverFile: 'IMG_4379.webp',
    kesPrice: '3.1M',
    usdPrice: '24,030',
    description:
      '5B4 Mi Vida is a thoughtfully curated serviced apartment that balances modern comfort with everyday practicality. With sleek interiors, abundant natural light, and a prime location, this home is designed for those who value style, convenience, and a welcoming atmosphere in one of Nairobi\'s most sought-after addresses.',
    features: [
      { label: '2 Bedrooms' },
      { label: 'Modern Kitchen' },
      { label: 'Private Entrance' },
      { label: 'En-suite Bathroom' },
      { label: 'Family Friendly' },
      { label: 'Secure Access' },
    ],
  },
  {
    slug: '11b8-mi-vida',
    folder: '11B8_MI_VIDA_SERVICED_APARTMENT',
    title: '11B8 Mi Vida',
    subtitle: 'Serviced apartment',
    coverFile: 'IMG_4781.webp',
    kesPrice: '3.5M',
    usdPrice: '27,130',
    description:
      '11B8 Mi Vida presents a refined living experience with generous proportions and elegant design touches. Every detail has been considered — from the curated finishes to the seamless indoor-outdoor flow — creating a sanctuary that feels both expansive and intimate, perfect for professionals and modern families alike.',
    features: [
      { label: '2 Bedrooms' },
      { label: 'Spacious Living Room' },
      { label: 'Modern Kitchen' },
      { label: 'En-suite Bathroom' },
      { label: 'Balcony' },
      { label: 'Secure Access' },
    ],
  },
  {
    slug: '105-marcus-garden',
    folder: '105_MARCUS_GARDEN_SERVICED_APARTMENT',
    title: '105 Marcus Garden',
    subtitle: 'Serviced apartment',
    coverFile: 'IMG_5001.webp',
    kesPrice: '2.1M',
    usdPrice: '16,300',
    description:
      '105 Marcus Garden is a charming serviced apartment set within lush, manicured surroundings. Offering a rare combination of tranquillity and accessibility, this home features warm interiors, a functional layout, and a private garden view that brings nature right to your doorstep — an urban retreat designed for restful living.',
    features: [
      { label: '1 Bedroom' },
      { label: 'Modern Kitchen' },
      { label: 'En-suite Bathroom' },
      { label: 'Private Garden' },
      { label: 'Open Plan Layout' },
      { label: 'Secure Access' },
    ],
  },
  {
    slug: 'imagine-by-benaa',
    folder: 'IMAGINE_BY_BENAA_SERVICED_APARTMENT',
    title: 'Imagine by Benaa',
    subtitle: 'Serviced apartment',
    coverFile: 'IMG_4450.webp',
    kesPrice: '7.6M',
    usdPrice: '61,240',
    description:
      'Imagine by Benaa is a statement in refined urban living. With bold architecture, expansive interiors, and top-tier finishes, this serviced apartment redefines what home can be. Every space is bathed in natural light, every fixture hand-picked for quality — a residence for those who demand the extraordinary without compromise.',
    features: [
      { label: '3 Bedrooms' },
      { label: 'Spacious Living Room' },
      { label: 'Modern Kitchen' },
      { label: 'En-suite Bathroom' },
      { label: 'Multi-Level Design' },
      { label: 'Outdoor Terrace' },
      { label: 'Professional-Grade Amenities' },
      { label: '24/7 Security' },
    ],
  },
];

const bySlug = new Map(APARTMENTS.map((a) => [a.slug, a]));

export function getApartmentBySlug(slug: string): Apartment | undefined {
  return bySlug.get(slug);
}

export function getApartmentFolderBySlug(slug: string): string | undefined {
  return bySlug.get(slug)?.folder;
}

import { readdir } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

import { getApartmentBySlug } from '@/lib/apartments';

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;
  const apt = getApartmentBySlug(slug);
  if (!apt) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }

  const dir = join(process.cwd(), 'photos', apt.folder);
  try {
    const names = await readdir(dir);
    const lower = new Set(names.map((n) => n.toLowerCase()));
    const files = names
      .filter((n) => {
        if (/\.webp$/i.test(n)) {
          return true;
        }
        if (!/\.(jpe?g|png|gif|bmp|tiff?)$/i.test(n)) {
          return false;
        }
        const webpName = n.replace(/\.(jpe?g|png|gif|bmp|tiff?)$/i, '.webp');
        return !lower.has(webpName.toLowerCase());
      })
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
}

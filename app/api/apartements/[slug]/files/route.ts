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
    const files = names
      .filter((n) => /\.(jpe?g)$/i.test(n))
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
    return NextResponse.json({ files });
  } catch {
    return NextResponse.json({ error: 'not_found' }, { status: 404 });
  }
}

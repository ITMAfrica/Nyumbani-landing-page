import { readFile } from 'fs/promises';
import { join } from 'path';
import { NextResponse } from 'next/server';

import { getApartmentFolderBySlug } from '@/lib/apartments';

function isSafeFilename(name: string): boolean {
  if (!name || name.includes('..') || /[/\\]/.test(name)) return false;
  return /\.(jpe?g)$/i.test(name);
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string; file: string }> },
) {
  const { slug, file: rawFile } = await context.params;
  const file = decodeURIComponent(rawFile);

  if (!isSafeFilename(file)) {
    return new NextResponse('Bad request', { status: 400 });
  }

  const folder = getApartmentFolderBySlug(slug);
  if (!folder) {
    return new NextResponse('Not found', { status: 404 });
  }

  const fullPath = join(process.cwd(), 'photos', folder, file);

  try {
    const buf = await readFile(fullPath);
    return new NextResponse(buf, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}

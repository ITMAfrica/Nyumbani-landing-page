import { HomeClient } from './home-client';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initialSearch = await searchParams;
  return <HomeClient initialSearch={initialSearch} />;
}

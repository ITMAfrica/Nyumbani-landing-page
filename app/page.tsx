import { HomeView } from './home-view';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const initialSearch = await searchParams;
  return <HomeView initialSearch={initialSearch} />;
}

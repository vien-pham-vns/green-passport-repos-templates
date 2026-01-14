import Login from '@/features/login';

type PageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return <Login callbackUrl={params.callbackUrl} />;
}

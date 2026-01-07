import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Suspense } from 'react';

import 'react-toastify/dist/ReactToastify.css';

import AppLoading from '@/components/app-loading';
import ThemeRegistry from '@/theme/theme-registry';

import './globals.css';
import ProviderLayout from './provider-layout';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Portal for centralab user',
  description: 'Centralab test',
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html translate='no' suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeRegistry>
          <Suspense fallback={<AppLoading />}>
            <ProviderLayout>{children}</ProviderLayout>
          </Suspense>
        </ThemeRegistry>
      </body>
    </html>
  );
}

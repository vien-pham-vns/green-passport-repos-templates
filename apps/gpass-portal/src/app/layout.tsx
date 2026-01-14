import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Suspense } from 'react';

import ThemeRegistry from '@/theme/theme-registry';

import './globals.css';
import ProviderLayout from './provider-layout';

const poppins = Poppins({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins', // CSS variable for theme integration
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
      <body className={poppins.variable}>
        <ThemeRegistry>
          <Suspense fallback={<>Loading...</>}>
            <ProviderLayout>{children}</ProviderLayout>
          </Suspense>
        </ThemeRegistry>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

import { ReactQueryClientProvider } from '@/app/shared/components/ReactQueryClientProvider';
import { Toaster } from '@/app/shared/components/ui/toaster';

export const metadata: Metadata = {
  icons: [
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon-16x16.png',
    },
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

interface LocaleLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: LocaleLayoutProps) {
  const locale = await getLocale();

  const messages = await getMessages();
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import { ThemeProvider } from '@/theme/theme';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../../styles/globals.css';
import { Toaster } from 'sonner';
import Navbar from '@/components/shared/navbar';
import { constructMetadata } from '@/lib/utils';
import { Suspense } from 'react';
import Loading from './loading';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}) {
  return constructMetadata({
    title: "Convert Plus - Tools for Everyone",
    description: "Convert, compress, edit, and analyze with ease. Tools for PDFs, text, images, code, web, finance, electricity, math, and ecology. This version is concise and highlights the key features of your site in a slogan-like manner.",
    image: "/favicon.ico",
    icons: "/favicon.ico",
    noIndex: false
  });
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar appName={`convertplus`} />
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
            <Toaster />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import { Theme } from '@radix-ui/themes';
import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: 'Invest Plus',
  description: 'O futuro das suas finanças',
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="html">
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}

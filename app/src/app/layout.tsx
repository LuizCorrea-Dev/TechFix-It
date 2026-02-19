import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import Providers from '@/components/Providers';

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-urbanist',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TechFix It | Technology Solutions',
  description: 'Innovation and excellence in technology services.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

// src/app/layout.tsx

import './globals.css';
import Providers from './providers';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';

export const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'], display: 'swap', variable: '--font-jakarta'
});
export const inter       = Inter({
  subsets: ['latin'], display: 'swap', variable: '--font-inter'
});

export const metadata = {
  title: 'Mock’n-Hire',
  description: 'AI-powered recruitment platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${plusJakarta.variable} ${inter.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

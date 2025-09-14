import React from 'react';
import { Inter } from 'next/font/google';
import { Providers } from '@/app/providers';
import HydrateUser from '@/components/HydrateUser';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-black/75 h-full">
          <HydrateUser />

          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}

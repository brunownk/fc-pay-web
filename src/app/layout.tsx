import type React from 'react';

import { Inter } from 'next/font/google';

import { Header } from '@/components/header';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Full Cycle Gateway',
  description: 'Gateway de pagamentos completo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen bg-[#1a2332]`}>
        <Header />
        <main className="container mx-auto py-4">{children}</main>
        <footer className="py-4 text-center text-sm text-gray-400">
          © 2025 Full Cycle Gateway. Todos os direitos reservados.
        </footer>
      </body>
    </html>
  );
}

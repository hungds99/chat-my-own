import Header from '@/components/header';
import Sidebar from '@/components/sidebar';
import { cn } from '@/lib/tw';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Chat with AI',
  description: 'Chat with AI is a simple chat application that uses AI to generate responses.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] font-sans antialiased',
          fontSans.variable,
        )}
      >
        <Sidebar />
        <div className='flex flex-col'>
          <Header />
          <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>{children}</main>
        </div>
      </body>
    </html>
  );
}

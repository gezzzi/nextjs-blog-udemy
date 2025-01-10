import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import "./globals.css";

const name = "Next.js Blog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Blog",
  description: "My Blog",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') || '';
  const isHome = pathname === '/';

  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="flex flex-col items-center gap-6 pt-12 pb-4">
          <Image
            src="/images/profile.png"
            alt="プロフィール画像"
            width={isHome ? 80 : 50}
            height={isHome ? 80 : 50}
            className="rounded-full"
          />
          <h1 className={`font-bold ${isHome ? 'text-4xl' : 'text-2xl'}`}>{name}</h1>
        </header>
        <main className="flex flex-col items-center justify-center h-screen">
          {children}
        </main>
        {!isHome && (
          <div className="text-center mt-8">
            <Link href="/" className="text-blue-500 hover:text-blue-700">
              ← ホームへ戻る
            </Link>
          </div>
        )}
      </body>
    </html>
  );
}

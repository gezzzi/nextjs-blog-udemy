import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Image from 'next/image';
import Link from 'next/link';
import { headers } from 'next/headers';
import Script from 'next/script';
import "./globals.css";

const name = "Gezi Blog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gezi Blog",
  description: "副業とAIについての情報を発信しています",
  icons: {
    icon: '/favicon.ico',
  },
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
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <div className="max-w-4xl mx-auto px-4">
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
          <main className="flex flex-col items-center justify-center min-h-0 py-8">
            {children}
          </main>
          {!isHome && (
            <div className="text-center mt-8 mb-8">
              <Link href="/" className="text-blue-500 hover:text-blue-700">
                ← ホームへ戻る
              </Link>
            </div>
          )}
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PWARegister from "@/components/PWARegister";
import Providers from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NutriTracker — Nutrition tracking that goes deeper",
  description: "Track every vitamin, mineral, and macronutrient — then learn which real foods cover your gaps. No supplements required.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NutriTracker",
  },
  applicationName: "NutriTracker",
  themeColor: "#4169E1",
  openGraph: {
    title: "NutriTracker — Nutrition tracking that goes deeper",
    description: "Track every vitamin, mineral, and macronutrient — then learn which real foods cover your gaps. No supplements required.",
    url: "https://nutritracker.vercel.app",
    siteName: "NutriTracker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NutriTracker — Nutrition tracking that goes deeper",
    description: "Track every vitamin, mineral, and macronutrient — then learn which real foods cover your gaps. No supplements required.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon26_io/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon26_io/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon26_io/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon26_io/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4169E1" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="NutriTracker" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark') {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                  if (!theme) {
                    localStorage.setItem('theme', 'light');
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white text-black antialiased dark:bg-black dark:text-white`}
      >
        <PWARegister />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

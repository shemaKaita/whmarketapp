import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.scss";
import PageWrapper from "@/client/components/PageWrapper";
import SearchBar from "@/client/components/SearchBar";
import { SavedProductsProvider } from "@/common/providers/SavedProductsProvider";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "whMarketApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextTopLoader height={8} />
        <SavedProductsProvider>
          <SearchBar />
          <PageWrapper>{children}</PageWrapper>
        </SavedProductsProvider>
      </body>
    </html>
  );
}

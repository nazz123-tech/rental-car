import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { QueryProvider } from "../components/QueryProvider/QueryProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Rental Car",
  description: "Find your perfect rental car",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} h-full`}>
      <body className="antialiased min-h-full flex flex-col ">
        <QueryProvider>
          <Header />
          <main className="grow bg-white">{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}

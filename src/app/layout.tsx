import type { Metadata } from "next";
import { Inter, Public_Sans } from 'next/font/google'
import { StoreProvider } from "@/store/StoreProvider";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-publicsans",
})

export const metadata: Metadata = {
  title: "My App",
  description: "Kuadratik test project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${publicSans.variable}`}>
      <body>
        <StoreProvider>
          <Toaster position="top-center" reverseOrder={false} />
          <Header />
          <main className="mt-[150px]">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}

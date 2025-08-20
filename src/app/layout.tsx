import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "@/app/globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Is Nathan Alive?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

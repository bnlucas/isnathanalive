import { Bebas_Neue } from "next/font/google";
import "@/app/globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  fallback: ["Arial", "Helvetica", "sans-serif"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} antialiased flex flex-col items-center justify-center min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}

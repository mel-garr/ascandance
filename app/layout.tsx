import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import LoadingOverlay from "@/components/LoadingOverlay";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ascendance - Rise Above the Ordinary",
  description: "The revolutionary 3-wheel electric vehicle that combines the agility of a motorcycle with the comfort and safety of a car.",
  icons: {
    icon: '/iconWhite.png',
    apple: '/iconWhite.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${montserrat.variable} antialiased font-[family-name:var(--font-montserrat)] bg-white text-gray-900`}
      >
              <LoadingOverlay />
        {children}
      </body>
    </html>
  );
}

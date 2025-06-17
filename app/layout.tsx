import type { Metadata } from "next";
import { Montserrat, Red_Hat_Display } from "next/font/google";
import "./globals.css"; // Your Tailwind and global CSS
// import AuthProvider from "@/providers/AuthProvider"; // Add this later if needed

// Google fonts with multiple weights
const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const redHat = Red_Hat_Display({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-red-hat",
});

export const metadata: Metadata = {
  title: "MiniCareFit",
  description: "Health tracking for children, parents, and teachers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${redHat.variable}`}>
      <body className="bg-white text-gray-800 antialiased">
        {/* <AuthProvider> */}
        {children}
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}

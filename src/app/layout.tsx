import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MiniCareFit",
  description: "Helping kids build healthy habits",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

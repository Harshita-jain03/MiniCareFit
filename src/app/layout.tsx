import type { Metadata } from "next";
import "./globals.css";
import AppHeader from "./_container/AppHeader";
import AppFooter from "./_container/AppFooter";
import Sidebar from "./_container/Sidebar";

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
      <body className="min-h-screen bg-gradient-to-br from-green-200 via-blue-200 to-cyan-200">
        <div className="flex flex-col min-h-screen">
          <AppHeader />
          
          <div className="flex flex-1">
            <Sidebar />
            
            <main className="flex-1 lg:ml-0">
              {children}
            </main>
          </div>
          
          <AppFooter />
        </div>
      </body>
    </html>
  );
}
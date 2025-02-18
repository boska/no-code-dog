import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/theme-switcher";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import "./globals.css";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";
import { FloatingChat } from '@/components/chat/floating-chat';

export const metadata = {
  title: "Yang Lee - Senior iOS Engineer | Portfolio",
  description: "Senior iOS Engineer with expertise in Swift, React, and TypeScript. View my portfolio of mobile and web applications.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground min-h-screen selection:bg-[#419388]/20">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative">
            <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-[#419388]/10">
              <div className="w-full max-w-7xl mx-auto flex justify-end items-center px-6 py-3">
                <ThemeSwitcher />
              </div>
            </nav>
            <main className="relative pt-16 pb-16 px-4 max-w-7xl mx-auto">
              {children}
            </main>
            <FloatingChat />
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

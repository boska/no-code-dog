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
      <body className="bg-background text-foreground">
        <ThemeProvider
          scriptProps={{ 'data-cfasync': 'false' }}
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-background/70 to-transparent backdrop-blur-sm border-b border-border/50">
              <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-4">
                <div className="flex items-center gap-4">
                  <Link
                    href="/"
                    className="text-lg font-semibold hover:text-primary transition-colors"
                  >
                    Yang Lee
                  </Link>
                  <Link
                    href="/portfolio"
                    className="text-lg hover:text-primary transition-colors"
                  >
                    Portfolio 作品
                  </Link>
                  <ThemeSwitcher />
                </div>
                <div>
                  {true ? null : <HeaderAuth />}
                </div>
              </div>
            </nav>
            <main className="min-h-screen">
              {children}
            </main>
            <FloatingChat />
            <Analytics />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

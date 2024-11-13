import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/theme-switcher";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import "./globals.css";

export const metadata = {
  title: "Yang Lee (boska) a github visualizer",
  description: "View GitHub profile statistics, contributions, and repository information",
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
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-background/70 to-transparent backdrop-blur-sm border-b border-border/50">
            <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                <ThemeSwitcher />
              </div>
              <div>
                {!hasEnvVars ? null : <HeaderAuth />}
              </div>
            </div>
          </nav>
          <main className="min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}

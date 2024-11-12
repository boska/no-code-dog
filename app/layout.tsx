import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/theme-switcher";
import HeaderAuth from "@/components/header-auth";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import "./globals.css";

export const metadata = {
  title: "布拉格射擊體驗 | Prague Shooting Experience",
  description: "布拉格最專業的實彈射擊體驗",
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
          <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/70 to-transparent">
            <div className="w-full max-w-7xl mx-auto flex justify-between items-center p-4">
              <div className="flex items-center gap-4 text-white">
                <ThemeSwitcher />
              </div>
              <div className="text-white">
                {!hasEnvVars ? null : <HeaderAuth />}
              </div>
            </div>
          </nav>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

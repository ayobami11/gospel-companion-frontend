import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/contexts/theme-provider";
import { AppContextProvider } from "@/contexts";

import { Toaster } from "@/components/ui/toaster";

import { SSRProvider } from "@fluentui/react-components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gospel Companion",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppContextProvider>
            {children}

            <Toaster />
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

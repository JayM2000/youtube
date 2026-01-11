import { Toaster } from "@/components/ui/sonner";
import { TRPCProvider } from "@/trpc/client";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Fredoka } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Novaroe | Next-Gen Video Platform for Creators & Viewers",
  description:
    "Novaroe is a dynamic video streaming site where you can upload content, discover trending videos, and connect with your audience.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico", // optional Apple-specific icon
  },
};

const googleFonts = Fredoka({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en" suppressHydrationWarning>
        <body className={googleFonts.className}>
          <TRPCProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Toaster />
              {children}
            </ThemeProvider>
          </TRPCProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

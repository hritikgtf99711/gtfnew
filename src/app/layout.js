"use client"; // Required for client-side hooks and animations

import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({ children }) {
  const pathname = usePathname(); // Get current path

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Quattrocento:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname} // AnimatePresence detects route change
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </body>
    </html>
  );
}

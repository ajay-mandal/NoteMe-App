import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Toaster} from '@/components/ui/sonner';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteMe",
  description: "Write concise blogs and articles",
  icons:{
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/medium-dark.png",
        href: "/medium-dark.png"
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/medium-green.png",
        href: "/medium-green.png"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Toaster />
          {children}
        </body>
    </html>
  );
}

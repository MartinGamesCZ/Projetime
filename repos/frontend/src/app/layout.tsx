import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { cn } from "@/lib/utils";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Projetime",
  description: "Record time spent on your project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark font-mono", jetbrainsMono.variable)}>
      <body className={`antialiased`}>
        <FullscreenLoader />
        {children}
      </body>
    </html>
  );
}

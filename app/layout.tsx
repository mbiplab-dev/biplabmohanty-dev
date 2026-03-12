import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Biplab Mohanty | Full-Stack Developer",
  description:
    "Enthusiastic Full-Stack Developer with hands-on experience in building modern web applications using React.js, Next.js, Flask, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${monaSans.className} antialiased`}>
        {children}
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}

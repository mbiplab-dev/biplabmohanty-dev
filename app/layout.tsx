import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import dotenv from "dotenv";
dotenv.config();

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dev Portfolio",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return ( 
    <html lang="en" >
      <body
        className={`${monaSans.className} antialiased `}
      >
        {children}
        <Toaster/>
      </body>
    </html>
  );
}

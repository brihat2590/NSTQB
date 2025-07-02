import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NSTQB | Nepal Software Testing Qualitative Body",
  description: "Official website of NSTQB (Nepal Software Testing Qualitative Body). Register for ISTQB exams, access certified resources, and join Nepal's leading software testing community.",
  // icons:{
  //   icon:"",
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.className}`}>
        
        {children}
        <Toaster position="bottom-right" />
        
        
      </body>
    </html>
  );
}

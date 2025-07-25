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

export const metadata = {
  title: 'NSTQB – Nepal Software Testing Qualitative Body',
  description: 'Official ISTQB® accredited body. Register for exams, explore events, read blogs, and take mock CTFL exams with NSTQB.',
  icons: {
    icon: '/favicon1.ico',
    apple: '/favicon1.ico',
    shortcut: '/favicon1.ico',
  }
  
}


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
    // <html lang="en">
    //   <body className="">

    //   <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    //         <h1 className="text-4xl font-bold mb-4">Under Maintence</h1>
    //         <p className="text-lg text-gray-600">The Website is currently under maintenence. Please check back later.</p>
    //     </div>
        
    //   </body>
    // </html>
  );
}

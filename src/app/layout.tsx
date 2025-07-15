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
  applicationName: 'NSTQB',
  keywords: [
    'NSTQB', 'ISTQB', 'software testing', 'certification', 
    'CTFL', 'Nepal', 'mock exams', 'events', 'blogs'
  ],
  authors: [
    { name: 'NSTQB Team', url: 'https://nstqb.org.np' }
  ],
  openGraph: {
    title: 'NSTQB – Nepal Software Testing Qualitative Body',
    description: 'Get certified in software testing through the Nepal Software Testing Qualitative Body (NSTQB), accredited by ISTQB®.',
    url: 'https://nstqb.org.np',
    siteName: 'NSTQB',
    images: [
      {
        url: 'https://res.cloudinary.com/dlrpmew9d/image/upload/v1752574371/whiteImage_yydkc6.png',
        width: 1200,
        height: 630,
        alt: 'NSTQB - Nepal Software Testing Certification'
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NSTQB – Nepal Software Testing Qualitative Body',
    description: 'Register for software testing exams and learn with NSTQB, recognized by ISTQB®.',
    images: ['https://res.cloudinary.com/dlrpmew9d/image/upload/v1752574371/whiteImage_yydkc6.png']
  },
  verification: {
    google: 'YOUR-GOOGLE-SITE-VERIFICATION',
    // Add other verifications as needed
  },
  alternates: {
    canonical: 'https://nstqb.org.np',
    languages: {
      'en-US': 'https://nstqb.org.np/en-US'
      // Add other languages if available
    }
  },
  robots: {
    index: true,
    follow: true
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
  );
}

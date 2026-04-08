import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "NSTQB Blogs",
    template: "%s | NSTQB Blogs",
  },
  description:
    "Read software testing insights, ISTQB preparation tips, announcements, and quality engineering updates from NSTQB.",
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "NSTQB Blogs",
    description:
      "Read software testing insights, ISTQB preparation tips, announcements, and quality engineering updates from NSTQB.",
    url: "/blogs",
    siteName: "NSTQB",
    type: "website",
    images: [
      {
        url: "/whiteImage.png",
        width: 1200,
        height: 630,
        alt: "NSTQB Blogs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NSTQB Blogs",
    description:
      "Read software testing insights, ISTQB preparation tips, announcements, and quality engineering updates from NSTQB.",
    images: ["/whiteImage.png"],
  },
};

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

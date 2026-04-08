import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "NSTQB Events",
    template: "%s | NSTQB Events",
  },
  description:
    "Explore NSTQB events, workshops, and meetups for software testing professionals in Nepal.",
  alternates: {
    canonical: "/events",
  },
  openGraph: {
    title: "NSTQB Events",
    description:
      "Explore NSTQB events, workshops, and meetups for software testing professionals in Nepal.",
    url: "/events",
    siteName: "NSTQB",
    type: "website",
    images: [
      {
        url: "/whiteImage.png",
        width: 1200,
        height: 630,
        alt: "NSTQB Events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NSTQB Events",
    description:
      "Explore NSTQB events, workshops, and meetups for software testing professionals in Nepal.",
    images: ["/whiteImage.png"],
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

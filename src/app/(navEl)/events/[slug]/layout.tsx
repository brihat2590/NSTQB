import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};

function truncateText(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trim()}...`;
}

function normalizeImageUrl(imageUrl?: string | null): string {
  if (!imageUrl) return "/whiteImage.png";
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) return imageUrl;
  if (imageUrl.startsWith("/")) return imageUrl;
  return `/${imageUrl}`;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    const event = await prisma.events.findUnique({
      where: { slug },
      select: {
        title: true,
        description: true,
        bannerImage: true,
        slug: true,
        dateTime: true,
        updatedAt: true,
      },
    });

    if (!event) {
      return {
        title: "Event Not Found | NSTQB",
        description: "The requested NSTQB event could not be found.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const description = truncateText(event.description.replace(/\s+/g, " ").trim(), 160);
    const imageUrl = normalizeImageUrl(event.bannerImage);
    const canonicalUrl = `/events/${event.slug}`;

    return {
      title: event.title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: event.title,
        description,
        url: canonicalUrl,
        type: "article",
        siteName: "NSTQB",
        publishedTime: event.dateTime.toISOString(),
        modifiedTime: event.updatedAt.toISOString(),
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: event.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: event.title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "NSTQB Events",
      description: "Explore upcoming software testing events, workshops, and meetups from NSTQB.",
    };
  }
}

export default function EventLayout({ children }: Props) {
  return <>{children}</>;
}
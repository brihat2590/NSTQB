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
    const blog = await prisma.blog.findUnique({
      where: { slug },
      select: {
        title: true,
        summary: true,
        content: true,
        imageUrl: true,
        createdAt: true,
        updatedAt: true,
        slug: true,
      },
    });

    if (!blog) {
      return {
        title: "Blog Not Found | NSTQB",
        description: "The requested NSTQB blog article could not be found.",
        robots: {
          index: false,
          follow: false,
        },
      };
    }

    const description = truncateText(
      blog.summary?.trim() || blog.content.replace(/\s+/g, " ").trim(),
      160,
    );

    const imageUrl = normalizeImageUrl(blog.imageUrl);
    const canonicalUrl = `/blogs/${blog.slug}`;

    return {
      title: blog.title,
      description,
      alternates: {
        canonical: canonicalUrl,
      },
      robots: {
        index: true,
        follow: true,
      },
      openGraph: {
        title: blog.title,
        description,
        url: canonicalUrl,
        type: "article",
        siteName: "NSTQB",
        publishedTime: blog.createdAt.toISOString(),
        modifiedTime: blog.updatedAt.toISOString(),
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: blog.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description,
        images: [imageUrl],
      },
    };
  } catch {
    return {
      title: "NSTQB Blog",
      description: "Read the latest software testing updates and insights from NSTQB.",
    };
  }
}

export default function BlogSlugLayout({ children }: Props) {
  return children;
}

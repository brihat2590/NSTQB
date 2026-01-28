import { Metadata } from "next";
import { Events } from "@/generated/prisma/client";
import { generateEventMetaData } from "@/lib/metadata-action";

type Props = {
  params: Promise<{ slug: string }>;
  children: React.ReactNode;
};
//this forces the page to re-render on every request during testing


// This handles the SEO/Metadata on the server
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  try {
    // Call your GET route
    const res = await fetch(`$/api/events/${slug}`);
    
    if (!res.ok) return { title: "Event Not Found" };
    
    const event: Events = await res.json();
    console.log("Fetched event for metadata:", event);
    
    // This calls your helper and triggers your console.log in the terminal
    return generateEventMetaData(event);
  } catch (error) {
    return { title: "NSTQB Events" };
  }
}

export default function EventLayout({ children }: Props) {
  return <>{children}</>;
}
import { Blog, Events } from "@/generated/prisma/client";
import { generateMetadata } from "./metadata";



export function generateEventMetaData(event: Events) {
    // We pick only the specific strings needed by generateBaseMetaData
    // This removes the extra fields (id, venue, etc.) that cause TS2353
    const seoData = {
        title: event.title,
        description: event.description.substring(0, 160),
        image: event.bannerImage || "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg",
        url: `/events/${event.slug}`
    };
    console.log("this is the seo data",seoData);

    return generateMetadata(seoData);
}

export function getBlogMetaData(blog: Blog) {
    const seoData = {
        title: blog.title,
        description: blog.content.substring(0, 160),
        image: blog.imageUrl || "https://nstqb.org/default-blog.png",
        url: `/blog/${blog.slug}`
    };

    return generateMetadata(seoData);
}
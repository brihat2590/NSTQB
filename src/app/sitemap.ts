import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://nstqb.org';
    
    const routes = [
        '', // Home
        '/contact',
        '/certified-testers',
        '/registration',
        '/blogs',
        '/faqs',
        '/code-of-conduct'
    ];

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        // Monthly is perfect for sites that don't change daily
        changeFrequency: 'monthly', 
        priority: route === '' ? 1.0 : 0.7,
    }));
}
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://motionsoundnews.com';

    return {
        rules: {
            userAgent: '*',
            allow: ['/'],
            disallow: ['/api/', '/_next/', '/*?'],
        },
        sitemap: [
            `${baseUrl}/sitemap.xml`,
            `${baseUrl}/sitemap-news.xml`,
            `${baseUrl}/sitemap_lite.xml`,
        ],
    };
} 
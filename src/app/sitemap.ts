import { api } from '@/services/api';
import { MetadataRoute } from 'next';

function generateSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const categories = await api.getCategories();

    // URLs base
    const baseUrls: MetadataRoute.Sitemap = [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/videos`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.8,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/categories`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }
    ];

    // URLs de categorías para artículos y videos
    const categoryUrls = categories.flatMap(category => [
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${generateSlug(category.name)}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        },
        {
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/videos/${generateSlug(category.name)}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        }
    ]);

    // Filtrar cualquier URL que contenga undefined
    const allUrls = [...baseUrls, ...categoryUrls]
        .filter(url => !url.url.includes('undefined'));

    return allUrls;
} 
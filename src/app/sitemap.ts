import { api } from '@/services/api';
import { MetadataRoute } from 'next';
import { News, Video } from '@/types';

function generateSlug(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '-');
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Obtener todos los artículos, videos y categorías
    const articles = await api.getNews();
    const videos = await api.getVideos();
    const categories = await api.getCategories();

    console.log('Categorías recibidas:', categories); // Log para debug

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

    // URLs de artículos
    const articleUrls = articles.map((article: News) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${article.category}/${article.slug}`,
        lastModified: new Date(article.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // URLs de videos
    const videoUrls = videos.map((video: Video) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/videos/${video.category}/${video.slug}`,
        lastModified: new Date(video.created_at),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // Filtrar cualquier URL que contenga undefined
    const allUrls = [...baseUrls, ...categoryUrls, ...articleUrls, ...videoUrls]
        .filter(url => !url.url.includes('undefined'));

    return allUrls;
} 
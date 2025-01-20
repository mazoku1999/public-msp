import { api } from '@/services/api';
import { MetadataRoute } from 'next';
import { News, Video } from '@/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Obtener todos los artículos, videos y categorías
    const articles = await api.getNews();
    const videos = await api.getVideos();
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

    // URLs de categorías
    const categoryUrls = categories.map((category) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/categories/${category.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

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

    return [...baseUrls, ...categoryUrls, ...articleUrls, ...videoUrls];
} 
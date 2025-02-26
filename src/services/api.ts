import { News, Video } from '@/types'
import { config } from '@/lib/config'

// Tiempo de caché predeterminado: 5 minutos en producción, 0 en desarrollo
const DEFAULT_CACHE_TIME = process.env.NODE_ENV === 'production' ? 300 : 0

interface Category {
    id: string;
    name: string;
    slug: string;
    news_count: number;
    videos_count: number;
}

export const api = {
    async getCategories(): Promise<Category[]> {
        const response = await fetch(`${config.baseUrl}/categorias/public/with-counts`, {
            next: {
                revalidate: DEFAULT_CACHE_TIME,
                tags: ['categories']
            }
        })
        if (!response.ok) throw new Error('Failed to fetch categories')
        return response.json()
    },

    async getNews(category?: string): Promise<News[]> {
        const url = category
            ? `${config.baseUrl}/noticias/public/categoria/${category}`
            : `${config.baseUrl}/noticias/public`
        const response = await fetch(url, {
            next: {
                revalidate: DEFAULT_CACHE_TIME,
                tags: ['news', category ? `news-${category}` : 'all-news']
            }
        })
        if (!response.ok) throw new Error('Failed to fetch news')
        return response.json()
    },

    async getNewsById(category: string, slug: string): Promise<News> {
        const response = await fetch(`${config.baseUrl}/noticias/slug/${slug}`, {
            next: {
                revalidate: DEFAULT_CACHE_TIME,
                tags: ['news', `news-${category}`, `news-${slug}`]
            }
        })
        if (!response.ok) throw new Error('Failed to fetch news article')
        return response.json()
    },

    async getVideos(category?: string): Promise<Video[]> {
        const url = category
            ? `${config.baseUrl}/videos/public/categoria/${category}`
            : `${config.baseUrl}/videos/public`
        const response = await fetch(url, {
            next: {
                revalidate: DEFAULT_CACHE_TIME,
                tags: ['videos', category ? `videos-${category}` : 'all-videos']
            }
        })
        if (!response.ok) throw new Error('Failed to fetch videos')
        return response.json()
    },

    async getVideoById(category: string, slug: string): Promise<Video> {
        const response = await fetch(`${config.baseUrl}/videos/slug/${slug}`, {
            next: {
                revalidate: DEFAULT_CACHE_TIME,
                tags: ['videos', `videos-${category}`, `video-${slug}`]
            }
        })
        if (!response.ok) throw new Error('Failed to fetch video')
        return response.json()
    }
} 
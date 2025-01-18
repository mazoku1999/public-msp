import { News, Video } from '@/types'

const DEFAULT_CACHE_TIME = process.env.NODE_ENV === 'production' ? 3600 : 0
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const api = {
    async getCategories(): Promise<any[]> {
        const response = await fetch(`${BASE_URL}/categorias/public/with-counts`, {
            next: { revalidate: DEFAULT_CACHE_TIME }
        })
        if (!response.ok) throw new Error('Failed to fetch categories')
        return response.json()
    },

    async getNews(category?: string): Promise<News[]> {
        const url = category
            ? `${BASE_URL}/noticias/public/categoria/${category}`
            : `${BASE_URL}/noticias/public`
        const response = await fetch(url, {
            next: { revalidate: DEFAULT_CACHE_TIME }
        })
        if (!response.ok) throw new Error('Failed to fetch news')
        return response.json()
    },

    async getNewsById(category: string, slug: string): Promise<News> {
        const response = await fetch(`${BASE_URL}/noticias/slug/${slug}`, {
            next: { revalidate: DEFAULT_CACHE_TIME }
        })
        if (!response.ok) throw new Error('Failed to fetch news article')
        return response.json()
    },

    async getVideos(category?: string): Promise<Video[]> {
        const url = category
            ? `${BASE_URL}/videos/public/categoria/${category}`
            : `${BASE_URL}/videos/public`
        const response = await fetch(url, {
            next: { revalidate: DEFAULT_CACHE_TIME }
        })
        if (!response.ok) throw new Error('Failed to fetch videos')
        return response.json()
    },

    async getVideoById(category: string, slug: string): Promise<Video> {
        const response = await fetch(`${BASE_URL}/videos/slug/${slug}`, {
            next: { revalidate: DEFAULT_CACHE_TIME }
        })
        if (!response.ok) throw new Error('Failed to fetch video')
        return response.json()
    }
} 
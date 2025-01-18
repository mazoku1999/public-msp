import { news } from "@/data/news"
import { videos } from "@/data/videos"

export async function getArticle(id: string | number | undefined) {
    if (!id) return null
    const numericId = typeof id === 'string' ? Number(id) : id
    return news.find((article) => article.id === numericId)
}

export async function getVideo(id: string | number | undefined) {
    if (!id) return null
    const numericId = typeof id === 'string' ? Number(id) : id
    return videos.find((video) => video.id === numericId)
}

export async function getAllArticles() {
    return news
}

export async function getAllVideos() {
    return videos
} 
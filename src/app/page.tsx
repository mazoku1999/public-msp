import { HeroSection, LatestVideos, NewsSection } from '@/lib/client-components'
import { api } from '@/services/api'
import { Suspense } from 'react'
import { cache } from 'react'

const getVideos = cache(async () => {
    const videos = await api.getVideos()
    return videos
})

const getNews = cache(async () => {
    const news = await api.getNews()
    return news
})

export default async function Home() {
    const videosData = getVideos()
    const newsData = getNews()

    const [videos, news] = await Promise.all([videosData, newsData])

    return (
        <main className="min-h-screen bg-background">
            <HeroSection />
            <Suspense fallback={<div>Cargando videos...</div>}>
                <LatestVideos videos={videos} />
            </Suspense>
            <Suspense fallback={<div>Cargando noticias...</div>}>
                <NewsSection news={news} />
            </Suspense>
        </main>
    )
} 
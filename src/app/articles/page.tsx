import { Metadata } from 'next'
import { ArticlesGrid } from "@/components/ArticlesGrid"
import { api } from '@/services/api'
import { Suspense } from 'react'
import { cache } from 'react'

export const metadata: Metadata = {
    title: 'Latest Articles | MSP News',
    description: 'Stay informed with our curated selection of impactful stories from around the world',
    openGraph: {
        title: 'Latest Articles | MSP News',
        description: 'Stay informed with our curated selection of impactful stories from around the world',
        type: 'website',
    }
}

// Implementar cache para la función de fetching
export const getAllArticles = cache(async () => {
    const news = await api.getNews()
    return news
})

export default async function ArticlesPage() {
    const news = await getAllArticles()

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Encabezado */}
                <div className="mb-12">
                    <div className="relative">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 font-extrabold">
                                Latest
                            </span>
                            <span className="ml-3 text-foreground/90 font-extrabold">Articles</span>
                        </h1>
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl" />
                    </div>
                    <p className="mt-4 text-lg text-muted-foreground/80 max-w-2xl font-medium">
                        Stay informed with our curated selection of impactful stories from around the world
                    </p>
                </div>

                <Suspense fallback={<div className="w-full py-12 flex items-center justify-center">
                    <div className="animate-pulse text-lg text-muted-foreground font-medium">Loading articles...</div>
                </div>}>
                    <ArticlesGrid articles={news} />
                </Suspense>
            </div>
        </div>
    )
} 
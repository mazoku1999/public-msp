import { Metadata } from 'next'
import { VideosGrid } from "@/components/VideosGrid"
import { api } from '@/services/api'
import { Suspense } from 'react'
import { cache } from 'react'

export const metadata: Metadata = {
    title: 'Videos Destacados | MSP News',
    description: 'Explora nuestra colección completa de contenido de video inmersivo',
    openGraph: {
        title: 'Videos Destacados | MSP News',
        description: 'Explora nuestra colección completa de contenido de video inmersivo',
        type: 'website',
    }
}

// Implementar cache para la función de fetching
const getAllVideos = cache(async () => {
    const videos = await api.getVideos()
    return videos
})

export default async function VideosPage() {
    const videos = await getAllVideos()

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Encabezado */}
                <div className="mb-12">
                    <div className="relative">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 font-extrabold">
                                Videos
                            </span>
                            <span className="ml-3 text-foreground/90 font-extrabold">Destacados</span>
                        </h1>
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl" />
                    </div>
                    <p className="mt-4 text-lg text-muted-foreground/80 max-w-2xl font-medium">
                        Explora nuestra colección completa de contenido de video inmersivo
                    </p>
                </div>

                <Suspense fallback={<div className="w-full py-12 flex items-center justify-center">
                    <div className="animate-pulse text-lg text-muted-foreground font-medium">Cargando videos...</div>
                </div>}>
                    <VideosGrid videos={videos} />
                </Suspense>
            </div>
        </div>
    )
} 
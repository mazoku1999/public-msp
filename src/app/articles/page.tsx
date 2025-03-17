import { Metadata } from 'next'
import { ArticlesGrid } from "@/components/ArticlesGrid"
import { api } from '@/services/api'
import { Suspense } from 'react'
import { cache } from 'react'

export const metadata: Metadata = {
    title: 'Últimos Artículos | MSP News',
    description: 'Mantente informado con nuestra selección de historias impactantes de todo el mundo',
    openGraph: {
        title: 'Últimos Artículos | MSP News',
        description: 'Mantente informado con nuestra selección de historias impactantes de todo el mundo',
        type: 'website',
    }
}

// Implementar cache para la función de fetching
const getAllArticles = cache(async () => {
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
                                Últimos
                            </span>
                            <span className="ml-3 text-foreground/90 font-extrabold">Artículos</span>
                        </h1>
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl" />
                    </div>
                    <p className="mt-4 text-lg text-muted-foreground/80 max-w-2xl font-medium">
                        Mantente informado con nuestra selección de historias impactantes de todo el mundo
                    </p>
                </div>

                <Suspense fallback={<div className="w-full py-12 flex items-center justify-center">
                    <div className="animate-pulse text-lg text-muted-foreground font-medium">Cargando artículos...</div>
                </div>}>
                    <ArticlesGrid articles={news} />
                </Suspense>
            </div>
        </div>
    )
} 
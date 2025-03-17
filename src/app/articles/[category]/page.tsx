import { Metadata } from 'next';
import { api } from '@/services/api';
import ArticleCard from '@/components/ArticleCard';
import { Suspense } from 'react';
import { cache } from 'react';

interface Props {
    params: Promise<{
        category: string;
    }>;
}

// Implementar cache para la función de fetching
const getNewsByCategory = cache(async (category: string) => {
    const news = await api.getNews(category);
    return news;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    return {
        title: `Artículos en ${resolvedParams.category}`,
        description: `Explora nuestros artículos sobre ${resolvedParams.category}`,
    };
}

export default async function CategoryPage({ params }: Props) {
    const resolvedParams = await params;
    const news = await getNewsByCategory(resolvedParams.category);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">
                Artículos sobre {resolvedParams.category}
            </h1>
            <Suspense fallback={<div className="w-full py-12 flex items-center justify-center">
                <div className="animate-pulse text-lg text-muted-foreground">Cargando artículos...</div>
            </div>}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((article, index) => (
                        <ArticleCard key={article.id} article={article} index={index} />
                    ))}
                </div>
            </Suspense>
        </div>
    );
} 
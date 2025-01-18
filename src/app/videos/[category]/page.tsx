import { Metadata } from 'next';
import { api } from '@/services/api';
import { VideoCard } from '@/components/VideoCard';
import { Suspense } from 'react';
import { cache } from 'react';

interface Props {
    params: Promise<{
        category: string;
    }>;
}

// Implementar cache para la función de fetching
export const getVideosByCategory = cache(async (category: string) => {
    const videos = await api.getVideos(category);
    return videos;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    return {
        title: `Videos in ${resolvedParams.category}`,
        description: `Explore our videos about ${resolvedParams.category}`,
    };
}

export default async function CategoryPage({ params }: Props) {
    const resolvedParams = await params;
    const videos = await getVideosByCategory(resolvedParams.category);

    return (
        <div className="max-w-6xl mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-8">
                Videos about {resolvedParams.category}
            </h1>
            <Suspense fallback={<div className="w-full py-12 flex items-center justify-center">
                <div className="animate-pulse text-lg text-muted-foreground">Loading videos...</div>
            </div>}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.map((video, index) => (
                        <VideoCard key={video.id} video={video} index={index} />
                    ))}
                </div>
            </Suspense>
        </div>
    );
} 
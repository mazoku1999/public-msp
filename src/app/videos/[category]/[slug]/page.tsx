import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/services/api';
import { cache } from 'react';
import { Suspense } from 'react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

interface Props {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

const getVideoById = cache(async (category: string, slug: string) => {
    const video = await api.getVideoById(category, slug);
    return video;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    try {
        const video = await getVideoById(resolvedParams.category, resolvedParams.slug);

        return {
            title: video.title,
            description: video.description,
            openGraph: {
                title: video.title,
                description: video.description,
                type: 'video.other',
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/videos/${resolvedParams.category}/${resolvedParams.slug}`,
                images: [
                    {
                        url: video.thumbnail,
                        width: 1200,
                        height: 630,
                        alt: video.title,
                    }
                ],
                videos: [
                    {
                        url: `https://www.youtube.com/watch?v=${video.youtubeId}`,
                        width: 1280,
                        height: 720,
                        type: 'text/html',
                    }
                ]
            },
            twitter: {
                card: 'player',
                title: video.title,
                description: video.description,
                images: [video.thumbnail],
                players: [
                    {
                        playerUrl: `https://www.youtube.com/embed/${video.youtubeId}`,
                        streamUrl: `https://www.youtube.com/watch?v=${video.youtubeId}`,
                        width: 1280,
                        height: 720
                    }
                ]
            }
        }
    } catch {
        return {
            title: 'Video Not Found',
            description: 'The requested video could not be found'
        }
    }
}

export default async function VideoPage({ params }: Props) {
    const resolvedParams = await params;
    const video = await getVideoById(resolvedParams.category, resolvedParams.slug);

    if (!video) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white dark:bg-[#030014]">
            {/* Header Section */}
            <div className="relative w-full pt-16 sm:pt-20">
                <div className="absolute inset-0">
                    <div className="absolute w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
                </div>

                <div className="container relative z-10 mx-auto px-4 sm:px-6">
                    <div className="max-w-4xl mx-auto mb-12 sm:mb-16 px-4 sm:px-0">
                        <Badge
                            variant="outline"
                            className="mb-4 sm:mb-6 mx-auto block w-fit px-4 py-1.5 text-xs font-medium tracking-wide uppercase bg-violet-500/5 hover:bg-violet-500/10 text-violet-700 dark:bg-white/5 dark:hover:bg-white/10 dark:text-violet-200/80"
                        >
                            {video.category}
                        </Badge>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center leading-tight tracking-tight text-gray-900 dark:text-white mb-4 sm:mb-6">
                            {video.title}
                        </h1>
                        <div className="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-white/60 flex-wrap">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 ring-2 ring-violet-500/20 dark:ring-white/10">
                                    <AvatarFallback className="text-sm font-medium bg-violet-500/10 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
                                        {video.author.charAt(0).toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <span>{video.author}</span>
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <time className="flex items-center gap-2">
                                <CalendarDays className="h-4 w-4" />
                                {new Date(video.created_at).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </time>
                        </div>
                    </div>

                    {/* Video Player */}
                    <Suspense fallback={<div className="w-full max-w-5xl mx-auto aspect-video bg-gray-100 dark:bg-white/5 rounded-xl sm:rounded-2xl" style={{ boxShadow: '0 0 100px -15px rgba(139, 92, 246, 0.15), 0 30px 60px -15px rgba(139, 92, 246, 0.2)' }} />}>
                        <div className="relative max-w-5xl mx-auto px-4 sm:px-0">
                            {/* Video Container */}
                            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-gray-50 dark:bg-black/90 ring-1 ring-violet-500/20 dark:ring-white/10" style={{ boxShadow: '0 0 100px -15px rgba(139, 92, 246, 0.15), 0 30px 60px -15px rgba(139, 92, 246, 0.2)' }}>
                                <iframe
                                    className="w-full aspect-video"
                                    src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&showinfo=0&controls=1`}
                                    title={video.title}
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        </div>
                    </Suspense>
                </div>
            </div>

            {/* Descripción */}
            <div className="container mx-auto px-4 sm:px-6 mt-12 sm:mt-16 mb-20 sm:mb-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-0">
                    <div className="space-y-6 sm:space-y-8">
                        {/* Descripción del video */}
                        <div className="prose prose-lg max-w-none dark:prose-invert">
                            <p className="text-base sm:text-lg leading-relaxed text-gray-600 dark:text-white/70">
                                {video.description}
                            </p>
                        </div>

                        {/* Información del autor */}
                        <div className="flex items-center gap-4 pt-6 sm:pt-8 border-t border-gray-200 dark:border-white/10">
                            <Avatar className="h-12 w-12 ring-2 ring-violet-500/20 dark:ring-white/10">
                                <AvatarFallback className="text-lg font-medium bg-violet-500/10 text-violet-700 dark:bg-violet-500/20 dark:text-violet-200">
                                    {video.author.charAt(0).toUpperCase()}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-base font-medium text-gray-900 dark:text-white mb-1">
                                    {video.author}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-white/50">
                                    Content Creator at MSP News
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
} 
import { NextResponse } from 'next/server'
import { videos } from '@/data/videos'
import { cache } from 'react'

// Implementar cache para la función de fetching
const getVideoBySlug = cache(async (category: string, slug: string) => {
    return videos.find(
        item => item.category === category && item.slug === slug
    );
});

export async function GET(
    request: Request,
    { params }: { params: Promise<{ category: string; slug: string }> }
) {
    const resolvedParams = await params;
    const { category, slug } = resolvedParams;

    const video = await getVideoBySlug(category, slug);

    if (!video) {
        return NextResponse.json(
            { error: 'Video not found' },
            { status: 404 }
        )
    }

    return NextResponse.json(video)
} 
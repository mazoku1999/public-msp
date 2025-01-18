import { NextResponse } from 'next/server'
import { videos } from '@/data/videos'
import { cache } from 'react'

// Implementar cache para la función de fetching
const getVideosByCategory = cache(async (category: string) => {
    return videos.filter(item => item.category === category);
});

export async function GET(
    request: Request,
    { params }: { params: Promise<{ category: string }> }
) {
    const resolvedParams = await params;
    const { category } = resolvedParams;

    const categoryVideos = await getVideosByCategory(category);

    if (!categoryVideos.length) {
        return NextResponse.json(
            { error: 'No videos found in this category' },
            { status: 404 }
        )
    }

    return NextResponse.json(categoryVideos)
} 
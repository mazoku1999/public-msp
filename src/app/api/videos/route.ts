import { NextResponse } from 'next/server'
import { videos } from '@/data/videos'
import { cache } from 'react'

// Implementar cache para la función de fetching
const getVideos = cache(async () => {
    return videos;
});

export async function GET() {
    const data = await getVideos();
    return NextResponse.json(data)
} 
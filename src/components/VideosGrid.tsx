"use client"

import { VideoCard } from "./VideoCard"
import type { Video } from "@/types"

interface VideosGridProps {
    videos: Video[]
}

export function VideosGrid({ videos }: VideosGridProps) {
    return (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {videos.map((video, index) => (
                <VideoCard key={video.id} video={video} index={index} />
            ))}
        </div>
    )
}
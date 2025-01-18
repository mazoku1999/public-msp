"use client"

import ReactPlayer from "react-player"

interface VideoPlayerProps {
    url: string
}

export function VideoPlayer({ url }: VideoPlayerProps) {
    return (
        <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
            <ReactPlayer
                url={url}
                width="100%"
                height="100%"
                controls
                playing
                className="absolute top-0 left-0"
            />
        </div>
    )
}
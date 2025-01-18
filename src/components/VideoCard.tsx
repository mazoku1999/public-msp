"use client"

import { motion } from "framer-motion"
import { Play, User } from "lucide-react"
import Link from "next/link"
import type { Video } from "@/types"
import Image from 'next/image';

interface VideoCardProps {
    video: Video;
    index: number;
}

export function VideoCard({ video, index }: VideoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-[2rem] cursor-pointer bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-pink-500/5"
        >
            <Link href={`/videos/${video.category.toLowerCase()}/${video.slug}`}>
                <div className="relative aspect-[16/10]">
                    <Image
                        src={video.thumbnail}
                        alt={video.title}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-[0.8]"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-40 xs:opacity-60 group-hover:opacity-90 transition-all duration-300 z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 via-fuchsia-500/0 to-pink-500/0 group-hover:from-violet-500/20 group-hover:via-fuchsia-500/20 group-hover:to-pink-500/20 transition-all duration-500 z-20" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                        <motion.div
                            initial={false}
                            animate={{
                                scale: [0.9, 1],
                                opacity: [0, 1]
                            }}
                            transition={{
                                duration: 0.2,
                                ease: "easeOut"
                            }}
                            className="transform group-hover:translate-y-0 translate-y-4 transition-all duration-300"
                        >
                            <div className="relative w-16 h-16 rounded-full bg-violet-500 flex items-center justify-center group/play">
                                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover/play:opacity-20 transition-opacity duration-300" />
                                <Play className="h-8 w-8 text-white transform group-hover/play:scale-110 transition-all duration-300" strokeWidth={2.5} />
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-4 xs:p-6 bg-gradient-to-t from-black/80 via-black/70 to-transparent z-[5]">
                    <div className="space-y-3 xs:space-y-4">
                        <h3 className="text-base xs:text-xl font-semibold text-white line-clamp-2 group-hover:text-violet-200 transition-colors duration-300">
                            {video.title}
                        </h3>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 xs:gap-3">
                                <div className="h-7 w-7 xs:h-9 xs:w-9 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center shadow-[0_0_1rem_rgba(167,139,250,0.1)]">
                                    <User className="h-3 w-3 xs:h-4 xs:w-4 text-violet-300" />
                                </div>
                                <div>
                                    <p className="text-xs xs:text-sm font-medium text-white group-hover:text-violet-200 transition-colors duration-300">
                                        {video.author}
                                    </p>
                                    <p className="text-[10px] xs:text-xs text-violet-200/70">
                                        {new Date(video.created_at).toLocaleDateString('en-US', {
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
} 
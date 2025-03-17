"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useRef } from "react"
import { Button } from "./ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import type { Video } from "@/types"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Image from 'next/image';

interface LatestVideosProps {
  videos: Video[]
}

export const LatestVideos = ({ videos }: LatestVideosProps) => {
  const carouselRef = useRef<HTMLDivElement>(null)

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="max-w-[2000px] mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <div className="relative">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 font-extrabold">
                  Últimos
                </span>
                <span className="ml-3 text-foreground/90 font-extrabold">Videos</span>
              </h2>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl" />
            </div>
            <p className="text-lg text-muted-foreground/80 max-w-2xl font-medium">
              Descubre nuestra colección de contenido tendencia
            </p>
          </div>
          <Link href="/videos">
            <Button
              variant="outline"
              className="group relative overflow-hidden rounded-full px-8 py-6 text-base font-medium transition-all duration-300
                border-none bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 hover:from-violet-500/20 hover:via-fuchsia-500/20 hover:to-pink-500/20"
            >
              <span className="relative z-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent font-semibold">
                Ver Todos
              </span>
              <span className="ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Button>
          </Link>
        </div>

        <div className="relative" ref={carouselRef}>
          <div className="absolute inset-y-0 left-0 w-12 md:w-24 bg-gradient-to-r from-background via-background/50 md:via-background/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 md:w-24 bg-gradient-to-l from-background via-background/50 md:via-background/80 to-transparent z-10 pointer-events-none" />

          <Carousel
            className="w-full"
            opts={{
              align: "center",
              loop: true,
              dragFree: false,
              containScroll: false,
              skipSnaps: false
            }}
          >
            <CarouselContent className="-ml-0 md:ml-0">
              {videos.map((video) => (
                <CarouselItem key={video.id} className="pl-1 md:pl-4 basis-[75%] xs:basis-[70%] sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pt-4 pb-4">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative overflow-hidden rounded-[2rem] cursor-pointer bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-pink-500/5"
                  >
                    <Link
                      href={`/videos/${video.category.toLowerCase()}/${video.slug}`}
                      className="block aspect-[4/3]"
                    >
                      <div className="absolute inset-0">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          width={500}
                          height={300}
                          className="w-full h-full object-cover transform transition-all duration-700 group-hover:scale-110 group-hover:brightness-[0.8]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-violet-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-4 xs:p-6">
                        <div className="space-y-3 xs:space-y-4">
                          <h3 className="text-base xs:text-xl font-bold text-white line-clamp-2 group-hover:text-violet-200 transition-colors duration-300">
                            {video.title}
                          </h3>

                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 xs:h-11 xs:w-11 bg-indigo-500 border-[3px] border-indigo-400/20 shadow-lg shadow-indigo-500/10">
                              <AvatarFallback className="text-lg xs:text-xl font-semibold text-indigo-50 bg-transparent">
                                {video.author.charAt(0).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <p className="text-sm xs:text-base font-semibold text-white/90 group-hover:text-white transition-colors duration-300">
                                {video.author}
                              </p>
                              <p className="text-[10px] xs:text-xs text-white/70 font-medium">
                                {new Date(video.created_at).toLocaleDateString('es-ES', {
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:block">
              <CarouselPrevious className="absolute left-8 top-1/2 h-16 w-16 rounded-full bg-violet-500/90 hover:bg-violet-500 text-white hover:scale-110 active:scale-95 transition-all duration-300 z-20 border-2 border-white/20 hover:border-white/40" />
              <CarouselNext className="absolute right-8 top-1/2 h-16 w-16 rounded-full bg-violet-500/90 hover:bg-violet-500 text-white hover:scale-110 active:scale-95 transition-all duration-300 z-20 border-2 border-white/20 hover:border-white/40" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  )
}
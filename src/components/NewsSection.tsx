"use client"

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, User, Calendar } from "lucide-react"
import { Button } from "./ui/button"
import { News } from '@/types'
import Image from 'next/image';
import { useState, useEffect } from 'react';

const SIZES = [
    'aspect-[2/3]',    // Alto
    'aspect-square',   // Cuadrado
    'aspect-[3/4]',    // Rectangular vertical
    'aspect-[4/5]',    // Casi cuadrado
    'aspect-[5/6]',    // Ligeramente vertical
    'aspect-[3/2]'     // Paisaje
]

const getSize = (index: number) => SIZES[index % SIZES.length]

// Componente optimizado para imágenes
const OptimizedImage = ({ src, alt }: { src: string; alt: string }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="relative w-full h-full">
            {/* Blur placeholder */}
            <div
                className={`absolute inset-0 bg-muted/20 backdrop-blur-xl transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0'
                    }`}
            />
            <Image
                src={src}
                alt={alt}
                width={500}
                height={300}
                className={`w-full h-full object-cover transition-all duration-700 ${isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0'
                    }`}
                onLoadingComplete={() => setIsLoading(false)}
                priority={false}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
        </div>
    );
};

interface NewsSectionProps {
    news: News[]
}

export const NewsSection = ({ news }: NewsSectionProps) => {
    return (
        <section className="w-full py-4">
            <div className="max-w-[2000px] mx-auto">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-4 sm:px-6 lg:px-8">
                    <div className="space-y-4">
                        <div className="relative">
                            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 font-extrabold">
                                    Breaking
                                </span>
                                <span className="ml-3 text-foreground/90 font-extrabold">News</span>
                            </h2>
                            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl" />
                        </div>
                        <p className="text-lg text-muted-foreground/80 max-w-2xl font-medium">
                            Stay updated with the latest stories and developments
                        </p>
                    </div>
                    <Link href="/articles">
                        <Button
                            variant="outline"
                            className="group relative overflow-hidden rounded-full px-8 py-6 text-base font-medium transition-all duration-300
                            border-none bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 hover:from-violet-500/20 hover:via-fuchsia-500/20 hover:to-pink-500/20"
                        >
                            <span className="relative z-10 bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent font-semibold">
                                View All
                            </span>
                            <span className="ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                                →
                            </span>
                        </Button>
                    </Link>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 space-y-4 px-4 sm:px-6 lg:px-8">
                    {news.map((article, index) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`break-inside-avoid mb-4 group relative bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 ${getSize(index)}`}
                        >
                            <Link
                                href={`/articles/${article.category.toLowerCase()}/${article.slug}`}
                                className="block h-full"
                            >
                                <div className="absolute inset-0">
                                    <OptimizedImage
                                        src={article.image}
                                        alt={article.title}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                                </div>

                                <div className="relative h-full p-5 flex flex-col justify-end z-10">
                                    <Badge className="self-start mb-3 bg-white/90 hover:bg-white text-zinc-900 transition-colors">
                                        {article.category}
                                    </Badge>

                                    <h3 className="text-xl font-medium mb-2 text-white group-hover:text-white/90 transition-colors line-clamp-2">
                                        {article.title}
                                    </h3>

                                    <p className="text-white/70 text-sm line-clamp-2 mb-3 group-hover:text-white/80 transition-colors">
                                        {article.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between text-white/60 text-xs">
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-1.5">
                                                <User className="h-3.5 w-3.5" />
                                                <span>{article.author}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="h-3.5 w-3.5" />
                                                <span>
                                                    {new Date(article.created_at).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
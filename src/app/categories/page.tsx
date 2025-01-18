import { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/services/api';
import { Newspaper, Video, ArrowRight } from 'lucide-react';
import { Suspense } from 'react';
import { cache } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: 'Categories | MSP News',
    description: 'Explore our content by categories',
};

// Implementar cache para la función de fetching
const getCategories = cache(async () => {
    const categories = await api.getCategories();
    return categories;
});

export default async function CategoriesPage() {
    const categories = await getCategories();

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Encabezado */}
                <div className="mb-12">
                    <div className="relative">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 font-extrabold">
                                Browse
                            </span>
                            <span className="ml-3 text-foreground/90 font-extrabold">Categories</span>
                        </h1>
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-full blur-3xl" />
                    </div>
                    <p className="mt-4 text-lg text-muted-foreground/80 max-w-2xl font-medium">
                        Explore our content organized by topics and interests
                    </p>
                </div>

                <Suspense fallback={<div className="w-full py-12 flex items-center justify-center">
                    <div className="animate-pulse text-lg text-muted-foreground font-medium">Loading categories...</div>
                </div>}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category) => (
                            <Card key={category.id} className="group">
                                <CardHeader>
                                    <CardTitle className="font-extrabold">{category.name}</CardTitle>
                                    <CardDescription className="font-medium">{ }</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-4 mb-4">
                                        <Badge variant="secondary" className="flex items-center gap-1 font-semibold">
                                            <Newspaper className="h-3 w-3" />
                                            {/* {category.news_count} Articles */}
                                        </Badge>
                                        <Badge variant="secondary" className="flex items-center gap-1 font-semibold">
                                            <Video className="h-3 w-3" />
                                            {/* {category.videos_count} Videos */}
                                        </Badge>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                            asChild
                                        >
                                            <Link href={`/articles/${category.name.toLowerCase()}`}>
                                                View Articles
                                                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="w-full"
                                            asChild
                                        >
                                            <Link href={`/videos/${category.name.toLowerCase()}`}>
                                                View Videos
                                                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </Suspense>
            </div>
        </div>
    );
} 
import { Metadata } from 'next';
import { notFound } from "next/navigation";
import { api } from '@/services/api';
import { User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { ArticleActions } from "@/components/ArticleActions";
import { Suspense } from 'react';
import { cache } from 'react';
import Image from 'next/image';

interface Props {
    params: Promise<{
        category: string;
        slug: string;
    }>;
}

// Implementar cache para la función de fetching
const getArticleById = cache(async (category: string, slug: string) => {
    const article = await api.getNewsById(category, slug);
    return article;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    try {
        const article = await getArticleById(resolvedParams.category, resolvedParams.slug);

        return {
            title: article.title,
            description: article.excerpt,
            openGraph: {
                title: article.title,
                description: article.excerpt,
                type: 'article',
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${resolvedParams.category}/${resolvedParams.slug}`,
                images: [
                    {
                        url: article.image || '/logo.png',
                        width: 1200,
                        height: 630,
                        alt: article.title,
                    }
                ],
            },
            twitter: {
                card: 'summary_large_image',
                title: article.title,
                description: article.excerpt,
                images: [article.image || '/logo.png'],
            }
        }
    } catch {
        return {
            title: 'Artículo No Encontrado',
            description: 'El artículo solicitado no pudo ser encontrado'
        }
    }
}

export default async function ArticlePage({ params }: Props) {
    const resolvedParams = await params;
    const article = await getArticleById(resolvedParams.category, resolvedParams.slug);

    if (!article) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background">
            <Suspense fallback={<div className="min-h-[50vh] w-full flex items-center justify-center">
                <div className="animate-pulse text-lg text-muted-foreground">Cargando artículo...</div>
            </div>}>
                {/* Hero Section */}
                <div className="relative min-h-[50vh] w-full overflow-hidden">
                    {/* Imagen de fondo con efectos */}
                    <div className="absolute inset-0">
                        <Image
                            src={article.image}
                            alt={article.title}
                            width={1200}
                            height={630}
                            className="w-full h-full object-cover"
                        />
                        {/* Efectos de brillo con máscara de degradado */}
                        <div className="absolute inset-0">
                            <div className="absolute top-12 -right-12 w-96 aspect-square bg-violet-500/40 rounded-full blur-3xl animate-pulse opacity-70" />
                            <div className="absolute -bottom-12 -left-12 w-96 aspect-square bg-fuchsia-500/40 rounded-full blur-3xl animate-pulse delay-1000 opacity-70" />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-background" />
                        </div>
                        <div className="absolute inset-0 bg-[url('/effects/grid.svg')] opacity-10" />
                    </div>

                    {/* Contenido del hero */}
                    <div className="relative h-full max-w-[2000px] mx-auto px-4 py-6">
                        <div className="h-full flex flex-col max-w-4xl mx-auto">
                            {/* Navegación y categoría */}
                            <div className="flex items-center justify-between pt-4">
                                <Link href="/articles">
                                    <Button
                                        variant="ghost"
                                        className="group gap-2 text-white hover:text-white bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm"
                                    >
                                        <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                                        Volver a Artículos
                                    </Button>
                                </Link>
                            </div>

                            {/* Contenido central */}
                            <div className="mt-12 mb-8">
                                {/* Categoría */}
                                <div className="mb-4">
                                    <Badge className="bg-violet-500/20 hover:bg-violet-500/30 text-white backdrop-blur-sm border-0 font-semibold">
                                        {article.category}
                                    </Badge>
                                </div>

                                {/* Título */}
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
                                    {article.title}
                                </h1>

                                {/* Autor y acciones */}
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <div className="flex items-center gap-3 backdrop-blur-sm bg-white/10 rounded-full pl-2 pr-4 py-1.5">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 p-[2px]">
                                            <div className="h-full w-full rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                                                <User className="h-5 w-5 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">{article.author}</p>
                                            <p className="text-sm text-white/80">
                                                {new Date(article.created_at).toLocaleDateString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    <ArticleActions />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Suspense>

            {/* Contenido principal */}
            <main className="w-full max-w-[2000px] mx-auto px-4 py-8">
                <article className="max-w-4xl mx-auto">
                    <div className="prose prose-lg dark:prose-invert prose-headings:font-extrabold prose-p:font-medium prose-p:text-muted-foreground prose-headings:text-foreground max-w-none">
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            rehypePlugins={[rehypeRaw, rehypeSanitize]}
                            className="markdown-content"
                            components={{
                                h1: ({ ...props }) => (
                                    <h1 className="text-3xl font-extrabold mb-6 text-foreground" {...props} />
                                ),
                                h2: ({ ...props }) => (
                                    <h2 className="text-2xl font-extrabold mt-10 mb-4 text-foreground" {...props} />
                                ),
                                h3: ({ ...props }) => (
                                    <h3 className="text-xl font-semibold mt-8 mb-4 text-foreground" {...props} />
                                ),
                                p: ({ node, children, ...props }) => {
                                    if (node?.children[0]?.type === 'element' && node.children[0].tagName === 'img') {
                                        return <>{children}</>;
                                    }
                                    return (
                                        <p className="text-base leading-relaxed text-muted-foreground font-medium mb-6" {...props}>
                                            {children}
                                        </p>
                                    );
                                },
                                ul: ({ ...props }) => (
                                    <ul className="list-disc pl-6 mb-6 space-y-2 text-muted-foreground" {...props} />
                                ),
                                li: ({ ...props }) => (
                                    <li className="text-muted-foreground font-medium" {...props} />
                                ),
                                blockquote: ({ ...props }) => (
                                    <blockquote className="border-l-4 border-violet-500 pl-4 my-6 italic text-muted-foreground font-medium" {...props} />
                                ),
                                a: ({ ...props }) => (
                                    <a className="text-violet-500 hover:text-violet-600 transition-colors font-medium" {...props} />
                                ),
                                img: ({ ...props }) => (
                                    <div className="relative group my-8">
                                        <div className="absolute -inset-2 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                                        <div className="relative rounded-3xl overflow-hidden">
                                            <Image
                                                {...props}
                                                width={1200}
                                                height={630}
                                                className="w-full h-full object-cover rounded-3xl"
                                                alt={props.alt || "Article image"}
                                            />
                                        </div>
                                    </div>
                                ),
                            }}
                        >
                            {article.content}
                        </ReactMarkdown>
                    </div>

                    {/* Sección de Video */}
                    {article.video && (
                        <div className="mt-20 space-y-12">
                            {/* Separador decorativo */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full h-px bg-gradient-to-r from-violet-500/0 via-violet-500/30 to-violet-500/0" />
                                </div>
                                <div className="relative flex justify-center">
                                    <div className="bg-violet-500/10 backdrop-blur-sm px-6 py-2 rounded-full border border-violet-500/20">
                                        <Badge className="bg-transparent text-violet-500 hover:bg-transparent border-0 font-semibold">
                                            Video Destacado
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Título del video */}
                            <div className="text-center space-y-4 max-w-2xl mx-auto">
                                <h2 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-fuchsia-500">
                                    {article.video.title}
                                </h2>
                                {article.video.description && (
                                    <p className="text-lg text-muted-foreground font-medium">
                                        {article.video.description}
                                    </p>
                                )}
                            </div>

                            {/* Contenedor del video */}
                            <div className="relative group">
                                <div className="absolute -inset-2 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-muted shadow-2xl ring-1 ring-violet-500/20">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src={`https://www.youtube.com/embed/${article.video.id}`}
                                        title={article.video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </article>
            </main>
        </div>
    );
} 
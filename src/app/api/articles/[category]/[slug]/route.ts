import { NextResponse } from 'next/server'
import { news } from '@/data/news'

export async function GET(
    request: Request,
    { params }: { params: Promise<{ category: string; slug: string }> }
) {
    const resolvedParams = await params;
    const { category, slug } = resolvedParams;

    const article = news.find(
        item => item.category === category && item.slug === slug
    )

    if (!article) {
        return NextResponse.json(
            { error: 'Article not found' },
            { status: 404 }
        )
    }

    return NextResponse.json(article)
} 
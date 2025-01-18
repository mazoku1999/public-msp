import { NextResponse } from 'next/server'
import { news } from '@/data/news'

export async function GET(
    request: Request,
    { params }: { params: { category: string } }
) {
    const { category } = params

    const articles = news.filter(item => item.category === category)

    if (!articles.length) {
        return NextResponse.json(
            { error: 'No articles found in this category' },
            { status: 404 }
        )
    }

    return NextResponse.json(articles)
} 
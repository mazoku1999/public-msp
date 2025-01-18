import { NextResponse } from 'next/server'
import { news } from '@/data/news'

export async function GET() {
    return NextResponse.json(news)
}
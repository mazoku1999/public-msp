export interface Video {
    id: number;
    title: string;
    description: string;
    url: string;
    thumbnail: string;
    author: string;
    created_at: string;
    slug: string;
    category: string;
    views?: number;
    duration?: string;
    youtubeId: string;
}

export interface VideoInfo {
    id: string;
    title: string;
    description?: string;
}

export interface News {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    author: string;
    created_at: string;
    category: string;
    slug: string;
    video?: VideoInfo;
} 
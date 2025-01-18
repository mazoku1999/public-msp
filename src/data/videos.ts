import { Video } from "@/types"
import { generateSlug } from "@/lib/utils"

export const videos: Video[] = [
    {
        id: 1,
        title: "SpaceX's Starship Makes Historic Landing",
        description: "Watch the incredible moment as SpaceX's Starship successfully completes its test flight and landing.",
        thumbnail: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&auto=format&fit=crop",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Space Enthusiast",
        created_at: "2024-02-15T14:30:00Z",
        category: "technology",
        slug: "spacexs-starship-makes-historic-landing-20240215"
    },
    {
        id: 2,
        title: "Exploring the Deep Ocean's Hidden Mysteries",
        description: "Journey to the depths of the ocean to discover incredible marine life and underwater phenomena.",
        thumbnail: "https://images.unsplash.com/photo-1551244072-5d12893278ab?w=800&auto=format&fit=crop",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Ocean Explorer",
        created_at: "2024-02-14T09:15:00Z",
        category: "science",
        slug: "exploring-the-deep-oceans-hidden-mysteries-20240214"
    },
    {
        id: 3,
        title: "The Future of Artificial Intelligence",
        description: "Leading experts discuss the latest developments in AI and what the future holds.",
        thumbnail: "https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Tech Insights",
        created_at: "2024-02-13T16:45:00Z",
        category: "technology",
        slug: "future-ai-202402131"
    },
    {
        id: 4,
        title: "Sustainable Cities of Tomorrow",
        description: "Discover innovative urban planning solutions for creating environmentally friendly cities.",
        thumbnail: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&auto=format&fit=crop",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Urban Future",
        created_at: "2024-02-12T11:20:00Z",
        category: "environment",
        slug: "sustainable-cities-202402121"
    },
    {
        id: 5,
        title: "Revolutionary Clean Energy Technologies",
        description: "Explore cutting-edge renewable energy solutions that are transforming the power industry.",
        thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format&fit=crop",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Green Tech",
        created_at: "2024-02-11T08:30:00Z",
        category: "technology",
        slug: "revolutionary-clean-energy-202402111"
    },
    {
        id: 6,
        title: "The Rise of Electric Aviation",
        description: "How electric aircraft are revolutionizing the future of air travel.",
        thumbnail: "https://images.unsplash.com/photo-1559627755-c1de9ee8cf9b?w=800&auto=format&fit=crop",
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        author: "Future Flight",
        created_at: "2024-02-10T13:10:00Z",
        category: "transportation",
        slug: "rise-electric-aviation-202402101"
    }
];
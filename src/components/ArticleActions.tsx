"use client"

import { Share2, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ArticleActions() {
    return (
        <div className="flex items-center gap-2">
            <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm
                hover:scale-110 transition-all duration-300"
            >
                <Share2 className="h-5 w-5" />
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm
                hover:scale-110 transition-all duration-300"
            >
                <Bookmark className="h-5 w-5" />
            </Button>
        </div>
    )
} 
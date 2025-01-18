"use client"

import { motion } from "framer-motion"
import ArticleCard from "./ArticleCard"
import type { News } from "@/types"

interface ArticlesGridProps {
    articles: News[]
}

export function ArticlesGrid({ articles }: ArticlesGridProps) {
    return (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-5 gap-4 space-y-4">
            {articles.map((article, index) => (
                <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <ArticleCard article={article} index={index} />
                </motion.div>
            ))}
        </div>
    )
}

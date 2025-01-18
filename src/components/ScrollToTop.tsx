"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility)

        return () => {
            window.removeEventListener("scroll", toggleVisibility)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="fixed bottom-4 right-4 z-50"
                >
                    <Button
                        onClick={scrollToTop}
                        size="icon"
                        className="h-10 w-10 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 dark:bg-violet-400/10 dark:hover:bg-violet-400/20 border border-violet-500/20 hover:border-violet-500/30 dark:border-violet-400/20 dark:hover:border-violet-400/30 transition-all duration-300"
                    >
                        <ArrowUp className="h-[18px] w-[18px] text-violet-600 dark:text-violet-400" />
                    </Button>
                </motion.div>
            )}
        </AnimatePresence>
    )
} 
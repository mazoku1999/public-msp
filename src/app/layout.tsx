import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/Header'
import { ScrollToTop } from '@/components/ScrollToTop'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Video Immersive Hub',
    description: 'An immersive platform to explore videos and articles',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cn(
                'min-h-screen bg-background font-sans antialiased',
                inter.className
            )}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    <main className="min-h-screen pt-[120px]">
                        {children}
                    </main>
                    <ScrollToTop />
                </ThemeProvider>
            </body>
        </html>
    )
} 
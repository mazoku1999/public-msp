import type { Metadata } from 'next'
import { Poppins, Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { Header } from '@/components/Header'
import { ScrollToTop } from '@/components/ScrollToTop'
import { cn } from '@/lib/utils'
import { HeaderHeightAdjuster } from '@/components/HeaderHeightAdjuster'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const poppins = Poppins({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
    variable: '--font-poppins',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'Motion Sound News',
    description: 'Your trusted source for news, articles and videos',
    metadataBase: new URL('https://motionsoundnews.com'),
    icons: {
        icon: '/favicon.ico',
        apple: '/logo.png',
        shortcut: '/favicon.ico',
    },
    openGraph: {
        images: [{
            url: '/logo.png',
            width: 800,
            height: 600,
            alt: 'Motion Sound News Logo'
        }]
    },
    other: {
        'msapplication-TileImage': '/logo.png',
        'msapplication-TileColor': '#000000'
    }
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
                poppins.variable,
                inter.variable
            )}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Header />
                    <HeaderHeightAdjuster />
                    <main className="min-h-screen pt-[var(--header-height)]">
                        {children}
                    </main>
                    <ScrollToTop />
                </ThemeProvider>
            </body>
        </html>
    )
} 
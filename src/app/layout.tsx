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
    title: 'Motion Sound News | Noticias de Bolivia',
    description: 'Tu fuente confiable para noticias, artículos y videos sobre Bolivia y el mundo',
    metadataBase: new URL('https://motionsoundnews.com'),
    keywords: 'noticias bolivia, elecciones 2025, actualidad boliviana, videos, artículos',
    authors: [{ name: 'Motion Sound News' }],
    category: 'noticias',
    icons: {
        icon: '/favicon.ico',
        apple: '/logo.png',
        shortcut: '/favicon.ico',
    },
    openGraph: {
        title: 'Motion Sound News | Noticias de Bolivia',
        description: 'Tu fuente confiable para noticias, artículos y videos sobre Bolivia y el mundo',
        url: 'https://motionsoundnews.com',
        siteName: 'Motion Sound News',
        locale: 'es_BO',
        type: 'website',
        images: [{
            url: '/logo.png',
            width: 800,
            height: 600,
            alt: 'Logo de Motion Sound News'
        }]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Motion Sound News | Noticias de Bolivia',
        description: 'Tu fuente confiable para noticias, artículos y videos sobre Bolivia y el mundo',
        images: ['/logo.png'],
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
        <html lang="es" suppressHydrationWarning>
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
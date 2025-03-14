"use client"

import { useTheme } from "next-themes";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import WordReveal from "@/components/ui/word-reveal";
// Importamos el tipo para la animación de Lottie
import type { AnimationItem } from "lottie-web";

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [initialTheme, setInitialTheme] = useState<string | undefined>(undefined);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const mobileWords = ["Motion", "Sound", "News"];
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const prefersDark = window?.matchMedia('(prefers-color-scheme: dark)')?.matches;
    setInitialTheme(prefersDark ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % mobileWords.length);
    }, 2000); // Cambia cada 2 segundos

    return () => clearInterval(interval);
  }, [mobileWords.length]);

  // Commented out menu items
  // const menuItems = ['Home', 'Videos', 'Articles', 'Categories'];

  // For Lottie animation
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This effect will handle setting up the Lottie animation when component mounts
    let animation: AnimationItem | null = null;

    if (typeof window !== 'undefined' && lottieRef.current) {
      import('lottie-web').then((LottieModule) => {
        const Lottie = LottieModule.default;
        animation = Lottie.loadAnimation({
          container: lottieRef.current as Element,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/animations/election-animation.json', // Update this path to your actual Lottie animation file
        });
      });
    }

    return () => {
      if (animation) animation.destroy();
    };
  }, []);

  // const isActiveLink = (item: string) => {
  //   if (item === 'Home' && pathname === '/') return true;
  //   return pathname === `/${item.toLowerCase()}`;
  // };

  const renderThemeIcon = () => {
    // Usamos resolvedTheme si está montado, o initialTheme como fallback
    const currentTheme = mounted ? resolvedTheme : initialTheme;

    if (!currentTheme) return null; // Si no hay tema, no mostramos nada

    return currentTheme === "dark" ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    );
  };

  return (
    <>
      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 dark:bg-black/80 z-[60] transition-opacity"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-background border-r border-border z-[70] transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6">
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <nav className="mt-8">
            <ul className="space-y-4">
              {/* Replace menuItems with direct links */}
              <li>
                <Link
                  href="/"
                  className={`block px-4 py-2 rounded-lg transition-all ${pathname === '/'
                    ? 'text-foreground font-semibold bg-foreground/5'
                    : 'text-muted-foreground hover:text-foreground hover:font-semibold hover:bg-foreground/5'
                    }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/videos"
                  className={`block px-4 py-2 rounded-lg transition-all ${pathname === '/videos'
                    ? 'text-foreground font-semibold bg-foreground/5'
                    : 'text-muted-foreground hover:text-foreground hover:font-semibold hover:bg-foreground/5'
                    }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Videos
                </Link>
              </li>
              <li>
                <Link
                  href="/articles"
                  className={`block px-4 py-2 rounded-lg transition-all ${pathname === '/articles'
                    ? 'text-foreground font-semibold bg-foreground/5'
                    : 'text-muted-foreground hover:text-foreground hover:font-semibold hover:bg-foreground/5'
                    }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/categories"
                  className={`block px-4 py-2 rounded-lg transition-all ${pathname === '/categories'
                    ? 'text-foreground font-semibold bg-foreground/5'
                    : 'text-muted-foreground hover:text-foreground hover:font-semibold hover:bg-foreground/5'
                    }`}
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Categories
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <header className="fixed top-0 left-0 right-0 w-full px-4 md:px-6 py-4 md:py-6 border-b border-border bg-background/90 backdrop-blur-md z-50 h-[140px] md:h-[160px]">
        <div className="max-w-7xl mx-auto h-full flex flex-col justify-between">
          {/* Top bar */}
          <div className="flex items-center justify-between pt-1 md:pt-2 mb-4 md:mb-8">
            {/* Left side - Menu button */}
            <button
              className="text-foreground hover:text-foreground/80 transition-colors"
              onClick={() => setIsDrawerOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-7 md:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 md:gap-4 group">
              <span className="text-foreground group-hover:text-foreground/90 transition-colors flex items-center gap-4 font-['CloisterBlack'] font-normal">
                {/* Desktop version - full text */}
                <span className="hidden md:flex gap-6 min-w-max">
                  <WordReveal text="Motion" delay={0.1} className="inline-block !text-7xl !md:text-8xl font-cloister font-thin whitespace-nowrap" />
                  <WordReveal text="Sound" delay={0.2} className="inline-block !text-7xl !md:text-8xl font-cloister font-thin whitespace-nowrap" />
                  <WordReveal text="News" delay={0.3} className="inline-block !text-7xl !md:text-8xl font-cloister font-thin whitespace-nowrap" />
                </span>
                {/* Mobile version - sequential words */}
                <span className="inline md:hidden min-w-max">
                  <WordReveal
                    text={mobileWords[currentWordIndex]}
                    delay={0.1}
                    className="inline-block min-w-[120px] text-center !text-5xl sm:!text-6xl font-cloister font-thin whitespace-nowrap"
                  />
                </span>
              </span>
              <div className="relative w-[60px] h-[60px] min-w-[60px] min-h-[60px] md:w-[80px] md:h-[80px] md:min-w-[80px] md:min-h-[80px]">
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-foreground/30 to-foreground/40 dark:from-indigo-500/60 dark:via-indigo-400/60 dark:to-violet-300/60 rounded-full blur-sm group-hover:blur-md transition-all scale-105 group-hover:scale-110 opacity-0 group-hover:opacity-100 group-hover:rotate-180 duration-700"></div>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={80}
                  height={80}
                  className="object-contain w-full h-full relative hover:scale-105 transition-transform duration-300 group-hover:rotate-[360deg] duration-700"
                  priority
                />
              </div>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={() => setTheme(mounted && resolvedTheme === "dark" ? "light" : "dark")}
              className="text-foreground hover:text-foreground/80 transition-colors"
              suppressHydrationWarning
            >
              {renderThemeIcon()}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex justify-center w-full overflow-x-auto pb-1">
            <div className="flex items-center justify-center space-x-2 xxs:space-x-3 md:space-x-6 bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 px-3 xxs:px-4 sm:px-6 py-2 sm:py-3 rounded-full shadow-md">
              <span className="text-foreground font-bold text-[0.65rem] xxs:text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl tracking-wide uppercase whitespace-nowrap">ELECCIONES BOLIVIA 2025</span>
              {/* Lottie animation container - Increased size */}
              <div
                ref={lottieRef}
                className="w-8 h-8 xxs:w-10 xxs:h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 inline-block flex-shrink-0"
              ></div>
              <span className="text-muted-foreground">|</span>
              <span className="text-foreground font-bold text-[0.65rem] xxs:text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl tracking-wide uppercase whitespace-nowrap">WWW.MSNBOL.COM</span>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
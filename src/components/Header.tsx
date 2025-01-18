"use client"

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import WordReveal from "@/components/ui/word-reveal";

export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [initialTheme, setInitialTheme] = useState<string | undefined>(undefined);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const mobileWords = ["motion", "sound", "news"];
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

  const menuItems = ['Home', 'Videos', 'Articles', 'Categories'];

  const isActiveLink = (item: string) => {
    if (item === 'Home' && pathname === '/') return true;
    return pathname === `/${item.toLowerCase()}`;
  };

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
              {menuItems.map((item) => (
                <li key={item}>
                  <Link
                    href={item === 'News' ? '/' : `/${item.toLowerCase()}`}
                    className={`block px-4 py-2 rounded-lg transition-all ${isActiveLink(item)
                      ? 'text-foreground font-semibold bg-foreground/5'
                      : 'text-muted-foreground hover:text-foreground hover:font-semibold hover:bg-foreground/5'
                      }`}
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <header className="fixed top-0 left-0 right-0 w-full px-4 md:px-6 py-4 border-b border-border bg-background/90 backdrop-blur-md z-50 h-[120px]">
        <div className="max-w-7xl mx-auto h-full flex flex-col justify-between">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            {/* Left side - Menu button */}
            <button
              className="text-foreground hover:text-foreground/80 transition-colors"
              onClick={() => setIsDrawerOpen(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="text-3xl md:text-4xl font-serif absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 group">
              <span className="text-foreground group-hover:text-foreground/90 transition-colors flex items-center">
                {/* Desktop version - full text */}
                <span className="hidden md:inline">
                  <WordReveal text="motionsoundnews" delay={0.1} className="inline-block !text-4xl !md:text-4xl" />
                </span>
                {/* Mobile version - sequential words */}
                <span className="inline md:hidden">
                  <WordReveal
                    text={mobileWords[currentWordIndex]}
                    delay={0.1}
                    className="inline-block min-w-[120px] text-center"
                  />
                </span>
              </span>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-foreground/30 to-foreground/40 dark:from-indigo-500/60 dark:via-indigo-400/60 dark:to-violet-300/60 rounded-full blur-sm group-hover:blur-md transition-all scale-105 group-hover:scale-110 opacity-0 group-hover:opacity-100 group-hover:rotate-180 duration-700"></div>
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={50}
                  height={50}
                  className="object-contain relative hover:scale-105 transition-transform duration-300 group-hover:rotate-[360deg] duration-700"
                />
              </div>
            </Link>

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
          <nav className="flex justify-center overflow-x-auto whitespace-nowrap">
            <div className="flex space-x-6 md:space-x-12">
              {menuItems.map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className={`relative pb-2.5 px-1 font-normal hover:font-semibold transition-all ${isActiveLink(item)
                    ? 'text-foreground font-semibold after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-foreground after:rounded-full after:shadow-[0_4px_20px_0_rgba(0,0,0,0.3),0_8px_30px_0_rgba(0,0,0,0.2),0_-2px_10px_0_rgba(0,0,0,0.1)] dark:after:bg-white dark:after:shadow-[0_4px_20px_0_rgba(255,255,255,0.7),0_8px_30px_0_rgba(255,255,255,0.5),0_-2px_10px_0_rgba(255,255,255,0.4)] after:transition-all'
                    : 'text-muted-foreground hover:text-foreground after:absolute after:left-0 after:bottom-0 after:w-full after:h-[3px] after:bg-foreground/0 hover:after:bg-foreground/30 dark:hover:after:bg-white/30 hover:after:shadow-[0_4px_10px_0_rgba(0,0,0,0.1),0_8px_20px_0_rgba(0,0,0,0.1)] dark:hover:after:shadow-[0_4px_10px_0_rgba(255,255,255,0.2),0_8px_20px_0_rgba(255,255,255,0.1)] after:rounded-full after:transition-all'
                    }`}
                >
                  {item}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(true)
  const descripcion = `El Dr. Chi Hyun Chung, médico, empresario y pastor evangélico de origen surcoreano, ha anunciado su candidatura a la presidencia de Bolivia para las elecciones de 2025.`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 640px)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="w-full max-w-[1400px] mx-auto px-1 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-4 sm:py-6">
      <Link href="/videos/politics/msn-entrevistas-chi-hyun-chung-habla-sobre-su-candidatura-presidencial--20250220201842" className="block">
        <section className="relative w-full aspect-[3/4] xs:aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xl xxs:rounded-2xl xs:rounded-[2rem] sm:rounded-[2.5rem] border border-white/[0.05] shadow-2xl shadow-black/20 group hover:border-violet-500/20 transition-all duration-500">
          {/* Fondo con efecto glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-indigo-950/40 to-violet-950/30 backdrop-blur-sm" />

          {/* Video de fondo con mejor presentación */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
            <div className="absolute inset-0 overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/NOd1behBpWY?autoplay=1&mute=1&loop=1&playlist=NOd1behBpWY&controls=0&showinfo=0&rel=0"
                className="absolute w-[300%] xs:w-[200%] sm:w-full h-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
          </div>

          {/* Efectos de iluminación */}
          <div className="absolute inset-0">
            <div className="absolute top-0 inset-x-0 h-16 xxs:h-24 sm:h-32 lg:h-40 bg-gradient-to-b from-violet-500/20 to-transparent" />
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-violet-500/10 via-indigo-500/5 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-32 xxs:h-48 sm:h-56 lg:h-64 bg-gradient-to-t from-violet-950 via-violet-900/50 to-transparent" />
          </div>

          {/* Líneas decorativas */}
          <div className="absolute inset-0">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
            <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-violet-500/40 to-transparent" />
            <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-violet-500/40 to-transparent" />
          </div>

          {/* Contenido */}
          <div className="relative h-full z-20">
            <div className="absolute inset-0 flex flex-col justify-end p-3 xxs:p-4 xs:p-6 sm:p-8 lg:p-10">
              <div className="relative space-y-3 xxs:space-y-4 sm:space-y-5">
                {/* Badge */}
                <div className="relative">
                  <div className="inline-flex backdrop-blur-xl rounded-full p-0.5 bg-gradient-to-r from-violet-500/20 via-indigo-500/20 to-violet-500/20">
                    <div className="flex items-center gap-1 xxs:gap-1.5 sm:gap-2 px-2 xxs:px-3 sm:px-4 py-1 xxs:py-1.5 sm:py-2 rounded-full bg-white/10 border border-white/10">
                      <div className="w-1 xxs:w-1.5 sm:w-2 h-1 xxs:h-1.5 sm:h-2 rounded-full bg-violet-400 animate-pulse" />
                      <span className="text-[10px] xxs:text-xs sm:text-sm lg:text-base font-semibold text-white/90 tracking-wide">Breaking News</span>
                    </div>
                  </div>
                </div>

                {/* Texto principal */}
                <div className="relative max-w-4xl space-y-2 xxs:space-y-3 sm:space-y-4">
                  <h1 className="text-xl xxs:text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                    MSN ENTREVISTAS: Chi Hyun Chung Habla Sobre su Candidatura Presidencial
                  </h1>

                  <p className="text-xs xxs:text-sm sm:text-base lg:text-lg font-medium text-white/70 max-w-[95%] xxs:max-w-[90%] sm:max-w-2xl leading-relaxed">
                    {descripcion}
                    {!isMobile && ' '}
                  </p>

                  {/* Watch Video Button */}
                  <div className="mt-6 sm:mt-8">
                    <div className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-violet-500/50 rounded-full bg-white/5 hover:bg-violet-500/10 backdrop-blur-sm transition-all duration-300 group/button">
                      <span className="text-sm sm:text-base font-medium text-white/90 group-hover/button:text-white">Watch Video</span>
                      <ArrowRight className="w-4 h-4 text-white/70 group-hover/button:text-white transition-transform duration-300 group-hover/button:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Partículas y efectos adicionales */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-24 xxs:w-32 sm:w-40 lg:w-56 aspect-square bg-violet-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 left-1/3 w-32 xxs:w-40 sm:w-56 lg:w-72 aspect-square bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute inset-0 bg-[url('/effects/grid.svg')] opacity-10" />
          </div>
        </section>
      </Link>
    </div>
  )
}
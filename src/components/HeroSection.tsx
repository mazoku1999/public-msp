"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(true)
  const descripcion = `En esta entrevista exclusiva de MSN Entrevistas, Manfred Reyes Villa, actual alcalde de Cochabamba y figura política consolidada en Bolivia, expone en detalle su candidatura presidencial para las elecciones de agosto de 2025.`;

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
      <section className="relative w-full aspect-[3/4] xs:aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xl xxs:rounded-2xl xs:rounded-[2rem] sm:rounded-[2.5rem] border border-white/[0.05] shadow-2xl shadow-black/20">
        {/* Fondo con efecto glassmorphism */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-indigo-950/40 to-violet-950/30 backdrop-blur-sm" />

        {/* Video de fondo con mejor presentación */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/rzFfD-4rVjo?autoplay=1&mute=1&loop=1&playlist=rzFfD-4rVjo&controls=0&showinfo=0&rel=0"
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
                  MSN Entrevistas: Manfred Reyes Villa
                </h1>

                <p className="text-xs xxs:text-sm sm:text-base lg:text-lg font-medium text-white/70 max-w-[95%] xxs:max-w-[90%] sm:max-w-2xl leading-relaxed">
                  {descripcion}
                  {!isMobile && ' '}
                </p>
              </div>

              {/* Botón */}
              <div className="relative pt-2 xxs:pt-3 sm:pt-4">
                <Link href="/videos/politics/entrevista-a-tuto-quiroga--20250130145520">
                  <button className="group relative overflow-hidden rounded-lg xxs:rounded-xl sm:rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/10 hover:border-violet-500/30 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/[0.07] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative flex items-center gap-1.5 xxs:gap-2 sm:gap-3 px-3 xxs:px-4 sm:px-6 lg:px-8 py-1.5 xxs:py-2 sm:py-3">
                      <span className="text-xs xxs:text-sm sm:text-base lg:text-lg font-medium text-white group-hover:text-white/90 transition-colors">Read More</span>
                      <ArrowRight className="h-3 w-3 xxs:h-4 xxs:w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white/70 group-hover:text-white/90 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </button>
                </Link>
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
    </div>
  )
}
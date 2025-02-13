"use client"

import { X } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@/components/ui/visually-hidden"

export const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const backgroundVideoRef = useRef<HTMLIFrameElement>(null)
  const modalVideoRef = useRef<HTMLIFrameElement>(null)
  const descripcion = `En esta entrevista exclusiva de MSN Entrevistas, Manfred Reyes Villa, actual alcalde de Cochabamba y figura política consolidada en Bolivia, expone en detalle su candidatura presidencial para las elecciones de agosto de 2025.`;

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 640px)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Función para obtener el tiempo actual del video de fondo
  const getCurrentTime = () => {
    if (backgroundVideoRef.current) {
      backgroundVideoRef.current.contentWindow?.postMessage(
        '{"event":"command","func":"getCurrentTime","args":""}',
        '*'
      )
    }
  }

  // Manejador de mensajes de la API de YouTube
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;

      try {
        const data = JSON.parse(event.data);
        if (data.info && data.info.currentTime) {
          setCurrentTime(data.info.currentTime);
        }
      } catch {
        // Ignorar mensajes que no son JSON
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Efecto para controlar la reproducción de videos
  useEffect(() => {
    if (isModalOpen) {
      // Obtener tiempo actual antes de pausar
      getCurrentTime();

      // Pausar video de fondo
      if (backgroundVideoRef.current) {
        backgroundVideoRef.current.contentWindow?.postMessage(
          '{"event":"command","func":"pauseVideo","args":""}',
          '*'
        )
      }

      // Iniciar video del modal en el tiempo actual
      if (modalVideoRef.current) {
        modalVideoRef.current.contentWindow?.postMessage(
          `{"event":"command","func":"seekTo","args":[${currentTime},true]}`,
          '*'
        )
      }
    } else {
      // Reanudar video de fondo cuando el modal está cerrado
      if (backgroundVideoRef.current) {
        backgroundVideoRef.current.contentWindow?.postMessage(
          '{"event":"command","func":"playVideo","args":""}',
          '*'
        )
      }
    }
  }, [isModalOpen, currentTime])

  const handleOpenModal = () => {
    getCurrentTime();
    setIsModalOpen(true);
  }

  return (
    <>
      <div
        className="w-full max-w-[1400px] mx-auto px-1 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-4 sm:py-6"
        onClick={handleOpenModal}
        style={{ cursor: 'pointer' }}
      >
        <section className="relative w-full aspect-[3/4] xs:aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xl xxs:rounded-2xl xs:rounded-[2rem] sm:rounded-[2.5rem] border border-white/[0.05] shadow-2xl shadow-black/20">
          {/* Fondo con efecto glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-indigo-950/40 to-violet-950/30 backdrop-blur-sm" />

          {/* Video de fondo con mejor presentación */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
            <div className="absolute inset-0 overflow-hidden">
              <iframe
                ref={backgroundVideoRef}
                src="https://www.youtube.com/embed/rzFfD-4rVjo?autoplay=1&mute=1&loop=1&playlist=rzFfD-4rVjo&controls=0&showinfo=0&rel=0&enablejsapi=1&origin=http://localhost:3000"
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-none w-screen h-screen p-0 overflow-hidden bg-[#030014] border-none" hideClose>
          {/* Botón de cerrar personalizado */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-6 right-6 z-50 group"
          >
            <div className="relative p-3 rounded-full bg-violet-500/90 hover:bg-violet-500 border-2 border-white/20 hover:border-white/40 transition-all duration-300">
              <X className="w-6 h-6 text-white" />
              <div className="absolute inset-0 rounded-full bg-violet-500/20 animate-ping" />
            </div>
          </button>

          <VisuallyHidden>
            <DialogTitle>
              MSN Entrevistas: Manfred Reyes Villa
            </DialogTitle>
          </VisuallyHidden>

          {/* Contenedor principal */}
          <div className="relative w-full h-full">
            {/* Efectos de fondo */}
            <div className="absolute inset-0">
              <div className="absolute w-full h-full bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
            </div>

            <div className="relative w-full h-full flex items-center justify-center">
              {/* Contenedor del video */}
              <div className="relative w-full max-w-7xl aspect-video rounded-[2.5rem] overflow-hidden mx-4 sm:mx-6 lg:mx-8">
                {/* Bordes con gradiente */}
                <div className="absolute inset-0 p-[1px] rounded-[2.5rem]">
                  <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-violet-500/20 via-white/10 to-indigo-500/20" />
                </div>

                {/* Video */}
                <iframe
                  ref={modalVideoRef}
                  src={`https://www.youtube.com/embed/rzFfD-4rVjo?autoplay=1&rel=0&enablejsapi=1&origin=http://localhost:3000&start=${Math.floor(currentTime)}`}
                  className="absolute inset-0 w-full h-full rounded-[2.5rem]"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
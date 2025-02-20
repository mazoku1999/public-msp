"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import Script from "next/script"

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(true)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isVideoReady, setIsVideoReady] = useState(false)
  const playerRef = useRef<any>(null)
  const playerReadyRef = useRef(false)
  const descripcion = `El Dr. Chi Hyun Chung, médico, empresario y pastor evangélico de origen surcoreano, ha anunciado su candidatura a la presidencia de Bolivia para las elecciones de 2025.`;

  const initializeYouTubePlayer = () => {
    if (!window.YT) {
      // Si la API no está cargada, cargamos el script
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    } else if (!playerRef.current) {
      // Si la API está cargada pero el player no está inicializado
      createPlayer();
    }
  };

  const createPlayer = () => {
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: 'NOd1behBpWY',
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          showinfo: 0,
          mute: 0,
          modestbranding: 1,
          playsinline: 1
        },
        events: {
          onReady: () => {
            playerReadyRef.current = true;
            setIsVideoReady(true);
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === 1);
          }
        }
      });
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 640px)').matches)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Inicializar el player cuando el componente se monta
    window.onYouTubeIframeAPIReady = createPlayer;
    initializeYouTubePlayer();

    // Cleanup cuando el componente se desmonta
    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
      playerReadyRef.current = false;
      setIsPlaying(false);
      setIsVideoReady(false);
    };
  }, []);

  // Efecto para reinicializar el player cuando volvemos a la página
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && !playerRef.current) {
        initializeYouTubePlayer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', initializeYouTubePlayer);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', initializeYouTubePlayer);
    };
  }, []);

  const handleVideoClick = () => {
    if (!isPlaying) {
      if (playerReadyRef.current && playerRef.current?.playVideo) {
        playerRef.current.playVideo();
      } else {
        setIsVideoReady(true);
        initializeYouTubePlayer();
        const checkInterval = setInterval(() => {
          if (playerReadyRef.current && playerRef.current?.playVideo) {
            playerRef.current.playVideo();
            clearInterval(checkInterval);
          }
        }, 100);
        setTimeout(() => clearInterval(checkInterval), 5000);
      }
    }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto h-[calc(100vh-160px)] flex items-center px-1 xs:px-4 sm:px-6 lg:px-8 py-2 xs:py-4 sm:py-6">
      <section className="relative w-full h-full max-h-[calc(100vh-200px)] overflow-hidden rounded-xl xxs:rounded-2xl xs:rounded-[2rem] sm:rounded-[2.5rem] border border-white/[0.05] shadow-2xl shadow-black/20 group hover:border-violet-500/20 transition-all duration-500">
        {/* Fondo con efecto glassmorphism */}
        <div className={`absolute inset-0 bg-gradient-to-br from-violet-950/50 via-indigo-950/40 to-violet-950/30 backdrop-blur-sm transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />

        {/* Imagen de fondo o Video */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 transition-opacity duration-500 ${!isPlaying ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="https://i.ytimg.com/vi/NOd1behBpWY/maxresdefault.jpg"
                alt="MSN Entrevistas: Chi Hyun Chung"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className={`absolute inset-0 transition-opacity duration-500 ${isPlaying ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            <div id="youtube-player" className="w-full h-full" />
          </div>
        </div>

        {/* Play button overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-600/30 backdrop-blur-sm border-2 border-indigo-400/25 flex items-center justify-center group-hover:scale-110 transition-all duration-300 hover:bg-indigo-500/40">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-indigo-500/25 backdrop-blur-sm border border-indigo-300/25 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[16px] border-l-white/90 border-b-[8px] border-b-transparent translate-x-0.5" />
              </div>
            </div>
          </div>
        )}

        {/* Capa interactiva y contenido */}
        <div
          onClick={handleVideoClick}
          className={`absolute inset-0 cursor-pointer z-20 transition-opacity duration-500 ${isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          {/* More Details Button - Moved to top */}
          <div className="absolute top-3 xxs:top-4 xs:top-6 sm:top-8 lg:top-10 left-3 xxs:left-4 xs:left-6 sm:left-8 lg:left-10 z-30">
            <Link
              href="/videos/politics/msn-entrevistas-chi-hyun-chung-habla-sobre-su-candidatura-presidencial--20250220201842"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-lg text-violet-600 hover:text-violet-700 active:text-violet-800 font-bold transform hover:-translate-y-0.5 active:translate-y-0 hover:shadow-[0_6px_0_0_rgba(109,40,217)] active:shadow-[0_3px_0_0_rgba(109,40,217)] transition-all duration-150 group/button"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <span className="text-sm sm:text-base tracking-wide">More Details</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-150 group-hover/button:translate-x-1" />
            </Link>
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
          <div className="relative h-full flex items-end">
            <div className="w-full p-3 xxs:p-4 xs:p-6 sm:p-8 lg:p-10">
              <div className="relative space-y-3 xxs:space-y-4 sm:space-y-5">
                {/* Texto principal */}
                <div className="relative max-w-4xl space-y-2 xxs:space-y-3 sm:space-y-4">
                  <h1 className="text-xl xxs:text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
                    MSN ENTREVISTAS: Chi Hyun Chung Habla Sobre su Candidatura Presidencial
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
        </div>
      </section>
    </div>
  )
}
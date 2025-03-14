"use client";

import { useEffect, useCallback, useRef } from 'react';

export const HeaderHeightAdjuster = () => {
    const updateCountRef = useRef(0);

    const updateHeaderHeight = useCallback(() => {
        const header = document.querySelector('header');
        if (header) {
            const headerHeight = header.offsetHeight;
            document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
            updateCountRef.current += 1;

            // Log para depuración (puedes quitar esto en producción)
            console.log(`Header height updated to ${headerHeight}px (update #${updateCountRef.current})`);
        }
    }, []);

    useEffect(() => {
        // Función para actualizar más agresivamente al inicio
        const initialUpdates = () => {
            // Actualizamos inmediatamente
            updateHeaderHeight();

            // Y luego varias veces en intervalos cortos
            const times = [10, 50, 100, 250, 500, 1000, 2000];
            times.forEach(time => {
                setTimeout(updateHeaderHeight, time);
            });
        };

        // Actualizar cuando cambie el tamaño de la ventana
        window.addEventListener('resize', updateHeaderHeight);

        // Actualizar después de que el DOM se cargue completamente
        window.addEventListener('load', initialUpdates);

        // Actualizar cuando cambie la orientación del dispositivo
        window.addEventListener('orientationchange', updateHeaderHeight);

        // Ejecutar actualizaciones iniciales
        initialUpdates();

        // Continuar monitoreando en caso de cambios dinámicos
        const interval = setInterval(updateHeaderHeight, 1000);
        // Detener después de 5 segundos
        setTimeout(() => clearInterval(interval), 5000);

        // Para manejar cambios de contenido dinámicos después de la carga inicial
        const mutationObserver = new MutationObserver(() => {
            updateHeaderHeight();
        });

        // Observar el header para cualquier cambio de contenido
        const header = document.querySelector('header');
        if (header) {
            mutationObserver.observe(header, {
                childList: true,
                subtree: true,
                attributes: true,
                characterData: true
            });
        }

        return () => {
            window.removeEventListener('resize', updateHeaderHeight);
            window.removeEventListener('load', initialUpdates);
            window.removeEventListener('orientationchange', updateHeaderHeight);
            clearInterval(interval);
            mutationObserver.disconnect();
        };
    }, [updateHeaderHeight]);

    return null;
}; 
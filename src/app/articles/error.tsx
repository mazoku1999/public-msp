'use client'

export default function Error({
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
            <h2 className="text-2xl font-bold mb-4">¡Algo salió mal!</h2>
            <button
                onClick={() => reset()}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Intentar de nuevo
            </button>
        </div>
    )
} 
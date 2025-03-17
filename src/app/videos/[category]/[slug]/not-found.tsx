import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="max-w-4xl mx-auto py-16 px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Video No Encontrado</h2>
            <p className="mb-8">Lo sentimos, no pudimos encontrar el video que buscas.</p>
            <Link
                href="/videos"
                className="text-blue-600 hover:text-blue-800 underline"
            >
                Volver a Videos
            </Link>
        </div>
    );
} 
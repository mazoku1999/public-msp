import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="max-w-4xl mx-auto py-16 px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Artículo No Encontrado</h2>
            <p className="mb-8">Lo sentimos, no pudimos encontrar el artículo que buscas.</p>
            <Link
                href="/articles"
                className="text-blue-600 hover:text-blue-800 underline"
            >
                Volver a Artículos
            </Link>
        </div>
    );
} 
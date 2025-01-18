import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="max-w-4xl mx-auto py-16 px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Video Not Found</h2>
            <p className="mb-8">Sorry, we couldn't find the video you're looking for.</p>
            <Link
                href="/videos"
                className="text-blue-600 hover:text-blue-800 underline"
            >
                Back to Videos
            </Link>
        </div>
    );
} 
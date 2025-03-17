import { api } from '@/services/api';
import { News, Video } from '@/types';

// Por consistencia con el sitemap-news.xml
export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Obtener videos y noticias
        const videos = await api.getVideos();
        const articles = await api.getNews();

        // Filtrar el contenido más reciente
        // Usamos un período de 3 meses en lugar de solo 2 días
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

        const recentVideos = videos.filter(video => new Date(video.created_at) >= threeMonthsAgo);
        const recentArticles = articles.filter(article => new Date(article.created_at) >= threeMonthsAgo);

        // Combinar y ordenar por fecha (más reciente primero)
        const allContent = [...recentVideos, ...recentArticles].sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );

        // Limitar a un máximo de 1000 entradas (similar a lo que hace reduno.com.bo)
        const limitedContent = allContent.slice(0, 1000);

        // Generar el XML del sitemap
        const xml = generateSitemapXml(limitedContent);

        // Devolver la respuesta con el tipo de contenido correcto
        return new Response(xml, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 's-maxage=86400',
            },
        });
    } catch (error) {
        console.error('Error generando sitemap lite:', error);
        return new Response('Error generando sitemap lite', { status: 500 });
    }
}

function generateSitemapXml(content: (Video | News)[]): string {
    // Comenzar el documento XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Agregar cada elemento al sitemap
    content.forEach((item) => {
        const lastMod = new Date(item.created_at).toISOString();
        const isVideo = 'youtubeId' in item; // Forma de detectar si es un video o artículo

        const itemUrl = isVideo
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/videos/${item.category}/${item.slug}`
            : `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${item.category}/${item.slug}`;

        xml += '<url>\n';
        xml += `<loc>${itemUrl}</loc>\n`;
        xml += '<changefreq>always</changefreq>\n';
        xml += `<lastmod>${lastMod}</lastmod>\n`;
        xml += '<priority>0.5</priority>\n';
        xml += '</url>\n';
    });

    // Agregar las URLs de las páginas principales
    xml += '<url>\n';
    xml += `<loc>${process.env.NEXT_PUBLIC_BASE_URL}/</loc>\n`;
    xml += '<changefreq>daily</changefreq>\n';
    xml += `<lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += '<priority>1.0</priority>\n';
    xml += '</url>\n';

    xml += '<url>\n';
    xml += `<loc>${process.env.NEXT_PUBLIC_BASE_URL}/articles</loc>\n`;
    xml += '<changefreq>daily</changefreq>\n';
    xml += `<lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += '<priority>0.9</priority>\n';
    xml += '</url>\n';

    xml += '<url>\n';
    xml += `<loc>${process.env.NEXT_PUBLIC_BASE_URL}/videos</loc>\n`;
    xml += '<changefreq>daily</changefreq>\n';
    xml += `<lastmod>${new Date().toISOString()}</lastmod>\n`;
    xml += '<priority>0.9</priority>\n';
    xml += '</url>\n';

    // Cerrar el documento XML
    xml += '</urlset>';

    return xml;
} 
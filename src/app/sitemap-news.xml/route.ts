import { api } from '@/services/api';
import { News, Video } from '@/types';

// Forzar que esta ruta siempre sea dinámica
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    try {
        // Obtener videos y noticias
        const videos = await api.getVideos();
        const articles = await api.getNews();

        // Filtrar solo contenido de los últimos 2 días
        const twoDaysAgo = new Date();
        twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

        const recentVideos = videos.filter(video => new Date(video.created_at) >= twoDaysAgo);
        const recentArticles = articles.filter(article => new Date(article.created_at) >= twoDaysAgo);



        // Obtener el User-Agent para determinar si es un bot o un navegador
        const userAgent = request.headers.get('user-agent') || '';
        const isBot = userAgent.includes('Googlebot') ||
            userAgent.includes('bot') ||
            userAgent.includes('crawler');

        // Si es un bot, enviar XML, de lo contrario enviar HTML
        if (isBot) {
            const xml = generateNewsXml(recentVideos, recentArticles);
            return new Response(xml, {
                headers: {
                    'Content-Type': 'application/xml',
                    'Cache-Control': 's-maxage=86400',
                },
            });
        } else {
            // Para la visualización HTML, mostramos todo el contenido reciente
            // pero indicamos claramente qué aparece en el sitemap XML y qué no
            const html = generateNewsHtml(videos, articles, twoDaysAgo);

            return new Response(html, {
                headers: {
                    'Content-Type': 'text/html',
                    'Cache-Control': 's-maxage=86400',
                },
            });
        }
    } catch (error) {
        console.error('Error generando sitemap de noticias:', error);
        return new Response('Error generando sitemap de noticias', { status: 500 });
    }
}

function generateNewsXml(videos: Video[], articles: News[]): string {
    // Comenzar el documento XML con múltiples namespaces
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
    xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
    xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
    xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"\n';
    xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

    // Cuenta de entradas para asegurar que no excedamos las 1000
    let entryCount = 0;
    const maxEntries = 1000;

    // Primero agregar los videos al sitemap (hasta el límite)
    for (const video of videos) {
        if (entryCount >= maxEntries) break;

        const pubDate = new Date(video.created_at);
        const videoUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/videos/${video.category}/${video.slug}`;

        xml += '  <url>\n';
        xml += `    <loc>${videoUrl}</loc>\n`;

        // Extensión news para videos
        xml += '    <news:news>\n';
        xml += '      <news:publication>\n';
        xml += `        <news:name>${process.env.NEXT_PUBLIC_SITE_NAME || 'Mi Sitio de Noticias'}</news:name>\n`;
        xml += '        <news:language>es</news:language>\n';
        xml += '      </news:publication>\n';
        xml += `      <news:publication_date>${pubDate.toISOString()}</news:publication_date>\n`;
        xml += `      <news:title>${escapeXml(video.title)}</news:title>\n`;
        xml += `      <news:keywords>${video.category}</news:keywords>\n`;
        xml += '    </news:news>\n';

        // Extensión video para proporcionar más detalles del video
        xml += '    <video:video>\n';
        xml += `      <video:thumbnail_loc>${video.thumbnail}</video:thumbnail_loc>\n`;
        xml += `      <video:title>${escapeXml(video.title)}</video:title>\n`;
        xml += `      <video:description>${escapeXml(video.description)}</video:description>\n`;
        xml += `      <video:player_loc>${getVideoPlayerUrl(video)}</video:player_loc>\n`;
        xml += `      <video:duration>${getVideoDuration(video)}</video:duration>\n`;
        xml += `      <video:publication_date>${pubDate.toISOString()}</video:publication_date>\n`;
        xml += `      <video:family_friendly>yes</video:family_friendly>\n`;
        xml += `      <video:category>${escapeXml(video.category)}</video:category>\n`;
        xml += '    </video:video>\n';

        // Imagen de previsualización del video
        xml += '    <image:image>\n';
        xml += `      <image:loc>${video.thumbnail}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(video.title)}</image:title>\n`;
        xml += '    </image:image>\n';

        // Si tuviéramos versiones en otros idiomas, agregaríamos etiquetas hreflang
        // Por ejemplo:
        // xml += '    <xhtml:link rel="alternate" hreflang="en" href="https://en.example.com/video/..." />\n';

        xml += '  </url>\n';

        entryCount++;
    }

    // Luego agregar los artículos al sitemap (hasta el límite)
    for (const article of articles) {
        if (entryCount >= maxEntries) break;

        const pubDate = new Date(article.created_at);
        const articleUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${article.category}/${article.slug}`;

        xml += '  <url>\n';
        xml += `    <loc>${articleUrl}</loc>\n`;

        // Extensión news para artículos
        xml += '    <news:news>\n';
        xml += '      <news:publication>\n';
        xml += `        <news:name>${process.env.NEXT_PUBLIC_SITE_NAME || 'Mi Sitio de Noticias'}</news:name>\n`;
        xml += '        <news:language>es</news:language>\n';
        xml += '      </news:publication>\n';
        xml += `      <news:publication_date>${pubDate.toISOString()}</news:publication_date>\n`;
        xml += `      <news:title>${escapeXml(article.title)}</news:title>\n`;
        xml += `      <news:keywords>${article.category}</news:keywords>\n`;
        xml += '    </news:news>\n';

        // Imagen principal del artículo
        if (article.image) {
            xml += '    <image:image>\n';
            xml += `      <image:loc>${article.image}</image:loc>\n`;
            xml += `      <image:title>${escapeXml(article.title)}</image:title>\n`;
            xml += `      <image:caption>${escapeXml(article.excerpt)}</image:caption>\n`;
            xml += '    </image:image>\n';
        }

        // Si el artículo tiene un video asociado
        if (article.video && article.video.id) {
            xml += '    <video:video>\n';
            xml += `      <video:thumbnail_loc>${article.image}</video:thumbnail_loc>\n`;
            xml += `      <video:title>${escapeXml(article.video.title)}</video:title>\n`;
            xml += `      <video:description>${escapeXml(article.video.description || article.excerpt)}</video:description>\n`;
            xml += `      <video:player_loc>https://www.youtube.com/embed/${article.video.id}</video:player_loc>\n`;
            xml += `      <video:publication_date>${pubDate.toISOString()}</video:publication_date>\n`;
            xml += `      <video:family_friendly>yes</video:family_friendly>\n`;
            xml += `      <video:category>${escapeXml(article.category)}</video:category>\n`;
            xml += '    </video:video>\n';
        }

        // Si tuviéramos versiones en otros idiomas, agregaríamos etiquetas hreflang
        // Por ejemplo:
        // xml += '    <xhtml:link rel="alternate" hreflang="en" href="https://en.example.com/article/..." />\n';

        xml += '  </url>\n';

        entryCount++;
    }

    // Si no hay entradas recientes, agregar un comentario explicativo
    if (entryCount === 0) {
        xml += '  <!-- No hay contenido publicado en los últimos 2 días. -->\n';
    }

    // Cerrar el documento XML
    xml += '</urlset>';

    return xml;
}

// Función auxiliar para obtener la URL del reproductor de video
function getVideoPlayerUrl(video: Video): string {
    if (video.youtubeId) {
        return `https://www.youtube.com/embed/${video.youtubeId}`;
    } else if (video.url) {
        return video.url;
    }
    return `${process.env.NEXT_PUBLIC_BASE_URL}/video-player/${video.id}`;
}

// Función auxiliar para obtener la duración del video en segundos
function getVideoDuration(video: Video): number {
    if (video.duration) {
        // Convertir de formato "mm:ss" a segundos
        const parts = video.duration.split(':');
        if (parts.length === 2) {
            return parseInt(parts[0]) * 60 + parseInt(parts[1]);
        }
    }
    // Valor predeterminado si no hay duración disponible
    return 0;
}

function generateNewsHtml(allVideos: Video[], allArticles: News[], twoDaysAgo: Date): string {
    // Separar contenido reciente (incluido en el XML) del contenido más antiguo
    const recentVideos = allVideos.filter(video => new Date(video.created_at) >= twoDaysAgo);
    const recentArticles = allArticles.filter(article => new Date(article.created_at) >= twoDaysAgo);

    const olderVideos = allVideos.filter(video => new Date(video.created_at) < twoDaysAgo);
    const olderArticles = allArticles.filter(article => new Date(article.created_at) < twoDaysAgo);

    // Crear una tabla HTML similar a la de reduno.com.bo con los mismos namespaces
    let html = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:html="http://www.w3.org/TR/REC-html40" xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Google News Sitemap Feed</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1, h2 { color: #333; }
    table { border-collapse: collapse; width: 100%; margin-bottom: 30px; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    tr:nth-child(even) { background-color: #f9f9f9; }
    .video-row { background-color: #f0f8ff; }
    .article-row { }
    .older-content { opacity: 0.7; }
    .info-box { background-color: #f8f9fa; border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; border-radius: 4px; }
    .extensions-info { margin-top: 10px; font-size: 0.9em; color: #555; }
    a { color: #0066cc; text-decoration: none; }
    a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <h1>Google News Sitemap Feed</h1>
  
  <div class="info-box">
    <p><strong>Nota:</strong> Google News solo indexa contenido publicado en los últimos 2 días. 
    Solo el contenido mostrado en la primera tabla se incluye en el sitemap XML para Google News.</p>
    <p>Total de entradas en el sitemap XML: ${recentVideos.length + recentArticles.length} 
    (máximo permitido: 1,000)</p>
    <div class="extensions-info">
      <p><strong>Extensiones implementadas:</strong></p>
      <ul>
        <li><code>news:</code> - Información para Google News</li>
        <li><code>video:</code> - Metadatos detallados para videos</li>
        <li><code>image:</code> - Información sobre imágenes</li>
        <li><code>xhtml:</code> - Soporte para hreflang (cuando hay versiones en otros idiomas)</li>
      </ul>
    </div>
  </div>`;

    // Solo mostrar la sección de contenido reciente si hay alguno
    if (recentVideos.length > 0 || recentArticles.length > 0) {
        html += `
  <h2>Contenido de los últimos 2 días (incluido en el sitemap XML)</h2>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Type</th>
        <th>Language</th>
        <th>Access</th>
        <th>Genre(s)</th>
        <th>Keyword(s)</th>
        <th>Image(s)</th>
        <th>Publication Date (GMT)</th>
      </tr>
    </thead>
    <tbody>`;

        // Primero agregar videos recientes a la tabla
        recentVideos.forEach((video, index) => {
            const pubDate = new Date(video.created_at);
            const formattedDate = pubDate.toISOString().replace('T', ' ').substring(0, 19);
            const videoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/videos/${video.category}/${video.slug}`;

            html += `
      <tr class="video-row">
        <td>${index + 1}</td>
        <td><a href="${videoUrl}" target="_blank">${escapeHtml(video.title)}</a></td>
        <td>Video</td>
        <td>es</td>
        <td></td>
        <td>Blog</td>
        <td>${escapeHtml(video.category)}</td>
        <td>1</td>
        <td>${formattedDate}</td>
      </tr>`;
        });

        // Luego agregar artículos recientes a la tabla
        recentArticles.forEach((article, index) => {
            const pubDate = new Date(article.created_at);
            const formattedDate = pubDate.toISOString().replace('T', ' ').substring(0, 19);
            const articleUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/articles/${article.category}/${article.slug}`;

            html += `
      <tr class="article-row">
        <td>${recentVideos.length + index + 1}</td>
        <td><a href="${articleUrl}" target="_blank">${escapeHtml(article.title)}</a></td>
        <td>Artículo</td>
        <td>es</td>
        <td></td>
        <td>Blog</td>
        <td>${escapeHtml(article.category)}</td>
        <td>1</td>
        <td>${formattedDate}</td>
      </tr>`;
        });

        html += `
    </tbody>
  </table>`;
    } else {
        html += `
  <div class="info-box">
    <p>No hay contenido publicado en los últimos 2 días. El sitemap XML estará vacío hasta que se publique nuevo contenido.</p>
  </div>`;
    }

    // Mostrar contenido más antiguo en una tabla separada
    if (olderVideos.length > 0 || olderArticles.length > 0) {
        html += `
  <h2>Contenido más antiguo (no incluido en el sitemap XML)</h2>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Title</th>
        <th>Type</th>
        <th>Language</th>
        <th>Access</th>
        <th>Genre(s)</th>
        <th>Keyword(s)</th>
        <th>Image(s)</th>
        <th>Publication Date (GMT)</th>
      </tr>
    </thead>
    <tbody>`;

        // Primero agregar videos antiguos
        olderVideos.forEach((video, index) => {
            const pubDate = new Date(video.created_at);
            const formattedDate = pubDate.toISOString().replace('T', ' ').substring(0, 19);
            const videoUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/videos/${video.category}/${video.slug}`;

            html += `
      <tr class="video-row older-content">
        <td>${index + 1}</td>
        <td><a href="${videoUrl}" target="_blank">${escapeHtml(video.title)}</a></td>
        <td>Video</td>
        <td>es</td>
        <td></td>
        <td>Blog</td>
        <td>${escapeHtml(video.category)}</td>
        <td>1</td>
        <td>${formattedDate}</td>
      </tr>`;
        });

        // Luego agregar artículos antiguos
        olderArticles.forEach((article, index) => {
            const pubDate = new Date(article.created_at);
            const formattedDate = pubDate.toISOString().replace('T', ' ').substring(0, 19);
            const articleUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ''}/articles/${article.category}/${article.slug}`;

            html += `
      <tr class="article-row older-content">
        <td>${olderVideos.length + index + 1}</td>
        <td><a href="${articleUrl}" target="_blank">${escapeHtml(article.title)}</a></td>
        <td>Artículo</td>
        <td>es</td>
        <td></td>
        <td>Blog</td>
        <td>${escapeHtml(article.category)}</td>
        <td>1</td>
        <td>${formattedDate}</td>
      </tr>`;
        });

        html += `
    </tbody>
  </table>`;
    }

    html += `
</body>
</html>`;

    return html;
}

// Función para escapar caracteres especiales en XML
function escapeXml(unsafe: string): string {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

// Función para escapar caracteres especiales en HTML
function escapeHtml(unsafe: string): string {
    if (!unsafe) return '';
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
} 
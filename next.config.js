/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Configuraciones adicionales si las necesitas
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      };
    }
    return config;
  },
  images: {
    domains: ['api.motionsoundnews.com'], // Agrega aquí los dominios de tus imágenes
  }
}

module.exports = nextConfig

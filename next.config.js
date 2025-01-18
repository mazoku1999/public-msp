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
}

module.exports = nextConfig

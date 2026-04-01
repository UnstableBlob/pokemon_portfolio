/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/pokemon_portfolio',
  assetPrefix: '/pokemon_portfolio',
  trailingSlash: true,

  allowedDevOrigins: ['192.168.29.139'],
}

export default nextConfig;

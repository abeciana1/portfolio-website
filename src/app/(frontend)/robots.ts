import type { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/private/',
        '/admin/',
        '/api/',
        '/draft/',
        '/preview/',
        '/_next/',
        '/*?*utm_*',
        '/*?*session='
      ],
    },
    sitemap: 'https://alexbeciana.com/sitemap.xml',
    host: 'https://alexbeciana.com'
  }
}

export default robots
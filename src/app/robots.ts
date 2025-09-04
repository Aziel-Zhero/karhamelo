
import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Exemplo, se houver área privada
    },
    sitemap: 'https://karhamelo.app/sitemap.xml', // Substituir pela URL real
  }
}

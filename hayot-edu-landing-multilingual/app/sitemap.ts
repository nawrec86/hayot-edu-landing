import { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['en','ru','ky','kk'] as const;
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const routes = ['','/#services','/#partners','/#fcl','/#cases','/#contact'];
  const urls: MetadataRoute.Sitemap = [];
  for (const l of locales) {
    for (const r of routes) {
      urls.push({
        url: `${base}/${l}${r}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: r === '' ? 1 : 0.7
      });
    }
  }
  return urls;
}

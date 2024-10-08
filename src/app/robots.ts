import { getBaseUrl } from '@/utils/Helpers';
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/private'],  // Example: disallow sensitive sections
      },
    ],
    sitemap: `${getBaseUrl()}/sitemap`,  // Pointing to /sitemap instead of /sitemap.xml
    host: getBaseUrl(),  // Add your host for canonical purposes
  };
}

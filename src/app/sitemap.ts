import { getBaseUrl } from '@/utils/Helpers';
import type { MetadataRoute } from 'next';
import { getSitemap } from '@/utils/getSitemap'; // Use the dynamic sitemap generator
import { useTranslations } from 'next-intl';

// Generate the sitemap using the dynamically loaded sitemap entries
export default function sitemap(): MetadataRoute.Sitemap {
    const t = useTranslations('Sitemap');

    const baseUrl = getBaseUrl();
    const sitemapEntries = getSitemap(t); // Retrieves all pages from your sitemap utility

    // Construct the sitemap entries dynamically
    const sitemapRoutes = sitemapEntries.map(entry => ({
        url: `${baseUrl}${entry.link}`, // Dynamic URLs based on sitemap
        lastModified: new Date(),
        changeFrequency: 'daily' as 'daily',  // Correct typing for changeFrequency
        priority: 0.7,  // Default priority, can be adjusted per page
    }));

    // Return the home page with higher priority
    return [
        {
            url: `${baseUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'daily' as 'daily', // Correct typing for changeFrequency
            priority: 1.0,  // Home page gets a higher priority
        },
        ...sitemapRoutes,  // Spread all other routes
    ];
}

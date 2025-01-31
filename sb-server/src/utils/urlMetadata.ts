import axios from 'axios';
import * as cheerio from 'cheerio';

export interface URLMetadata {
  url: string;
  title: string;
  description: string;
  image: string;
  siteName: string;
  type: string;
  favicon: string;
}

export async function getURLMetadata(url: string): Promise<URLMetadata> {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Helper function to get meta content
    const getMeta = (property: string): string => {
      return (
        $(`meta[property="${property}"]`).attr('content') ||
        $(`meta[name="${property}"]`).attr('content') ||
        $(`meta[property="${property.replace('og:', 'twitter:')}"]`).attr('content') ||
        ''
      );
    };

    // Get favicon
    const favicon = $('link[rel="icon"]').attr('href') ||
                   $('link[rel="shortcut icon"]').attr('href') ||
                   '/favicon.ico';

    // Construct absolute favicon URL if relative
    const faviconUrl = favicon.startsWith('http') 
      ? favicon 
      : new URL(favicon, url).toString();

    const metadata: URLMetadata = {
      url,
      title: getMeta('og:title') || $('title').text() || '',
      description: getMeta('og:description') || getMeta('description') || '',
      image: getMeta('og:image') || '',
      siteName: getMeta('og:site_name') || '',
      type: getMeta('og:type') || 'website',
      favicon: faviconUrl,
    };

    // Clean up empty values
    Object.keys(metadata).forEach((key) => {
      if (metadata[key as keyof URLMetadata] === '') {
        metadata[key as keyof URLMetadata] = 'Not available';
      }
    });

    return metadata;
  } catch (error) {
    throw new Error(`Failed to fetch metadata: ${(error as Error).message}`);
  }
}
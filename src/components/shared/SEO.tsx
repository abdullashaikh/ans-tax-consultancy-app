import React, { useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const BASE_URL = 'https://anstaxconsultancy.com';
const DEFAULT_TITLE = 'ANS Tax Consultancy | Tax & Accounting Services in India & Dubai';
const DEFAULT_DESCRIPTION = 'ANS Tax Consultancy provides professional tax, GST, accounting and business consultancy services across India and Dubai.';
const DEFAULT_KEYWORDS = 'ANS Tax Consultancy, Tax Consultancy, Income Tax, GST, Accounting, Tax Filing, Business Consultancy, Dubai Tax Consultancy, India Tax Consultancy, Auditing, Virtual CFO';
const DEFAULT_IMAGE = `${BASE_URL}/logo.png`;

export const SEO: React.FC<SEOProps> = ({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalPath = '',
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  schema,
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to update or create meta tags
    const setMetaTag = (attributeName: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Primary Meta Tags
    setMetaTag('name', 'title', title);
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');

    // 3. Canonical URL
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = canonicalPath === '' ? `${BASE_URL}/` : `${BASE_URL}${cleanPath}`;
    
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Open Graph Tags
    setMetaTag('property', 'og:site_name', 'ANS Tax Consultancy');
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`);

    // 6. Dynamic JSON-LD Schema (if provided)
    const schemaScriptId = 'dynamic-route-schema';
    const existingScript = document.getElementById(schemaScriptId);
    if (existingScript) {
      existingScript.remove();
    }

    if (schema) {
      const script = document.createElement('script');
      script.id = schemaScriptId;
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      document.head.appendChild(script);
    }

    return () => {
      const activeDynamicSchema = document.getElementById(schemaScriptId);
      if (activeDynamicSchema) {
        activeDynamicSchema.remove();
      }
    };
  }, [title, description, keywords, canonicalPath, ogType, ogImage, schema]);

  return null;
};

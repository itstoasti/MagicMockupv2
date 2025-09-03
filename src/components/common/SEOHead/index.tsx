import React, { useEffect } from 'react';
import { BlogPost } from '../../../stores/blogStore';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  post?: BlogPost;
  publishedTime?: string;
  modifiedTime?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'Magic Mockup - Create Stunning Device Mockups & Design Assets',
  description = 'Create professional device mockups and design assets with our free online tools. Generate mockups, add text behind images with AI background removal.',
  keywords = 'mockup, device mockup, design tools, screenshot, text behind image, ai background removal',
  canonicalUrl,
  ogImage = '/images/og-default.png',
  ogType = 'website',
  post,
  publishedTime,
  modifiedTime
}) => {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!tag) {
        tag = document.createElement('meta');
        if (property) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      
      tag.content = content;
    };

    // Basic SEO meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    if (canonicalUrl) {
      let linkTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!linkTag) {
        linkTag = document.createElement('link');
        linkTag.rel = 'canonical';
        document.head.appendChild(linkTag);
      }
      linkTag.href = canonicalUrl;
    }

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:site_name', 'Magic Mockup', true);
    
    if (canonicalUrl) {
      updateMetaTag('og:url', canonicalUrl, true);
    }

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);

    // Article-specific tags for blog posts
    if (post && ogType === 'article') {
      updateMetaTag('article:author', post.author, true);
      updateMetaTag('article:published_time', post.publishDate, true);
      updateMetaTag('article:modified_time', post.lastModified, true);
      
      // Add article tags
      post.tags.forEach(tag => {
        const tagElement = document.createElement('meta');
        tagElement.setAttribute('property', 'article:tag');
        tagElement.content = tag;
        document.head.appendChild(tagElement);
      });
    }

    // JSON-LD structured data
    const addStructuredData = (data: any) => {
      let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (scriptTag) {
        scriptTag.remove();
      }
      
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      scriptTag.textContent = JSON.stringify(data);
      document.head.appendChild(scriptTag);
    };

    if (post && ogType === 'article') {
      // Blog post structured data
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt || description,
        "image": ogImage,
        "author": {
          "@type": "Organization",
          "name": post.author
        },
        "publisher": {
          "@type": "Organization",
          "name": "Magic Mockup",
          "logo": {
            "@type": "ImageObject",
            "url": "/favicon-32x32.png"
          }
        },
        "datePublished": post.publishDate,
        "dateModified": post.lastModified,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": canonicalUrl || window.location.href
        },
        "keywords": post.tags.join(', ')
      };
      addStructuredData(structuredData);
    } else {
      // Website structured data
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Magic Mockup",
        "url": "https://magicmockup.com",
        "description": "Create professional device mockups and design assets with our free online tools.",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://magicmockup.com/blog?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      };
      addStructuredData(structuredData);
    }

  }, [title, description, keywords, canonicalUrl, ogImage, ogType, post, publishedTime, modifiedTime]);

  return null; // This component doesn't render anything visible
};
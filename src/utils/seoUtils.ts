import { blogStore } from '../stores/blogStore';

export const generateSitemap = (): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://magicmockup.com';
  const currentDate = new Date().toISOString();
  
  // Get all published posts
  const publishedPosts = blogStore.getPublishedPosts();
  
  // Static pages
  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      url: `${baseUrl}/app`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/app/mockup`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/app/text-behind-image`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.8'
    },
    {
      url: `${baseUrl}/blog`,
      lastmod: publishedPosts.length > 0 ? publishedPosts[0].publishDate : currentDate,
      changefreq: 'weekly',
      priority: '0.9'
    }
  ];

  // Blog post pages
  const blogPages = publishedPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastmod: post.lastModified,
    changefreq: 'monthly',
    priority: '0.7'
  }));

  const allPages = [...staticPages, ...blogPages];

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
};

export const generateRobotsTxt = (): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://magicmockup.com';
  
  return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml

# Disallow admin areas
Disallow: /blog/admin

# Allow all other content
Allow: /blog/
Allow: /app/`;
};

export const downloadSitemap = () => {
  const sitemap = generateSitemap();
  const blob = new Blob([sitemap], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sitemap.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const downloadRobotsTxt = () => {
  const robotsTxt = generateRobotsTxt();
  const blob = new Blob([robotsTxt], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'robots.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const generateRSSFeed = (): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://magicmockup.com';
  const publishedPosts = blogStore.getPublishedPosts();
  const currentDate = new Date().toUTCString();

  const rssItems = publishedPosts.map(post => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.excerpt}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.publishDate).toUTCString()}</pubDate>
      <author>noreply@magicmockup.com (${post.author})</author>
      <category>${post.tags.join(', ')}</category>
    </item>`).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Magic Mockup Blog</title>
    <description>Design tips, tutorials, and insights for creating stunning mockups and visual content</description>
    <link>${baseUrl}/blog</link>
    <language>en-us</language>
    <lastBuildDate>${currentDate}</lastBuildDate>
    <generator>Magic Mockup RSS Generator</generator>
    <webMaster>noreply@magicmockup.com (Magic Mockup Team)</webMaster>
    <managingEditor>noreply@magicmockup.com (Magic Mockup Team)</managingEditor>
    <copyright>Copyright ${new Date().getFullYear()} Magic Mockup. All rights reserved.</copyright>
    <image>
      <url>${baseUrl}/favicon-192x192.png</url>
      <title>Magic Mockup Blog</title>
      <link>${baseUrl}/blog</link>
      <width>192</width>
      <height>192</height>
    </image>
${rssItems}
  </channel>
</rss>`;
};

export const downloadRSSFeed = () => {
  const rssFeed = generateRSSFeed();
  const blob = new Blob([rssFeed], { type: 'application/rss+xml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'rss.xml';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

// SEO analysis utility
export const analyzeSEO = (title: string, description: string, content: string) => {
  const issues: string[] = [];
  const recommendations: string[] = [];

  // Title analysis
  if (!title) {
    issues.push('Missing title');
  } else if (title.length < 30) {
    recommendations.push('Title could be longer (30-60 characters optimal)');
  } else if (title.length > 60) {
    issues.push('Title is too long (over 60 characters)');
  }

  // Description analysis
  if (!description) {
    issues.push('Missing meta description');
  } else if (description.length < 120) {
    recommendations.push('Meta description could be longer (120-160 characters optimal)');
  } else if (description.length > 160) {
    issues.push('Meta description is too long (over 160 characters)');
  }

  // Content analysis
  const wordCount = content.split(/\s+/).length;
  if (wordCount < 300) {
    recommendations.push('Content is quite short. Consider adding more detail (300+ words recommended for SEO)');
  }

  // Heading structure
  const hasH1 = content.includes('# ');
  const hasH2 = content.includes('## ');
  
  if (!hasH1) {
    issues.push('No H1 heading found in content');
  }
  if (!hasH2) {
    recommendations.push('Consider adding H2 headings to structure your content');
  }

  return {
    issues,
    recommendations,
    wordCount,
    titleLength: title.length,
    descriptionLength: description.length
  };
};
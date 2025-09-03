import React, { useEffect, useState } from 'react';
import { view } from '@risingstack/react-easy-state';
import { blogStore, BlogPost } from '../../../stores/blogStore';
import { Routes, routeStore } from '../../../stores/routeStore';
import { styles } from './styles';
import { SEOHead } from '../../common/SEOHead';
import { FaCalendar, FaClock, FaTag, FaArrowLeft, FaShareAlt } from 'react-icons/fa';
import { Breadcrumbs } from '../../common/Breadcrumbs';

export const BlogPostView = view(() => {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const slug = window.location.pathname.replace('/blog/', '');
        const foundPost = blogStore.getPostBySlug(slug);
        
        if (foundPost && foundPost.published) {
            setPost(foundPost);
        }
        
        setIsLoading(false);
    }, []);

    const handleShare = async () => {
        const url = window.location.href;
        const title = post?.title || 'Magic Mockup Blog Post';
        
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    url,
                    text: post?.excerpt
                });
            } catch (error) {
                // Fallback to clipboard
                copyToClipboard(url);
            }
        } else {
            copyToClipboard(url);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('Link copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Link copied to clipboard!');
        });
    };

    const renderMarkdown = (content: string) => {
        // Simple markdown rendering - in production, use a proper markdown parser
        return content
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
            .replace(/^- (.*$)/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
            .replace(/\n\n/g, '</p><p>')
            .replace(/^(?!<[h|u|l])/gm, '<p>')
            .replace(/(?<!>)$/gm, '</p>')
            .replace(/<p><\/p>/g, '');
    };

    if (isLoading) {
        return (
            <div className={styles()}>
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading post...</p>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className={styles()}>
                <div className="not-found-container">
                    <div className="not-found-content">
                        <h1>Post Not Found</h1>
                        <p>The blog post you're looking for doesn't exist or has been removed.</p>
                        <div className="not-found-actions">
                            <button 
                                onClick={() => routeStore.goToRoute(Routes.Blog)}
                                className="btn btn-primary"
                            >
                                <FaArrowLeft /> Back to Blog
                            </button>
                            <button 
                                onClick={() => routeStore.goToRoute(Routes.Home)}
                                className="btn btn-secondary"
                            >
                                Go to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles()}>
            <SEOHead
                title={post.metaTitle || `${post.title} - Magic Mockup Blog`}
                description={post.metaDescription || post.excerpt}
                keywords={`${post.tags.join(', ')}, mockup, design, tutorial`}
                canonicalUrl={`${window.location.origin}/blog/${post.slug}`}
                ogType="article"
                post={post}
            />
            {/* Header */}
            <header className="post-header">
                <div className="header-container">
                    <nav className="post-nav">
                        <button 
                            onClick={() => routeStore.goToRoute(Routes.Blog)}
                            className="nav-link"
                        >
                            <FaArrowLeft /> Back to Blog
                        </button>
                        <button onClick={handleShare} className="nav-link">
                            <FaShareAlt /> Share
                        </button>
                    </nav>
                </div>
            </header>

            {/* Article */}
            <main className="post-main">
                <article className="post-article">
                    <div className="article-container">
                        {/* Breadcrumbs */}
                        <Breadcrumbs 
                            items={[
                                { label: 'Home', route: Routes.Home },
                                { label: 'Blog', route: Routes.Blog },
                                { label: post.title, active: true }
                            ]}
                        />
                        {/* Article Header */}
                        <header className="article-header">
                            <div className="article-meta">
                                <span className="post-date">
                                    <FaCalendar />
                                    {new Date(post.publishDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                                <span className="reading-time">
                                    <FaClock />
                                    {post.readingTime} min read
                                </span>
                            </div>

                            <h1 className="article-title">{post.title}</h1>

                            {post.excerpt && (
                                <p className="article-excerpt">{post.excerpt}</p>
                            )}

                            {post.tags.length > 0 && (
                                <div className="article-tags">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="tag">
                                            <FaTag /> {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="article-author">
                                <span>By {post.author}</span>
                                {post.lastModified !== post.publishDate && (
                                    <span className="last-modified">
                                        Last updated: {new Date(post.lastModified).toLocaleDateString()}
                                    </span>
                                )}
                            </div>
                        </header>

                        {/* Article Content */}
                        <div className="article-content">
                            <div 
                                dangerouslySetInnerHTML={{ 
                                    __html: renderMarkdown(post.content) 
                                }}
                            />
                        </div>

                        {/* Article Footer */}
                        <footer className="article-footer">
                            <div className="footer-tags">
                                <h3>Tagged with:</h3>
                                <div className="tags-list">
                                    {post.tags.map(tag => (
                                        <span key={tag} className="tag">
                                            <FaTag /> {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="footer-actions">
                                <button onClick={handleShare} className="btn btn-primary">
                                    <FaShareAlt /> Share this post
                                </button>
                                <button 
                                    onClick={() => routeStore.goToRoute(Routes.Blog)}
                                    className="btn btn-secondary"
                                >
                                    <FaArrowLeft /> More posts
                                </button>
                            </div>
                        </footer>
                    </div>
                </article>
            </main>

            {/* Related Posts or CTA Section */}
            <section className="post-cta">
                <div className="cta-container">
                    <div className="cta-content">
                        <h2>Ready to create stunning mockups?</h2>
                        <p>Try our free tools to create professional device mockups and text-behind-image designs</p>
                        <div className="cta-actions">
                            <button 
                                onClick={() => routeStore.goToRoute(Routes.AppSelection)}
                                className="btn btn-primary"
                            >
                                Get Started
                            </button>
                            <button 
                                onClick={() => routeStore.goToRoute(Routes.Home)}
                                className="btn btn-secondary"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="post-footer">
                <div className="footer-container">
                    <div className="footer-content">
                        <div className="footer-brand">
                            <h3>Magic Mockup</h3>
                            <p>Create stunning mockups and design assets with our free tools</p>
                        </div>
                        <div className="footer-links">
                            <button onClick={() => routeStore.goToRoute(Routes.Home)}>
                                Home
                            </button>
                            <button onClick={() => routeStore.goToRoute(Routes.Blog)}>
                                Blog
                            </button>
                            <button onClick={() => routeStore.goToRoute(Routes.AppSelection)}>
                                Tools
                            </button>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} Magic Mockup. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
});
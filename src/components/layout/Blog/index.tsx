import React, { useState } from 'react';
import { view } from '@risingstack/react-easy-state';
import { blogStore } from '../../../stores/blogStore';
import { Routes, routeStore } from '../../../stores/routeStore';
import { styles } from './styles';
import { SEOHead } from '../../common/SEOHead';
import { FaSearch, FaTimes, FaCalendar, FaClock, FaTag, FaArrowRight } from 'react-icons/fa';
import { Breadcrumbs } from '../../common/Breadcrumbs';

export const Blog = view(() => {
    const [showSearch, setShowSearch] = useState(false);
    
    const handlePostClick = (slug: string) => {
        window.history.pushState(null, null, `/blog/${slug}`);
        routeStore.determineRoute();
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        blogStore.searchQuery = e.target.value;
    };

    const handleTagFilter = (tag: string) => {
        blogStore.selectedTag = blogStore.selectedTag === tag ? '' : tag;
    };

    const clearFilters = () => {
        blogStore.searchQuery = '';
        blogStore.selectedTag = '';
    };

    const posts = blogStore.getFilteredPosts();
    const allTags = blogStore.getAllTags();

    return (
        <div className={styles()}>
            <SEOHead
                title="Magic Mockup Blog - Design Tips, Tutorials & Insights"
                description="Discover design tutorials, tool updates, and creative inspiration on the Magic Mockup blog. Learn to create stunning mockups and design assets."
                keywords="design blog, mockup tutorials, design tips, ui design, graphic design, mockup tools"
                canonicalUrl={`${window.location.origin}/blog`}
                ogType="website"
            />
            {/* Hero Section */}
            <header className="blog-hero">
                <div className="hero-container">
                    <div className="hero-content">
                        <h1>Magic Mockup Blog</h1>
                        <p>Design tips, tutorials, and insights for creating stunning mockups and visual content</p>
                        
                        {/* Navigation */}
                        <nav className="blog-nav">
                            <button onClick={() => routeStore.goToRoute(Routes.Home)} className="nav-link">
                                ← Back to Home
                            </button>
                            <button 
                                onClick={() => setShowSearch(!showSearch)} 
                                className={`nav-link ${showSearch ? 'active' : ''}`}
                            >
                                <FaSearch /> Search
                            </button>
                        </nav>

                        {/* Search Bar */}
                        {showSearch && (
                            <div className="search-container">
                                <div className="search-bar">
                                    <FaSearch className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Search posts..."
                                        value={blogStore.searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                    {blogStore.searchQuery && (
                                        <button 
                                            onClick={() => blogStore.searchQuery = ''}
                                            className="clear-search"
                                        >
                                            <FaTimes />
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <main className="blog-main">
                <div className="blog-container">
                    {/* Breadcrumbs */}
                    <Breadcrumbs 
                        items={[
                            { label: 'Home', route: Routes.Home },
                            { label: 'Blog', active: true }
                        ]}
                    />
                    
                    {/* Blog Description for SEO */}
                    <div className="blog-description">
                        <p>Explore our collection of design tutorials, tool guides, and industry insights. Learn how to create professional mockups, master AI-powered design tools, and stay updated with the latest design trends.</p>
                    </div>
                    
                    {/* Tags Filter */}
                    {allTags.length > 0 && (
                        <div className="tags-filter">
                            <h3>Filter by topic:</h3>
                            <div className="tags-list">
                                {allTags.map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => handleTagFilter(tag)}
                                        className={`tag-filter ${blogStore.selectedTag === tag ? 'active' : ''}`}
                                    >
                                        <FaTag /> {tag}
                                    </button>
                                ))}
                            </div>
                            {(blogStore.searchQuery || blogStore.selectedTag) && (
                                <button onClick={clearFilters} className="clear-filters">
                                    Clear all filters
                                </button>
                            )}
                        </div>
                    )}

                    {/* Posts Grid */}
                    <div className="posts-section">
                        {(blogStore.searchQuery || blogStore.selectedTag) && (
                            <div className="filter-info">
                                <p>
                                    {posts.length} post{posts.length !== 1 ? 's' : ''} found
                                    {blogStore.searchQuery && ` for "${blogStore.searchQuery}"`}
                                    {blogStore.selectedTag && ` in "${blogStore.selectedTag}"`}
                                </p>
                            </div>
                        )}

                        {posts.length === 0 ? (
                            <div className="empty-state">
                                {blogStore.searchQuery || blogStore.selectedTag ? (
                                    <div>
                                        <h2>No posts found</h2>
                                        <p>Try adjusting your search or filters</p>
                                        <button onClick={clearFilters} className="btn btn-primary">
                                            Show all posts
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <h2>No blog posts yet</h2>
                                        <p>Check back soon for design tips and tutorials!</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="posts-grid">
                                {posts.map(post => (
                                    <article key={post.id} className="post-card">
                                        <div className="post-content">
                                            <div className="post-meta">
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

                                            <h2 className="post-title">
                                                <button 
                                                    onClick={() => handlePostClick(post.slug)}
                                                    className="post-link"
                                                >
                                                    {post.title}
                                                </button>
                                            </h2>

                                            <p className="post-excerpt">{post.excerpt}</p>

                                            {post.tags.length > 0 && (
                                                <div className="post-tags">
                                                    {post.tags.map(tag => (
                                                        <button
                                                            key={tag}
                                                            onClick={() => handleTagFilter(tag)}
                                                            className="tag"
                                                        >
                                                            {tag}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            <div className="post-footer">
                                                <span className="post-author">By {post.author}</span>
                                                <button 
                                                    onClick={() => handlePostClick(post.slug)}
                                                    className="read-more"
                                                >
                                                    Read more <FaArrowRight />
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="blog-footer">
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
                            <button onClick={() => routeStore.goToRoute(Routes.AppSelection)}>
                                Tools
                            </button>
                            <a href="/blog/admin" rel="nofollow">Admin</a>
                            <a href="#" onClick={(e) => {e.preventDefault(); import('../../../utils/seoUtils').then(({downloadRSSFeed}) => downloadRSSFeed());}} rel="nofollow">RSS Feed</a>
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
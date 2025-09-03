import React, { useState, useEffect } from 'react';
import { view } from '@risingstack/react-easy-state';
import { blogStore, BlogPost } from '../../../stores/blogStore';
import { Routes, routeStore } from '../../../stores/routeStore';
import { styles } from './styles';
import { downloadSitemap, downloadRobotsTxt, downloadRSSFeed, analyzeSEO } from '../../../utils/seoUtils';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaSave, FaArrowLeft, FaTimes, FaDownload, FaSearch } from 'react-icons/fa';

export const BlogAdmin = view(() => {
    const [password, setPassword] = useState('');
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [showEditor, setShowEditor] = useState(false);
    const [showSEOAnalysis, setShowSEOAnalysis] = useState(false);
    const [formData, setFormData] = useState<Partial<BlogPost>>({
        title: '',
        content: '',
        excerpt: '',
        tags: [],
        metaTitle: '',
        metaDescription: '',
        published: false
    });

    useEffect(() => {
        blogStore.checkAuthStatus();
        if (!blogStore.checkAuth()) {
            setShowLoginForm(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const success = await blogStore.login(password);
        if (success) {
            setShowLoginForm(false);
            setPassword('');
        } else {
            alert('Invalid password');
        }
    };

    const handleLogout = () => {
        blogStore.logout();
        setShowLoginForm(true);
        setEditingPost(null);
        setShowEditor(false);
    };

    const handleCreatePost = () => {
        setEditingPost(null);
        setFormData({
            title: '',
            content: '',
            excerpt: '',
            tags: [],
            metaTitle: '',
            metaDescription: '',
            published: false
        });
        setShowEditor(true);
    };

    const handleEditPost = (post: BlogPost) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            content: post.content,
            excerpt: post.excerpt,
            tags: post.tags,
            metaTitle: post.metaTitle,
            metaDescription: post.metaDescription,
            published: post.published
        });
        setShowEditor(true);
    };

    const handleSavePost = () => {
        if (!formData.title || !formData.content) {
            alert('Title and content are required');
            return;
        }

        const postData = {
            ...formData,
            author: 'Magic Mockup Team',
            slug: formData.slug || blogStore.generateSlug(formData.title!),
            tags: formData.tags || []
        } as Omit<BlogPost, 'id' | 'publishDate' | 'lastModified' | 'readingTime'>;

        if (editingPost) {
            blogStore.updatePost(editingPost.id, postData);
        } else {
            blogStore.createPost(postData);
        }

        setShowEditor(false);
        setEditingPost(null);
    };

    const handleDeletePost = (id: string) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            blogStore.deletePost(id);
        }
    };

    const handleTagsChange = (tagsString: string) => {
        const tags = tagsString.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        setFormData({ ...formData, tags });
    };

    if (showLoginForm) {
        return (
            <div className={styles()}>
                <div className="login-container">
                    <div className="login-card">
                        <h1>Blog Admin Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter admin password"
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </form>
                        <button 
                            onClick={() => routeStore.goToRoute(Routes.Home)}
                            className="btn btn-secondary"
                        >
                            <FaArrowLeft /> Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (showEditor) {
        return (
            <div className={styles()}>
                <div className="editor-container">
                    <div className="editor-header">
                        <h1>{editingPost ? 'Edit Post' : 'Create New Post'}</h1>
                        <div className="editor-actions">
                            <button onClick={handleSavePost} className="btn btn-primary">
                                <FaSave /> Save Post
                            </button>
                            <button 
                                onClick={() => setShowSEOAnalysis(!showSEOAnalysis)} 
                                className={`btn ${showSEOAnalysis ? 'btn-warning' : 'btn-info'}`}
                            >
                                <FaSearch /> SEO Analysis
                            </button>
                            <button onClick={() => setShowEditor(false)} className="btn btn-secondary">
                                <FaTimes /> Cancel
                            </button>
                        </div>
                    </div>

                    <div className="editor-form">
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="title">Title *</label>
                                <input
                                    type="text"
                                    id="title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    placeholder="Enter post title"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="slug">Slug</label>
                                <input
                                    type="text"
                                    id="slug"
                                    value={formData.slug || ''}
                                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                                    placeholder="Auto-generated from title"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="excerpt">Excerpt</label>
                            <textarea
                                id="excerpt"
                                value={formData.excerpt}
                                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                placeholder="Brief description of the post"
                                rows={3}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Content *</label>
                            <textarea
                                id="content"
                                value={formData.content}
                                onChange={(e) => setFormData({...formData, content: e.target.value})}
                                placeholder="Write your post content in Markdown"
                                rows={15}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="tags">Tags (comma separated)</label>
                                <input
                                    type="text"
                                    id="tags"
                                    value={formData.tags?.join(', ') || ''}
                                    onChange={(e) => handleTagsChange(e.target.value)}
                                    placeholder="design, mockups, tutorial"
                                />
                            </div>
                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={formData.published || false}
                                        onChange={(e) => setFormData({...formData, published: e.target.checked})}
                                    />
                                    Published
                                </label>
                            </div>
                        </div>

                        <div className="seo-section">
                            <h3>SEO Settings</h3>
                            <div className="form-group">
                                <label htmlFor="metaTitle">Meta Title</label>
                                <input
                                    type="text"
                                    id="metaTitle"
                                    value={formData.metaTitle || ''}
                                    onChange={(e) => setFormData({...formData, metaTitle: e.target.value})}
                                    placeholder="SEO title (defaults to post title)"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="metaDescription">Meta Description</label>
                                <textarea
                                    id="metaDescription"
                                    value={formData.metaDescription || ''}
                                    onChange={(e) => setFormData({...formData, metaDescription: e.target.value})}
                                    placeholder="SEO description (defaults to excerpt)"
                                    rows={3}
                                />
                            </div>
                        </div>

                        {/* SEO Analysis Panel */}
                        {showSEOAnalysis && (
                            <div className="seo-analysis">
                                <h3>SEO Analysis</h3>
                                {(() => {
                                    const analysis = analyzeSEO(
                                        formData.metaTitle || formData.title || '',
                                        formData.metaDescription || formData.excerpt || '',
                                        formData.content || ''
                                    );
                                    
                                    return (
                                        <div className="analysis-results">
                                            <div className="analysis-stats">
                                                <span>Words: {analysis.wordCount}</span>
                                                <span>Title: {analysis.titleLength} chars</span>
                                                <span>Description: {analysis.descriptionLength} chars</span>
                                            </div>
                                            
                                            {analysis.issues.length > 0 && (
                                                <div className="analysis-issues">
                                                    <h4>⚠️ Issues to Fix:</h4>
                                                    <ul>
                                                        {analysis.issues.map((issue, i) => (
                                                            <li key={i} className="issue">{issue}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            
                                            {analysis.recommendations.length > 0 && (
                                                <div className="analysis-recommendations">
                                                    <h4>💡 Recommendations:</h4>
                                                    <ul>
                                                        {analysis.recommendations.map((rec, i) => (
                                                            <li key={i} className="recommendation">{rec}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                            
                                            {analysis.issues.length === 0 && analysis.recommendations.length === 0 && (
                                                <div className="analysis-success">
                                                    <h4>✅ SEO looks good!</h4>
                                                    <p>No major issues found. Your post is SEO-ready.</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })()}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles()}>
            <div className="admin-container">
                <div className="admin-header">
                    <h1>Blog Administration</h1>
                    <div className="admin-actions">
                        <button onClick={handleCreatePost} className="btn btn-primary">
                            <FaPlus /> New Post
                        </button>
                        <button onClick={() => routeStore.goToRoute(Routes.Blog)} className="btn btn-secondary">
                            <FaEye /> View Blog
                        </button>
                        <button onClick={downloadSitemap} className="btn btn-info">
                            <FaDownload /> Sitemap
                        </button>
                        <button onClick={downloadRobotsTxt} className="btn btn-info">
                            <FaDownload /> Robots.txt
                        </button>
                        <button onClick={downloadRSSFeed} className="btn btn-info">
                            <FaDownload /> RSS Feed
                        </button>
                        <button onClick={handleLogout} className="btn btn-danger">
                            Logout
                        </button>
                    </div>
                </div>

                <div className="posts-list">
                    <h2>All Posts ({blogStore.getAllPosts().length})</h2>
                    {blogStore.getAllPosts().length === 0 ? (
                        <div className="empty-state">
                            <p>No posts yet. Create your first blog post!</p>
                        </div>
                    ) : (
                        <div className="posts-grid">
                            {blogStore.getAllPosts().map(post => (
                                <div key={post.id} className="post-card">
                                    <div className="post-status">
                                        {post.published ? (
                                            <span className="status published"><FaEye /> Published</span>
                                        ) : (
                                            <span className="status draft"><FaEyeSlash /> Draft</span>
                                        )}
                                    </div>
                                    <h3>{post.title}</h3>
                                    <p className="post-excerpt">{post.excerpt}</p>
                                    <div className="post-meta">
                                        <span>Published: {new Date(post.publishDate).toLocaleDateString()}</span>
                                        <span>{post.readingTime} min read</span>
                                    </div>
                                    <div className="post-tags">
                                        {post.tags.map(tag => (
                                            <span key={tag} className="tag">{tag}</span>
                                        ))}
                                    </div>
                                    <div className="post-actions">
                                        <button onClick={() => handleEditPost(post)} className="btn btn-sm btn-primary">
                                            <FaEdit /> Edit
                                        </button>
                                        <button onClick={() => handleDeletePost(post.id)} className="btn btn-sm btn-danger">
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
});
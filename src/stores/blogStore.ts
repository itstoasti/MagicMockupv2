import {store} from "@risingstack/react-easy-state";

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    author: string;
    publishDate: string;
    lastModified: string;
    tags: string[];
    metaTitle?: string;
    metaDescription?: string;
    published: boolean;
    readingTime: number;
}

interface IBlogStore {
    posts: BlogPost[];
    isAuthenticated: boolean;
    isLoading: boolean;
    currentPost: BlogPost | null;
    searchQuery: string;
    selectedTag: string;
    
    // Auth methods
    login(password: string): Promise<boolean>;
    logout(): void;
    checkAuth(): boolean;
    checkAuthStatus(): void;
    
    // Post methods
    getAllPosts(): BlogPost[];
    getPublishedPosts(): BlogPost[];
    getPostBySlug(slug: string): BlogPost | null;
    createPost(post: Omit<BlogPost, 'id' | 'publishDate' | 'lastModified' | 'readingTime'>): void;
    updatePost(id: string, updates: Partial<BlogPost>): void;
    deletePost(id: string): void;
    
    // Utility methods
    generateSlug(title: string): string;
    calculateReadingTime(content: string): number;
    getFilteredPosts(): BlogPost[];
    getAllTags(): string[];
    savePosts(): void;
    loadPosts(): void;
    initializeSampleData(): void;
}

export const blogStore = store({
    posts: [] as BlogPost[],
    isAuthenticated: false,
    isLoading: false,
    currentPost: null,
    searchQuery: "",
    selectedTag: "",
    
    async login(password: string): Promise<boolean> {
        // For development, use local authentication
        if (process.env.NODE_ENV === 'development') {
            if (password === 'dev_admin_123') {
                blogStore.isAuthenticated = true;
                const authData = {
                    authenticated: true,
                    token: 'dev-token',
                    expires: Date.now() + (24 * 60 * 60 * 1000)
                };
                localStorage.setItem('blog_auth', JSON.stringify(authData));
                return true;
            }
            return false;
        }

        // For production, use API authentication
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                const data = await response.json();
                blogStore.isAuthenticated = true;
                
                const authData = {
                    authenticated: true,
                    token: data.token,
                    expires: data.expires
                };
                localStorage.setItem('blog_auth', JSON.stringify(authData));
                return true;
            }
            return false;
        } catch (error) {
            console.error('Authentication error:', error);
            return false;
        }
    },
    
    logout(): void {
        blogStore.isAuthenticated = false;
        localStorage.removeItem('blog_auth');
    },
    
    checkAuthStatus(): void {
        const authData = localStorage.getItem('blog_auth');
        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                if (parsed.expires && Date.now() < parsed.expires && parsed.token) {
                    blogStore.isAuthenticated = true;
                } else {
                    // Session expired
                    blogStore.logout();
                }
            } catch (e) {
                // Invalid auth data, clear it
                blogStore.logout();
            }
        }
    },
    
    checkAuth(): boolean {
        if (!blogStore.isAuthenticated) {
            const authStatus = localStorage.getItem('blog_auth');
            blogStore.isAuthenticated = authStatus === 'true';
        }
        return blogStore.isAuthenticated;
    },
    
    getAllPosts(): BlogPost[] {
        return blogStore.posts.sort((a, b) => 
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
    },
    
    getPublishedPosts(): BlogPost[] {
        return blogStore.posts
            .filter(post => post.published)
            .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    },
    
    getPostBySlug(slug: string): BlogPost | null {
        return blogStore.posts.find(post => post.slug === slug) || null;
    },
    
    createPost(postData: Omit<BlogPost, 'id' | 'publishDate' | 'lastModified' | 'readingTime'>): void {
        const now = new Date().toISOString();
        const post: BlogPost = {
            ...postData,
            id: Date.now().toString(),
            publishDate: now,
            lastModified: now,
            readingTime: blogStore.calculateReadingTime(postData.content),
            slug: postData.slug || blogStore.generateSlug(postData.title)
        };
        
        blogStore.posts.push(post);
        blogStore.savePosts();
    },
    
    updatePost(id: string, updates: Partial<BlogPost>): void {
        const index = blogStore.posts.findIndex(post => post.id === id);
        if (index !== -1) {
            const updatedPost = {
                ...blogStore.posts[index],
                ...updates,
                lastModified: new Date().toISOString(),
            };
            
            // Recalculate reading time if content changed
            if (updates.content) {
                updatedPost.readingTime = blogStore.calculateReadingTime(updates.content);
            }
            
            blogStore.posts[index] = updatedPost;
            blogStore.savePosts();
        }
    },
    
    deletePost(id: string): void {
        blogStore.posts = blogStore.posts.filter(post => post.id !== id);
        blogStore.savePosts();
    },
    
    generateSlug(title: string): string {
        return title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    },
    
    calculateReadingTime(content: string): number {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    },
    
    getFilteredPosts(): BlogPost[] {
        let posts = blogStore.getPublishedPosts();
        
        if (blogStore.searchQuery) {
            const query = blogStore.searchQuery.toLowerCase();
            posts = posts.filter(post => 
                post.title.toLowerCase().includes(query) ||
                post.content.toLowerCase().includes(query) ||
                post.excerpt.toLowerCase().includes(query)
            );
        }
        
        if (blogStore.selectedTag) {
            posts = posts.filter(post => 
                post.tags.includes(blogStore.selectedTag)
            );
        }
        
        return posts;
    },
    
    getAllTags(): string[] {
        const tags = new Set<string>();
        blogStore.getPublishedPosts().forEach(post => {
            post.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    },
    
    savePosts(): void {
        localStorage.setItem('blog_posts', JSON.stringify(blogStore.posts));
    },
    
    loadPosts(): void {
        const saved = localStorage.getItem('blog_posts');
        if (saved) {
            try {
                blogStore.posts = JSON.parse(saved);
            } catch (error) {
                console.error('Error loading blog posts:', error);
                blogStore.posts = [];
            }
        }
    },
    
    // Initialize with sample post if no posts exist
    initializeSampleData(): void {
        if (blogStore.posts.length === 0) {
            const samplePost: BlogPost = {
                id: "1",
                title: "Welcome to Magic Mockup Blog",
                slug: "welcome-to-magic-mockup-blog",
                content: `# Welcome to Magic Mockup Blog

We're excited to launch our new blog where we'll share tips, tutorials, and insights about creating stunning mockups and design assets.

## What You'll Find Here

- **Design tutorials** - Learn how to create professional mockups
- **Tool updates** - Stay updated with new features and improvements  
- **Design inspiration** - Discover creative ways to use our tools
- **Industry insights** - Keep up with design trends and best practices

## Getting Started

Our Magic Mockup tools make it easy to:

1. Create device mockups from screenshots
2. Add text behind images with AI-powered background removal
3. Export high-quality images for your projects

Stay tuned for more content coming soon!`,
                excerpt: "Welcome to our new blog! We'll be sharing design tips, tutorials, and insights about creating stunning mockups and design assets.",
                author: "Magic Mockup Team",
                publishDate: new Date().toISOString(),
                lastModified: new Date().toISOString(),
                tags: ["announcement", "design", "mockups"],
                metaTitle: "Welcome to Magic Mockup Blog - Design Tips & Tutorials",
                metaDescription: "Discover design tutorials, tool updates, and creative inspiration on the Magic Mockup blog. Learn to create stunning mockups and design assets.",
                published: true,
                readingTime: 2
            };
            
            blogStore.posts.push(samplePost);
            blogStore.savePosts();
        }
    }
    
} as IBlogStore);

// Initialize data on load
blogStore.loadPosts();
blogStore.initializeSampleData();
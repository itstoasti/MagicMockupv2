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
            if (password === 'hello2893') {
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
            const samplePosts: BlogPost[] = [
                {
                    id: "1",
                    title: "How to Create Professional Device Mockups in 2024: Complete Guide",
                    slug: "how-to-create-professional-device-mockups-2024-guide",
                    content: `# How to Create Professional Device Mockups in 2024: Complete Guide

Device mockups have become an essential part of modern design workflows. Whether you're showcasing an app, presenting a website design, or creating marketing materials, professional mockups can make your work stand out and communicate your vision effectively.

## Why Device Mockups Matter for Your Design Portfolio

In today's competitive design landscape, presentation is everything. A well-crafted mockup can transform a simple screenshot into a compelling visual story that resonates with clients and stakeholders.

### Benefits of Using Device Mockups

- **Professional presentation** - Transform screenshots into polished visuals
- **Client communication** - Help clients visualize the final product
- **Marketing materials** - Create stunning visuals for social media and websites
- **Portfolio enhancement** - Showcase your work in realistic contexts
- **Time efficiency** - Quick way to present multiple design variations

## Step-by-Step Guide to Creating Device Mockups

### 1. Choose the Right Device Frame

The device you choose should match your target audience and use case. Popular options include:

- **iPhone mockups** - Perfect for mobile app presentations
- **MacBook mockups** - Ideal for web design and desktop applications
- **iPad mockups** - Great for tablet-optimized experiences
- **Android device mockups** - Essential for cross-platform apps

### 2. Prepare Your Screenshots

Before creating mockups, ensure your screenshots are:

- High resolution (at least 2x the display size)
- Properly cropped to device dimensions
- Free of personal information or placeholder content
- Consistent in terms of lighting and color

### 3. Use Professional Mockup Tools

**Free Options:**
- Magic Mockup (our free online tool)
- Figma mockup plugins
- Canva device frames

**Premium Options:**
- Sketch mockup libraries
- Adobe XD mockup templates
- Specialized mockup generators

### 4. Customize Your Presentation

Make your mockups stand out by:

- Adding realistic shadows and reflections
- Choosing appropriate background colors or textures
- Maintaining consistent lighting across multiple devices
- Including contextual elements (hands, desk setup, etc.)

## Best Practices for Device Mockups

### Design Consistency

Maintain visual consistency across all your mockups by using:

- Similar lighting conditions
- Consistent color schemes
- Uniform spacing and alignment
- Matching perspective angles

### Technical Considerations

- **Resolution**: Use high-DPI mockups for crisp presentation
- **File formats**: PNG for transparency, JPG for smaller file sizes
- **Color profiles**: Ensure consistent color reproduction across devices
- **Accessibility**: Consider how mockups appear to users with different visual needs

### Common Mistakes to Avoid

1. **Using low-resolution source images**
2. **Inconsistent lighting or shadows**
3. **Overcrowding with too many devices**
4. **Ignoring the target platform's design guidelines**
5. **Using outdated device models**

## Advanced Mockup Techniques

### Interactive Mockups

Create more engaging presentations by:

- Adding hover states and interactions
- Showing user flow across multiple screens
- Including micro-animations and transitions
- Demonstrating responsive behavior

### Context-Aware Mockups

Place your designs in realistic environments:

- Office settings for B2B applications
- Casual environments for consumer apps
- Industry-specific contexts (medical, education, etc.)
- Lifestyle scenarios that match your target audience

## Tools and Resources

### Free Mockup Resources

- **Magic Mockup**: Free online device mockup generator
- **Mockup World**: Curated collection of free mockups
- **Freepik**: Large library of mockup templates
- **Unsplash**: High-quality background images

### Design Inspiration

- **Dribbble**: Professional design showcases
- **Behance**: Portfolio presentations and case studies
- **Mobbin**: Mobile app design inspiration
- **Page Flows**: User flow examples and mockups

## Conclusion

Creating professional device mockups is both an art and a science. By following these guidelines and best practices, you can create compelling presentations that effectively communicate your design vision and impress clients.

Remember that the best mockup is one that serves your specific presentation goals while maintaining visual appeal and technical quality. Experiment with different styles and techniques to find what works best for your projects.

Ready to create your first professional mockup? Try our free Magic Mockup tool and transform your screenshots into stunning presentations today.

## Next Steps

- Download our free mockup templates
- Check out our [text-behind-image tool](/app/text-behind-image) for creative presentations
- Follow us for more design tips and tutorials
- Share your mockup creations on social media using #MagicMockup`,
                    excerpt: "Learn how to create professional device mockups that impress clients and enhance your design portfolio. Complete guide with best practices, tools, and step-by-step instructions for 2024.",
                    author: "Magic Mockup Team",
                    publishDate: new Date().toISOString(),
                    lastModified: new Date().toISOString(),
                    tags: ["mockups", "design", "tutorial", "guide", "portfolio"],
                    metaTitle: "How to Create Professional Device Mockups in 2024 - Complete Guide",
                    metaDescription: "Master device mockups with our comprehensive 2024 guide. Learn best practices, tools, and techniques to create stunning presentations that impress clients.",
                    published: true,
                    readingTime: 8
                },
                {
                    id: "2", 
                    title: "AI-Powered Background Removal: Transform Your Design Workflow",
                    slug: "ai-background-removal-design-workflow",
                    content: `# AI-Powered Background Removal: Transform Your Design Workflow

Artificial intelligence has revolutionized many aspects of design, and background removal is no exception. What once required hours of meticulous work in Photoshop can now be accomplished in seconds with AI-powered tools.

## The Evolution of Background Removal

### Traditional Methods vs AI

**Traditional Photoshop Methods:**
- Manual selection with pen tool (15-30 minutes per image)
- Magic wand and quick selection tools (5-15 minutes)
- Refine edge techniques for complex subjects
- High skill requirement and learning curve

**AI-Powered Solutions:**
- Automatic subject detection (5-10 seconds)
- Smart edge refinement
- Batch processing capabilities
- No technical expertise required

## How AI Background Removal Works

### Machine Learning Models

Modern AI background removal uses sophisticated neural networks trained on millions of images to:

1. **Object Detection** - Identify main subjects in images
2. **Edge Detection** - Precisely trace subject boundaries
3. **Semantic Segmentation** - Understand image context and depth
4. **Refinement Processing** - Clean up edges and handle complex areas

### Key Technologies

- **U-Net Architecture** - Specialized for image segmentation
- **DeepLab Models** - Google's semantic segmentation technology
- **Mask R-CNN** - Instance segmentation for multiple objects
- **Mobile-Optimized Models** - Fast processing on any device

## Creative Applications for Designers

### Marketing Materials

Transform your marketing visuals by:

- Creating clean product photography
- Removing distracting backgrounds from team photos
- Preparing images for different brand contexts
- Building consistent visual libraries

### Social Media Content

Enhance your social media presence with:

- Custom branded backgrounds for posts
- Consistent aesthetic across platforms
- Quick content creation and adaptation
- Professional-looking graphics without photoshoots

### E-commerce Photography

Improve product presentations by:

- Creating white background product shots
- Maintaining consistency across product catalogs
- Reducing photography costs and time
- Enabling easy background variations

### Design Projects

Streamline design workflows with:

- Clean assets for mockups and presentations
- Flexible image manipulation without quality loss
- Quick iterations and A/B testing variants
- Seamless integration with design tools

## Best Practices for AI Background Removal

### Input Image Quality

For optimal results, use images that have:

- **Good contrast** between subject and background
- **Sufficient resolution** (at least 1000px on longest side)
- **Clear subject definition** without excessive blur
- **Minimal background complexity** when possible

### Subject Types That Work Best

AI excels with:

- People and portraits
- Products with clear edges
- Animals and pets
- Objects with defined boundaries

### Challenging Scenarios

Be aware of limitations with:

- Transparent or glass objects
- Hair with complex backgrounds
- Fine details like fur or fabric textures
- Low contrast or similar colors

## Professional Workflow Integration

### Design Software Integration

Most AI background removal tools integrate with:

- **Adobe Creative Suite** - Plugins and extensions
- **Figma** - Direct API integrations
- **Canva** - Built-in AI-powered tools
- **Sketch** - Third-party plugin ecosystem

### Batch Processing

Maximize efficiency by:

- Processing multiple images simultaneously
- Setting up automated workflows
- Using API integrations for large projects
- Maintaining consistent settings across batches

### Quality Control

Maintain professional standards through:

- Manual review of AI-processed images
- Touch-up editing for critical projects
- A/B testing different AI models
- Feedback loops for continuous improvement

## The Future of AI in Design

### Emerging Capabilities

Next-generation AI will bring:

- **Real-time processing** in design software
- **3D-aware background removal** for complex scenes
- **Style-aware replacements** that match lighting and perspective
- **Video background removal** with temporal consistency

### Impact on Design Industry

AI background removal is changing how designers:

- Allocate time and resources
- Approach creative projects
- Collaborate with clients and teams
- Price design services

## Getting Started with AI Background Removal

### Free Tools to Try

- **Magic Mockup Text Behind Image** - Our free AI-powered tool
- **Remove.bg** - Popular web-based solution
- **Canva Background Remover** - Integrated design platform
- **Photoshop AI** - Built into Creative Cloud

### Pro Tips for Success

1. **Start with high-quality source images**
2. **Learn when to use AI vs manual techniques**
3. **Keep original files for future edits**
4. **Experiment with different AI models**
5. **Combine AI processing with manual refinement**

## Conclusion

AI-powered background removal has democratized professional-quality image editing, making sophisticated techniques accessible to designers of all skill levels. By understanding how to leverage these tools effectively, you can dramatically improve your workflow efficiency while maintaining creative control.

The key is knowing when and how to use AI as part of a broader design strategy, rather than relying on it exclusively. Combine AI efficiency with human creativity to achieve the best results for your projects.

Ready to experience the power of AI background removal? Try our free text-behind-image tool and see how quickly you can transform your images.`,
                    excerpt: "Discover how AI-powered background removal is revolutionizing design workflows. Learn best practices, applications, and tips for integrating AI tools into your creative process.",
                    author: "Sarah Chen, UX Designer",
                    publishDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
                    lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                    tags: ["ai", "background-removal", "design-tools", "workflow", "automation"],
                    metaTitle: "AI Background Removal: Transform Your Design Workflow in 2024",
                    metaDescription: "Learn how AI-powered background removal tools are revolutionizing design workflows. Best practices, applications, and tips for creative professionals.",
                    published: true,
                    readingTime: 6
                }
            ];
            
            samplePosts.forEach(post => {
                blogStore.posts.push(post);
            });
            
            blogStore.savePosts();
        }
    }
    
} as IBlogStore);

// Initialize data on load
blogStore.loadPosts();
blogStore.initializeSampleData();
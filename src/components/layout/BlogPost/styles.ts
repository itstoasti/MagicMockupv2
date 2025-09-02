import { css } from "emotion";

export const styles = () => {
    return css`
        min-height: 100vh;
        background: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        line-height: 1.7;

        // Loading and error states
        .loading-container, .not-found-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            text-align: center;
            color: #6b7280;

            .loading-spinner {
                width: 40px;
                height: 40px;
                border: 3px solid #f3f4f6;
                border-top: 3px solid #4f46e5;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin-bottom: 1rem;
            }

            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        }

        .not-found-content {
            max-width: 500px;
            padding: 2rem;

            h1 {
                color: #1f2937;
                font-size: 2rem;
                font-weight: 700;
                margin-bottom: 1rem;
            }

            p {
                font-size: 1.1rem;
                margin-bottom: 2rem;
                line-height: 1.6;
            }

            .not-found-actions {
                display: flex;
                gap: 1rem;
                justify-content: center;

                @media (max-width: 480px) {
                    flex-direction: column;
                }
            }
        }

        // Header
        .post-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 1.5rem 0;

            .header-container {
                max-width: 800px;
                margin: 0 auto;
                padding: 0 2rem;
            }

            .post-nav {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .nav-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    background: rgba(255, 255, 255, 0.1);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50px;
                    color: white;
                    text-decoration: none;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.3s ease;

                    &:hover {
                        background: rgba(255, 255, 255, 0.2);
                        transform: translateY(-2px);
                    }
                }

                @media (max-width: 480px) {
                    flex-direction: column;
                    gap: 1rem;
                }
            }
        }

        // Main Article
        .post-main {
            padding: 3rem 0;
        }

        .article-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        // Article Header
        .article-header {
            margin-bottom: 3rem;
            text-align: center;

            .article-meta {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 2rem;
                margin-bottom: 2rem;
                font-size: 0.9rem;
                color: #6b7280;

                span {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                @media (max-width: 480px) {
                    flex-direction: column;
                    gap: 1rem;
                }
            }

            .article-title {
                font-size: 2.5rem;
                font-weight: 800;
                color: #1f2937;
                margin-bottom: 1rem;
                line-height: 1.2;

                @media (max-width: 768px) {
                    font-size: 2rem;
                }

                @media (max-width: 480px) {
                    font-size: 1.75rem;
                }
            }

            .article-excerpt {
                font-size: 1.2rem;
                color: #6b7280;
                margin-bottom: 2rem;
                line-height: 1.6;
                font-style: italic;

                @media (max-width: 768px) {
                    font-size: 1.1rem;
                }
            }

            .article-tags {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 0.75rem;
                margin-bottom: 2rem;

                .tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: linear-gradient(135deg, #4f46e5, #7c3aed);
                    color: white;
                    border-radius: 50px;
                    font-size: 0.85rem;
                    font-weight: 500;
                }
            }

            .article-author {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;
                padding-top: 1rem;
                border-top: 1px solid #e5e7eb;
                font-size: 0.9rem;
                color: #6b7280;

                .last-modified {
                    font-size: 0.8rem;
                    opacity: 0.8;
                }

                @media (max-width: 480px) {
                    flex-direction: column;
                    gap: 0.5rem;
                }
            }
        }

        // Article Content
        .article-content {
            margin-bottom: 3rem;

            h1, h2, h3, h4, h5, h6 {
                color: #1f2937;
                font-weight: 700;
                margin: 2rem 0 1rem 0;
                line-height: 1.3;
            }

            h1 {
                font-size: 2rem;
                border-bottom: 2px solid #e5e7eb;
                padding-bottom: 0.5rem;

                @media (max-width: 768px) {
                    font-size: 1.75rem;
                }
            }

            h2 {
                font-size: 1.5rem;

                @media (max-width: 768px) {
                    font-size: 1.3rem;
                }
            }

            h3 {
                font-size: 1.25rem;

                @media (max-width: 768px) {
                    font-size: 1.15rem;
                }
            }

            p {
                color: #374151;
                margin-bottom: 1.5rem;
                font-size: 1.1rem;
                line-height: 1.8;

                @media (max-width: 768px) {
                    font-size: 1rem;
                }
            }

            ul, ol {
                margin-bottom: 1.5rem;
                padding-left: 2rem;

                li {
                    color: #374151;
                    margin-bottom: 0.5rem;
                    font-size: 1.1rem;
                    line-height: 1.7;

                    @media (max-width: 768px) {
                        font-size: 1rem;
                    }
                }
            }

            strong {
                font-weight: 600;
                color: #1f2937;
            }

            em {
                font-style: italic;
                color: #6b7280;
            }

            a {
                color: #4f46e5;
                text-decoration: underline;
                transition: color 0.2s ease;

                &:hover {
                    color: #4338ca;
                }
            }

            blockquote {
                border-left: 4px solid #4f46e5;
                background: #f8fafc;
                padding: 1rem 1.5rem;
                margin: 2rem 0;
                border-radius: 0 8px 8px 0;

                p {
                    margin-bottom: 0;
                    font-style: italic;
                    color: #4b5563;
                }
            }

            code {
                background: #f1f5f9;
                padding: 0.2rem 0.5rem;
                border-radius: 4px;
                font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
                font-size: 0.9rem;
                color: #1f2937;
            }

            pre {
                background: #1f2937;
                color: #f8fafc;
                padding: 1.5rem;
                border-radius: 8px;
                overflow-x: auto;
                margin: 2rem 0;

                code {
                    background: none;
                    padding: 0;
                    color: inherit;
                    font-size: 0.9rem;
                }
            }
        }

        // Article Footer
        .article-footer {
            padding-top: 2rem;
            border-top: 2px solid #e5e7eb;

            .footer-tags {
                margin-bottom: 2rem;

                h3 {
                    color: #1f2937;
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 1rem;
                }

                .tags-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.75rem;

                    .tag {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.5rem;
                        padding: 0.5rem 1rem;
                        background: #f3f4f6;
                        color: #6b7280;
                        border-radius: 50px;
                        font-size: 0.85rem;
                        font-weight: 500;
                    }
                }
            }

            .footer-actions {
                display: flex;
                justify-content: center;
                gap: 1rem;

                @media (max-width: 480px) {
                    flex-direction: column;
                }
            }
        }

        // CTA Section
        .post-cta {
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            color: white;
            padding: 4rem 0;
            text-align: center;

            .cta-container {
                max-width: 800px;
                margin: 0 auto;
                padding: 0 2rem;
            }

            .cta-content {
                h2 {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 1rem;

                    @media (max-width: 768px) {
                        font-size: 1.75rem;
                    }
                }

                p {
                    font-size: 1.2rem;
                    opacity: 0.9;
                    margin-bottom: 2rem;
                    line-height: 1.6;

                    @media (max-width: 768px) {
                        font-size: 1.1rem;
                    }
                }

                .cta-actions {
                    display: flex;
                    justify-content: center;
                    gap: 1rem;

                    @media (max-width: 480px) {
                        flex-direction: column;
                        align-items: center;
                    }
                }
            }
        }

        // Footer
        .post-footer {
            background: #1f2937;
            color: white;
            padding: 3rem 0 2rem;

            .footer-container {
                max-width: 800px;
                margin: 0 auto;
                padding: 0 2rem;
            }

            .footer-content {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 2rem;

                @media (max-width: 768px) {
                    flex-direction: column;
                    gap: 2rem;
                    text-align: center;
                }

                .footer-brand {
                    max-width: 400px;

                    h3 {
                        font-size: 1.5rem;
                        font-weight: 700;
                        margin-bottom: 0.5rem;
                        background: linear-gradient(135deg, #4f46e5, #7c3aed);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }

                    p {
                        color: #9ca3af;
                        line-height: 1.6;
                        margin: 0;
                    }
                }

                .footer-links {
                    display: flex;
                    gap: 2rem;
                    align-items: center;

                    @media (max-width: 768px) {
                        justify-content: center;
                        flex-wrap: wrap;
                    }

                    button {
                        color: #d1d5db;
                        background: none;
                        border: none;
                        cursor: pointer;
                        font-size: 1rem;
                        font-family: inherit;
                        transition: color 0.2s ease;

                        &:hover {
                            color: white;
                        }
                    }
                }
            }

            .footer-bottom {
                text-align: center;
                padding-top: 2rem;
                border-top: 1px solid #374151;

                p {
                    color: #9ca3af;
                    font-size: 0.9rem;
                    margin: 0;
                }
            }
        }

        // Button styles
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.9rem;
            font-family: inherit;

            &:hover {
                transform: translateY(-2px);
            }

            &.btn-primary {
                background: linear-gradient(135deg, #4f46e5, #7c3aed);
                color: white;

                &:hover {
                    background: linear-gradient(135deg, #4338ca, #6d28d9);
                    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
                }
            }

            &.btn-secondary {
                background: #f3f4f6;
                color: #6b7280;

                &:hover {
                    background: #e5e7eb;
                    color: #374151;
                }
            }

            @media (max-width: 480px) {
                width: 100%;
                justify-content: center;
            }
        }
    `;
};
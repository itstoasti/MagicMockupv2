import { css } from "emotion";

export const styles = () => {
    return css`
        min-height: 100vh;
        background: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;

        // Hero Section
        .blog-hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 4rem 0;
            text-align: center;

            .hero-container {
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 2rem;
            }

            .hero-content {
                h1 {
                    font-size: 3rem;
                    font-weight: 800;
                    margin: 0 0 1rem 0;
                    line-height: 1.2;

                    @media (max-width: 768px) {
                        font-size: 2.5rem;
                    }
                }

                p {
                    font-size: 1.25rem;
                    opacity: 0.9;
                    margin-bottom: 2rem;
                    line-height: 1.6;

                    @media (max-width: 768px) {
                        font-size: 1.1rem;
                    }
                }
            }

            .blog-nav {
                display: flex;
                justify-content: center;
                gap: 1rem;
                margin-bottom: 2rem;

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

                    &:hover, &.active {
                        background: rgba(255, 255, 255, 0.2);
                        transform: translateY(-2px);
                    }
                }

                @media (max-width: 768px) {
                    flex-direction: column;
                    align-items: center;
                }
            }

            .search-container {
                margin-top: 1rem;
                display: flex;
                justify-content: center;

                .search-bar {
                    position: relative;
                    max-width: 400px;
                    width: 100%;

                    .search-icon {
                        position: absolute;
                        left: 1rem;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #6b7280;
                        z-index: 1;
                    }

                    input {
                        width: 100%;
                        padding: 0.75rem 1rem 0.75rem 2.5rem;
                        border: 1px solid rgba(255, 255, 255, 0.3);
                        border-radius: 50px;
                        background: rgba(255, 255, 255, 0.9);
                        color: #1f2937;
                        font-size: 1rem;
                        box-sizing: border-box;

                        &::placeholder {
                            color: #6b7280;
                        }

                        &:focus {
                            outline: none;
                            background: white;
                            box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
                        }
                    }

                    .clear-search {
                        position: absolute;
                        right: 1rem;
                        top: 50%;
                        transform: translateY(-50%);
                        background: none;
                        border: none;
                        color: #6b7280;
                        cursor: pointer;
                        padding: 0.25rem;

                        &:hover {
                            color: #374151;
                        }
                    }
                }
            }
        }

        // Main Content
        .blog-main {
            padding: 3rem 0;
        }

        .blog-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        // Tags Filter
        .tags-filter {
            margin-bottom: 3rem;
            text-align: center;

            h3 {
                color: #1f2937;
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 1rem;
            }

            .tags-list {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 0.75rem;
                margin-bottom: 1rem;

                .tag-filter {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: #f3f4f6;
                    border: 1px solid #e5e7eb;
                    border-radius: 50px;
                    color: #6b7280;
                    font-size: 0.9rem;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;

                    &:hover {
                        background: #e5e7eb;
                        color: #374151;
                    }

                    &.active {
                        background: linear-gradient(135deg, #4f46e5, #7c3aed);
                        color: white;
                        border-color: transparent;
                    }
                }
            }

            .clear-filters {
                padding: 0.5rem 1rem;
                background: #ef4444;
                color: white;
                border: none;
                border-radius: 50px;
                font-size: 0.9rem;
                cursor: pointer;
                transition: all 0.2s ease;

                &:hover {
                    background: #dc2626;
                }
            }
        }

        // Posts Section
        .posts-section {
            .filter-info {
                text-align: center;
                margin-bottom: 2rem;
                color: #6b7280;
                font-size: 1rem;
            }
        }

        .empty-state {
            text-align: center;
            padding: 4rem 2rem;
            color: #6b7280;

            h2 {
                color: #1f2937;
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: 1rem;
            }

            p {
                font-size: 1.1rem;
                margin-bottom: 2rem;
                line-height: 1.6;
            }
        }

        .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;

            @media (max-width: 768px) {
                grid-template-columns: 1fr;
                gap: 1.5rem;
            }
        }

        // Post Cards
        .post-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            transition: all 0.3s ease;

            &:hover {
                transform: translateY(-4px);
                box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
            }

            .post-content {
                padding: 2rem;
            }

            .post-meta {
                display: flex;
                align-items: center;
                gap: 1.5rem;
                margin-bottom: 1rem;
                font-size: 0.85rem;
                color: #6b7280;

                span {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                @media (max-width: 480px) {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 0.5rem;
                }
            }

            .post-title {
                margin: 0 0 1rem 0;

                .post-link {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: #1f2937;
                    text-decoration: none;
                    line-height: 1.3;
                    cursor: pointer;
                    background: none;
                    border: none;
                    text-align: left;
                    padding: 0;
                    font-family: inherit;

                    &:hover {
                        color: #4f46e5;
                    }
                }
            }

            .post-excerpt {
                color: #6b7280;
                line-height: 1.6;
                margin-bottom: 1.5rem;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .post-tags {
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;
                margin-bottom: 1.5rem;

                .tag {
                    padding: 0.25rem 0.75rem;
                    background: #f3f4f6;
                    color: #6b7280;
                    font-size: 0.8rem;
                    font-weight: 500;
                    border-radius: 20px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    border: none;

                    &:hover {
                        background: #e5e7eb;
                        color: #374151;
                    }
                }
            }

            .post-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 1rem;
                border-top: 1px solid #f3f4f6;

                .post-author {
                    font-size: 0.9rem;
                    color: #6b7280;
                    font-weight: 500;
                }

                .read-more {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #4f46e5;
                    font-size: 0.9rem;
                    font-weight: 600;
                    text-decoration: none;
                    cursor: pointer;
                    background: none;
                    border: none;
                    transition: all 0.2s ease;

                    &:hover {
                        color: #4338ca;
                        transform: translateX(2px);
                    }
                }

                @media (max-width: 480px) {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 1rem;
                }
            }
        }

        // Footer
        .blog-footer {
            background: #1f2937;
            color: white;
            padding: 3rem 0 2rem;
            margin-top: 4rem;

            .footer-container {
                max-width: 1200px;
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

                    button, a {
                        color: #d1d5db;
                        text-decoration: none;
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

            &.btn-primary {
                background: linear-gradient(135deg, #4f46e5, #7c3aed);
                color: white;

                &:hover {
                    background: linear-gradient(135deg, #4338ca, #6d28d9);
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.4);
                }
            }
        }
    `;
};
import { css } from "emotion";

export const styles = () => {
    return css`
        min-height: 100vh;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;

        // Login styles
        .login-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 2rem;
        }

        .login-card {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 400px;
            text-align: center;

            h1 {
                color: #1f2937;
                margin-bottom: 2rem;
                font-size: 1.5rem;
                font-weight: 700;
            }
        }

        // Admin container styles
        .admin-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }

        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #e5e7eb;

            h1 {
                color: #1f2937;
                font-size: 2rem;
                font-weight: 800;
                margin: 0;
            }

            .admin-actions {
                display: flex;
                gap: 1rem;
            }
        }

        // Editor styles
        .editor-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
        }

        .editor-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding-bottom: 1rem;
            border-bottom: 2px solid #e5e7eb;

            h1 {
                color: #1f2937;
                font-size: 1.8rem;
                font-weight: 700;
                margin: 0;
            }

            .editor-actions {
                display: flex;
                gap: 1rem;
            }
        }

        // Form styles
        .editor-form {
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .form-group {
            margin-bottom: 1.5rem;

            label {
                display: block;
                margin-bottom: 0.5rem;
                font-weight: 600;
                color: #374151;
                font-size: 0.9rem;
            }

            input, textarea {
                width: 100%;
                padding: 0.75rem;
                border: 1px solid #d1d5db;
                border-radius: 8px;
                font-size: 0.9rem;
                transition: border-color 0.2s ease;
                font-family: inherit;
                box-sizing: border-box;

                &:focus {
                    outline: none;
                    border-color: #4f46e5;
                    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
                }
            }

            textarea {
                resize: vertical;
                min-height: 100px;
            }
        }

        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;

            @media (max-width: 768px) {
                grid-template-columns: 1fr;
            }
        }

        .checkbox-label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            margin-top: 1.5rem;

            input[type="checkbox"] {
                width: auto;
            }
        }

        .seo-section {
            margin-top: 2rem;
            padding-top: 2rem;
            border-top: 1px solid #e5e7eb;

            h3 {
                color: #1f2937;
                font-size: 1.2rem;
                font-weight: 600;
                margin-bottom: 1rem;
            }
        }

        // Posts list styles
        .posts-list {
            h2 {
                color: #1f2937;
                font-size: 1.5rem;
                font-weight: 700;
                margin-bottom: 1.5rem;
            }
        }

        .empty-state {
            text-align: center;
            padding: 3rem;
            color: #6b7280;
            font-size: 1.1rem;
        }

        .posts-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 1.5rem;
        }

        .post-card {
            background: white;
            border-radius: 12px;
            padding: 1.5rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border: 1px solid #e5e7eb;
            transition: transform 0.2s ease, box-shadow 0.2s ease;

            &:hover {
                transform: translateY(-2px);
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
            }

            h3 {
                color: #1f2937;
                font-size: 1.2rem;
                font-weight: 700;
                margin: 0 0 0.75rem 0;
                line-height: 1.4;
            }

            .post-excerpt {
                color: #6b7280;
                line-height: 1.5;
                margin-bottom: 1rem;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }

            .post-meta {
                display: flex;
                justify-content: space-between;
                font-size: 0.85rem;
                color: #9ca3af;
                margin-bottom: 1rem;
            }

            .post-tags {
                margin-bottom: 1rem;
                display: flex;
                flex-wrap: wrap;
                gap: 0.5rem;

                .tag {
                    background: #f3f4f6;
                    color: #6b7280;
                    padding: 0.25rem 0.75rem;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: 500;
                }
            }

            .post-actions {
                display: flex;
                gap: 0.5rem;
                justify-content: flex-end;
            }
        }

        .post-status {
            margin-bottom: 1rem;

            .status {
                display: inline-flex;
                align-items: center;
                gap: 0.5rem;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.8rem;
                font-weight: 600;

                &.published {
                    background: #d1fae5;
                    color: #065f46;
                }

                &.draft {
                    background: #fef3c7;
                    color: #92400e;
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
                transform: translateY(-1px);
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

            &.btn-danger {
                background: #ef4444;
                color: white;

                &:hover {
                    background: #dc2626;
                    box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4);
                }
            }

            &.btn-sm {
                padding: 0.5rem 1rem;
                font-size: 0.8rem;
            }
        }

        // Responsive design
        @media (max-width: 768px) {
            .admin-container, .editor-container {
                padding: 1rem;
            }

            .admin-header {
                flex-direction: column;
                gap: 1rem;
                align-items: stretch;

                .admin-actions {
                    justify-content: center;
                }
            }

            .editor-header {
                flex-direction: column;
                gap: 1rem;
                align-items: stretch;

                .editor-actions {
                    justify-content: center;
                }
            }

            .posts-grid {
                grid-template-columns: 1fr;
            }

            .post-card {
                .post-meta {
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .post-actions {
                    justify-content: center;
                }
            }

            .btn {
                justify-content: center;
                width: 100%;
            }

            .admin-actions .btn,
            .editor-actions .btn {
                flex: 1;
            }
        }
    `;
};
import {css} from "emotion";

export const styles = () => {
    return css`
        display: flex;
        flex-direction: column;
        height: 100vh;
        background: #f8fafc;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            background: white;
            border-bottom: 1px solid #e2e8f0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

            .header-left {
                display: flex;
                align-items: center;
                gap: 1rem;

                .back-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: #f1f5f9;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-size: 0.875rem;
                    color: #64748b;

                    &:hover {
                        background: #e2e8f0;
                        color: #475569;
                    }
                }

                h1 {
                    margin: 0;
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #0f172a;
                }
            }

            .header-right {
                display: flex;
                gap: 1rem;

                .upload-button, .save-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.2s ease;
                }

                .upload-button {
                    background: #4f46e5;
                    color: white;

                    &:hover {
                        background: #4338ca;
                        transform: translateY(-1px);
                    }
                }

                .save-button {
                    background: #10b981;
                    color: white;

                    &:hover {
                        background: #059669;
                        transform: translateY(-1px);
                    }
                }
            }
        }

        .main-content {
            display: flex;
            flex: 1;
            overflow: hidden;
        }

        .upload-area {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            flex: 1;
            padding: 2rem;
            gap: 2rem;

            .dropzone {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                max-width: 600px;
                height: 400px;
                border: 2px dashed #d1d5db;
                border-radius: 12px;
                background: white;
                cursor: pointer;
                transition: all 0.3s ease;

                &:hover, &.active {
                    border-color: #4f46e5;
                    background: #fafbff;
                }

                .upload-icon {
                    font-size: 3rem;
                    color: #9ca3af;
                    margin-bottom: 1rem;
                }

                h2 {
                    margin: 0 0 0.5rem 0;
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #374151;
                }

                p {
                    margin: 0;
                    color: #6b7280;
                }

                small {
                    color: #9ca3af;
                    font-size: 0.875rem;
                    margin-top: 0.5rem;
                }
            }

            .info-banner {
                border-radius: 8px;
                padding: 1.5rem;
                max-width: 600px;
                width: 100%;

                &.success {
                    background: #d1fae5;
                    border: 1px solid #10b981;

                    h3, p, ul {
                        color: #064e3b;
                    }
                }

                h3 {
                    margin: 0 0 1rem 0;
                    font-size: 1.25rem;
                    font-weight: 600;
                }

                p {
                    margin: 0 0 0.5rem 0;
                    line-height: 1.5;

                    strong {
                        font-weight: 600;
                    }
                }

                ul {
                    margin: 1rem 0 0 0;
                    padding-left: 1.5rem;

                    li {
                        margin-bottom: 0.5rem;
                        line-height: 1.4;

                        code {
                            background: #fed7aa;
                            padding: 0.125rem 0.375rem;
                            border-radius: 4px;
                            font-family: 'Courier New', monospace;
                            font-size: 0.875rem;
                        }
                    }
                }
            }
        }

        .canvas-area {
            flex: 2;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            background: #f8fafc;

            .image-container {
                position: relative;
                max-width: 100%;
                max-height: 100%;
                border-radius: 12px;
                overflow: hidden;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);

                .background-image, .foreground-image {
                    display: block;
                    max-width: 100%;
                    max-height: 70vh;
                    object-fit: contain;
                }

                .foreground-image {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                .processing-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10;

                    .processing-content {
                        text-align: center;
                        
                        .processing-spinner {
                            width: 40px;
                            height: 40px;
                            border: 4px solid rgba(255, 255, 255, 0.3);
                            border-top: 4px solid #10b981;
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                            margin: 0 auto 1rem auto;
                        }

                        h3 {
                            margin: 0 0 0.5rem 0;
                            font-size: 1.25rem;
                            font-weight: 600;
                        }

                        p {
                            margin: 0;
                            opacity: 0.8;
                            font-size: 0.875rem;
                        }
                    }
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                .text-overlay {
                    text-align: center;
                    white-space: nowrap;
                    z-index: 5;
                    border: 2px solid transparent;
                    border-radius: 4px;
                    min-width: 50px;
                    min-height: 30px;

                    &.selected {
                        border-color: #4f46e5;
                        background: rgba(79, 70, 229, 0.1);
                    }

                    &:hover {
                        border-color: #94a3b8;
                    }
                }
            }
        }

        .controls-area {
            flex: 1;
            background: white;
            border-left: 1px solid #e2e8f0;
            display: flex;
            flex-direction: column;
            max-width: 350px;

            .text-sets-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #e2e8f0;

                h3 {
                    margin: 0;
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #0f172a;
                }

                .add-text-button {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    background: #4f46e5;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                    font-size: 0.875rem;
                    font-weight: 500;
                    transition: all 0.2s ease;

                    &:hover {
                        background: #4338ca;
                    }
                }
            }

            .text-sets {
                flex: 1;
                overflow-y: auto;
                max-height: 300px;

                .text-set-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #f1f5f9;
                    cursor: pointer;
                    transition: all 0.2s ease;

                    &:hover {
                        background: #f8fafc;
                    }

                    &.selected {
                        background: #eff6ff;
                        border-left: 3px solid #4f46e5;
                    }

                    .text-set-preview {
                        flex: 1;
                        
                        span {
                            font-size: 0.875rem;
                            max-width: 150px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            display: block;
                        }
                    }

                    .text-set-actions {
                        display: flex;
                        gap: 0.5rem;

                        button {
                            padding: 0.25rem;
                            background: none;
                            border: none;
                            cursor: pointer;
                            color: #64748b;
                            border-radius: 4px;
                            transition: all 0.2s ease;

                            &:hover {
                                background: #f1f5f9;
                                color: #374151;
                            }
                        }
                    }
                }
            }

            .text-controls {
                padding: 1.5rem;
                border-top: 1px solid #e2e8f0;
                overflow-y: auto;

                h4 {
                    margin: 0 0 1rem 0;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #0f172a;
                }

                .control-group {
                    margin-bottom: 1rem;

                    label {
                        display: block;
                        margin-bottom: 0.5rem;
                        font-size: 0.875rem;
                        font-weight: 500;
                        color: #374151;
                    }

                    input[type="text"] {
                        width: 100%;
                        padding: 0.5rem;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                        font-size: 0.875rem;

                        &:focus {
                            outline: none;
                            border-color: #4f46e5;
                        }
                    }

                    input[type="range"] {
                        width: 100%;
                        margin-bottom: 0.25rem;
                    }

                    input[type="color"] {
                        width: 100%;
                        height: 40px;
                        border: 1px solid #d1d5db;
                        border-radius: 6px;
                        cursor: pointer;
                    }

                    span {
                        font-size: 0.75rem;
                        color: #6b7280;
                    }
                }
            }
        }

        @media (max-width: 768px) {
            .header {
                padding: 1rem;
                flex-direction: column;
                gap: 1rem;

                .header-left, .header-right {
                    width: 100%;
                    justify-content: center;
                }
            }

            .main-content {
                flex-direction: column;
            }

            .canvas-area {
                padding: 1rem;
            }

            .controls-area {
                max-width: none;
                border-left: none;
                border-top: 1px solid #e2e8f0;
            }
        }
    `;
};
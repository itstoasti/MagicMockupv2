import {css} from "emotion";

export const styles = () => {
    return css`
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            backdrop-filter: blur(4px);
        }

        .modal-content {
            background: #ffffff;
            border-radius: 16px;
            max-width: 800px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 2rem 1rem 2rem;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);

            h2 {
                font-size: 2rem;
                font-weight: 700;
                margin: 0;
                background: linear-gradient(135deg, #4f46e5, #7c3aed);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }

            .close-button {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #64748b;
                padding: 0.5rem;
                border-radius: 8px;
                transition: all 0.2s ease;

                &:hover {
                    background: rgba(0, 0, 0, 0.05);
                    color: #0f172a;
                }
            }
        }

        .feature-options {
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .feature-option {
            display: flex;
            align-items: center;
            gap: 1.5rem;
            padding: 2rem;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: #ffffff;

            &:hover {
                border-color: #4f46e5;
                box-shadow: 0 8px 25px rgba(79, 70, 229, 0.15);
                transform: translateY(-2px);
            }

            .feature-icon {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 80px;
                height: 80px;
                border-radius: 16px;
                background: linear-gradient(135deg, #4f46e5, #7c3aed);
                color: white;
                font-size: 2rem;
                position: relative;
                flex-shrink: 0;

                svg:first-of-type {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }

                svg:nth-of-type(2) {
                    position: absolute;
                    top: 60%;
                    left: 60%;
                    transform: translate(-50%, -50%);
                    font-size: 1.2rem;
                    opacity: 0.8;
                }
            }

            .feature-info {
                flex: 1;

                h3 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin: 0 0 0.5rem 0;
                    color: #0f172a;
                }

                p {
                    color: #64748b;
                    margin: 0 0 1rem 0;
                    line-height: 1.6;
                }

                .feature-highlights {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;

                    span {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        font-size: 0.875rem;
                        color: #4f46e5;
                        background: rgba(79, 70, 229, 0.1);
                        padding: 0.25rem 0.75rem;
                        border-radius: 20px;
                        font-weight: 500;

                        svg {
                            font-size: 0.75rem;
                        }
                    }
                }
            }

            .feature-action {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 48px;
                height: 48px;
                border-radius: 12px;
                background: #4f46e5;
                color: white;
                font-size: 1.25rem;
                transition: all 0.3s ease;
                flex-shrink: 0;
            }

            &:hover .feature-action {
                transform: translateX(4px);
            }
        }

        @media (max-width: 768px) {
            .modal-content {
                width: 95%;
                margin: 1rem;
            }

            .modal-header {
                padding: 1.5rem 1.5rem 1rem 1.5rem;

                h2 {
                    font-size: 1.5rem;
                }
            }

            .feature-options {
                padding: 1.5rem;
                gap: 1rem;
            }

            .feature-option {
                flex-direction: column;
                text-align: center;
                padding: 1.5rem;

                .feature-icon {
                    width: 60px;
                    height: 60px;
                    font-size: 1.5rem;
                }

                .feature-highlights {
                    justify-content: center;
                }

                .feature-action {
                    align-self: stretch;
                    margin-top: 1rem;
                }
            }
        }
    `;
};
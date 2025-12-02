import {view} from "@risingstack/react-easy-state";
import React, {useEffect, useCallback} from "react";
import {styles} from "./styles";
import {FaGithub, FaCheck, FaStar, FaDownload, FaPalette, FaMobile, FaDesktop, FaRocket, FaArrowRight, FaPlay, FaImage, FaBolt, FaHeart, FaFont} from "react-icons/all";
import {checkForImageFromLocalstorageUrlOrPaste} from "../../../utils/image";
import {ImageSelector} from "../../common/ImageSelector";
import {useDropzone} from "react-dropzone";
import {app} from "../../../stores/appStore";
import {Routes, routeStore} from "../../../stores/routeStore";

export const Homepage = view(() => {
    useEffect(() => checkForImageFromLocalstorageUrlOrPaste(), []);
    

    const onDrop = useCallback(files => {
        if (files && files[0]) {
            const file = files[0];
            const isVideo = file.type.startsWith('video/');
            
            if (isVideo) {
                const videoUrl = URL.createObjectURL(file);
                app.setVideoData(videoUrl);
            } else {
                const fileReader = new FileReader();
                fileReader.addEventListener('load', e => {
                    app.setImageData(e.target.result as string);
                });
                fileReader.readAsDataURL(file);
            }
            // Navigate to app selection after image upload
            routeStore.goToRoute(Routes.AppSelection);
        }
    }, []);

    const {getRootProps: getPreviewRootProps, getInputProps: getPreviewInputProps, isDragActive: isPreviewDragActive} = useDropzone({
        onDrop, 
        accept: 'image/*,video/*'
    });



    return (
        <>
            <div className={styles()}>
                {/* Navigation */}
                <nav className="nav">
                    <div className="nav-container">
                        <div className="nav-logo">
                            <h1 className="brand-title">MagicMockup.xyz</h1>
                        </div>
                        <div className="nav-right">
                            <div className="nav-links">
                                <span style={{visibility: 'hidden'}}>Placeholder</span>
                                <span style={{visibility: 'hidden'}}>Placeholder</span>
                                <a href="#features">Features</a>
                            </div>
                            <button onClick={() => routeStore.goToRoute(Routes.AppSelection)} className="nav-app">Open App</button>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="hero">
                    <div className="hero-container">
                        <div className="hero-content">
                            <div className="hero-badge">
                                <FaBolt className="badge-icon" />
                                <span>Create stunning designs instantly</span>
                            </div>
                            <h1>Create <span className="gradient-text">stunning mockups</span> and<br/><span className="gradient-text">text-behind-image</span><br/>designs</h1>
                            <p>Transform screenshots into professional device mockups or create eye-catching text-behind-image designs. Two powerful tools, one seamless experience. No downloads, no signups required.</p>
                            
                            {/* Mobile-only showcase image */}
                            <div className="mobile-showcase-image">
                                <img src="/images/mm-mrr.png" alt="MRR Dashboard Preview" />
                            </div>
                            
                            <div className="hero-actions">
                                <div className="hero-upload">
                                    <div {...getPreviewRootProps()} className={`preview-window ${isPreviewDragActive ? 'drag-active' : ''}`}>
                                        <input {...getPreviewInputProps()} />
                                        <div className="preview-content">
                                            <FaImage className="preview-icon" />
                                            <p>{isPreviewDragActive ? 'Drop your image or video here' : 'Click or drop your image or video here'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="hero-stats">
                                <div className="stat">
                                    <span className="stat-number">10K+</span>
                                    <span className="stat-label">Mockups created</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">2s</span>
                                    <span className="stat-label">Average creation time</span>
                                </div>
                                <div className="stat">
                                    <span className="stat-number">100%</span>
                                    <span className="stat-label">Free to use</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="hero-visual">
                            <div className="hero-images">
                                <div className="hero-image hero-image-1">
                                    <img src="/images/mm-mrr.png" alt="MRR Dashboard" />
                                </div>
                                <div className="hero-image hero-image-2">
                                    <img src="/images/mm-foodtrack.png" alt="Food Tracking App" />
                                </div>
                                <div className="hero-image hero-image-3">
                                    <img src="/images/mm-gitcontrib.png" alt="GitHub Contributions" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Text Behind Image Feature Section */}
                <section className="text-feature-showcase">
                    <div className="section-container">
                        <div className="text-feature-content">
                            <div className="text-feature-info">
                                <div className="feature-badge">
                                    <FaFont className="badge-icon" />
                                    <span>NEW FEATURE</span>
                                </div>
                                <h2>Text Behind Image</h2>
                                <p>Create stunning 3D text effects that appear to go behind your images. Perfect for social media posts, marketing materials, and creative designs.</p>
                                <ul className="text-feature-benefits">
                                    <li><FaCheck /> AI-powered background removal</li>
                                    <li><FaCheck /> 3D text positioning & effects</li>
                                    <li><FaCheck /> Custom fonts & styling</li>
                                    <li><FaCheck /> Instant preview & export</li>
                                </ul>
                                <button onClick={() => routeStore.goToRoute(Routes.TextBehindImageApp)} className="feature-cta-button">
                                    <FaFont />
                                    <span>Try Text Behind Image</span>
                                    <FaArrowRight />
                                </button>
                            </div>
                            <div className="text-feature-visual">
                                <div className="text-preview-container">
                                    <img src="/images/textbehindimagehome.png" alt="Text Behind Image Example" className="text-behind-image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="features">
                    <div className="section-container">
                        <div className="section-header">
                            <h2>Everything you need, nothing you don't</h2>
                            <p>Simple, powerful tools for creating professional designs</p>
                        </div>
                        
                        <div className="features-showcase">
                            <div className="feature-large">
                                <div className="feature-preview">
                                    <div {...getPreviewRootProps()} className={`preview-window ${isPreviewDragActive ? 'drag-active' : ''}`}>
                                        <input {...getPreviewInputProps()} />
                                        <div className="preview-content">
                                            <FaImage className="preview-icon" />
                                            <p>{isPreviewDragActive ? 'Drop your image or video here' : 'Click or drop your image or video here'}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="feature-info">
                                    <h3>Drag, drop, done</h3>
                                    <p>Simply drag your screenshot into the browser. No accounts, no downloads, no hassle. Your mockup is ready in seconds.</p>
                                    <ul className="feature-benefits">
                                        <li><FaCheck /> Works with any image format</li>
                                        <li><FaCheck /> No file size limits</li>
                                        <li><FaCheck /> Instant preview</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div className="features-grid-small">
                                <div className="feature-small">
                                    <div className="feature-icon-small">
                                        <FaDesktop/>
                                    </div>
                                    <h4>Device frames</h4>
                                    <p>Browser, mobile, and tablet frames that look pixel-perfect</p>
                                </div>
                                <div className="feature-small">
                                    <div className="feature-icon-small">
                                        <FaFont/>
                                    </div>
                                    <h4>Text behind image</h4>
                                    <p>3D text effects with AI background removal for stunning designs</p>
                                </div>
                                <div className="feature-small">
                                    <div className="feature-icon-small">
                                        <FaPalette/>
                                    </div>
                                    <h4>Custom styling</h4>
                                    <p>Backgrounds, shadows, and colors to match your brand</p>
                                </div>
                                <div className="feature-small">
                                    <div className="feature-icon-small">
                                        <FaDownload/>
                                    </div>
                                    <h4>High-res exports</h4>
                                    <p>PNG, JPG, WebP formats in any resolution you need</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="cta">
                    <div className="section-container">
                        <div className="cta-content">
                            <h2>Ready to create your first mockup?</h2>
                            <p>Join other designers, developers, and marketers who trust Magic Mockup.</p>
                            <button onClick={() => routeStore.goToRoute(Routes.AppSelection)} className="cta-button">
                                <span>Start creating</span>
                                <FaArrowRight className="arrow-icon" />
                            </button>
                            <p className="cta-subtitle">100% free • No signup required</p>
                        </div>
                    </div>
                </section>


                {/* Footer */}
                <footer className="footer">
                    <div className="footer-container">
                        <div className="footer-content">
                            <div className="footer-brand">
                                <h3 className="footer-brand-title">MagicMockup.xyz</h3>
                                <p>Create beautiful mockups in seconds.</p>
                            </div>
                            <div className="footer-links">
                                <button onClick={() => routeStore.goToRoute(Routes.AppSelection)}>Open App</button>
                                <a href="#features">Features</a>
                            </div>
                        </div>
                        <div className="footer-bottom">
                            <p>&copy; {(new Date()).getFullYear()} MagicMockup.xyz</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
});
import React, {useState, useRef, useEffect} from "react";
import {view} from "@risingstack/react-easy-state";
import {app} from "../../../stores/appStore";
import {copyImageToClipboard, downloadImage, downloadVideo, downloadVideoMockup} from "../../../utils/image";
import {Browsers, ImageFormats} from "../../../types";
import {getBrowserType} from "../../../utils/misc";
import {FaDownload, FaCopy, FaChevronDown} from "react-icons/fa";

interface ExportDropdownProps {
    isHeaderVersion?: boolean;
}

export const ExportDropdown = view(({ isHeaderVersion = false }: ExportDropdownProps) => {
    const [imageFormat, setImageFormat] = useState<ImageFormats>(app.defaultImageFormat);
    const [isOpen, setIsOpen] = useState(false);
    const browser = getBrowserType();
    const isMountedRef = useRef(true);

    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const canCopyToClipboard = () => {
        // Copying images to clipboard is currently not supported in firefox
        if (browser === Browsers.Firefox || browser === Browsers.Safari) {
            return false;
        }
        try {
            return navigator.permissions.query({name: 'clipboard-write' as PermissionName}).then(res => {
                return res.state === 'granted';
            });
        } catch (error) {
            return false
        }
    };

    const handlePostDownload = () => {
        setTimeout(function () {
            app.isDownloadMode = false;
            app.hasDownloaded = true;
            localStorage.setItem('hasDownloaded', 'true');
            setIsOpen(false); // Close dropdown after download
        }, 500);
    };

    const handleImageDownload = () => {
        // If it's a video, download the video mockup (video with frame)
        if (app.isVideo && app.videoData) {
            app.isDownloadMode = true;
            console.log('Downloading video mockup');
            downloadVideoMockup().then(() => {
                console.log('Video mockup download successful');
                // Only update state if component is still mounted
                if (isMountedRef.current) {
                    app.hasDownloaded = true;
                    localStorage.setItem('hasDownloaded', 'true');
                    app.isDownloadMode = false;
                    setIsOpen(false);
                }
            }).catch((error) => {
                console.error('Video mockup download failed:', error);
                if (isMountedRef.current) {
                    app.isDownloadMode = false;
                    alert('Error downloading video mockup. Please try again.');
                }
            });
            return;
        }

        // Otherwise download as image
        app.isDownloadMode = true;
        downloadImage(
            document.getElementById('canvas'),
            imageFormat,
            app.getCanvasDimensions().height,
            app.getCanvasDimensions().width,
        ).then(handlePostDownload).catch(() => {
            // Reset download mode on error
            app.isDownloadMode = false;
        });
    };

    const handleImageCopy = () => {
        app.isDownloadMode = true;
        copyImageToClipboard(document.getElementById('canvas')).then(handlePostDownload).catch(() => {
            // Reset download mode on error
            app.isDownloadMode = false;
        });
    }

    const handleImageTypeSwitch = (format: string) => {
        setImageFormat(format.toLowerCase() as ImageFormats);
    };

    const toggleDropdown = () => {
        if (app.imageData || app.videoData) {
            setIsOpen(!isOpen);
        }
    };

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.export-dropdown')) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isOpen]);

    if (isHeaderVersion) {
        return (
            <div className="export-dropdown" style={{ position: 'relative' }}>
                <button
                    onClick={toggleDropdown}
                    disabled={!(app.imageData || app.videoData)}
                    className="export-trigger-btn"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 16px',
                        background: (app.imageData || app.videoData) ? '#6366f1' : 'rgba(255, 255, 255, 0.15)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: '500',
                        cursor: (app.imageData || app.videoData) ? 'pointer' : 'not-allowed',
                        transition: 'all 0.2s ease',
                        opacity: (app.imageData || app.videoData) ? 1 : 0.5
                    }}
                    onMouseEnter={(e) => {
                        if (app.imageData || app.videoData) {
                            e.currentTarget.style.background = '#4f46e5';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                        }
                    }}
                    onMouseLeave={(e) => {
                        if (app.imageData || app.videoData) {
                            e.currentTarget.style.background = '#6366f1';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }
                    }}
                >
                    <FaDownload style={{ width: '14px', height: '14px' }} />
                    <span>Export</span>
                    <FaChevronDown style={{ width: '12px', height: '12px' }} />
                </button>

                {isOpen && (app.imageData || app.videoData) && (
                    <div className="export-dropdown-menu" style={{
                        position: 'absolute',
                        top: '100%',
                        right: '0',
                        marginTop: '8px',
                        background: '#ffffff',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                        padding: '16px',
                        minWidth: '280px',
                        zIndex: 1000
                    }}>
                        {/* Format Selection - Only show for images */}
                        {!app.isVideo && (
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ 
                                    fontSize: '14px', 
                                    fontWeight: '600', 
                                    color: '#374151',
                                    display: 'block',
                                    marginBottom: '8px'
                                }}>
                                    Format:
                                </label>
                                <div style={{ display: 'flex', gap: '4px' }}>
                                    {Object.keys(ImageFormats).map(format => (
                                        <button
                                            key={format}
                                            onClick={() => handleImageTypeSwitch(format)}
                                            style={{
                                                flex: 1,
                                                padding: '8px 12px',
                                                background: imageFormat === format.toLowerCase() ? '#6366f1' : '#f3f4f6',
                                                color: imageFormat === format.toLowerCase() ? 'white' : '#374151',
                                                border: 'none',
                                                borderRadius: '6px',
                                                fontSize: '13px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (imageFormat !== format.toLowerCase()) {
                                                    e.currentTarget.style.background = '#e5e7eb';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (imageFormat !== format.toLowerCase()) {
                                                    e.currentTarget.style.background = '#f3f4f6';
                                                }
                                            }}
                                        >
                                            {format}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Download Button */}
                        <button
                            disabled={app.isDownloadMode}
                            onClick={handleImageDownload}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: '#6366f1',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: '500',
                                cursor: app.isDownloadMode ? 'not-allowed' : 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginBottom: '8px',
                                transition: 'all 0.2s ease',
                                opacity: app.isDownloadMode ? 0.6 : 1
                            }}
                            onMouseEnter={(e) => {
                                if (!app.isDownloadMode) {
                                    e.currentTarget.style.background = '#4f46e5';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!app.isDownloadMode) {
                                    e.currentTarget.style.background = '#6366f1';
                                }
                            }}
                        >
                            <FaDownload style={{ width: '14px', height: '14px' }} />
                            {app.isDownloadMode ? (app.isVideo ? 'Recording Video...' : 'Downloading...') : app.isVideo ? 'Download Video Mockup' : `Download ${imageFormat.toUpperCase()}`}
                        </button>

                        {/* Copy to Clipboard Button - Only show for images, not videos */}
                        {canCopyToClipboard() && !app.isVideo && (
                            <button
                                disabled={app.isDownloadMode}
                                onClick={handleImageCopy}
                                style={{
                                    width: '100%',
                                    padding: '12px',
                                    background: '#10b981',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    fontWeight: '500',
                                    cursor: app.isDownloadMode ? 'not-allowed' : 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px',
                                    transition: 'all 0.2s ease',
                                    opacity: app.isDownloadMode ? 0.6 : 1
                                }}
                                onMouseEnter={(e) => {
                                    if (!app.isDownloadMode) {
                                        e.currentTarget.style.background = '#059669';
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (!app.isDownloadMode) {
                                        e.currentTarget.style.background = '#10b981';
                                    }
                                }}
                            >
                                <FaCopy style={{ width: '14px', height: '14px' }} />
                                {app.isDownloadMode ? 'Copying...' : 'Copy to Clipboard'}
                            </button>
                        )}
                        
                        {canCopyToClipboard() && !app.isVideo && (
                            <div style={{ 
                                fontSize: '11px', 
                                color: '#6b7280', 
                                textAlign: 'center',
                                marginTop: '8px'
                            }}>
                                Can be pasted in Twitter, GitHub etc.
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }

    // Return regular sidebar version if not header version
    return (
        <>
            {/* Format Selection - Only show for images */}
            {!app.isVideo && (
                <div className="btn-group btn-group-sm w-100 mb-2">
                    {Object.keys(ImageFormats).map(format => {
                        return (
                            <button
                                key={format}
                                onClick={() => handleImageTypeSwitch(format)}
                                className={(imageFormat === format.toLowerCase() ? 'active' : '') + ' btn btn-success'}>
                                {format}
                            </button>
                        )
                    })}
                </div>
            )}
            <button disabled={!(app.imageData || app.videoData) || app.isDownloadMode} onClick={handleImageDownload}
                    className="btn btn-success w-100 btn-s">
                {app.isDownloadMode ? (app.isVideo ? 'Recording Video...' : 'Downloading...') : app.isVideo ? 'Download Video Mockup' : `Download ${imageFormat.toUpperCase()}`}
            </button>
            {canCopyToClipboard() && !app.isVideo && <button disabled={!(app.imageData || app.videoData) || app.isDownloadMode} onClick={handleImageCopy}
                                             className="btn btn-success w-100 btn-s mt-2 mb-2">
                {app.isDownloadMode ? 'Copying...' : 'Copy to Clipboard'}
                <br/>
                <span style={{fontSize: '.7em'}}>Can be pasted in Twitter, GitHub etc.</span>
            </button>}
        </>
    );
});
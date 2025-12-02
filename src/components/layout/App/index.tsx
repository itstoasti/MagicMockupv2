import React, {useEffect, useCallback} from "react";
import './styles'
import {Canvas} from "../../common/Canvas";
import {view} from "@risingstack/react-easy-state";
import {app} from "../../../stores/appStore";
import {styles} from "./styles";
import {checkForImageFromLocalstorageUrlOrPaste} from "../../../utils/image";
import {browserStore} from "../../../stores/browserStore";
import {Settings} from "../../common/Settings/Settings";
import {ScreenshotType} from "../../../types";
import {ThemeSelector} from "../../common/ThemeSelector";
import {BackgroundSettings} from "../../common/Settings/BackgroundSettings";
import {CanvasSettings} from "../../common/Settings/CanvasSettings";
import {TextSettings} from "../../common/Settings/TextSettings";
import {ImageSettings} from "../../common/Settings/ImageSettings";
import {RatingPromptBox} from "../../common/RatingPromptBox";
import {ImageSelector} from "../../common/ImageSelector";
import {CropModal} from "../../common/CropModal";
import {CONFIG} from "../../../config";
import {DownloadMask} from "../../common/DownloadMask";
import {ShareButtons} from "../../common/ShareButtons";
import {ExportDropdown} from "../../common/ExportDropdown";
import {FaImage, FaCrop, FaDownload, FaPalette, FaCog, FaFont, FaImages, FaArrowLeft} from "react-icons/fa";
import {useDropzone} from "react-dropzone";
import {Routes, routeStore} from "../../../stores/routeStore";

export const App = view(() => {
    useEffect(() => {
        checkForImageFromLocalstorageUrlOrPaste();
    }, [])


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
        }
    }, []);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop, 
        accept: 'image/*,video/*'
    });

    const handleFrameTypeChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        app.frameType = ((e.target as HTMLElement).innerText as ScreenshotType);
    };

    const frameToStyleMap = {
        [ScreenshotType.Browser]: browserStore.styles,
    };

    return (
        <>
            <main className={styles()}>
                {/* Header Bar */}
                <header className="header">
                    <div className="header-left">
                        <button 
                            className="back-to-tools-btn"
                            onClick={() => routeStore.goToRoute(Routes.AppSelection)}
                            title="Back to Choose Your Tool"
                        >
                            <FaArrowLeft />
                            <span>Choose Your Tool</span>
                        </button>
                        <div className="brand-title">MagicMockup.xyz</div>
                    </div>
                    <div className="header-center">
                        <div className="quick-actions">
                            <button 
                                disabled={!(app.imageData || app.videoData)}
                                className="action-btn"
                                onClick={app.resetImage}
                                title="New Image"
                            >
                                <FaImage/>
                                <span>New</span>
                            </button>
                            <button 
                                disabled={!(app.imageData || app.videoData)}
                                className="action-btn"
                                onClick={() => app.cropIsActive = !app.cropIsActive}
                                title="Crop Image"
                            >
                                <FaCrop/>
                                <span>Crop</span>
                            </button>
                        </div>
                    </div>
                    <div className="header-right">
                        <div className="export-section" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <ExportDropdown isHeaderVersion={true} />
                            <ShareButtons/>
                        </div>
                    </div>
                </header>

                {/* Main Layout */}
                <div className="app-layout">
                    {/* Left Sidebar */}
                    <aside className="sidebar">
                        <div className="sidebar-content">
                            {/* Frame Settings */}
                            <div className={`sidebar-section ${!(app.imageData || app.videoData) ? 'disabled' : ''}`}>
                                <div className="section-header">
                                    <FaCog className="section-icon"/>
                                    <h3>Frame Type</h3>
                                </div>
                                <div className="frame-options">
                                    {Object.keys(ScreenshotType).map(type => {
                                        if (!CONFIG.enabledScreenShotTypes.includes(type as ScreenshotType)) {
                                            return null;
                                        }
                                        return (
                                            <button
                                                key={type}
                                                onClick={handleFrameTypeChange}
                                                className={`frame-option ${app.frameType === type ? 'active' : ''}`}
                                                disabled={!(app.imageData || app.videoData)}>
                                                {type}
                                            </button>
                                        )
                                    })}
                                </div>
                                <div className="theme-selector-wrap">
                                    <ThemeSelector/>
                                </div>
                            </div>

                            {app.frameType !== ScreenshotType.None && (
                                <div className={`sidebar-section ${!(app.imageData || app.videoData) ? 'disabled' : ''}`}>
                                    <div className="section-header">
                                        <FaCog className="section-icon"/>
                                        <h3>Frame Settings</h3>
                                    </div>
                                    <div className="settings-content">
                                        <Settings/>
                                    </div>
                                </div>
                            )}

                            <div className={`sidebar-section ${!(app.imageData || app.videoData) ? 'disabled' : ''}`}>
                                <div className="section-header">
                                    <FaFont className="section-icon"/>
                                    <h3>Text</h3>
                                </div>
                                <div className="settings-content">
                                    <TextSettings/>
                                </div>
                            </div>

                            <div className={`sidebar-section ${!(app.imageData || app.videoData) ? 'disabled' : ''}`}>
                                <div className="section-header">
                                    <FaImages className="section-icon"/>
                                    <h3>Images</h3>
                                </div>
                                <div className="settings-content">
                                    <ImageSettings/>
                                </div>
                            </div>

                            <div className={`sidebar-section ${!(app.imageData || app.videoData) ? 'disabled' : ''}`}>
                                <div className="section-header">
                                    <FaPalette className="section-icon"/>
                                    <h3>Background</h3>
                                </div>
                                <div className="settings-content">
                                    <BackgroundSettings/>
                                </div>
                            </div>

                            <div className={`sidebar-section ${!(app.imageData || app.videoData) ? 'disabled' : ''}`}>
                                <div className="section-header">
                                    <FaCog className="section-icon"/>
                                    <h3>Canvas</h3>
                                </div>
                                <div className="settings-content">
                                    <CanvasSettings/>
                                </div>
                            </div>
                        </div>

                        {/* Footer Section */}
                        <div className="sidebar-footer">
                            <RatingPromptBox/>
                        </div>
                    </aside>

                    {/* Main Canvas Area */}
                    <div className="canvas-area" id="main">
                        <div className="canvas-container">
                            {(app.imageData || app.videoData) ? (
                                <Canvas
                                    imageData={app.imageData}
                                    canvasBgColor={app.canvasBgColor}
                                    canvasBgImage={app.canvasStyles.bgImage}
                                    canvasVerticalPadding={app.canvasStyles.verticalPosition}
                                    canvasHorizontalPadding={app.canvasStyles.horizontalPosition}
                                    styles={(frameToStyleMap as any)[app.frameType]}
                                    borderRadius={app.canvasStyles.borderRadius}
                                    isDownloadMode={app.isDownloadMode}
                                    frameType={app.frameType}
                                    isAutoRotateActive={app.isAutoRotateActive}
                                    canvasBgType={app.canvasStyles.backgroundType}
                                />
                            ) : (
                                <div className="empty-canvas">
                                    <div className="empty-state">
                                        <FaImage className="empty-icon"/>
                                        <h2>Ready to create amazing mockups?</h2>
                                        <p>Upload an image, video, or screenshot to get started</p>
                                        <div className="upload-cta">
                                            <div {...getRootProps()} className={`preview-window ${isDragActive ? 'drag-active' : ''}`}>
                                                <input {...getInputProps()} />
                                                <div className="preview-content">
                                                    <FaImage className="preview-icon" />
                                                    <p>{isDragActive ? 'Drop your image or video here' : 'Click or drop your image or video here'}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            {app.cropIsActive && <CropModal/>}
            {app.isDownloadMode && <DownloadMask/>}
        </>
    );
});
import {IoIosArrowBack, IoIosArrowForward, IoIosOptions} from "react-icons/io";
import {FiLock} from "react-icons/all";
import React, {FormEvent, useEffect, useRef} from "react";
import {ICanvasProps} from "../../Canvas";
import {styles} from "./styles";
import {view} from "@risingstack/react-easy-state";
import {browserStore} from "../../../../stores/browserStore";
import {app} from "../../../../stores/appStore";

export const BrowserFrame = view((props: ICanvasProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        return () => {
            // Cleanup video when component unmounts
            const video = videoRef.current;
            if (video) {
                video.pause();
                video.src = '';
                video.load();
            }
        };
    }, []);

    return (
        <div className={styles(props)}>
            <div className="browser-controls">
                <div className={`window-controls ${!browserStore.settings.showWindowControls ? 'hide' : ''}`}>
                    <span className="close"/>
                    <span className="minimise"/>
                    <span className="maximise"/>
                </div>
                <div className={`page-controls ${!browserStore.settings.showNavigationButtons ? 'hide' : ''}`}>
                    <span className="back browser-container">
                        <IoIosArrowBack/>
                    </span>
                    <span className="forward browser-container">
                        <IoIosArrowForward/>
                    </span>
                </div>
                <span
                    className={`url-bar browser-container ${!browserStore.settings.showAddressBar || props.hideAddressBarOverride ? 'hide' : ''}`}>
                    <span className="lock">
                        <FiLock/>
                    </span>
                    <div className={`url-text ${!browserStore.settings.showAddressBarUrl ? 'hide' : ''}`}>
                        <span className="text-success" contentEditable suppressContentEditableWarning>
                            {browserStore.settings.addressBarUrlProtocol}
                        </span>
                        <input
                            className="urlInput"
                            value={browserStore.settings.addressBarUrl}
                            type="text"
                            onChange={(e: FormEvent<HTMLInputElement>) => {
                                browserStore.settings.addressBarUrl = e.currentTarget.value
                            }}>
                        </input>
                    </div>
                    </span>
                <span className={`browser-container ${!browserStore.settings.showSettingsButton ? 'hide' : ''}`}>
                    <span className="settings">
                        <IoIosOptions/>
                    </span>
                </span>
            </div>
            <div className="content-wrap">
                <div id="screenshot-wrap">
                    {!props.showControlsOnly && !app.isVideo && <img alt={'Screenshot'} id="screenshot" src={app.croppedImageData || app.imageData} style={{position: 'relative', zIndex: 1}}/>}
                    {!props.showControlsOnly && app.isVideo && (
                        <video 
                            ref={videoRef}
                            id="screenshot-video" 
                            src={app.videoData}
                            controls
                            autoPlay
                            loop
                            playsInline
                            preload="metadata"
                            onLoadedData={() => {
                                // Ensure video is ready for recording
                                if (videoRef.current) {
                                    videoRef.current.currentTime = 0;
                                }
                            }}
                            onError={(e) => {
                                console.error('Video loading error:', e);
                            }}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'relative',
                                zIndex: 1
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
});
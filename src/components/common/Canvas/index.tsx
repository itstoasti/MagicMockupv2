import React, {useEffect, useState} from "react";
import {styles} from "./styles";
import {BrowserFrame} from "../Frames/Browser";
import {IBrowserStyles} from "../../../stores/browserStore";
import {CanvasBackgroundTypes, ScreenshotType} from "../../../types";
import {PhoneFrame} from "../Frames/Phone";
import {view} from "@risingstack/react-easy-state";
import {NoFrameFrame} from "../Frames/NoFrame";
import {TwitterFrame} from "../Frames/Twitter";
import {TextOverlay} from "../TextOverlay";
import {ImageOverlay} from "../ImageOverlay";
import {FaSearchPlus, FaSearchMinus, FaExpand} from "react-icons/fa";

export interface ICanvasProps {
    showControlsOnly?: boolean;
    imageData?: string;
    canvasBgColor?: string;
    canvasBgImage?: string;
    canvasBgType?: CanvasBackgroundTypes;
    canvasVerticalPadding?: number;
    canvasHorizontalPadding?: number;
    styles: IBrowserStyles;
    isDownloadMode: boolean;
    isAutoRotateActive: boolean;
    frameType?: ScreenshotType;
    hideAddressBarOverride?: boolean;
    borderRadius: number;
}

export const Canvas = view((props: ICanvasProps) => {
    const [zoomLevel, setZoomLevel] = useState(1);

    const scaleCanvasOnWindowResize = () => {
        const canvas = document.querySelector<HTMLElement>('.canvas');
        const canvasArea = document.querySelector<HTMLElement>('.canvas-area');
        
        if (!canvas || !canvasArea) {
            return; // Early return if elements don't exist yet
        }
        
        const maxWidth = canvasArea.offsetWidth;
        const maxHeight = window.innerHeight;
        const height = canvas.clientHeight;
        const width = canvas.clientWidth;
        const minScale = .35;
        const maxScale = 1;
        const baseScale = Math.min(Math.max(Math.min(maxWidth / width, maxHeight / height), minScale), maxScale) * .75;
        const finalScale = baseScale * zoomLevel;

        canvas.style.transform = 'scale(' + finalScale + ')';
    };

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.25, 3));
    };

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.25, 0.5));
    };

    const handleResetZoom = () => {
        setZoomLevel(1);
    };

    useEffect(() => {
        window.addEventListener('resize', scaleCanvasOnWindowResize);
        // Use a small delay to ensure DOM has updated when switching frame types
        const timeoutId = setTimeout(scaleCanvasOnWindowResize, 10);
        return () => {
            window.removeEventListener('resize', scaleCanvasOnWindowResize);
            clearTimeout(timeoutId);
        }
    }, [props.frameType, props.imageData, zoomLevel]); // Re-scale when frame type, image data, or zoom level changes

    return (
        <>
            {/* Zoom Controls */}
            {!props.isDownloadMode && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    zIndex: 1000,
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '8px',
                    padding: '8px',
                    backdropFilter: 'blur(10px)'
                }}>
                    <button
                        onClick={handleZoomIn}
                        disabled={zoomLevel >= 3}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '16px',
                            padding: '8px',
                            borderRadius: '4px',
                            cursor: zoomLevel >= 3 ? 'not-allowed' : 'pointer',
                            opacity: zoomLevel >= 3 ? 0.5 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px'
                        }}
                        title="Zoom In"
                    >
                        <FaSearchPlus />
                    </button>
                    <button
                        onClick={handleResetZoom}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '16px',
                            padding: '8px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px'
                        }}
                        title={`Reset Zoom (${Math.round(zoomLevel * 100)}%)`}
                    >
                        <FaExpand />
                    </button>
                    <button
                        onClick={handleZoomOut}
                        disabled={zoomLevel <= 0.5}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontSize: '16px',
                            padding: '8px',
                            borderRadius: '4px',
                            cursor: zoomLevel <= 0.5 ? 'not-allowed' : 'pointer',
                            opacity: zoomLevel <= 0.5 ? 0.5 : 1,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '32px',
                            height: '32px'
                        }}
                        title="Zoom Out"
                    >
                        <FaSearchMinus />
                    </button>
                </div>
            )}
            
            <div className={styles(props) + ' canvas'} id="canvas" style={{ position: 'relative' }}>
                {(props.frameType === ScreenshotType.Browser || !props.frameType) && <BrowserFrame {...props} />}
                {props.frameType === ScreenshotType.Device && <PhoneFrame {...props} />}
                {props.frameType === ScreenshotType.None && <NoFrameFrame {...props} />}
                {props.frameType === ScreenshotType.Twitter && <TwitterFrame {...props} />}
                
                {/* Text Overlay */}
                <TextOverlay isDownloadMode={props.isDownloadMode} />
                
                {/* Image Overlay */}
                <ImageOverlay isDownloadMode={props.isDownloadMode} />
            </div>
        </>
    );
});
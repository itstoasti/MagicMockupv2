import React, {useState} from "react";
import {view} from "@risingstack/react-easy-state";
import {imageStore, ImageElement} from "../../../stores/imageStore";
import {css} from "emotion";

interface ImageOverlayProps {
    isDownloadMode?: boolean;
}

const mobileImageOverlayStyles = css`
  @media (max-width: 768px) {
    .image-element {
      /* Higher z-index for mobile */
      z-index: 150 !important;
    }
    
    .image-element.selected {
      border: 2px solid #ff6b35 !important;
      background: rgba(255, 255, 255, 0.1) !important;
      backdrop-filter: blur(2px);
    }
    
    .resize-handle {
      width: 20px !important;
      height: 20px !important;
    }
  }
  
  @media (max-width: 480px) {
    .resize-handle {
      width: 24px !important;
      height: 24px !important;
    }
  }
`;

export const ImageOverlay = view(({ isDownloadMode = false }: ImageOverlayProps) => {
    const [resizing, setResizing] = useState<{imageId: string, handle: string} | null>(null);

    const handleImageClick = (imageElement: ImageElement, event: React.MouseEvent) => {
        if (!isDownloadMode) {
            event.stopPropagation();
            imageStore.selectImageElement(imageElement.id);
        }
    };

    const getCanvasScale = () => {
        const canvas = document.querySelector<HTMLElement>('.canvas');
        if (!canvas) return 1;
        
        const transform = window.getComputedStyle(canvas).transform;
        if (transform === 'none') return 1;
        
        const matrix = transform.match(/matrix\(([^)]+)\)/);
        if (matrix) {
            const values = matrix[1].split(',');
            return parseFloat(values[0]) || 1;
        }
        return 1;
    };

    const getCanvasOffset = () => {
        const canvas = document.querySelector<HTMLElement>('.canvas');
        if (!canvas) return { x: 0, y: 0 };
        
        const rect = canvas.getBoundingClientRect();
        const scale = getCanvasScale();
        
        // Calculate the offset accounting for scale and centering
        const canvasWidth = canvas.offsetWidth * scale;
        const canvasHeight = canvas.offsetHeight * scale;
        const offsetX = rect.left + (rect.width - canvasWidth) / 2;
        const offsetY = rect.top + (rect.height - canvasHeight) / 2;
        
        return { x: offsetX, y: offsetY };
    };

    const handleMouseDown = (imageElement: ImageElement, event: React.MouseEvent) => {
        if (isDownloadMode || resizing) return;
        
        event.preventDefault();
        imageStore.selectImageElement(imageElement.id);
        
        const scale = getCanvasScale();
        const canvasOffset = getCanvasOffset();
        
        const startX = (event.clientX - canvasOffset.x) / scale - imageElement.x;
        const startY = (event.clientY - canvasOffset.y) / scale - imageElement.y;

        const handleMouseMove = (e: MouseEvent) => {
            const newX = Math.max(0, (e.clientX - canvasOffset.x) / scale - startX);
            const newY = Math.max(0, (e.clientY - canvasOffset.y) / scale - startY);
            
            imageStore.updateImageElement(imageElement.id, { x: newX, y: newY });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleResizeStart = (imageElement: ImageElement, handle: string, event: React.MouseEvent) => {
        event.stopPropagation();
        event.preventDefault();
        
        setResizing({imageId: imageElement.id, handle});
        
        const scale = getCanvasScale();
        const canvasOffset = getCanvasOffset();
        
        const startMouseX = (event.clientX - canvasOffset.x) / scale;
        const startMouseY = (event.clientY - canvasOffset.y) / scale;
        const startWidth = imageElement.width;
        const startHeight = imageElement.height;
        const startX = imageElement.x;
        const startY = imageElement.y;

        const handleMouseMove = (e: MouseEvent) => {
            const currentMouseX = (e.clientX - canvasOffset.x) / scale;
            const currentMouseY = (e.clientY - canvasOffset.y) / scale;
            
            const deltaX = currentMouseX - startMouseX;
            const deltaY = currentMouseY - startMouseY;
            
            let newWidth = startWidth;
            let newHeight = startHeight;
            let newX = startX;
            let newY = startY;
            
            // Maintain aspect ratio
            const aspectRatio = imageElement.originalWidth / imageElement.originalHeight;
            
            if (handle.includes('e')) {
                newWidth = Math.max(20, startWidth + deltaX);
                newHeight = newWidth / aspectRatio;
            } else if (handle.includes('w')) {
                newWidth = Math.max(20, startWidth - deltaX);
                newHeight = newWidth / aspectRatio;
                newX = startX + (startWidth - newWidth);
            }
            
            if (handle.includes('s')) {
                newHeight = Math.max(20, startHeight + deltaY);
                newWidth = newHeight * aspectRatio;
            } else if (handle.includes('n')) {
                newHeight = Math.max(20, startHeight - deltaY);
                newWidth = newHeight * aspectRatio;
                newY = startY + (startHeight - newHeight);
            }
            
            // For corner handles, use the larger dimension change to maintain aspect ratio
            if (handle === 'se' || handle === 'nw' || handle === 'ne' || handle === 'sw') {
                const widthDelta = Math.abs(deltaX);
                const heightDelta = Math.abs(deltaY);
                
                if (widthDelta > heightDelta) {
                    if (handle.includes('e')) {
                        newWidth = Math.max(20, startWidth + deltaX);
                    } else {
                        newWidth = Math.max(20, startWidth - deltaX);
                        newX = startX + (startWidth - newWidth);
                    }
                    newHeight = newWidth / aspectRatio;
                } else {
                    if (handle.includes('s')) {
                        newHeight = Math.max(20, startHeight + deltaY);
                    } else {
                        newHeight = Math.max(20, startHeight - deltaY);
                        newY = startY + (startHeight - newHeight);
                    }
                    newWidth = newHeight * aspectRatio;
                }
                
                // Adjust position for corner handles
                if (handle === 'nw') {
                    newX = startX + (startWidth - newWidth);
                    newY = startY + (startHeight - newHeight);
                } else if (handle === 'ne') {
                    newY = startY + (startHeight - newHeight);
                } else if (handle === 'sw') {
                    newX = startX + (startWidth - newWidth);
                }
            }
            
            imageStore.updateImageElement(imageElement.id, { 
                width: newWidth, 
                height: newHeight,
                x: newX,
                y: newY
            });
        };

        const handleMouseUp = () => {
            setResizing(null);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleTouchStart = (imageElement: ImageElement, event: React.TouchEvent) => {
        if (isDownloadMode || event.touches.length === 0) return;
        
        event.preventDefault();
        const touch = event.touches[0];
        const scale = getCanvasScale();
        const canvasOffset = getCanvasOffset();
        
        const startX = (touch.clientX - canvasOffset.x) / scale - imageElement.x;
        const startY = (touch.clientY - canvasOffset.y) / scale - imageElement.y;

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const newX = Math.max(0, (touch.clientX - canvasOffset.x) / scale - startX);
                const newY = Math.max(0, (touch.clientY - canvasOffset.y) / scale - startY);
                
                imageStore.updateImageElement(imageElement.id, { x: newX, y: newY });
            }
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    if (imageStore.imageElements.length === 0) {
        return null;
    }

    return (
        <div
            className={`image-overlay ${mobileImageOverlayStyles}`}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 102
            }}
        >
            {imageStore.imageElements.map((imageElement) => (
                <div
                    key={imageElement.id}
                    className={`image-element ${imageElement.isSelected && !isDownloadMode ? 'selected' : ''}`}
                    style={{
                        position: 'absolute',
                        left: `${imageElement.x - imageElement.width / 2}px`,
                        top: `${imageElement.y - imageElement.height / 2}px`,
                        width: `${imageElement.width}px`,
                        height: `${imageElement.height}px`,
                        cursor: isDownloadMode ? 'default' : 'move',
                        userSelect: 'none',
                        border: imageElement.isSelected && !isDownloadMode ? '2px dashed #6366f1' : 'none',
                        borderRadius: `${imageElement.borderRadius}px`,
                        opacity: imageElement.opacity,
                        transform: `rotate(${imageElement.rotation}deg)`,
                        transformOrigin: 'center center',
                        pointerEvents: isDownloadMode ? 'none' : 'auto',
                        zIndex: 103
                    }}
                    onClick={(e) => handleImageClick(imageElement, e)}
                    onMouseDown={(e) => handleMouseDown(imageElement, e)}
                    onTouchStart={(e) => handleTouchStart(imageElement, e)}
                >
                    <img
                        src={imageElement.src}
                        alt="Overlay"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            borderRadius: `${imageElement.borderRadius}px`,
                            pointerEvents: 'none'
                        }}
                        draggable={false}
                    />
                    
                    {/* Resize Handles */}
                    {imageElement.isSelected && !isDownloadMode && (
                        <>
                            {/* Corner handles */}
                            <div
                                className="resize-handle"
                                style={{
                                    position: 'absolute',
                                    top: '-6px',
                                    left: '-6px',
                                    width: '12px',
                                    height: '12px',
                                    background: '#6366f1',
                                    border: '2px solid white',
                                    borderRadius: '50%',
                                    cursor: 'nw-resize',
                                    zIndex: 104
                                }}
                                onMouseDown={(e) => handleResizeStart(imageElement, 'nw', e)}
                            />
                            <div
                                className="resize-handle"
                                style={{
                                    position: 'absolute',
                                    top: '-6px',
                                    right: '-6px',
                                    width: '12px',
                                    height: '12px',
                                    background: '#6366f1',
                                    border: '2px solid white',
                                    borderRadius: '50%',
                                    cursor: 'ne-resize',
                                    zIndex: 104
                                }}
                                onMouseDown={(e) => handleResizeStart(imageElement, 'ne', e)}
                            />
                            <div
                                className="resize-handle"
                                style={{
                                    position: 'absolute',
                                    bottom: '-6px',
                                    left: '-6px',
                                    width: '12px',
                                    height: '12px',
                                    background: '#6366f1',
                                    border: '2px solid white',
                                    borderRadius: '50%',
                                    cursor: 'sw-resize',
                                    zIndex: 104
                                }}
                                onMouseDown={(e) => handleResizeStart(imageElement, 'sw', e)}
                            />
                            <div
                                className="resize-handle"
                                style={{
                                    position: 'absolute',
                                    bottom: '-6px',
                                    right: '-6px',
                                    width: '12px',
                                    height: '12px',
                                    background: '#6366f1',
                                    border: '2px solid white',
                                    borderRadius: '50%',
                                    cursor: 'se-resize',
                                    zIndex: 104
                                }}
                                onMouseDown={(e) => handleResizeStart(imageElement, 'se', e)}
                            />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
});
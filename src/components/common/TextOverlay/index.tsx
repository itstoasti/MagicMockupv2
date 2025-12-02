import React from "react";
import {view} from "@risingstack/react-easy-state";
import {textStore, TextElement} from "../../../stores/textStore";
import {css} from "emotion";

interface TextOverlayProps {
    isDownloadMode?: boolean;
}

const mobileTextOverlayStyles = css`
  @media (max-width: 768px) {
    .text-element {
      /* Ensure text is always visible on mobile */
      text-shadow: 1px 1px 3px rgba(0,0,0,0.8) !important;
      font-weight: 600 !important;
      /* Higher z-index for mobile */
      z-index: 150 !important;
      /* Better contrast on mobile */
      filter: drop-shadow(0 0 2px rgba(255,255,255,0.8));
    }
    
    .text-element.selected {
      border: 2px solid #ff6b35 !important;
      background: rgba(255, 255, 255, 0.1) !important;
      backdrop-filter: blur(2px);
    }
  }
  
  @media (max-width: 480px) {
    .text-element {
      /* Even stronger contrast on small screens */
      text-shadow: 2px 2px 4px rgba(0,0,0,0.9) !important;
      filter: drop-shadow(0 0 3px rgba(255,255,255,0.9));
      min-font-size: 14px;
    }
  }
`;

export const TextOverlay = view(({ isDownloadMode = false }: TextOverlayProps) => {
    const handleTextClick = (textElement: TextElement, event: React.MouseEvent) => {
        if (!isDownloadMode) {
            event.stopPropagation();
            textStore.selectTextElement(textElement.id);
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

    const handleTouchStart = (textElement: TextElement, event: React.TouchEvent) => {
        if (isDownloadMode || event.touches.length === 0) return;
        
        event.preventDefault();
        const touch = event.touches[0];
        const scale = getCanvasScale();
        const canvasOffset = getCanvasOffset();
        
        const startX = (touch.clientX - canvasOffset.x) / scale - textElement.x;
        const startY = (touch.clientY - canvasOffset.y) / scale - textElement.y;

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                const newX = Math.max(0, (touch.clientX - canvasOffset.x) / scale - startX);
                const newY = Math.max(0, (touch.clientY - canvasOffset.y) / scale - startY);
                
                textStore.updateTextElement(textElement.id, { x: newX, y: newY });
            }
        };

        const handleTouchEnd = () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleTouchEnd);
    };

    const handleMouseDown = (textElement: TextElement, event: React.MouseEvent) => {
        if (isDownloadMode) return;
        
        event.preventDefault();
        const scale = getCanvasScale();
        const canvasOffset = getCanvasOffset();
        
        const startX = (event.clientX - canvasOffset.x) / scale - textElement.x;
        const startY = (event.clientY - canvasOffset.y) / scale - textElement.y;

        const handleMouseMove = (e: MouseEvent) => {
            const newX = Math.max(0, (e.clientX - canvasOffset.x) / scale - startX);
            const newY = Math.max(0, (e.clientY - canvasOffset.y) / scale - startY);
            
            textStore.updateTextElement(textElement.id, { x: newX, y: newY });
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    if (textStore.textElements.length === 0) {
        return null;
    }

    return (
        <div
            className={`text-overlay ${mobileTextOverlayStyles}`}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 100
            }}
        >
            {textStore.textElements.map((textElement) => (
                <div
                    key={textElement.id}
                    className={`text-element ${textElement.isSelected && !isDownloadMode ? 'selected' : ''}`}
                    style={{
                        position: 'absolute',
                        left: `${textElement.x}px`,
                        top: `${textElement.y}px`,
                        fontSize: `${textElement.fontSize}px`,
                        fontFamily: textElement.fontFamily,
                        fontWeight: textElement.fontWeight,
                        color: textElement.color,
                        textAlign: textElement.textAlign,
                        cursor: isDownloadMode ? 'default' : 'move',
                        userSelect: 'none',
                        whiteSpace: 'pre',
                        lineHeight: '1.2',
                        border: textElement.isSelected && !isDownloadMode ? '2px dashed #6366f1' : 'none',
                        padding: textElement.isSelected && !isDownloadMode ? '4px' : '0',
                        minWidth: '20px',
                        minHeight: '20px',
                        transform: 'translate(-50%, -50%)',
                        transformOrigin: 'center center',
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        pointerEvents: isDownloadMode ? 'none' : 'auto',
                        zIndex: 101
                    }}
                    onClick={(e) => handleTextClick(textElement, e)}
                    onMouseDown={(e) => handleMouseDown(textElement, e)}
                    onTouchStart={(e) => handleTouchStart(textElement, e)}
                >
                    {textElement.text}
                </div>
            ))}
        </div>
    );
});
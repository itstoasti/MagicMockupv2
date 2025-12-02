import React, {useCallback} from "react";
import {view} from "@risingstack/react-easy-state";
import {imageStore} from "../../../stores/imageStore";
import {FaPlus, FaTrash, FaImage, FaEye, FaSync, FaCrop} from "react-icons/fa";
import {useDropzone} from "react-dropzone";

export const ImageSettings = view(() => {
    const selectedImage = imageStore.getSelectedImage();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    imageStore.addImageElement(reader.result as string, file.name);
                }
            };
            reader.readAsDataURL(file);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: true
    });

    const handleRemoveImage = () => {
        if (selectedImage) {
            imageStore.removeImageElement(selectedImage.id);
        }
    };

    const handleOpacityChange = (opacity: number) => {
        if (selectedImage) {
            imageStore.updateImageElement(selectedImage.id, { opacity });
        }
    };

    const handleRotationChange = (rotation: number) => {
        if (selectedImage) {
            imageStore.updateImageElement(selectedImage.id, { rotation });
        }
    };

    const handleBorderRadiusChange = (borderRadius: number) => {
        if (selectedImage) {
            imageStore.updateImageElement(selectedImage.id, { borderRadius });
        }
    };

    const handleSizeChange = (percentage: number) => {
        if (selectedImage) {
            const scale = percentage / 100;
            const newWidth = selectedImage.originalWidth * scale;
            const newHeight = selectedImage.originalHeight * scale;
            
            // Limit max size to prevent performance issues
            const maxSize = 800;
            if (newWidth > maxSize || newHeight > maxSize) {
                const aspectRatio = selectedImage.originalWidth / selectedImage.originalHeight;
                let limitedWidth = newWidth;
                let limitedHeight = newHeight;
                
                if (aspectRatio > 1) {
                    limitedWidth = maxSize;
                    limitedHeight = maxSize / aspectRatio;
                } else {
                    limitedHeight = maxSize;
                    limitedWidth = maxSize * aspectRatio;
                }
                
                imageStore.updateImageElement(selectedImage.id, { 
                    width: limitedWidth, 
                    height: limitedHeight 
                });
                return;
            }
            
            imageStore.updateImageElement(selectedImage.id, { 
                width: newWidth, 
                height: newHeight 
            });
        }
    };

    const getCurrentSizePercentage = () => {
        if (!selectedImage) return 100;
        const currentScale = selectedImage.width / selectedImage.originalWidth;
        return Math.round(currentScale * 100);
    };


    return (
        <div className="image-settings">
            {/* Add Image Controls */}
            <div className="image-controls" style={{ marginBottom: '16px' }}>
                <div {...getRootProps()} className={`upload-area ${isDragActive ? 'drag-active' : ''}`} style={{
                    border: '2px dashed #6366f1',
                    borderRadius: '8px',
                    padding: '16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    backgroundColor: isDragActive ? '#f0f9ff' : '#fafafa',
                    marginBottom: '8px'
                }}>
                    <input {...getInputProps()} />
                    <FaImage style={{ fontSize: '24px', color: '#6366f1', marginBottom: '8px' }} />
                    <p style={{ margin: '0', fontSize: '14px', color: '#374151' }}>
                        {isDragActive ? 'Drop images here' : 'Click or drag images to add'}
                    </p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6b7280' }}>
                        PNG, JPG, GIF, WebP, SVG supported
                    </p>
                </div>
                
                {selectedImage && (
                    <button 
                        className="btn btn-danger btn-sm"
                        onClick={handleRemoveImage}
                        style={{ width: '100%' }}
                    >
                        <FaTrash style={{ marginRight: '4px' }} />
                        Remove Selected
                    </button>
                )}
            </div>

            {/* Image List */}
            {imageStore.imageElements.length > 0 && (
                <div className="image-list" style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                        Image Elements:
                    </label>
                    {imageStore.imageElements.map((imageElement) => (
                        <div 
                            key={imageElement.id}
                            className={`image-element-item ${imageElement.isSelected ? 'selected' : ''}`}
                            onClick={() => imageStore.selectImageElement(imageElement.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: '8px',
                                margin: '4px 0',
                                border: imageElement.isSelected ? '2px solid #6366f1' : '1px solid #e5e7eb',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                backgroundColor: imageElement.isSelected ? '#f0f9ff' : '#fff'
                            }}
                        >
                            <img 
                                src={imageElement.src} 
                                alt="Thumbnail" 
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    objectFit: 'cover',
                                    borderRadius: '4px',
                                    marginRight: '8px'
                                }}
                            />
                            <span style={{ flex: 1 }}>
                                {imageElement.name && imageElement.name.length > 15 
                                    ? imageElement.name.substring(0, 15) + '...' 
                                    : imageElement.name || `Image ${imageStore.imageElements.indexOf(imageElement) + 1}`
                                }
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Image Editing Controls */}
            {selectedImage && (
                <div className="image-editor">

                    {/* Size */}
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            <FaCrop style={{ marginRight: '4px' }} />
                            Size: {getCurrentSizePercentage()}%
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            min="10"
                            max="200"
                            value={getCurrentSizePercentage()}
                            onChange={(e) => handleSizeChange(parseInt(e.target.value))}
                        />
                        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                            Original size: {selectedImage.originalWidth}×{selectedImage.originalHeight}px
                        </div>
                    </div>

                    {/* Opacity */}
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            <FaEye style={{ marginRight: '4px' }} />
                            Opacity: {Math.round(selectedImage.opacity * 100)}%
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            min="0"
                            max="100"
                            value={selectedImage.opacity * 100}
                            onChange={(e) => handleOpacityChange(parseInt(e.target.value) / 100)}
                        />
                    </div>

                    {/* Rotation */}
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            <FaSync style={{ marginRight: '4px' }} />
                            Rotation: {selectedImage.rotation}°
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            min="-180"
                            max="180"
                            value={selectedImage.rotation}
                            onChange={(e) => handleRotationChange(parseInt(e.target.value))}
                        />
                        <button 
                            className="btn btn-outline-secondary btn-sm mt-2"
                            onClick={() => handleRotationChange(0)}
                            style={{ fontSize: '12px' }}
                        >
                            Reset Rotation
                        </button>
                    </div>

                    {/* Border Radius */}
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            Corner Radius: {selectedImage.borderRadius}px
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            min="0"
                            max="50"
                            value={selectedImage.borderRadius}
                            onChange={(e) => handleBorderRadiusChange(parseInt(e.target.value))}
                        />
                    </div>

                </div>
            )}

            {imageStore.imageElements.length === 0 && (
                <div style={{ 
                    textAlign: 'center', 
                    color: '#6b7280', 
                    padding: '24px',
                    fontSize: '14px'
                }}>
                    Upload images to add them to your mockup
                </div>
            )}
        </div>
    );
});
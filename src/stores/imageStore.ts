import {store} from "@risingstack/react-easy-state";

export interface ImageElement {
    id: string;
    src: string;
    x: number;
    y: number;
    width: number;
    height: number;
    originalWidth: number;
    originalHeight: number;
    opacity: number;
    rotation: number;
    borderRadius: number;
    isSelected: boolean;
    name?: string;
}

interface IImageStore {
    imageElements: ImageElement[];
    selectedImageId: string | null;
    
    addImageElement(imageData: string, name?: string): void;
    removeImageElement(id: string): void;
    updateImageElement(id: string, updates: Partial<ImageElement>): void;
    selectImageElement(id: string | null): void;
    getSelectedImage(): ImageElement | null;
    clearAllImages(): void;
}

export const imageStore = store({
    imageElements: [] as ImageElement[],
    selectedImageId: null as string | null,

    addImageElement(imageData: string, name?: string) {
        // Calculate center position based on screenshot dimensions
        const getScreenshotCenter = () => {
            // Try different selectors for different frame types
            let screenshotImg = document.getElementById('screenshot') || 
                              document.querySelector('.device-screen') || 
                              document.querySelector('img[alt="Screenshot"]') ||
                              document.querySelector('img[alt="Mobile mockup"]');
            
            if (screenshotImg) {
                const rect = screenshotImg.getBoundingClientRect();
                const canvas = document.querySelector('.canvas');
                
                if (canvas) {
                    const canvasRect = canvas.getBoundingClientRect();
                    
                    // Calculate center position relative to the canvas
                    const centerX = (rect.left - canvasRect.left) + (rect.width / 2);
                    const centerY = (rect.top - canvasRect.top) + (rect.height / 2);
                    
                    return { x: centerX, y: centerY };
                }
            }
            
            // Fallback to default position if screenshot not found
            return { x: 200, y: 150 };
        };

        // Get image dimensions
        const img = new Image();
        img.onload = () => {
            const centerPos = getScreenshotCenter();
            
            // Calculate default size (max 200px while maintaining aspect ratio)
            const maxSize = 150;
            const aspectRatio = img.width / img.height;
            let width = Math.min(img.width, maxSize);
            let height = Math.min(img.height, maxSize);
            
            if (aspectRatio > 1) {
                // Landscape
                width = maxSize;
                height = maxSize / aspectRatio;
            } else {
                // Portrait
                height = maxSize;
                width = maxSize * aspectRatio;
            }

            const newImage: ImageElement = {
                id: `image-${Date.now()}`,
                src: imageData,
                x: centerPos.x,
                y: centerPos.y,
                width,
                height,
                originalWidth: img.width,
                originalHeight: img.height,
                opacity: 1,
                rotation: 0,
                borderRadius: 0,
                isSelected: true,
                name: name || `Image ${imageStore.imageElements.length + 1}`
            };
            
            // Deselect all other image elements
            imageStore.imageElements.forEach(element => {
                element.isSelected = false;
            });
            
            imageStore.imageElements.push(newImage);
            imageStore.selectedImageId = newImage.id;
        };
        
        img.src = imageData;
    },

    removeImageElement(id: string) {
        const index = imageStore.imageElements.findIndex(element => element.id === id);
        if (index !== -1) {
            imageStore.imageElements.splice(index, 1);
            if (imageStore.selectedImageId === id) {
                imageStore.selectedImageId = null;
            }
        }
    },

    updateImageElement(id: string, updates: Partial<ImageElement>) {
        const element = imageStore.imageElements.find(el => el.id === id);
        if (element) {
            Object.assign(element, updates);
        }
    },

    selectImageElement(id: string | null) {
        imageStore.imageElements.forEach(element => {
            element.isSelected = element.id === id;
        });
        imageStore.selectedImageId = id;
    },

    getSelectedImage(): ImageElement | null {
        return imageStore.imageElements.find(el => el.id === imageStore.selectedImageId) || null;
    },

    clearAllImages() {
        imageStore.imageElements = [];
        imageStore.selectedImageId = null;
    }
} as IImageStore);
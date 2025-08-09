import {store} from "@risingstack/react-easy-state";

export interface TextElement {
    id: string;
    text: string;
    fontSize: number;
    fontFamily: string;
    color: string;
    x: number;
    y: number;
    fontWeight: string;
    textAlign: 'left' | 'center' | 'right';
    isSelected: boolean;
}

interface ITextStore {
    textElements: TextElement[];
    selectedTextId: string | null;
    
    addTextElement(): void;
    removeTextElement(id: string): void;
    updateTextElement(id: string, updates: Partial<TextElement>): void;
    selectTextElement(id: string | null): void;
    getSelectedText(): TextElement | null;
    clearAllText(): void;
}

export const textStore = store({
    textElements: [] as TextElement[],
    selectedTextId: null as string | null,

    addTextElement() {
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

        const centerPos = getScreenshotCenter();

        const newText: TextElement = {
            id: `text-${Date.now()}`,
            text: 'Your text here',
            fontSize: 24,
            fontFamily: 'Arial, sans-serif',
            color: '#000000',
            x: centerPos.x,
            y: centerPos.y,
            fontWeight: 'normal',
            textAlign: 'left',
            isSelected: true
        };
        
        // Deselect all other text elements
        textStore.textElements.forEach(element => {
            element.isSelected = false;
        });
        
        textStore.textElements.push(newText);
        textStore.selectedTextId = newText.id;
    },

    removeTextElement(id: string) {
        const index = textStore.textElements.findIndex(element => element.id === id);
        if (index !== -1) {
            textStore.textElements.splice(index, 1);
            if (textStore.selectedTextId === id) {
                textStore.selectedTextId = null;
            }
        }
    },

    updateTextElement(id: string, updates: Partial<TextElement>) {
        const element = textStore.textElements.find(el => el.id === id);
        if (element) {
            Object.assign(element, updates);
        }
    },

    selectTextElement(id: string | null) {
        textStore.textElements.forEach(element => {
            element.isSelected = element.id === id;
        });
        textStore.selectedTextId = id;
    },

    getSelectedText(): TextElement | null {
        return textStore.textElements.find(el => el.id === textStore.selectedTextId) || null;
    },

    clearAllText() {
        textStore.textElements = [];
        textStore.selectedTextId = null;
    }
} as ITextStore);
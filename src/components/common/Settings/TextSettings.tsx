import React from "react";
import {view} from "@risingstack/react-easy-state";
import {textStore} from "../../../stores/textStore";
import {ColorPicker} from "../ColorPicker";
import {rgba2hexa} from "../../../utils/image";
import {FaPlus, FaTrash, FaFont, FaPalette, FaAlignLeft, FaAlignCenter, FaAlignRight} from "react-icons/fa";

const fontFamilies = [
    // Sans-serif fonts (System fonts with fallbacks)
    'Arial, sans-serif',
    'Helvetica, Arial, sans-serif',
    'Helvetica Neue, Helvetica, Arial, sans-serif',
    'Verdana, Geneva, sans-serif',
    'Trebuchet MS, Helvetica, sans-serif',
    'Tahoma, Geneva, sans-serif',
    'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    'Calibri, Candara, Segoe UI, Optima, sans-serif',
    'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
    'Century Gothic, CenturyGothic, AppleGothic, sans-serif',
    'Futura, Trebuchet MS, Arial, sans-serif',
    'Avenir, Montserrat, Corbel, URW Gothic, source-sans-pro, sans-serif',
    
    // Serif fonts (System fonts with fallbacks)
    'Times New Roman, Times, serif',
    'Georgia, Times, Times New Roman, serif',
    'Times, Times New Roman, Georgia, serif',
    'Garamond, Baskerville, Baskerville Old Face, Hoefler Text, serif',
    'Book Antiqua, Palatino, Palatino Linotype, Palatino LT STD, Georgia, serif',
    'Palatino, Palatino Linotype, Palatino LT STD, Book Antiqua, Georgia, serif',
    'Baskerville, Baskerville Old Face, Hoefler Text, Garamond, Times New Roman, serif',
    
    // Monospace fonts (System fonts with fallbacks)
    'Courier New, Courier, Liberation Mono, monospace',
    'Lucida Console, Lucida Sans Typewriter, monaco, Bitstream Vera Sans Mono, monospace',
    'Monaco, Menlo, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
    'Consolas, monaco, monospace',
    
    // Display/Decorative fonts (System fonts with fallbacks)
    'Impact, Haettenschweiler, Franklin Gothic Bold, Charcoal, Helvetica Inserat, Bitstream Vera Sans Bold, Arial Black, sans-serif',
    'Arial Black, Arial Bold, Gadget, sans-serif',
    'Comic Sans MS, Textile, cursive',
    'Brush Script MT, cursive',
    'Lucida Handwriting, cursive',
    
    // Fantasy/Decorative (with system fallbacks)
    'Papyrus, fantasy',
    'Copperplate, Copperplate Gothic Light, fantasy',
    'Chalkduster, fantasy',
    'Bradley Hand, Brush Script MT, cursive'
];

const fontWeights = [
    { value: 'normal', label: 'Normal' },
    { value: 'bold', label: 'Bold' },
    { value: '300', label: 'Light' },
    { value: '600', label: 'Semi Bold' },
    { value: '800', label: 'Extra Bold' }
];

export const TextSettings = view(() => {
    const selectedText = textStore.getSelectedText();

    const handleAddText = () => {
        textStore.addTextElement();
    };

    const handleRemoveText = () => {
        if (selectedText) {
            textStore.removeTextElement(selectedText.id);
        }
    };

    const handleTextChange = (value: string) => {
        if (selectedText) {
            textStore.updateTextElement(selectedText.id, { text: value });
        }
    };

    const handleFontSizeChange = (fontSize: number) => {
        if (selectedText) {
            textStore.updateTextElement(selectedText.id, { fontSize });
        }
    };

    const handleFontFamilyChange = (fontFamily: string) => {
        if (selectedText) {
            textStore.updateTextElement(selectedText.id, { fontFamily });
        }
    };

    const handleColorChange = (color: string) => {
        if (selectedText) {
            textStore.updateTextElement(selectedText.id, { color });
        }
    };

    const handleFontWeightChange = (fontWeight: string) => {
        if (selectedText) {
            textStore.updateTextElement(selectedText.id, { fontWeight });
        }
    };

    const handleTextAlignChange = (textAlign: 'left' | 'center' | 'right') => {
        if (selectedText) {
            textStore.updateTextElement(selectedText.id, { textAlign });
        }
    };

    return (
        <div className="text-settings">
            {/* Add/Remove Text Controls */}
            <div className="text-controls" style={{ marginBottom: '16px' }}>
                <button 
                    className="btn btn-primary btn-sm"
                    onClick={handleAddText}
                    style={{ marginRight: '8px' }}
                >
                    <FaPlus style={{ marginRight: '4px' }} />
                    Add Text
                </button>
                
                {selectedText && (
                    <button 
                        className="btn btn-danger btn-sm"
                        onClick={handleRemoveText}
                    >
                        <FaTrash style={{ marginRight: '4px' }} />
                        Remove
                    </button>
                )}
            </div>

            {/* Text List */}
            {textStore.textElements.length > 0 && (
                <div className="text-list" style={{ marginBottom: '16px' }}>
                    <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                        Text Elements:
                    </label>
                    {textStore.textElements.map((textElement) => (
                        <div 
                            key={textElement.id}
                            className={`text-element-item ${textElement.isSelected ? 'selected' : ''}`}
                            onClick={() => textStore.selectTextElement(textElement.id)}
                            style={{
                                padding: '8px',
                                margin: '4px 0',
                                border: textElement.isSelected ? '2px solid #6366f1' : '1px solid #e5e7eb',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '12px',
                                backgroundColor: textElement.isSelected ? '#f0f9ff' : '#fff'
                            }}
                        >
                            {textElement.text.length > 20 
                                ? textElement.text.substring(0, 20) + '...' 
                                : textElement.text
                            }
                        </div>
                    ))}
                </div>
            )}

            {/* Text Editing Controls */}
            {selectedText && (
                <div className="text-editor">
                    {/* Text Content */}
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            <FaFont style={{ marginRight: '4px' }} />
                            Text Content:
                        </label>
                        <textarea
                            className="form-control"
                            value={selectedText.text}
                            onChange={(e) => handleTextChange(e.target.value)}
                            placeholder="Enter your text here..."
                            rows={3}
                            style={{ fontSize: '14px' }}
                        />
                    </div>

                    {/* Font Size */}
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            Font Size: {selectedText.fontSize}px
                        </label>
                        <input
                            type="range"
                            className="form-range"
                            min="8"
                            max="200"
                            value={selectedText.fontSize}
                            onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                        />
                        <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
                            Range: 8px - 200px
                        </div>
                    </div>

                    {/* Font Family */}
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            Font Family:
                        </label>
                        <select
                            className="form-select"
                            value={selectedText.fontFamily}
                            onChange={(e) => handleFontFamilyChange(e.target.value)}
                        >
                            {fontFamilies.map((font) => (
                                <option key={font} value={font}>
                                    {font.split(',')[0]}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Font Weight */}
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            Font Weight:
                        </label>
                        <select
                            className="form-select"
                            value={selectedText.fontWeight}
                            onChange={(e) => handleFontWeightChange(e.target.value)}
                        >
                            {fontWeights.map((weight) => (
                                <option key={weight.value} value={weight.value}>
                                    {weight.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Text Alignment */}
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            Text Alignment:
                        </label>
                        <div className="btn-group btn-group-sm w-100">
                            <button
                                className={`btn ${selectedText.textAlign === 'left' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleTextAlignChange('left')}
                            >
                                <FaAlignLeft />
                            </button>
                            <button
                                className={`btn ${selectedText.textAlign === 'center' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleTextAlignChange('center')}
                            >
                                <FaAlignCenter />
                            </button>
                            <button
                                className={`btn ${selectedText.textAlign === 'right' ? 'btn-primary' : 'btn-outline-primary'}`}
                                onClick={() => handleTextAlignChange('right')}
                            >
                                <FaAlignRight />
                            </button>
                        </div>
                    </div>

                    {/* Text Color */}
                    <div className="form-group" style={{ marginBottom: '16px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', display: 'block' }}>
                            <FaPalette style={{ marginRight: '4px' }} />
                            Text Color:
                        </label>
                        <ColorPicker
                            initialColor={selectedText.color}
                            onColorChange={(color => {
                                handleColorChange(rgba2hexa(color));
                                return {};
                            })}
                        />
                    </div>

                </div>
            )}

            {textStore.textElements.length === 0 && (
                <div style={{ 
                    textAlign: 'center', 
                    color: '#6b7280', 
                    padding: '24px',
                    fontSize: '14px'
                }}>
                    Click "Add Text" to start adding text to your mockup
                </div>
            )}
        </div>
    );
});
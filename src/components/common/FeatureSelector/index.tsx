import React from "react";
import {view} from "@risingstack/react-easy-state";
import {FaMobile, FaDesktop, FaPalette, FaFont, FaArrowRight, FaTimes} from "react-icons/fa";
import {styles} from "./styles";

interface FeatureSelectorProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectMockup: () => void;
    onSelectTextBehindImage: () => void;
}

export const FeatureSelector = view(({isOpen, onClose, onSelectMockup, onSelectTextBehindImage}: FeatureSelectorProps) => {
    if (!isOpen) return null;

    return (
        <div className={styles()}>
            <div className="modal-overlay" onClick={onClose}>
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    <div className="modal-header">
                        <h2>Choose Your Tool</h2>
                        <button className="close-button" onClick={onClose}>
                            <FaTimes />
                        </button>
                    </div>
                    
                    <div className="feature-options">
                        <div className="feature-option" onClick={onSelectMockup}>
                            <div className="feature-icon">
                                <FaDesktop />
                                <FaMobile />
                            </div>
                            <div className="feature-info">
                                <h3>Magic Mockup</h3>
                                <p>Create stunning device mockups from screenshots and videos. Transform ordinary images into professional phone, browser, and tablet mockups.</p>
                                <div className="feature-highlights">
                                    <span><FaPalette /> Device frames</span>
                                    <span><FaDesktop /> Custom styling</span>
                                    <span><FaMobile /> Multiple formats</span>
                                </div>
                            </div>
                            <div className="feature-action">
                                <FaArrowRight />
                            </div>
                        </div>

                        <div className="feature-option" onClick={onSelectTextBehindImage}>
                            <div className="feature-icon">
                                <FaFont />
                            </div>
                            <div className="feature-info">
                                <h3>Text Behind Image</h3>
                                <p>Create stunning text-behind-image designs easily. Add stylish text effects that appear to go behind your images for eye-catching designs.</p>
                                <div className="feature-highlights">
                                    <span><FaFont /> 3D text effects</span>
                                    <span><FaPalette /> Custom styling</span>
                                    <span><FaDesktop /> Background removal</span>
                                </div>
                            </div>
                            <div className="feature-action">
                                <FaArrowRight />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});
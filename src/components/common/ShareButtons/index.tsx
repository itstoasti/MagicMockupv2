import {SocialProviders} from "../../../types";
import {RiFacebookCircleLine, RiTwitterLine, RiShareLine, RiArrowDropDownLine} from "react-icons/all";
import React, {useState, useEffect, useRef} from "react";
import {css} from "emotion";
import {view} from "@risingstack/react-easy-state";
import {app} from "../../../stores/appStore";
import {ImageFormats} from "../../../types";
import * as domtoimage from "dom-to-image";

const styles = css`
  text-align: center;
  position: relative;
  display: inline-block;

  .share-button {
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 5px;
    
    &:hover {
      opacity: 0.8;
      transform: scale(1.05);
    }

    svg {
      fill: #fff;
      width: 30px;
      height: 30px;
    }
  }

  .dropdown {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: #2a2a2a;
    border-radius: 8px;
    padding: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    min-width: 120px;
    margin-top: 8px;

    &::before {
      content: '';
      position: absolute;
      top: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #2a2a2a;
    }
  }

  .dropdown-item {
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    padding: 8px 12px;
    border-radius: 4px;
    color: #fff;
    font-size: 14px;
    
    &:hover {
      background: #3a3a3a;
    }

    svg {
      fill: #fff;
      width: 20px;
      height: 20px;
    }
  }
  
  @media (max-width: 768px) {
    .share-button svg {
      width: 24px;
      height: 24px;
    }
    
    .dropdown {
      left: auto;
      right: 0;
      transform: none;
      min-width: 140px;
    }
  }
  
  @media (max-width: 480px) {
    .share-button svg {
      width: 20px;
      height: 20px;
    }
    
    .dropdown {
      right: 0;
      left: auto;
      transform: none;
      min-width: 120px;
      font-size: 12px;
    }
    
    .dropdown-item {
      padding: 6px 8px;
      font-size: 12px;
      
      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
`

export const ShareButtons = view(() => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);
    const copyMockupToClipboard = async (): Promise<boolean> => {
        if (!(app.imageData || app.videoData)) {
            return false;
        }

        let wasDownloadMode = false;
        
        try {
            const canvas = document.getElementById('canvas');
            if (!canvas) {
                return false;
            }

            // Set download mode to get the full quality version like the regular export
            wasDownloadMode = app.isDownloadMode;
            app.isDownloadMode = true;

            // Wait a moment for the DOM to update with download mode styles
            await new Promise(resolve => setTimeout(resolve, 100));

            // Use the same approach as the regular copy function
            const blob = await domtoimage.toBlob(canvas);

            // Copy to clipboard
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ]);

            return true;
        } catch (error) {
            console.error('Failed to copy mockup to clipboard:', error);
            return false;
        } finally {
            // Always reset download mode, even if component is unmounting
            try {
                app.isDownloadMode = wasDownloadMode;
            } catch (e) {
                // Ignore errors if component is unmounted
            }
        }
    };

    const handleShareClick = async (provider: SocialProviders) => {
        if (!(app.imageData || app.videoData)) {
            alert('Please upload an image first to create a mockup!');
            return;
        }

        if (isProcessing) {
            return; // Prevent double-clicks
        }

        setIsProcessing(true);

        try {
            const platformName = provider === SocialProviders.Facebook ? 'Facebook' : 'Twitter';
            
            // For video mockups, skip copying and go directly to social media
            if (app.isVideo) {
                alert(`Opening ${platformName}...\n\nFor video mockups, please use the "Download Video Mockup" button first, then upload the downloaded video file to ${platformName}.`);
                
                // Open social media platform
                const url = provider === SocialProviders.Facebook ? 'https://www.facebook.com' : 'https://twitter.com/compose/tweet';
                window.open(url, '_blank');
            } else {
                // For image mockups, copy to clipboard as before
                const copied = await copyMockupToClipboard();
                
                if (!copied) {
                    alert('Failed to copy mockup to clipboard. Please try again.');
                    setIsProcessing(false);
                    return;
                }

                // Show success message and open platform
                alert(`✅ Mockup copied to clipboard! Opening ${platformName}...\n\nSimply paste (Ctrl+V) in the composer to add your mockup image.`);
                
                // Open social media platform
                const url = provider === SocialProviders.Facebook ? 'https://www.facebook.com' : 'https://twitter.com/compose/tweet';
                window.open(url, '_blank');
            }
            
        } catch (error) {
            alert('Error sharing mockup. Please try again.');
        }
        
        setIsProcessing(false);
    }


    return (
        <div className={styles} ref={dropdownRef}>
            {/* Always show dropdown with Facebook/Twitter options */}
            <button 
                className="share-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                disabled={isProcessing}
                style={{ opacity: isProcessing ? 0.6 : 1 }}
            >
                <RiShareLine/>
                <RiArrowDropDownLine/>
            </button>
            
            {isDropdownOpen && (
                <div className="dropdown">
                    <button 
                        className="dropdown-item"
                        onClick={() => {
                            handleShareClick(SocialProviders.Facebook);
                            setIsDropdownOpen(false);
                        }}
                        disabled={isProcessing}
                    >
                        <RiFacebookCircleLine/>
                        Facebook
                    </button>
                    <button 
                        className="dropdown-item"
                        onClick={() => {
                            handleShareClick(SocialProviders.Twitter);
                            setIsDropdownOpen(false);
                        }}
                        disabled={isProcessing}
                    >
                        <RiTwitterLine/>
                        Twitter
                    </button>
                </div>
            )}
        </div>
    )
});
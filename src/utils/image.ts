import domtoimage from "dom-to-image";
import {RGBColor} from "react-color";
import {app} from "../stores/appStore";
import {ImageFormats} from "../types";
import {validURL} from "./url";

// Focus on making controls responsive rather than exact state restoration
const restoreVideoStates = (videoStates: Array<{element: HTMLVideoElement, muted: boolean, volume: number, paused: boolean, currentTime: number}>, context: string) => {
    console.log(`[${context}] Restoring video states for`, videoStates.length, 'videos');
    
    videoStates.forEach((state, index) => {
        console.log(`[${context}] Restoring video ${index}:`, {
            originalMuted: state.muted,
            originalVolume: state.volume,
            originalPaused: state.paused,
            currentMuted: state.element.muted,
            currentVolume: state.element.volume
        });
        
        // Instead of restoring exact state, focus on making controls work
        // Set reasonable defaults that user can change
        state.element.muted = false;  // Start unmuted so user can hear
        state.element.volume = state.volume > 0 ? state.volume : 0.5;  // Reasonable volume
        state.element.currentTime = state.currentTime;
        
        // Ensure controls are enabled and interactive
        state.element.controls = true;
        state.element.setAttribute('controls', 'true');
        
        // Test if we can actually change the mute state
        setTimeout(() => {
            const testMuted = state.element.muted;
            state.element.muted = !testMuted;
            const changeWorked = state.element.muted !== testMuted;
            
            console.log(`[${context}] Video ${index} controls test:`, {
                canChangeMute: changeWorked,
                currentMuted: state.element.muted,
                volume: state.element.volume
            });
            
            // Set back to unmuted for user preference
            state.element.muted = false;
        }, 100);
        
        // Restore playback state
        if (!state.paused) {
            state.element.play().catch(e => console.log('Could not resume video:', e));
        } else {
            state.element.pause();
        }
        
        console.log(`[${context}] Video ${index} set to unmuted with responsive controls`);
    });
};

export const checkForImageFromLocalstorageUrlOrPaste = () => {
    const handlePaste = (e: ClipboardEvent | Event) => {
        retrieveImageFromClipboardAsBase64(e, (base64Data: string) => {
            app.imageData = base64Data;
        });
    };
    window.addEventListener("paste", handlePaste, false);

    // Allow passing an image URL as a query param
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrl = urlParams.get('image');
    if (imageUrl && validURL(imageUrl)) {
        loadImageFromImageUrl(imageUrl).then(imageData => {
            app.setImageData(imageData as string);
        })
    }

    // If a user is coming from the Chrome extension the image is in localstorage
    if (sessionStorage.hasOwnProperty('imageFromPost')) {
        app.setImageData(sessionStorage.getItem('imageFromPost'));
        sessionStorage.removeItem('imageFromPost');
    }

    return () => window.removeEventListener("paste", handlePaste)
}

export const hex2rgba = (hex: string, alpha: number = 1): RGBColor => {
    const [r, g, b] = (hex.length === 3)
        ? hex.match(/\w/g).map(x => parseInt(x + x, 16))
        : hex.match(/\w\w/g).map(x => parseInt(x, 16))

    return {
        r: r,
        g: g,
        b: b,
        a: alpha
    }
};

export const rgba2hexa = (color: RGBColor) => {
    const r = color.r.toString(16);
    const g = color.g.toString(16);
    const b = color.b.toString(16);
    const a = Math.round(color.a * 255).toString(16);
    const pad = (str: string) => str.length === 1 ? '0' + str : str;

    return "#" + pad(r) + pad(g) + pad(b) + pad(a);
};

export const copyImageToClipboard = (elementToDownload: HTMLElement): Promise<any> => {
    const setToClipboard = async (blob: Blob) => {
        const data = [new ClipboardItem({[blob.type]: blob})]
        return navigator.clipboard.write(data)
    }

    // Check if this is a video mockup
    const hasVideo = elementToDownload.querySelector('video');
    if (hasVideo) {
        // For video mockups, create and copy the full video mockup
        return copyVideoMockupToClipboard();
    }

    // For image mockups, use the original logic
    return prepareVideoElementsForCapture(elementToDownload).then(() => {
        return domtoimage.toBlob(elementToDownload, {
            filter: (node) => {
                // Handle video elements specially
                if (node.tagName === 'VIDEO') {
                    return true;
                }
                return true;
            },
            useCORS: true,
            allowTaint: true
        }).then((data: Blob) => setToClipboard(data));
    });
}

// Copy video mockup to clipboard
export const copyVideoMockupToClipboard = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Creating video mockup for clipboard...');
            
            // Get the mockup element and video
            const mockupElement = document.getElementById('canvas') as HTMLElement;
            const videoElement = mockupElement.querySelector('video') as HTMLVideoElement;
            
            if (!mockupElement || !videoElement) {
                alert('Could not find mockup or video element.');
                reject(new Error('Elements not found'));
                return;
            }

            // Wait for video to be loaded
            if (videoElement.readyState < 2) {
                await new Promise(resolve => {
                    videoElement.addEventListener('loadeddata', resolve, { once: true });
                });
            }

            const videoDuration = videoElement.duration;
            if (!videoDuration || videoDuration === Infinity || isNaN(videoDuration)) {
                alert('Cannot determine video duration. Please try a different video.');
                reject(new Error('Invalid video duration'));
                return;
            }

            // Get mockup dimensions
            const canvasDimensions = app.getCanvasDimensions();
            const canvasWidth = canvasDimensions.width;
            const canvasHeight = canvasDimensions.height;

            // Set download mode
            app.isDownloadMode = true;

            // Show progress indicator
            const progressDiv = document.createElement('div');
            progressDiv.innerHTML = `
                <div style="
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #10b981;
                    color: white;
                    padding: 16px 24px;
                    border-radius: 8px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                    z-index: 10000;
                    max-width: 400px;
                    text-align: center;
                ">
                    📋 Creating video for clipboard... <br>
                    <div style="
                        width: 100%;
                        height: 4px;
                        background: rgba(255,255,255,0.3);
                        border-radius: 2px;
                        margin-top: 8px;
                        overflow: hidden;
                    ">
                        <div id="copy-progress-bar" style="
                            height: 100%;
                            background: white;
                            width: 0%;
                            transition: width 0.1s linear;
                        "></div>
                    </div>
                </div>
            `;
            document.body.appendChild(progressDiv);
            const progressBar = progressDiv.querySelector('#copy-progress-bar') as HTMLElement;

            // Create recording canvas
            const recordingCanvas = document.createElement('canvas');
            const recordingCtx = recordingCanvas.getContext('2d')!;
            recordingCanvas.width = canvasWidth;
            recordingCanvas.height = canvasHeight;

            // Create static frame template
            const frameTemplate = await createStaticFrameTemplate(mockupElement, canvasWidth, canvasHeight);

            // Capture canvas video stream and add audio from original video
            const canvasStream = recordingCanvas.captureStream(30);
            let finalStream = canvasStream;
            
            // Try to add audio from the original video to preserve sound in final file
            try {
                // First, temporarily unmute the video to capture its audio
                const wasVideoMuted = videoElement.muted;
                const wasVideoVolume = videoElement.volume;
                videoElement.muted = false;
                videoElement.volume = 1;
                
                const videoStream = (videoElement as any).captureStream ? 
                    (videoElement as any).captureStream() : null;
                    
                // Immediately mute it back so user doesn't hear it
                videoElement.muted = true;
                videoElement.volume = 0;
                    
                if (videoStream && videoStream.getAudioTracks().length > 0) {
                    const audioTrack = videoStream.getAudioTracks()[0];
                    finalStream = new MediaStream([
                        ...canvasStream.getVideoTracks(),
                        audioTrack
                    ]);
                    console.log('Audio track captured and added to recording stream');
                    console.log('Final stream has video tracks:', finalStream.getVideoTracks().length);
                    console.log('Final stream has audio tracks:', finalStream.getAudioTracks().length);
                } else {
                    console.log('No audio tracks found in video stream');
                }
            } catch (e) {
                console.log('Could not capture audio from video, final recording will be silent:', e);
            }
            
            const supportedFormats = {
                mp4: MediaRecorder.isTypeSupported('video/mp4'),
                webmVP9: MediaRecorder.isTypeSupported('video/webm; codecs=vp9'),
                webm: MediaRecorder.isTypeSupported('video/webm')
            };

            console.log('Supported video formats:', supportedFormats);

            // Prefer MP4 if supported, otherwise fall back to WebM
            const mimeType = supportedFormats.mp4
                ? 'video/mp4'
                : supportedFormats.webmVP9
                ? 'video/webm; codecs=vp9'
                : 'video/webm';

            console.log('Using video format:', mimeType);
            
            const mediaRecorder = new MediaRecorder(finalStream, { mimeType });

            const chunks: Blob[] = [];
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                // Use enhanced video state restoration
                try {
                    restoreVideoStates(videoStates, 'CopyVideoMockup');
                    
                    // Specifically ensure the main video element is properly restored
                    if (videoElement) {
                        // Small delay then force a play/pause cycle to refresh controls
                        setTimeout(() => {
                            try {
                                const wasPlaying = !videoElement.paused;
                                videoElement.pause();
                                if (wasPlaying && !videoElement.muted) {
                                    videoElement.play().catch(e => console.log('Could not resume video playback:', e));
                                }
                            } catch (e) {
                                console.log('Could not refresh video controls:', e);
                            }
                        }, 100);
                    }
                    
                    console.log('Video states restored successfully');
                } catch (e) {
                    console.error('Error restoring video states:', e);
                }
                
                document.body.removeChild(progressDiv);
                app.isDownloadMode = false;

                if (chunks.length === 0) {
                    alert('No video data was recorded. Please try again.');
                    reject(new Error('No video data recorded'));
                    return;
                }

                try {
                    const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
                    
                    let clipboardSuccess = false;
                    try {
                        const clipboardItem = new ClipboardItem({
                            [blob.type]: blob
                        });
                        await navigator.clipboard.write([clipboardItem]);
                        clipboardSuccess = true;
                        console.log('Video mockup copied to clipboard successfully');
                    } catch (clipboardError) {
                        console.log('Video clipboard not supported, falling back to download');
                    }
                    
                    if (clipboardSuccess) {
                        const successDiv = document.createElement('div');
                        successDiv.innerHTML = `
                            <div style="
                                position: fixed;
                                top: 20px;
                                left: 50%;
                                transform: translateX(-50%);
                                background: #10b981;
                                color: white;
                                padding: 12px 20px;
                                border-radius: 8px;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                font-size: 14px;
                                font-weight: 500;
                                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                                z-index: 10000;
                            ">
                                ✅ Video mockup copied to clipboard!
                            </div>
                        `;
                        document.body.appendChild(successDiv);
                        
                        setTimeout(() => {
                            document.body.removeChild(successDiv);
                        }, 3000);
                    } else {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        // Use appropriate file extension based on the recorded format
                        const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
                        link.download = `magicmockup-video-${Date.now()}.${extension}`;
                        link.href = url;
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        
                        setTimeout(() => {
                            document.body.removeChild(link);
                            URL.revokeObjectURL(url);
                        }, 1000);
                        
                        const downloadDiv = document.createElement('div');
                        downloadDiv.innerHTML = `
                            <div style="
                                position: fixed;
                                top: 20px;
                                left: 50%;
                                transform: translateX(-50%);
                                background: #2563eb;
                                color: white;
                                padding: 12px 20px;
                                border-radius: 8px;
                                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                                font-size: 14px;
                                font-weight: 500;
                                box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                                z-index: 10000;
                                text-align: center;
                            ">
                                📥 Video mockup downloaded!<br>
                                <small style="opacity: 0.9;">Your browser doesn't support copying videos</small>
                            </div>
                        `;
                        document.body.appendChild(downloadDiv);
                        
                        setTimeout(() => {
                            document.body.removeChild(downloadDiv);
                        }, 4000);
                    }
                    
                    resolve();
                } catch (error) {
                    console.error('Failed to create video mockup:', error);
                    reject(error);
                }
            };

            // CRITICAL: Prevent ALL audio during export by muting ALL videos
            const allVideos = document.querySelectorAll('video');
            const videoStates: Array<{element: HTMLVideoElement, muted: boolean, volume: number, paused: boolean, currentTime: number}> = [];
            
            allVideos.forEach(video => {
                videoStates.push({
                    element: video,
                    muted: video.muted,
                    volume: video.volume,
                    paused: video.paused,
                    currentTime: video.currentTime
                });
                video.muted = true;
                video.volume = 0;
                // Reset video to beginning for recording
                video.currentTime = 0;
            });
            
            // Wait a moment for video to seek to beginning
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Start recording
            mediaRecorder.start(100);
            
            const startTime = Date.now();
            let isRecording = true;
            const frameRate = 30;
            const frameDuration = 1000 / frameRate;
            
            // Simple recording loop with muted video
            const renderFrame = () => {
                if (!isRecording) return;

                const elapsed = (Date.now() - startTime) / 1000;
                const progress = Math.min((elapsed / videoDuration) * 100, 100);
                
                if (progressBar) {
                    progressBar.style.width = progress + '%';
                }
                
                // Clear recording canvas
                recordingCtx.clearRect(0, 0, canvasWidth, canvasHeight);
                
                // Draw frame template
                recordingCtx.drawImage(frameTemplate, 0, 0);
                
                // Draw video at current position
                const videoRect = videoElement.getBoundingClientRect();
                const mockupRect = mockupElement.getBoundingClientRect();
                
                const scaleX = canvasWidth / mockupRect.width;
                const scaleY = canvasHeight / mockupRect.height;
                
                const videoX = (videoRect.left - mockupRect.left) * scaleX;
                const videoY = (videoRect.top - mockupRect.top) * scaleY;
                const videoWidth = videoRect.width * scaleX;
                const videoHeight = videoRect.height * scaleY;
                
                // Draw current video frame with proper clipping to respect device border radius
                drawVideoFrameWithClipping(recordingCtx, videoElement, videoX, videoY, videoWidth, videoHeight, mockupElement);

                if (elapsed < videoDuration) {
                    setTimeout(renderFrame, frameDuration);
                } else {
                    isRecording = false;
                    // Use enhanced video state restoration
                    restoreVideoStates(videoStates, 'DownloadVideoMockup');
                    mediaRecorder.stop();
                }
            };

            renderFrame();

        } catch (error) {
            console.error('Video mockup copy error:', error);
            app.isDownloadMode = false;
            
            // Force restore video state on error
            
            // Try to restore video state even on error
            try {
                const videoEl = document.querySelector('video') as HTMLVideoElement;
                if (videoEl) {
                    videoEl.muted = false; // Reset to default unmuted
                    videoEl.volume = 1; // Reset to default volume
                    videoEl.removeAttribute('muted');
                    videoEl.play(); // Resume playback
                }
            } catch (e) {
                console.warn('Could not restore video state on error:', e);
            }
            
            alert('Error creating video mockup for clipboard. Please try again.');
            reject(error);
        }
    });
};

// Create video mockup by directly compositing frame and video
export const downloadVideoMockup = (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Starting video mockup recording...');
            
            // Get the mockup element and video
            const mockupElement = document.getElementById('canvas') as HTMLElement;
            const videoElement = mockupElement.querySelector('video') as HTMLVideoElement;
            
            if (!mockupElement || !videoElement) {
                alert('Could not find mockup or video element.');
                reject(new Error('Elements not found'));
                return;
            }

            // Wait for video to be loaded
            if (videoElement.readyState < 2) {
                await new Promise(resolve => {
                    videoElement.addEventListener('loadeddata', resolve, { once: true });
                });
            }

            const videoDuration = videoElement.duration;
            if (!videoDuration || videoDuration === Infinity || isNaN(videoDuration)) {
                alert('Cannot determine video duration. Please try a different video.');
                reject(new Error('Invalid video duration'));
                return;
            }

            // Get mockup dimensions
            const canvasDimensions = app.getCanvasDimensions();
            const canvasWidth = canvasDimensions.width;
            const canvasHeight = canvasDimensions.height;

            // Set download mode
            app.isDownloadMode = true;

            // Show progress indicator
            const progressDiv = document.createElement('div');
            progressDiv.innerHTML = `
                <div style="
                    position: fixed;
                    top: 20px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: #2563eb;
                    color: white;
                    padding: 16px 24px;
                    border-radius: 8px;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
                    z-index: 10000;
                    max-width: 400px;
                    text-align: center;
                ">
                    📹 Creating video mockup... <br>
                    <div style="
                        width: 100%;
                        height: 4px;
                        background: rgba(255,255,255,0.3);
                        border-radius: 2px;
                        margin-top: 8px;
                        overflow: hidden;
                    ">
                        <div id="video-progress-bar" style="
                            height: 100%;
                            background: white;
                            width: 0%;
                            transition: width 0.1s linear;
                        "></div>
                    </div>
                </div>
            `;
            document.body.appendChild(progressDiv);
            const progressBar = progressDiv.querySelector('#video-progress-bar') as HTMLElement;

            // Create recording canvas
            const recordingCanvas = document.createElement('canvas');
            const recordingCtx = recordingCanvas.getContext('2d')!;
            recordingCanvas.width = canvasWidth;
            recordingCanvas.height = canvasHeight;

            // Create static frame template (capture the frame without video)
            const frameTemplate = await createStaticFrameTemplate(mockupElement, canvasWidth, canvasHeight);

            // Capture canvas video stream and add audio from original video
            const canvasStream = recordingCanvas.captureStream(30);
            let finalStream = canvasStream;
            
            // Try to add audio from the original video to preserve sound in final file
            try {
                // First, temporarily unmute the video to capture its audio
                const wasVideoMuted = videoElement.muted;
                const wasVideoVolume = videoElement.volume;
                videoElement.muted = false;
                videoElement.volume = 1;
                
                const videoStream = (videoElement as any).captureStream ? 
                    (videoElement as any).captureStream() : null;
                    
                // Immediately mute it back so user doesn't hear it
                videoElement.muted = true;
                videoElement.volume = 0;
                    
                if (videoStream && videoStream.getAudioTracks().length > 0) {
                    const audioTrack = videoStream.getAudioTracks()[0];
                    finalStream = new MediaStream([
                        ...canvasStream.getVideoTracks(),
                        audioTrack
                    ]);
                    console.log('Audio track captured and added to recording stream');
                    console.log('Final stream has video tracks:', finalStream.getVideoTracks().length);
                    console.log('Final stream has audio tracks:', finalStream.getAudioTracks().length);
                } else {
                    console.log('No audio tracks found in video stream');
                }
            } catch (e) {
                console.log('Could not capture audio from video, final recording will be silent:', e);
            }
            
            const supportedFormats = {
                mp4: MediaRecorder.isTypeSupported('video/mp4'),
                webmVP9: MediaRecorder.isTypeSupported('video/webm; codecs=vp9'),
                webm: MediaRecorder.isTypeSupported('video/webm')
            };

            console.log('Supported video formats:', supportedFormats);

            // Prefer MP4 if supported, otherwise fall back to WebM
            const mimeType = supportedFormats.mp4
                ? 'video/mp4'
                : supportedFormats.webmVP9
                ? 'video/webm; codecs=vp9'
                : 'video/webm';

            console.log('Using video format:', mimeType);
            
            const mediaRecorder = new MediaRecorder(finalStream, { mimeType });

            const chunks: Blob[] = [];
            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                // Use enhanced video state restoration
                try {
                    restoreVideoStates(videoStates, 'CopyVideoMockup');
                    
                    // Specifically ensure the main video element is properly restored
                    if (videoElement) {
                        // Small delay then force a play/pause cycle to refresh controls
                        setTimeout(() => {
                            try {
                                const wasPlaying = !videoElement.paused;
                                videoElement.pause();
                                if (wasPlaying && !videoElement.muted) {
                                    videoElement.play().catch(e => console.log('Could not resume video playback:', e));
                                }
                            } catch (e) {
                                console.log('Could not refresh video controls:', e);
                            }
                        }, 100);
                    }
                    
                    console.log('Video states restored successfully');
                } catch (e) {
                    console.error('Error restoring video states:', e);
                }
                
                document.body.removeChild(progressDiv);
                app.isDownloadMode = false;

                if (chunks.length === 0) {
                    alert('No video data was recorded. Please try again.');
                    reject(new Error('No video data recorded'));
                    return;
                }

                const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
                const url = URL.createObjectURL(blob);

                const link = document.createElement('a');
                // Use appropriate file extension based on the recorded format
                const extension = mimeType.includes('mp4') ? 'mp4' : 'webm';
                link.download = `magicmockup-video-${Date.now()}.${extension}`;
                link.href = url;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();

                setTimeout(() => {
                    document.body.removeChild(link);
                    URL.revokeObjectURL(url);
                }, 1000);

                console.log(`Video mockup download complete (${extension.toUpperCase()})`);
                resolve();
            };

            // Reset main video to beginning before starting audio muting and recording
            videoElement.currentTime = 0;
            await new Promise(resolve => {
                const handleSeeked = () => {
                    videoElement.removeEventListener('seeked', handleSeeked);
                    resolve(undefined);
                };
                videoElement.addEventListener('seeked', handleSeeked);
                // Fallback timeout in case seeked event doesn't fire
                setTimeout(() => {
                    videoElement.removeEventListener('seeked', handleSeeked);
                    resolve(undefined);
                }, 500);
            });

            // CRITICAL: Prevent ALL audio during export by muting ALL videos
            const allVideos = document.querySelectorAll('video');
            const videoStates: Array<{element: HTMLVideoElement, muted: boolean, volume: number, paused: boolean, currentTime: number}> = [];
            
            allVideos.forEach(video => {
                videoStates.push({
                    element: video,
                    muted: video.muted,
                    volume: video.volume,
                    paused: video.paused,
                    currentTime: video.currentTime
                });
                video.muted = true;
                video.volume = 0;
                // Reset video to beginning for recording
                video.currentTime = 0;
            });
            
            // Wait a moment for video to seek to beginning
            await new Promise(resolve => setTimeout(resolve, 200));
            
            // Start recording
            mediaRecorder.start(100);
            
            const startTime = Date.now();
            let isRecording = true;
            const frameRate = 30;
            const frameDuration = 1000 / frameRate;
            
            // Simple recording loop with muted video
            const renderFrame = () => {
                if (!isRecording) return;

                const elapsed = (Date.now() - startTime) / 1000;
                const progress = Math.min((elapsed / videoDuration) * 100, 100);
                
                if (progressBar) {
                    progressBar.style.width = progress + '%';
                }
                
                // Clear recording canvas
                recordingCtx.clearRect(0, 0, canvasWidth, canvasHeight);
                
                // Draw frame template
                recordingCtx.drawImage(frameTemplate, 0, 0);
                
                // Draw video at current position
                const videoRect = videoElement.getBoundingClientRect();
                const mockupRect = mockupElement.getBoundingClientRect();
                
                const scaleX = canvasWidth / mockupRect.width;
                const scaleY = canvasHeight / mockupRect.height;
                
                const videoX = (videoRect.left - mockupRect.left) * scaleX;
                const videoY = (videoRect.top - mockupRect.top) * scaleY;
                const videoWidth = videoRect.width * scaleX;
                const videoHeight = videoRect.height * scaleY;
                
                // Draw current video frame with proper clipping to respect device border radius
                drawVideoFrameWithClipping(recordingCtx, videoElement, videoX, videoY, videoWidth, videoHeight, mockupElement);

                if (elapsed < videoDuration) {
                    setTimeout(renderFrame, frameDuration);
                } else {
                    isRecording = false;
                    // Use enhanced video state restoration
                    restoreVideoStates(videoStates, 'DownloadVideoMockup');
                    mediaRecorder.stop();
                }
            };

            renderFrame();

        } catch (error) {
            console.error('Video mockup error:', error);
            app.isDownloadMode = false;
            
            // Force restore video state on error
            
            // Try to restore video state even on error
            try {
                const videoEl = document.querySelector('video') as HTMLVideoElement;
                if (videoEl) {
                    videoEl.muted = false; // Reset to default unmuted
                    videoEl.volume = 1; // Reset to default volume
                    videoEl.removeAttribute('muted');
                    videoEl.play(); // Resume playback
                }
            } catch (e) {
                console.warn('Could not restore video state on error:', e);
            }
            
            alert('Error creating video mockup. Please try again.');
            reject(error);
        }
    });
};


export const downloadVideo = (videoUrl: string): Promise<void> => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Starting video download for:', videoUrl);
            
            // If it's a blob URL, we need to fetch it first
            if (videoUrl.startsWith('blob:')) {
                console.log('Fetching blob URL...');
                const response = await fetch(videoUrl);
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch video: ${response.status}`);
                }
                
                const blob = await response.blob();
                console.log('Blob fetched, size:', blob.size, 'type:', blob.type);
                
                // Determine file extension from blob type
                let extension = 'mp4';
                if (blob.type.includes('webm')) extension = 'webm';
                else if (blob.type.includes('mov')) extension = 'mov';
                else if (blob.type.includes('avi')) extension = 'avi';
                
                // Create a new blob URL for download
                const downloadUrl = URL.createObjectURL(blob);
                
                const link = document.createElement('a');
                link.download = `magicmockup.${extension}`;
                link.href = downloadUrl;
                link.style.display = 'none';
                document.body.appendChild(link);
                
                console.log('Triggering download...');
                link.click();
                
                // Clean up
                setTimeout(() => {
                    document.body.removeChild(link);
                    URL.revokeObjectURL(downloadUrl);
                }, 100);
                
            } else {
                console.log('Direct URL download...');
                // For regular URLs, use direct download
                const link = document.createElement('a');
                link.download = 'magicmockup.mp4';
                link.href = videoUrl;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                
                setTimeout(() => {
                    document.body.removeChild(link);
                }, 100);
            }
            
            console.log('Download triggered successfully');
            resolve();
        } catch (error) {
            console.error('Error downloading video:', error);
            reject(error);
        }
    });
};

export const downloadImage = (
    elementToDownload: HTMLElement,
    imageFormat: ImageFormats,
    height: number,
    width: number,
    quality: number = 1,
) => {
    const handleDownload = (dataUrl: string, extension: ImageFormats) => {
        let link = document.createElement('a');
        link.download = `magicmockup.${extension}`;
        link.href = dataUrl;
        link.click();
    };

    const settings = {
        quality: quality, 
        width: width, 
        height: height,
        filter: (node: any) => {
            // Handle video elements specially
            if (node.tagName === 'VIDEO') {
                return true;
            }
            return true;
        },
        useCORS: true,
        allowTaint: true
    };

    // Prepare video elements for capture first
    return prepareVideoElementsForCapture(elementToDownload).then(() => {
        switch (imageFormat) {
            default:
            case ImageFormats.JPEG:
                return domtoimage.toJpeg(elementToDownload, settings)
                    .then((data: string) => handleDownload(data, ImageFormats.JPEG));
            case ImageFormats.PNG:
                return domtoimage.toPng(elementToDownload, settings)
                    .then((data: string) => handleDownload(data, ImageFormats.PNG));
            case ImageFormats.SVG:
                return domtoimage.toSvg(elementToDownload, settings)
                    .then((data: string) => handleDownload(data, ImageFormats.SVG));
        }
    });
};

export const resizeImage = (
    base64Str: string,
    maxWidth: number = 3200,
    maxHeight: number = 3200
): Promise<string> => {
    return new Promise((resolve) => {
        let img = new Image()
        img.src = base64Str
        img.onload = () => {
            let canvas = document.createElement('canvas')
            let width = img.width
            let height = img.height

            if ((width > height) && (width > maxWidth)) {
                height *= maxWidth / width
                width = maxWidth
            } else if (height > maxHeight) {
                width *= maxHeight / height
                height = maxHeight
            }
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL())
        }
    })
}

export const retrieveImageFromClipboardAsBase64 = (pasteEvent: ClipboardEvent | Event, onSuccess: (data: string) => void) => {
    const items = (pasteEvent as ClipboardEvent).clipboardData.items;

    if (!items) {
        return;
    }

    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") === -1) {
            continue;
        }

        const blob = items[i].getAsFile();
        const canvasElement = document.createElement("canvas");
        const ctx = canvasElement.getContext('2d');
        const img = new Image();

        img.onload = function () {
            canvasElement.width = img.width;
            canvasElement.height = img.height;
            ctx.drawImage(img, 0, 0);
            onSuccess(canvasElement.toDataURL("image/jpg"))
        };

        const URLObj = window.URL || window.webkitURL;
        img.src = URLObj.createObjectURL(blob);
    }
};

export const getImageDimensions = (file: string): Promise<{ width: number, height: number }> => {
    return loadImageFromBase64(file).then(img => {
        return {
            width: img.width,
            height: img.height
        }
    })
};

export const loadImageFromBase64 = (imageData: string): Promise<HTMLImageElement> => {
    return new Promise((resolved) => {
        const image = new Image()
        image.onload = function () {
            resolved(image)
        };
        image.src = imageData
    });
}

export const rotateImage = (img: string): Promise<string> => {
    return loadImageFromBase64(img).then(image => {
        const degrees = 90;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = image.height;
        canvas.height = image.width;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.translate(image.height / 2, image.width / 2);
        ctx.rotate(degrees * Math.PI / 180);
        ctx.drawImage(image, -image.width / 2, -image.height / 2);

        return canvas.toDataURL();
    })
};

export const loadImageFromImageUrl = (url: string): Promise<string | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
        fetch(url).then((res) => {
            return res.blob();
        }).then((blob) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.addEventListener("loadend", function () {
                resolve(reader.result)
            });
        }).catch((err) => {
            reject(err);
        })
    });
}

export const getVideoDimensions = (videoUrl: string): Promise<{ width: number, height: number }> => {
    return new Promise((resolve, reject) => {
        const video = document.createElement('video');
        
        video.addEventListener('loadedmetadata', () => {
            resolve({
                width: video.videoWidth,
                height: video.videoHeight
            });
        });
        
        video.addEventListener('error', () => {
            reject(new Error('Failed to load video'));
        });
        
        video.src = videoUrl;
        video.load();
    });
}

// Enhanced function to prepare video elements for capture
export const prepareVideoElementsForCapture = (element: HTMLElement): Promise<void> => {
    return new Promise((resolve) => {
        const videos = element.querySelectorAll('video');
        if (videos.length === 0) {
            resolve();
            return;
        }

        let readyCount = 0;
        const totalVideos = videos.length;

        videos.forEach((video) => {
            // Ensure video is ready for capture
            if (video.readyState >= 2) { // HAVE_CURRENT_DATA or higher
                readyCount++;
                if (readyCount === totalVideos) {
                    resolve();
                }
            } else {
                video.addEventListener('loadeddata', () => {
                    readyCount++;
                    if (readyCount === totalVideos) {
                        resolve();
                    }
                }, { once: true });
            }
        });
    });
}

// Create a static frame template without video for compositing
const createStaticFrameTemplate = async (mockupElement: HTMLElement, width: number, height: number): Promise<HTMLCanvasElement> => {
    return new Promise(async (resolve, reject) => {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            canvas.width = width;
            canvas.height = height;

            // Find and temporarily hide video element
            const videoElement = mockupElement.querySelector('video') as HTMLVideoElement;
            let originalDisplay = '';
            let originalMuted = true;
            let originalVolume = 0;
            
            if (videoElement) {
                originalDisplay = videoElement.style.display;
                originalMuted = videoElement.muted;
                originalVolume = videoElement.volume;
                
                // CRITICAL: Mute the video completely before hiding to prevent audio
                videoElement.muted = true;
                videoElement.volume = 0;
                videoElement.style.display = 'none';
            }

            // Capture the mockup without video
            const blob = await domtoimage.toBlob(mockupElement, {
                quality: 1,
                width: width,
                height: height,
                useCORS: true,
                allowTaint: true,
                filter: (node) => {
                    // Ensure no video or audio elements are captured
                    if (node.tagName === 'VIDEO' || node.tagName === 'AUDIO') {
                        return false;
                    }
                    return true;
                }
            });

            // Restore video display and audio settings
            if (videoElement) {
                videoElement.style.display = originalDisplay;
                videoElement.muted = originalMuted;
                videoElement.volume = originalVolume;
            }

            // Draw to canvas
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => {
                ctx.drawImage(img, 0, 0, width, height);
                URL.revokeObjectURL(url);
                resolve(canvas);
            };
            img.onerror = () => {
                URL.revokeObjectURL(url);
                reject(new Error('Failed to load frame template'));
            };
            img.src = url;

        } catch (error) {
            reject(error);
        }
    });
}

// Draw video frame with proper clipping to respect device border radius
const drawVideoFrameWithClipping = (ctx: CanvasRenderingContext2D, video: HTMLVideoElement, x: number, y: number, width: number, height: number, mockupElement: HTMLElement) => {
    // Check if this is a device frame (has device-screen class)
    const deviceScreen = mockupElement.querySelector('.device-screen');
    
    if (deviceScreen) {
        // Get the computed border radius
        const computedStyle = window.getComputedStyle(deviceScreen);
        const borderRadiusStr = computedStyle.borderRadius;
        
        // Parse border radius (could be in px)
        const borderRadius = parseFloat(borderRadiusStr) || 0;
        
        if (borderRadius > 0) {
            // Scale the border radius proportionally
            const mockupRect = mockupElement.getBoundingClientRect();
            const screenRect = deviceScreen.getBoundingClientRect();
            const scaleX = width / screenRect.width;
            const scaleY = height / screenRect.height;
            const scaledRadius = borderRadius * Math.min(scaleX, scaleY);
            
            // Create clipping path with rounded corners
            ctx.save();
            ctx.beginPath();
            
            // Create rounded rectangle path
            const radius = Math.min(scaledRadius, width / 2, height / 2);
            ctx.moveTo(x + radius, y);
            ctx.arcTo(x + width, y, x + width, y + height, radius);
            ctx.arcTo(x + width, y + height, x, y + height, radius);
            ctx.arcTo(x, y + height, x, y, radius);
            ctx.arcTo(x, y, x + width, y, radius);
            ctx.closePath();
            
            // Set clipping region
            ctx.clip();
            
            // Draw video within clipped area
            ctx.drawImage(video, x, y, width, height);
            
            ctx.restore();
        } else {
            // No border radius, draw normally
            ctx.drawImage(video, x, y, width, height);
        }
    } else {
        // Not a device frame, draw normally
        ctx.drawImage(video, x, y, width, height);
    }
}
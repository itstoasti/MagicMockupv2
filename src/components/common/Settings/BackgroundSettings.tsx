import React from "react";
import {view} from "@risingstack/react-easy-state";
import {CanvasBackgroundTypes} from "../../../types";
import {app, bgImages} from "../../../stores/appStore";
import {equals} from "../../../utils/misc";
import {ColorPicker} from "../ColorPicker";
import {rgba2hexa} from "../../../utils/image";
import {SettingValue} from "../SettingValue";

export const BackgroundSettings = view(() => {
    const handleBgTypeChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        app.canvasStyles.backgroundType = ((e.target as HTMLElement).innerText as CanvasBackgroundTypes);
    };

    const extractVideoFrameForBackground = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            
            video.addEventListener('loadedmetadata', () => {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                video.currentTime = Math.min(1, video.duration / 2);
            });
            
            video.addEventListener('seeked', () => {
                ctx.drawImage(video, 0, 0);
                const dataUrl = canvas.toDataURL('image/png');
                resolve(dataUrl);
            });
            
            video.addEventListener('error', () => {
                reject(new Error('Failed to load video'));
            });
            
            video.src = URL.createObjectURL(file);
            video.load();
        });
    };

    const handleBgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const isVideo = file.type.startsWith('video/');
        
        if (isVideo) {
            extractVideoFrameForBackground(file)
                .then((dataUrl) => {
                    app.canvasStyles.bgImage = dataUrl;
                })
                .catch((error) => {
                    console.error('Error extracting video frame for background:', error);
                    alert('Error processing video file for background.');
                });
        } else {
            app.canvasStyles.bgImage = URL.createObjectURL(file);
        }
    }

    return (
        <>
            <div className="btn-group btn-group-sm w-100 mb-3">
                {Object.keys(CanvasBackgroundTypes).map((bgType) => {
                    return <button
                        key={bgType}
                        onClick={handleBgTypeChange}
                        className={`${app.canvasStyles.backgroundType === bgType ? 'active' : ''} btn btn-primary`}>
                        {(CanvasBackgroundTypes as any)[bgType]}
                    </button>
                })}
            </div>
            {equals(app.canvasStyles.backgroundType, CanvasBackgroundTypes.Solid) &&
                <div className="row">
                    <div className="col-9">
                        Background Color
                    </div>
                    <div className="col-3">
                        <ColorPicker
                            initialColor={app.canvasStyles.bgColor}
                            onColorChange={(color => app.canvasStyles.bgColor = rgba2hexa(color))}
                        />
                    </div>
                </div>}
            {equals(app.canvasStyles.backgroundType, CanvasBackgroundTypes.Gradient) &&
                <>
                    <div className="row">
                        <div className="col-9">
                            Color #1
                        </div>
                        <div className="col-3">
                            <ColorPicker
                                initialColor={app.canvasStyles.gradientColorOne}
                                onColorChange={(color => app.canvasStyles.gradientColorOne = rgba2hexa(color))}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            Color #2
                        </div>
                        <div className="col-3">
                            <ColorPicker
                                initialColor={app.canvasStyles.gradientColorTwo}
                                onColorChange={(color => app.canvasStyles.gradientColorTwo = rgba2hexa(color))}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            Angle <SettingValue value={app.canvasStyles.gradientAngle + '°'}/>
                        </div>
                        <div className="col">
                            <input
                                onChange={(e) => {
                                    app.canvasStyles.gradientAngle = (e.target.value as unknown as number)
                                }}
                                value={app.canvasStyles.gradientAngle}
                                type="range"
                                className="form-range"
                                min="0"
                                max="360"
                                id="horizontalPosition"
                            />
                        </div>
                    </div>
                </>}
            {equals(app.canvasStyles.backgroundType, CanvasBackgroundTypes.Image) &&
                <div className="row g-0">
                    {bgImages.map(img => {
                        return <div className="col-3" key={img}>
                            <div onClick={() => app.canvasStyles.bgImage = img}
                                 className={`bg-image-preview ${equals(app.canvasStyles.bgImage, img) ? 'active' : ''}`}
                                 style={{
                                     backgroundImage: `url(${img})`,
                                     backgroundSize: 'cover',
                                     backgroundPosition: 'center'
                                 }}
                            />
                        </div>
                    })}
                    <div className="col-3">
                        <div className={`bg-image-preview bg-image-preview--file`}>
                            <input title="Upload custom background image or video" type="file" accept="image/*,video/*" onChange={handleBgImageUpload} />
                        </div>
                    </div>
                </div>}
        </>
    )
});

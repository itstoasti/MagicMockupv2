import React, {useEffect, useRef} from "react";
import {ICanvasProps} from "../../Canvas";
import {view} from "@risingstack/react-easy-state";
import {styles} from "./styles";
import "../../../../css/devices.css";
import {deviceIdMap, phoneStore} from "../../../../stores/phoneStore";
import {app} from "../../../../stores/appStore";

export const PhoneFrame = view((props: ICanvasProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const colourVariant = phoneStore.getColourVariant() ? `device-${phoneStore.getColourVariant()}` : '';

    useEffect(() => {
        return () => {
            // Cleanup video when component unmounts
            const video = videoRef.current;
            if (video) {
                video.pause();
                video.src = '';
                video.load();
            }
        };
    }, []);

    // Force video reload when device theme changes
    useEffect(() => {
        if (app.isVideo && videoRef.current && app.videoData) {
            const video = videoRef.current;
            video.load(); // Reload the video to reset any state
            video.currentTime = 0;
        }
    }, [phoneStore.activeTheme, app.videoData]);

    return (
        <div className={styles()}>
            <div className={`device ${colourVariant} device-${deviceIdMap[phoneStore.activeTheme]}`}>
                <div className="device-frame">
                    {!app.isVideo && (
                        <img className="device-screen"
                             src={app.croppedImageData || props.imageData}
                             loading="lazy"
                             alt="Mobile mockup"
                             style={{
                                 position: 'relative',
                                 zIndex: 1
                             }}
                        />
                    )}
                    {app.isVideo && (
                        <video 
                            ref={videoRef}
                            className="device-screen"
                            src={app.videoData}
                            controls
                            autoPlay
                            loop
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'relative',
                                zIndex: 1
                            }}
                        />
                    )}
                </div>
                <div className="device-stripe"/>
                <div className="device-header"/>
                <div className="device-sensors"/>
                <div className="device-btns"/>
                <div className="device-power"/>
                <div className="device-home"/>
            </div>
        </div>
    );
});
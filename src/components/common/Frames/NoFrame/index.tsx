import React, {useEffect, useRef} from "react";
import {ICanvasProps} from "../../Canvas";
import {view} from "@risingstack/react-easy-state";
import {styles} from "./styles";
import {ImageSelector} from "../../ImageSelector";
import {app} from "../../../../stores/appStore";

export const NoFrameFrame = view((props: ICanvasProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);

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

    return (
        <div className={styles(props)}>
                {props.imageData && !app.isVideo && <img alt={'Screenshot'} id="screenshot" src={app.croppedImageData || app.imageData} style={{position: 'relative', zIndex: 1}}/>}
                {app.isVideo && (
                    <video 
                        ref={videoRef}
                        id="screenshot-video" 
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
                {!props.imageData && !app.isVideo && <ImageSelector/>}
        </div>
    );
});
import React, {useCallback, useState} from "react";
import {view} from "@risingstack/react-easy-state";
import {app} from '../../../stores/appStore'
import {useDropzone} from "react-dropzone";
import {styles} from "./styles";
import {validURL} from "../../../utils/url";
import {routeStore, Routes} from "../../../stores/routeStore";
import {loadImageFromImageUrl} from "../../../utils/image";
import {browserStore} from "../../../stores/browserStore";

export const ImageSelector = view(() => {
    const existingUrl = () => {
        const parsedUrl = new URL(window.location.href);
        if (parsedUrl.searchParams.get('text')) {
            return parsedUrl.searchParams.get('text');
        }
        return null;
    }

    const [urlValue, setUrlValue] = useState(existingUrl());
    const [urlIsInvalid, setUrlIsInvalid] = useState(false);
    const [urlLoading, setUrlLoading] = useState(false);
    const [requestFailed, setRequestFailed] = useState(false);
    const [enableMobileScreenshot, setEnableMobileScreenshot] = useState(false);


    const onDrop = useCallback(files => {
        if (files && files[0]) {
            const file = files[0];
            const isVideo = file.type.startsWith('video/');
            
            if (isVideo) {
                const videoUrl = URL.createObjectURL(file);
                app.setVideoData(videoUrl);
            } else {
                // Handle image files as before
                const fileReader = new FileReader();
                fileReader.addEventListener('load', e => {
                    app.setImageData(e.target.result as string);

                    // Navigate to app selection page if we're on homepage
                    if (routeStore.currentRoute === Routes.Home) {
                        routeStore.goToRoute(Routes.AppSelection);
                    }
                });
                fileReader.readAsDataURL(file);
            }
        }
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop, 
        accept: 'image/*,video/*'
    })

    const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleUrlEnter();
        }
    };

    const handleUrlEnter = () => {
        if (!validURL(urlValue)) {
            setUrlIsInvalid(true);
            return;
        }

        setUrlLoading(true);

        let url = urlValue;
        if (!url) {
            setUrlIsInvalid(false);
            return;
        }

        if (!url.includes('http')) {
            url = 'https://' + url;
        }

        setUrlIsInvalid(false);
        setRequestFailed(false);

        fetch(`${(typeof process !== 'undefined' && process.env.REACT_APP_SCREENSHOT_API) || ''}?url=${url}${enableMobileScreenshot ? '&mobile=1' : ''}`)
            .then(response => response.json())
            .then(data => {
                app.setImageData(`data:image/png;base64, ${data.imageBase64}`);

                // Navigate to app selection page if we're on homepage
                if (routeStore.currentRoute === Routes.Home) {
                    routeStore.goToRoute(Routes.AppSelection);
                }
            })
            .catch(() => {
                setUrlLoading(false);
                setRequestFailed(true);
            })
            .finally(() => {
                setUrlLoading(false);
                browserStore.settings.addressBarUrl = url.replace(/https?:\/\//, '')
            });
    }

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!urlIsInvalid) {
            setUrlIsInvalid(false);
        }
        setUrlValue(e.target.value);
    }

    const handleDemoImage = (mobile: boolean) => {
        loadImageFromImageUrl(`/images/demo-image${mobile ? '-mobile' : ''}.png`).then((img) => {
            app.setImageData(img as string);

            // Navigate to app selection page if we're on homepage
            if (routeStore.currentRoute === Routes.Home) {
                routeStore.goToRoute(Routes.AppSelection);
            }
        })
    };

    return (
        <div className={`${styles(routeStore.currentRoute)} ${isDragActive ? ' dragActive' : ''}`}>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <div className="drop-here" style={{color: '#666666', fontWeight: '500'}}>Drop your image or video here...</div> :
                        <div>
                            <div className="dropzone">
                                <p style={{color: '#333333', marginBottom: '10px'}}><b style={{color: '#211540', fontWeight: '600'}}>Drag & Drop</b> or <b style={{color: '#211540', fontWeight: '600'}}>Click</b> here to upload an image or video...</p>
                                <p style={{color: '#333333'}}>or enter a URL</p>
                            </div>
                        </div>
                }
            </div>
            <div className="input-group url-form">
                <input
                    disabled={urlLoading}
                    onKeyDown={handleEnterKey}
                    onChange={handleUrlChange}
                    type="text"
                    className={`form-control ${urlIsInvalid || requestFailed ? 'is-invalid' : ''}`}
                    placeholder="your-website.com"
                    value={urlValue || ''}
                />
                <div className="input-group-text">
                    <label htmlFor="mobile">Mobile</label>
                    <input onChange={() => setEnableMobileScreenshot(!enableMobileScreenshot)}
                           checked={enableMobileScreenshot}
                           id="mobile"
                           className="form-check-input ml-2"
                           type="checkbox"
                           value="1"
                    />
                </div>
                <button onClick={handleUrlEnter} disabled={urlLoading} className="btn btn-primary" type="button">
                    {urlLoading ? 'Working...' : 'Go'}
                </button>
                <div className="invalid-feedback">
                    {urlIsInvalid && 'Whoops! Looks like you entered an invalid URL.'}
                    {requestFailed && 'Something has gone wrong. Please check your URL is valid and try again.'}
                </div>
            </div>
        </div>
    );
});

import {autoEffect, store} from '@risingstack/react-easy-state';
import {CanvasBackgroundTypes, ImageFormats, ScreenshotType} from "../types";
import {getImageDimensions, getVideoDimensions} from "../utils/image";
import {Routes, routeStore} from "./routeStore";
import {observe} from '@nx-js/observer-util'
import {Crop} from "react-image-crop";
import {Dimensions} from "../values/dimensions";
import {deviceAspectRatioMap, phoneStore} from "./phoneStore";

export const bgImages: string[] = [
    '1.webp',
    '2.webp',
    '3.webp',
    '4.webp',
    '5.png',
    '6.png',
    '7.png',
    '8.png',
    '9.png',
    '10.png',
    '11.png',
    '12.png',
    '13.webp',
    '14.webp',
    '15.webp',
    '16.webp',
    '17.webp',
    '18.webp',
    '19.webp',
    '20.webp',
    '21.webp',
    '22.webp',
    '23.webp',
    '24.webp',
    '25.webp',
    '26.webp',
    '27.webp',
    '28.webp',
    '29.webp',
    '30.webp',
    '31.webp',
    '32.webp',
    '33.webp',
    '34.webp',
    '35.webp',
    '36.webp',
    '37.webp',
    '38.webp',
    '39.webp',
    '40.webp',
].map(img => `/images/backgrounds/${img}`);

export const defaultCanvasBgColor: string = '#a090c1';

export const defaultCanvasSize: number = 75;

export const defaultResettableCanvasStyles: object = {
    verticalPosition: 0,
    horizontalPosition: 0,
    gradientAngle: 45,
    shadowSize: 4,
    rotateX: 0,
    rotateY: 0,
    rotation: 0,
    borderRadius: 10,
    size: 75,
    width: 2300,
    height: 1200,
}

export const defaultCanvasSizeMap = new Map<ScreenshotType, number>([
    [ScreenshotType.Browser, 75],
    [ScreenshotType.Device, 120],
    [ScreenshotType.Twitter, 80],
    [ScreenshotType.None, 90],
    [ScreenshotType.Code, 90],
]);

export interface ICanvasStyles {
    bgColor: string;
    bgImage?: string;
    verticalPosition: number;
    horizontalPosition: number;
    backgroundType: CanvasBackgroundTypes;
    gradientColorOne: string;
    gradientColorTwo: string;
    gradientAngle: number;
    shadowSize: number;
    rotateX: number;
    rotateY: number;
    rotation: number;
    borderRadius: number;
    height: number;
    width: number;
    size: number;
}

export interface IStore {
    frameType: ScreenshotType;
    imageData?: string;
    videoData?: string;
    isVideo?: boolean;
    croppedImageData?: string;
    previousCroppedImageData?: string;
    cropData?: Crop;
    previousCropData?: Crop;
    cropScale?: number;
    originalImageData?: string;
    canvasStyles: ICanvasStyles;
    isDownloadMode: boolean;
    defaultImageFormat: ImageFormats;
    canvasBgColor: string;
    isAutoRotateActive: boolean;
    disableAutoRotate: boolean;
    hasDownloaded: boolean;
    shouldShowRatingPrompt: boolean;
    cssTransformString: string;
    cropIsActive: boolean;
    canvasSizeMap?: Map<ScreenshotType, number>;
    canvasDimensionsMap?: Map<ScreenshotType, Dimensions>;

    setImageData(imageData: string): void;
    
    setVideoData(videoData: string): void;

    setCanvasSize(size: number): void;

    getCanvasSize(): number;

    getDefaultCanvasSize(): number;

    getCanvasDimensions(): Dimensions;

    setCanvasWidth(width: number): void;

    setCanvasHeight(height: number): void;

    adjustMeasurementForDownload(width: number): number;

    getAspectRatio(): number;

    resetImage(): void;
}

export let app = store({
    frameType: ScreenshotType.Browser,
    defaultImageFormat: ImageFormats.PNG,
    isDownloadMode: false,
    imageData: null,
    videoData: null,
    isVideo: false,
    originalImageData: null,
    isAutoRotateActive: false,
    disableAutoRotate: false,
    hasDownloaded: false,
    cropIsActive: false,
    canvasSizeMap: new Map(defaultCanvasSizeMap),
    canvasDimensionsMap: new Map<ScreenshotType, Dimensions>([
        [ScreenshotType.Browser, new Dimensions(1920, 1200)],
        [ScreenshotType.Device, new Dimensions(1080, 1920)],
        [ScreenshotType.Twitter, new Dimensions(1040, 512)],
        [ScreenshotType.None, new Dimensions(1920, 1200)],
        [ScreenshotType.Code, new Dimensions(1920, 720)],
    ]),
    get shouldShowRatingPrompt(): boolean {
        return false;
    },
    setImageData(imageData: string) {
        app.imageData = imageData;
        app.originalImageData = imageData;
        app.videoData = null;
        app.isVideo = false;

        // Clear any existing text and image elements when new image is loaded
        const { textStore } = require('./textStore');
        const { imageStore } = require('./imageStore');
        textStore.clearAllText();
        imageStore.clearAllImages();

        // switch to mobile for portrait screenshots
        getImageDimensions(imageData).then(({width, height}) => {
            app.frameType = height > width ? ScreenshotType.Device : ScreenshotType.Browser;
        });

        routeStore.goToRoute(Routes.MockupApp);
    },
    setVideoData(videoData: string) {
        app.videoData = videoData;
        app.imageData = null;
        app.originalImageData = null;
        app.isVideo = true;

        // Clear any existing text and image elements when new video is loaded
        const { textStore } = require('./textStore');
        const { imageStore } = require('./imageStore');
        textStore.clearAllText();
        imageStore.clearAllImages();

        // Get video dimensions and set appropriate frame type
        getVideoDimensions(videoData).then(({width, height}) => {
            app.frameType = height > width ? ScreenshotType.Device : ScreenshotType.Browser;
        }).catch(() => {
            // Default to browser frame if we can't get dimensions
            app.frameType = ScreenshotType.Browser;
        });

        routeStore.goToRoute(Routes.MockupApp);
    },
    setCanvasSize(size: number): void {
        app.canvasSizeMap.set(app.frameType, size)
    },
    getCanvasSize(): number {
        return app.canvasSizeMap.get(app.frameType);
    },
    getCanvasDimensions(): Dimensions {
        return app.canvasDimensionsMap.get(app.frameType);
    },
    setCanvasWidth(width: number): void {
        app.canvasDimensionsMap.get(app.frameType).width = width
    },
    setCanvasHeight(height: number): void {
        app.canvasDimensionsMap.get(app.frameType).height = height
    },
    getAspectRatio(): number {
        if (app.frameType === ScreenshotType.Device) {
            return deviceAspectRatioMap[phoneStore.activeTheme];
        }
        return 16 / 9;
    },

    get canvasBgColor(): string {
        switch (app.canvasStyles.backgroundType) {
            case CanvasBackgroundTypes.Gradient:
                return `linear-gradient(-${app.canvasStyles.gradientAngle}deg, ${app.canvasStyles.gradientColorOne}, ${app.canvasStyles.gradientColorTwo})`;
            case CanvasBackgroundTypes.Image:
                return `url(${app.canvasStyles.bgImage})`;
            case CanvasBackgroundTypes.Solid:
                return app.canvasStyles.bgColor;
            case CanvasBackgroundTypes.None:
            default:
                return app.isDownloadMode ? 'transparent' : 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==")';
        }
    },

    // helper function which increases an element's width while in download mode
    adjustMeasurementForDownload(measurement: number): number {
        const multiplier = app.frameType === ScreenshotType.Device ? 3 : 2;
        return measurement * multiplier;
    },

    resetImage(): void {
        app.imageData = null;
        app.videoData = null;
        app.isVideo = false;
        app.cropData = null;
        app.previousCropData = null;
        app.croppedImageData = null;
        app.previousCroppedImageData = null;
    },

    get cssTransformString(): string {
        return `scale(${app.isDownloadMode ? (app.getCanvasSize() / 100) * .99 : app.getCanvasSize() / 100}) perspective(${app.adjustMeasurementForDownload(800)}px) rotateX(${app.canvasStyles.rotateX}deg) rotateY(${app.canvasStyles.rotateY}deg) rotateZ(${app.canvasStyles.rotation}deg)`;
    },

    canvasStyles: {
        ...defaultResettableCanvasStyles, ...{
            bgColor: defaultCanvasBgColor,
            bgImage: '/images/backgrounds/1.jpg',
            backgroundType: CanvasBackgroundTypes.Image,
            gradientColorOne: '#7e349c',
            gradientColorTwo: '#968bbd'
        }
    },
} as IStore);

if (localStorage.getItem('canvasStyles')) {
    app.canvasStyles = JSON.parse(localStorage.getItem('canvasStyles'))
}

autoEffect(() => {
    // This auto-rotates the image if the user switches to mobile and the image is landscape
    if (app.frameType && !app.disableAutoRotate) {
        getImageDimensions(app.imageData).then(({width, height}) => {
            if (app.frameType === ScreenshotType.Device && width > height) {
                // rotateImage(app.imageData).then((rotated) => {
                //     app.imageData = rotated
                //     app.isAutoRotateActive = true;
                // });
                // Disable the auto-rotate for now and just hide the volume rocker
            }
            if (app.frameType === ScreenshotType.Browser && width < height) {
                // app.imageData = app.originalImageData;
                // app.isAutoRotateActive = false;
            }
        })
    }
});

// Handle syncing some settings with localStorage
observe(() => localStorage.setItem('canvasStyles', JSON.stringify(app.canvasStyles)));

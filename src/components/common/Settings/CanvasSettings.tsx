import {view} from "@risingstack/react-easy-state";
import {app, defaultCanvasSizeMap, defaultResettableCanvasStyles} from "../../../stores/appStore";
import React from "react";
import {ScreenshotType} from "../../../types";
import {css} from "emotion";
import {SettingValue} from "../SettingValue";
import {Slider} from "../Slider";
import {clamp} from "../../../utils/misc";
import {CONFIG} from "../../../config";

export const CanvasSettings = view(() => {
    const styles = css`
      input:disabled {
        opacity: .4;
      }

      .dimensions {
        display: flex;
        text-align: center;
        margin-bottom: 10px;

        label {
          > span {
            font-size: .8em;
            margin-bottom: 4px;
          }
          
          :first-of-type {
            margin-right: 5px;
          }

          display: flex;
          flex-direction: column;
          text-align: left;

          input {
            width: 100%;
            min-height: 40px; /* Better touch target */
            padding: 8px;
          }
        }

        > * {
          flex-grow: 1;
        }

        input {
          width: 50px;
          font-size: 1em;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          text-align: center;
          background: white;

          :first-of-type {
            margin-right: 4px;
          }

          &:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          }
        }
      }

      /* Mobile-specific improvements */
      @media (max-width: 768px) {
        .row {
          margin-bottom: 16px;
          
          .col-7, .col-5 {
            padding-left: 0;
            padding-right: 0;
          }
        }
        
        .form-range {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          outline: none;
          
          &::-webkit-slider-thumb {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: #6366f1;
            cursor: pointer;
            -webkit-appearance: none;
            appearance: none;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          }
          
          &::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #6366f1;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
          }
        }
        
        .dimensions {
          label {
            input {
              min-height: 44px; /* iOS recommended touch target */
              font-size: 16px; /* Prevent zoom on iOS */
            }
          }
        }
        
        .btn {
          min-height: 44px;
          font-size: 14px;
        }
      }

      /* Very small screens */
      @media (max-width: 480px) {
        .form-range {
          &::-webkit-slider-thumb {
            width: 28px;
            height: 28px;
          }
          
          &::-moz-range-thumb {
            width: 24px;
            height: 24px;
          }
        }
        
        .dimensions {
          label {
            input {
              min-height: 48px;
              padding: 10px;
            }
          }
        }
      }
    `;

    return (
        <div className={styles}>
            <div className="dimensions">
                <label htmlFor="width">
                    <span>Width</span>
                    <input
                        className="dimension-input"
                        onChange={(e) => {
                            const number = e.target.value as unknown as number;
                            app.setCanvasWidth(clamp(number, CONFIG.minCanvasWidth, CONFIG.maxCanvasWidth))
                        }}
                        onBlur={(e) => {
                            // Ensure value is within bounds after editing
                            const number = parseInt(e.target.value) || CONFIG.minCanvasWidth;
                            app.setCanvasWidth(clamp(number, CONFIG.minCanvasWidth, CONFIG.maxCanvasWidth));
                        }}
                        value={app.getCanvasDimensions().width}
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        id="width"
                        min="500"
                        step={100}
                        max="2300"
                        name="width"
                    />
                </label>

                <label htmlFor="height">
                    <span>Height</span>
                    <input
                        className="dimension-input"
                        onChange={(e) => {
                            const number = e.target.value as unknown as number;
                            app.setCanvasHeight(clamp(number, CONFIG.minCanvasHeight, CONFIG.maxCanvasHeight))
                        }}
                        onBlur={(e) => {
                            // Ensure value is within bounds after editing
                            const number = parseInt(e.target.value) || CONFIG.minCanvasHeight;
                            app.setCanvasHeight(clamp(number, CONFIG.minCanvasHeight, CONFIG.maxCanvasHeight));
                        }}
                        value={app.getCanvasDimensions().height}
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        step={100}
                        id="height"
                        min="500"
                        max="2300"
                    />

                </label>
            </div>
            <div className="row">
                <div className="col-7 pr-0">
                    <label htmlFor="size" className="form-label">
                        Size <SettingValue value={app.getCanvasSize()}/>
                    </label>
                </div>
                <div className="col-5">
                    <Slider
                        onChange={(e) => app.setCanvasSize(e.target.value as unknown as number)}
                        value={app.getCanvasSize()}
                        type="range"
                        className="form-range"
                        min="20"
                        max="250"
                        id="size"
                        onResetClick={() => app.setCanvasSize(defaultCanvasSizeMap.get(app.frameType))}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-7 pr-0">
                    <label htmlFor="horizontalPosition" className="form-label">
                        Horizontal Position <SettingValue value={app.canvasStyles.horizontalPosition}/>
                    </label>
                </div>
                <div className="col-5">
                    <Slider
                        onChange={(e) => app.canvasStyles.horizontalPosition = (e.target.value as unknown as number)}
                        value={app.canvasStyles.horizontalPosition}
                        type="range"
                        className="form-range"
                        min="-75"
                        max="75"
                        step="1"
                        id="horizontalPosition"
                        onResetClick={() => app.canvasStyles.horizontalPosition = 0}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-7 pr-0">
                    <label htmlFor="verticalPosition" className="form-label">
                        Vertical Position <SettingValue value={app.canvasStyles.verticalPosition}/>
                    </label>
                </div>
                <div className="col-5">
                    <Slider
                        onChange={(e) => app.canvasStyles.verticalPosition = (e.target.value as unknown as number)}
                        value={app.canvasStyles.verticalPosition}
                        type="range"
                        className="form-range"
                        min="-75"
                        max="75"
                        step="1"
                        id="verticalPosition"
                        onResetClick={() => app.canvasStyles.verticalPosition = 0}
                    />
                </div>
            </div>
            {app.frameType !== ScreenshotType.Device &&
                <div className="row">
                    <div className="col-7 pr-0">
                        <label htmlFor="borderRadius" className="form-label">
                            Border Radius <SettingValue value={app.canvasStyles.borderRadius}/>
                        </label>
                    </div>
                    <div className="col-5">
                        <Slider
                            onChange={(e) => app.canvasStyles.borderRadius = (e.target.value as unknown as number)}
                            value={app.canvasStyles.borderRadius}
                            type="range"
                            className="form-range"
                            min="0"
                            max="100"
                            id="borderRadius"
                            onResetClick={() => app.canvasStyles.borderRadius = 10}
                        />
                    </div>
                </div>
            }
            <div className="row">
                <div className="col-7 pr-0">
                    <label htmlFor="shadow" className="form-label">
                        Shadow <SettingValue value={app.canvasStyles.shadowSize}/>
                    </label>
                </div>
                <div className="col-5">
                    <Slider
                        onChange={(e) => app.canvasStyles.shadowSize = (e.target.value as unknown as number)}
                        value={app.canvasStyles.shadowSize}
                        type="range"
                        className="form-range"
                        min="0"
                        max="100"
                        id="shadow"
                        onResetClick={() => app.canvasStyles.shadowSize = 4}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-7 pr-0">
                    <label htmlFor="rotateX" className="form-label">
                        Vertical Tilt <SettingValue value={app.canvasStyles.rotateX}/>
                    </label>
                </div>
                <div className="col-5">
                    <Slider
                        onChange={(e) => app.canvasStyles.rotateX = (e.target.value as unknown as number)}
                        value={app.canvasStyles.rotateX}
                        type="range"
                        className="form-range"
                        min="-20"
                        max="20"
                        id="rotateX"
                        onResetClick={() => app.canvasStyles.rotateX = 0}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-7 pr-0">
                    <label htmlFor="rotateY" className="form-label">
                        Horizontal Tilt <SettingValue value={app.canvasStyles.rotateY}/>
                    </label>
                </div>
                <div className="col-5">
                    <Slider
                        onChange={(e) => app.canvasStyles.rotateY = (e.target.value as unknown as number)}
                        value={app.canvasStyles.rotateY}
                        type="range"
                        className="form-range"
                        min="-20"
                        max="20"
                        id="rotateY"
                        onResetClick={() => app.canvasStyles.rotateY = 0}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-7 pr-0">
                    <label htmlFor="rotation" className="form-label">
                        Rotation <SettingValue value={app.canvasStyles.rotation}/>
                    </label>
                </div>
                <div className="col-5">
                    <Slider
                        onChange={(e) => app.canvasStyles.rotation = (e.target.value as unknown as number)}
                        value={app.canvasStyles.rotation}
                        type="range"
                        className="form-range"
                        min="-45"
                        max="45"
                        id="rotation"
                        onResetClick={() => app.canvasStyles.rotation = 0}
                    />
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-12">
                    <button
                        className="btn btn-sm btn-secondary w-100"
                        onClick={() => {
                            // Reset canvas dimensions to defaults for current frame type
                            const defaultDimensions = app.canvasDimensionsMap.get(app.frameType);
                            app.setCanvasWidth(defaultDimensions.width);
                            app.setCanvasHeight(defaultDimensions.height);
                            
                            // Reset canvas size to default for current frame type
                            app.setCanvasSize(defaultCanvasSizeMap.get(app.frameType));
                            
                            // Reset canvas positioning and styling
                            app.canvasStyles.horizontalPosition = 0;
                            app.canvasStyles.verticalPosition = 0;
                            app.canvasStyles.borderRadius = 10;
                            app.canvasStyles.shadowSize = 4;
                            app.canvasStyles.rotateX = 0;
                            app.canvasStyles.rotateY = 0;
                            app.canvasStyles.rotation = 0;
                        }}
                        title="Reset canvas positioning, sizing, and styling to defaults"
                    >
                        Reset Canvas Settings
                    </button>
                </div>
            </div>
            {document.location.href.includes('localhost') &&
                <div className="row">
                    <button
                        className="btn btn-m btn-link text-white w-100"
                        onClick={() => app.isDownloadMode = !app.isDownloadMode}>[Debug] Toggle Download Mode
                    </button>
                    <button
                        className="btn btn-m btn-link text-white w-100"
                        onClick={() => {
                            localStorage.clear();
                            app.canvasStyles = {...app.canvasStyles, ...defaultResettableCanvasStyles};
                        }}>[Debug] Clear Local Storage
                    </button>
                </div>
            }
        </div>
    );
});
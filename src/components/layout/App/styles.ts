import {css} from "emotion";

export const styles = () => {
    return css`
      display: flex;
      flex-direction: column;
      height: 100vh;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      overflow: hidden;
      position: relative;

      /* Header Bar */
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 64px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        padding: 0 24px;
        position: relative;
        z-index: 10;

        .header-left {
          display: flex;
          align-items: center;
          gap: 16px;

          .back-to-tools-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: rgba(255, 255, 255, 0.15);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 8px;
            color: white;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            white-space: nowrap;
            font-family: inherit;

            &:hover {
              background: rgba(255, 255, 255, 0.25);
              transform: translateY(-1px);
            }

            svg {
              width: 14px;
              height: 14px;
              flex-shrink: 0;
            }
            
            span {
              min-width: 0;
            }

            @media (max-width: 768px) {
              padding: 6px 10px;
              font-size: 12px;
              
              span {
                display: none;
              }
              
              svg {
                width: 16px;
                height: 16px;
              }
            }

            @media (max-width: 480px) {
              padding: 8px;
              
              svg {
                width: 18px;
                height: 18px;
              }
            }
          }

          .brand-title {
            font-size: 1.4em;
            font-weight: 700;
            color: #ffffff;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
            letter-spacing: -0.5px;
            text-decoration: none;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
              opacity: 0.9;
            }

            @media (max-width: 768px) {
              font-size: 1.2em;
            }

            @media (max-width: 480px) {
              font-size: 1.1em;
            }
          }
        }

        .header-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          
          .quick-actions {
            display: flex;
            gap: 12px;

            .action-btn {
              display: flex;
              align-items: center;
              gap: 8px;
              padding: 8px 16px;
              background: rgba(255, 255, 255, 0.15);
              border: 1px solid rgba(255, 255, 255, 0.2);
              border-radius: 8px;
              color: white;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s ease;
              white-space: nowrap;

              &:hover:not(:disabled) {
                background: rgba(255, 255, 255, 0.25);
                transform: translateY(-1px);
              }

              &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
              }

              svg {
                width: 16px;
                height: 16px;
                flex-shrink: 0;
              }
              
              span {
                min-width: 0;
              }
            }
          }
        }

        .header-right {
          .share-section {
            display: flex;
            align-items: center;
            gap: 16px;
            color: white;
            font-size: 14px;

            .share-prompt, .sponsor-link {
              background: rgba(255, 255, 255, 0.1);
              padding: 6px 12px;
              border-radius: 6px;
              font-size: 13px;

              a {
                color: #fff;
                text-decoration: none;
                font-weight: 500;
              }
            }

            svg {
              width: 18px;
              height: 18px;
            }
          }
        }
      }

      /* Main App Layout */
      .app-layout {
        display: flex;
        flex: 1;
        overflow: hidden;
      }

      /* Left Sidebar */
      .sidebar {
        width: 320px;
        background: #ffffff;
        border-right: 1px solid #e5e7eb;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);

        .sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: 0;

          /* Custom scrollbar */
          &::-webkit-scrollbar {
            width: 6px;
          }

          &::-webkit-scrollbar-track {
            background: #f1f5f9;
          }

          &::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
          }

          &::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
          }
        }

        .sidebar-section {
          border-bottom: 1px solid #f1f5f9;

          &.upload-section {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          }

          .section-header {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 20px 24px 16px;
            background: #fafafa;
            border-bottom: 1px solid #f1f5f9;

            .section-icon {
              width: 18px;
              height: 18px;
              color: #6366f1;
            }

            h3 {
              margin: 0;
              font-size: 16px;
              font-weight: 600;
              color: #1f2937;
            }
          }

          .upload-area {
            padding: 24px;
          }

          .frame-options {
            padding: 16px 24px;
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            .frame-option {
              flex: 1;
              min-width: 80px;
              padding: 12px 16px;
              background: #f8fafc;
              border: 2px solid #e5e7eb;
              border-radius: 8px;
              color: #374151;
              font-size: 14px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s ease;
              text-align: center;

              &:hover:not(:disabled) {
                border-color: #6366f1;
                background: #f0f9ff;
              }

              &.active {
                background: #6366f1;
                border-color: #6366f1;
                color: white;
              }

              &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                background: #f1f5f9;
                color: #9ca3af;
                border-color: #e5e7eb;
              }
            }
          }

          .theme-selector-wrap {
            padding: 0 24px 16px;
          }

          .settings-content {
            padding: 16px 24px;

            /* Style nested form elements */
            .form-check-input:checked {
              background-color: #6366f1;
              border-color: #6366f1;
            }

            .form-range::-webkit-slider-thumb {
              background: #6366f1;
            }

            .form-range::-moz-range-thumb {
              background: #6366f1;
            }

            .form-range::-ms-thumb {
              background: #6366f1;
            }

            .bg-image-preview {
              padding: 8px;
              height: 48px;
              margin: 4px;
              border: 2px solid #e5e7eb;
              border-radius: 8px;
              background-size: cover;
              cursor: pointer;
              transition: all 0.2s ease;

              &:hover {
                border-color: #6366f1;
              }

              &.active {
                border-color: #6366f1;
                border-width: 2px;
              }

              &.bg-image-preview--file {
                position: relative;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%236366f1' d='M492 236H276V20c0-11.046-8.954-20-20-20s-20 8.954-20 20v216H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h216v216c0 11.046 8.954 20 20 20s20-8.954 20-20V276h216c11.046 0 20-8.954 20-20s-8.954-20-20-20z'/%3E%3C/svg%3E");
                background-size: 40%;
                background-repeat: no-repeat;
                background-position: center;
                background-color: #f8fafc;

                input[type="file"] {
                  position: absolute;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  opacity: 0;
                  cursor: pointer;
                }
              }
            }
          }

          /* Disabled state styling for sections without images */
          &.disabled {
            .settings-content,
            .theme-selector-wrap {
              opacity: 0.6;
              pointer-events: none;
            }
            
            .section-header {
              opacity: 0.7;
            }
          }
        }

        .sidebar-footer {
          border-top: 1px solid #f1f5f9;
          background: #fafafa;

          .download-section {
            .section-header {
              background: #fafafa;
              padding: 16px 24px 12px;
            }

            /* Style download buttons */
            padding: 0 24px 16px;

            .btn {
              width: 100%;
              margin-bottom: 8px;
              padding: 12px 16px;
              background: #6366f1;
              border: none;
              border-radius: 8px;
              color: white;
              font-weight: 500;
              transition: all 0.2s ease;

              &:hover:not(:disabled) {
                background: #4f46e5;
                transform: translateY(-1px);
              }

              &.btn-secondary {
                background: #e5e7eb;
                color: #374151;

                &:hover:not(:disabled) {
                  background: #d1d5db;
                }
              }

              &:disabled {
                opacity: 0.5;
                cursor: not-allowed;
                transform: none;
              }
            }

            &.disabled {
              opacity: 0.6;
              
              .btn {
                pointer-events: none;
                opacity: 0.4;
              }
              
              .section-header {
                opacity: 0.7;
              }
            }
          }
        }
      }

      /* Main Canvas Area */
      .canvas-area {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        overflow: hidden;

        .canvas-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .empty-canvas {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;

          .empty-state {
            text-align: center;
            max-width: 400px;
            color: white;

            .empty-icon {
              width: 64px;
              height: 64px;
              margin-bottom: 24px;
              opacity: 0.8;
            }

            h2 {
              font-size: 28px;
              font-weight: 600;
              margin-bottom: 12px;
              color: white;
            }

            p {
              font-size: 16px;
              opacity: 0.9;
              margin-bottom: 32px;
              line-height: 1.5;
            }

            .upload-cta {
              background: rgba(255, 255, 255, 0.1);
              backdrop-filter: blur(10px);
              border-radius: 16px;
              padding: 32px;
              border: 1px solid rgba(255, 255, 255, 0.2);
              
              .preview-window {
                background: #f8fafc;
                border: 2px dashed #cbd5e1;
                border-radius: 16px;
                padding: 4rem 2rem;
                text-align: center;
                transition: all 0.3s;
                cursor: pointer;
                
                &:hover, &.drag-active {
                  border-color: #4f46e5;
                  background: #f0f9ff;
                }
                
                .preview-content {
                  .preview-icon {
                    width: 48px;
                    height: 48px;
                    color: #94a3b8;
                    margin-bottom: 1rem;
                  }
                  
                  p {
                    color: #64748b;
                    font-weight: 500;
                    margin: 0;
                    opacity: 1;
                  }
                }
              }
            }
          }
        }
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .sidebar {
          width: 280px;
        }

        .header {
          padding: 0 16px;

          .header-center .quick-actions .action-btn span {
            display: none;
          }
        }
      }

      @media (max-width: 768px) {
        flex-direction: column;

        .header {
          padding: 0 8px;
          height: auto;
          flex-direction: column;
          gap: 8px;
          
          .header-left {
            width: 100%;
            text-align: center;
            
            .brand-title {
              font-size: 1.1em;
            }
          }
          
          .header-center {
            position: static;
            transform: none;
            width: 100%;
            
            .quick-actions {
              justify-content: center;
              gap: 6px;
              
              .action-btn {
                padding: 6px 10px;
                font-size: 12px;
                min-width: 70px;
                
                span {
                  display: none;
                }
                
                svg {
                  width: 14px;
                  height: 14px;
                }
              }
            }
          }
          
          .header-right {
            width: 100%;
            display: flex;
            justify-content: center;
            
            .export-section {
              gap: 6px !important;
              flex-wrap: wrap;
              justify-content: center;
              
              .export-dropdown {
                position: relative;
                
                .export-trigger-btn {
                  padding: 6px 10px !important;
                  font-size: 12px !important;
                  min-width: 80px;
                  
                  svg {
                    width: 14px !important;
                    height: 14px !important;
                  }
                }
                
                .export-dropdown-menu {
                  min-width: 150px !important;
                  right: 0 !important;
                  left: auto !important;
                  z-index: 1000;
                }
              }
            }
          }
        }

        .app-layout {
          flex-direction: column;
        }

        .sidebar {
          width: 100%;
          height: 40vh;
          order: 2;
          
          .sidebar-content {
            .sidebar-section {
              .section-header {
                padding: 12px 16px 8px;
                
                h3 {
                  font-size: 14px;
                }
              }
              
              .frame-options {
                padding: 8px 16px;
                
                .frame-option {
                  padding: 8px 12px;
                  font-size: 12px;
                }
              }
              
              .settings-content {
                padding: 8px 16px;
              }
            }
          }
        }

        .canvas-area {
          order: 1;
          height: 60vh;
          padding: 12px;
        }

        .header .header-right .sponsor-link {
          display: none;
        }
      }

      /* Button Styles Override */
      .btn-group-sm > .btn, .btn-sm {
        padding: 8px 12px;
        font-size: 14px;
        border-radius: 6px;
      }

      /* Additional mobile breakpoint for very small screens */
      @media (max-width: 480px) {
        .header {
          padding: 6px;
          gap: 6px;
          
          .header-left {
            .brand-title {
              font-size: 1em;
            }
          }
          
          .header-center {
            .quick-actions {
              gap: 4px;
              
              .action-btn {
                padding: 4px 8px;
                gap: 4px;
                min-width: 60px;
                font-size: 11px;
                
                svg {
                  width: 12px;
                  height: 12px;
                }
              }
            }
          }
          
          .header-right {
            .export-section {
              gap: 4px !important;
              flex-wrap: wrap;
              
              .export-dropdown {
                .export-trigger-btn {
                  padding: 4px 8px !important;
                  font-size: 11px !important;
                  min-width: 70px;
                  
                  svg {
                    width: 12px !important;
                    height: 12px !important;
                  }
                }
                
                .export-dropdown-menu {
                  min-width: 140px !important;
                  font-size: 12px;
                }
              }
            }
          }
        }
        
        .sidebar {
          height: 35vh;
          
          .sidebar-content {
            .sidebar-section {
              .section-header {
                padding: 8px 12px 6px;
                
                .section-icon {
                  width: 14px;
                  height: 14px;
                }
                
                h3 {
                  font-size: 13px;
                }
              }
              
              .frame-options {
                padding: 6px 12px;
                gap: 6px;
                
                .frame-option {
                  padding: 6px 8px;
                  font-size: 11px;
                  min-width: 60px;
                }
              }
              
              .settings-content {
                padding: 6px 12px;
              }
            }
          }
        }
        
        .canvas-area {
          height: 65vh;
          padding: 8px;
        }
      }

      /* Compatibility for old class names */
      .main-content {
        /* Map old main-content to new canvas-area for compatibility */
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        overflow: hidden;
      }
    `;
}
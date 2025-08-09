import {css} from "emotion";

export const styles = () => {
    return css`
      background: #ffffff;
      color: #0f172a;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      min-height: 100vh;
      
      // Navigation
      .nav {
        padding: 1.5rem 0;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        position: sticky;
        top: 0;
        z-index: 100;
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          min-height: 60px;
          gap: 0;
        }
        
        .nav-logo {
          margin-left: -11rem;
          padding-left: 0;
          margin-right: auto;
          position: relative;
          left: -225px;
          
          .brand-title {
            font-size: 1.5rem;
            font-weight: 800;
            margin: 0;
            padding: 0;
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        }
        
        .nav-right {
          display: flex;
          align-items: center;
          gap: 2rem;
          margin-left: auto;
          margin-right: -10rem;
          padding-right: 0;
          position: relative;
          right: -200px;
        }
        
        .nav-links {
          display: flex;
          gap: 3rem;
          align-items: center;
          
          a, button {
            color: #64748b;
            text-decoration: none;
            font-weight: 500;
            font-size: 0.95rem;
            transition: all 0.2s;
            background: none;
            border: none;
            cursor: pointer;
            font-family: inherit;
            
            &:hover {
              color: #4f46e5;
            }
            
            &.nav-contact {
              color: #64748b;
              
              &:hover {
                color: #4f46e5;
              }
            }
          }
        }
        
        .nav-app {
          background: #4f46e5;
          color: white;
          padding: 0.6rem 1.2rem;
          border-radius: 50px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          
          &:hover {
            background: #4338ca;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
          }
        }
      }
      
      // Hero Section
      .hero {
        padding: 3rem 0 6rem;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        
        .hero-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6rem;
          align-items: center;
        }
        
        .hero-content {
          .hero-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(79, 70, 229, 0.1);
            color: #4f46e5;
            padding: 0.6rem 1.2rem;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 600;
            margin-bottom: 2rem;
            border: 1px solid rgba(79, 70, 229, 0.2);
            
            .badge-icon {
              width: 14px;
              height: 14px;
            }
          }
          
          h1 {
            font-size: 3.5rem;
            font-weight: 800;
            color: #0f172a;
            margin: 0 0 1.5rem 0;
            line-height: 1.1;
            
            .gradient-text {
              background: linear-gradient(135deg, #4f46e5, #7c3aed);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
          }
          
          p {
            font-size: 1.25rem;
            color: #64748b;
            margin-bottom: 3rem;
            line-height: 1.6;
          }
          
          .hero-actions {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            margin-bottom: 4rem;
            
            .hero-upload {
              margin: 0;
              
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
                  }
                }
              }
            }
            
            .hero-or {
              text-align: center;
              color: #94a3b8;
              font-weight: 500;
              position: relative;
              
              &::before, &::after {
                content: '';
                position: absolute;
                top: 50%;
                width: 30%;
                height: 1px;
                background: #e2e8f0;
              }
              
              &::before { left: 0; }
              &::after { right: 0; }
            }
            
            .hero-demo-btn {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              gap: 0.75rem;
              padding: 1rem 2rem;
              background: transparent;
              border: 2px solid #e2e8f0;
              border-radius: 50px;
              color: #64748b;
              text-decoration: none;
              font-weight: 600;
              transition: all 0.3s;
              
              .play-icon {
                width: 16px;
                height: 16px;
              }
              
              &:hover {
                border-color: #4f46e5;
                color: #4f46e5;
                background: rgba(79, 70, 229, 0.05);
              }
            }
          }
          
          .hero-stats {
            display: flex;
            gap: 3rem;
            
            .stat {
              text-align: left;
              
              .stat-number {
                display: block;
                font-size: 2rem;
                font-weight: 800;
                color: #0f172a;
                line-height: 1;
              }
              
              .stat-label {
                font-size: 0.9rem;
                color: #64748b;
                font-weight: 500;
              }
            }
          }
        }
        
        .hero-visual {
          position: relative;
          height: 500px;
          
          .mockup-showcase {
            position: relative;
            width: 100%;
            height: 100%;
            
            .floating-mockup {
              position: absolute;
              animation: float 3s ease-in-out infinite;
              transform: scale(1.3);
              
              &.mockup-1 {
                top: 5%;
                left: 5%;
                animation-delay: 0s;
              }
              
              &.mockup-2 {
                top: 35%;
                right: 10%;
                animation-delay: 1s;
              }
              
              &.mockup-3 {
                bottom: 5%;
                left: 25%;
                animation-delay: 2s;
              }
              
              .mockup-frame {
                background: #ffffff;
                border-radius: 12px;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
                overflow: hidden;
                
                &.browser {
                  width: 280px;
                  height: 196px;
                  
                  .mockup-header {
                    height: 24px;
                    background: #f1f5f9;
                    display: flex;
                    align-items: center;
                    padding: 0 8px;
                    
                    .mockup-dots {
                      display: flex;
                      gap: 4px;
                      
                      span {
                        width: 6px;
                        height: 6px;
                        border-radius: 50%;
                        background: #cbd5e1;
                        
                        &:nth-child(1) { background: #ef4444; }
                        &:nth-child(2) { background: #f59e0b; }
                        &:nth-child(3) { background: #10b981; }
                      }
                    }
                  }
                  
                  .mockup-content {
                    height: calc(100% - 24px);
                    background: linear-gradient(135deg, #4f46e5, #7c3aed);
                  }
                }
                
                &.mobile {
                  width: 140px;
                  height: 252px;
                  border-radius: 20px;
                  
                  .mobile-content {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #06b6d4, #0891b2);
                  }
                }
                
                &.tablet {
                  width: 210px;
                  height: 154px;
                  border-radius: 16px;
                  
                  .tablet-content {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #8b5cf6, #a855f7);
                  }
                }
              }
            }
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      }
      
      // Section Container
      .section-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 2rem;
      }
      
      .section-header {
        text-align: center;
        margin-bottom: 4rem;
        
        h2 {
          font-size: 2.5rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 1rem 0;
          line-height: 1.2;
        }
        
        p {
          font-size: 1.2rem;
          color: #64748b;
          margin: 0;
        }
      }
      
      // Features Section
      .features {
        padding: 8rem 0;
        background: #ffffff;
        
        .features-showcase {
          display: grid;
          gap: 6rem;
          
          .feature-large {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4rem;
            align-items: center;
            
            .feature-preview {
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
                  }
                }
              }
            }
            
            .feature-info {
              h3 {
                font-size: 2.5rem;
                font-weight: 800;
                color: #0f172a;
                margin: 0 0 1.5rem 0;
                line-height: 1.2;
              }
              
              p {
                font-size: 1.2rem;
                color: #64748b;
                margin-bottom: 2rem;
                line-height: 1.6;
              }
              
              .feature-benefits {
                list-style: none;
                padding: 0;
                margin: 0;
                
                li {
                  display: flex;
                  align-items: center;
                  gap: 0.75rem;
                  color: #475569;
                  margin-bottom: 0.75rem;
                  font-weight: 500;
                  
                  svg {
                    color: #10b981;
                    width: 16px;
                    height: 16px;
                    flex-shrink: 0;
                  }
                }
              }
            }
          }
          
          .features-grid-small {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            
            .feature-small {
              padding: 2rem;
              border: 1px solid #f1f5f9;
              border-radius: 16px;
              transition: all 0.3s;
              
              &:hover {
                border-color: #e2e8f0;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                transform: translateY(-2px);
              }
              
              .feature-icon-small {
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, #4f46e5, #7c3aed);
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-bottom: 1.5rem;
                
                svg {
                  width: 24px;
                  height: 24px;
                  color: white;
                }
              }
              
              h4 {
                font-size: 1.25rem;
                font-weight: 700;
                color: #0f172a;
                margin: 0 0 0.75rem 0;
              }
              
              p {
                color: #64748b;
                line-height: 1.6;
                margin: 0;
              }
            }
          }
        }
      }
      
      // CTA Section
      .cta {
        padding: 8rem 0;
        background: linear-gradient(135deg, #4f46e5, #7c3aed);
        
        .cta-content {
          text-align: center;
          color: white;
          
          h2 {
            font-size: 3rem;
            font-weight: 800;
            margin: 0 0 1.5rem 0;
            line-height: 1.2;
          }
          
          p {
            font-size: 1.25rem;
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 3rem;
            line-height: 1.6;
          }
          
          .cta-button {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1.2rem 2.5rem;
            background: white;
            color: #4f46e5;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 700;
            font-size: 1.1rem;
            transition: all 0.3s;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            
            .arrow-icon {
              width: 16px;
              height: 16px;
              transition: transform 0.3s;
            }
            
            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 12px 35px rgba(0, 0, 0, 0.2);
              
              .arrow-icon {
                transform: translateX(4px);
              }
            }
          }
          
          .cta-subtitle {
            font-size: 0.95rem;
            color: rgba(255, 255, 255, 0.8);
            margin: 2rem 0 0 0;
            font-weight: 500;
          }
        }
      }
        
      
      
      // Footer
      .footer {
        background: #0f172a;
        color: #ffffff;
        padding: 3rem 0 2rem;
        
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding-bottom: 2rem;
          border-bottom: 1px solid #1e293b;
          margin-bottom: 2rem;
          
          .footer-brand {
            max-width: 400px;
            
            .footer-brand-title {
              font-size: 1.5rem;
              font-weight: 800;
              background: linear-gradient(135deg, #4f46e5, #7c3aed);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
              margin: 0 0 1rem 0;
            }
            
            p {
              color: #94a3b8;
              line-height: 1.6;
              margin: 0;
            }
          }
          
          .footer-links {
            display: flex;
            gap: 2rem;
            align-items: center;
            
            a, button {
              color: #cbd5e1;
              text-decoration: none;
              background: none;
              border: none;
              cursor: pointer;
              font-size: 0.95rem;
              font-family: inherit;
              font-weight: 500;
              transition: color 0.2s;
              
              &:hover {
                color: #ffffff;
              }
            }
          }
        }
        
        .footer-bottom {
          text-align: center;
          
          p {
            color: #64748b;
            margin: 0;
            font-size: 0.9rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            
            .heart-icon {
              color: #ef4444;
              width: 14px;
              height: 14px;
            }
          }
        }
      }
      
      // Image Selector Override
      .ImageSelector {
        min-height: auto;
        padding: 0;
        min-width: auto;
        
        .dropzone {
          border: 2px dashed #4f46e5;
          background: rgba(79, 70, 229, 0.05);
          border-radius: 20px;
          padding: 3rem 2rem;
          transition: all 0.3s ease;
          
          &:hover {
            border-color: #4338ca;
            background: rgba(79, 70, 229, 0.1);
            transform: scale(1.02);
          }
          
          p {
            color: #4f46e5 !important;
            margin: 0;
            font-weight: 600;
            font-size: 1.1rem;
            
            &:nth-child(2) {
              font-size: 0.95rem;
              margin-top: 0.75rem;
              color: #64748b !important;
              font-weight: 500;
            }
          }
        }
      }
      
      // Responsive Design
      @media screen and (max-width: 768px) {
        .nav {
          padding: 1rem 0;
          
          .nav-container {
            padding: 0 1rem;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            gap: 1rem;
          }
          
          .nav-logo {
            margin-left: 0 !important;
            padding-left: 0;
            left: 0 !important;
            position: static !important;
            order: 1;
            
            .brand-title {
              font-size: 1.3rem;
            }
          }
          
          .nav-right {
            margin-right: 0 !important;
            padding-right: 0;
            right: 0 !important;
            position: static !important;
            order: 2;
            display: flex;
            justify-content: center;
            width: 100%;
          }
          
          .nav-links {
            display: none;
          }
          
          .nav-app {
            padding: 0.5rem 1rem;
            font-size: 0.85rem;
          }
        }
        
        .hero {
          padding: 2rem 0 4rem;
          
          .hero-container {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
            padding: 0 1rem;
          }
          
          .hero-content {
            h1 {
              font-size: 2.5rem;
            }
            
            .hero-stats {
              justify-content: space-between;
              gap: 1rem;
              flex-wrap: wrap;
              
              .stat {
                flex: 1;
                min-width: 120px;
                text-align: center;
                
                .stat-number {
                  font-size: 1.5rem;
                }
                
                .stat-label {
                  font-size: 0.8rem;
                }
              }
            }
          }
          
          .hero-visual {
            height: 300px;
            
            .floating-mockup {
              &.mockup-2 {
                display: none;
              }
            }
          }
        }
        
        .section-header h2 {
          font-size: 2rem;
        }
        
        .features {
          .features-showcase {
            .feature-large {
              grid-template-columns: 1fr;
              gap: 2rem;
              text-align: center;
              
              .feature-info h3 {
                font-size: 2rem;
              }
            }
            
            .features-grid-small {
              grid-template-columns: 1fr;
            }
          }
        }
        
        .cta {
          .cta-content h2 {
            font-size: 2rem;
          }
        }
        
        .footer {
          .footer-content {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
            
            .footer-links {
              justify-content: center;
              flex-wrap: wrap;
            }
          }
        }
      }
      
      @media screen and (max-width: 500px) {
        .nav-container, .section-container, .hero-container, .footer-container {
          padding: 0 1rem;
        }
        
        .nav {
          .nav-container {
            flex-direction: column;
            gap: 0.75rem;
            text-align: center;
            justify-content: center;
            
            .nav-logo {
              margin-left: 0 !important;
              padding-left: 0;
              left: 0 !important;
              position: static;
              order: 1;
              
              .brand-title {
                font-size: 1.25rem;
              }
            }
            
            .nav-right {
              margin-right: 0 !important;
              padding-right: 0;
              right: 0 !important;
              position: static;
              order: 2;
              display: flex;
              justify-content: center;
              width: 100%;
              
              .nav-links {
                display: none;
              }
              
              .nav-app {
                margin-top: 0;
              }
            }
          }
        }
        
        .hero {
          .hero-content {
            h1 {
              font-size: 2rem;
            }
            
            .hero-stats {
              gap: 0.5rem;
              
              .stat {
                min-width: 100px;
                
                .stat-number {
                  font-size: 1.25rem;
                }
                
                .stat-label {
                  font-size: 0.75rem;
                }
              }
            }
          }
          
          .hero-visual {
            height: 250px;
            
            .floating-mockup {
              &.mockup-3 {
                display: none;
              }
            }
          }
        }
        
        .section-header h2 {
          font-size: 1.75rem;
        }
        
        .features {
          padding: 4rem 0;
          
          .features-showcase {
            .feature-large {
              .feature-info h3 {
                font-size: 1.75rem;
              }
            }
          }
        }
        
        .cta {
          padding: 4rem 0;
          
          .cta-content h2 {
            font-size: 1.75rem;
          }
        }
      }
      
      // Legacy compatibility
      @media screen and (max-width: 500px) {
        .url-bar {
          opacity: 0 !important;
        }
        
        .window-controls {
          margin: 0 3% !important;
        }
        
        .page-controls {
          opacity: 0;
        }
        
        .browser-container {
          :last-of-type {
            margin-right: 3% !important;
          }
        }
      }
`;
};

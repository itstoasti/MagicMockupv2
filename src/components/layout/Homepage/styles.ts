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
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
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
          margin-right: -21rem;
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
          max-width: 1400px;
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
          
          .hero-images {
            position: relative;
            width: 100%;
            height: 100%;
            
            .hero-image {
              position: absolute;
              border-radius: 12px;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
              overflow: hidden;
              transition: transform 0.3s ease;
              animation: float 3s ease-in-out infinite;
              
              &:hover {
                transform: translateY(-10px);
              }
              
              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
              }
              
              &.hero-image-1 {
                width: 480px;
                height: 300px;
                top: 0%;
                left: -5%;
                animation-delay: 0s;
              }
              
              &.hero-image-2 {
                width: 270px;
                height: 470px;
                top: 5%;
                right: -20%;
                border-radius: 20px;
                animation-delay: 1s;
              }
              
              &.hero-image-3 {
                width: 430px;
                height: 270px;
                bottom: -15%;
                left: 10%;
                animation-delay: 2s;
              }
            }
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      }
      
      // Mobile showcase image (hidden on desktop)
      .mobile-showcase-image {
        display: none;
      }
      
      // Text behind image styling  
      .text-behind-image {
        width: 120%;
        height: auto;
        border-radius: 1rem;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        transform: scale(1.1);
        max-width: none;
      }
      
      // Section Container
      .section-container {
        max-width: 1400px;
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
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
            
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
          max-width: 1400px;
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
            height: 400px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 4rem;
            
            .hero-images {
              position: relative;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              
              .hero-image {
                &.hero-image-1,
                &.hero-image-3 {
                  display: none;
                }
                
                &.hero-image-2 {
                  position: static;
                  width: 250px;
                  height: 400px;
                  border-radius: 20px;
                  animation: float 3s ease-in-out infinite;
                  animation-delay: 0s;
                  margin-top: 3rem;
                }
              }
            }
          }
          
          .mobile-showcase-image {
            display: block;
            margin: 2rem 0;
            text-align: center;
            
            img {
              max-width: 90%;
              height: auto;
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
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
              max-width: 500px;
              margin: 0 auto;
              padding: 0 1rem;
              
              .feature-info {
                h3 {
                  font-size: 2rem;
                }
                
                p {
                  font-size: 1.1rem;
                  line-height: 1.6;
                  margin-bottom: 2rem;
                }
                
                .feature-benefits {
                  text-align: left;
                  max-width: 300px;
                  margin: 0 auto 2rem auto;
                  
                  li {
                    font-size: 0.95rem;
                    margin-bottom: 0.75rem;
                    padding: 0.5rem 0;
                    
                    svg {
                      width: 18px;
                      height: 18px;
                      flex-shrink: 0;
                    }
                  }
                }
              }
              
              .feature-preview {
                max-width: 400px;
                margin: 0 auto;
                
                .preview-window {
                  padding: 3rem 1.5rem;
                  
                  .preview-content {
                    .preview-icon {
                      width: 40px;
                      height: 40px;
                    }
                    
                    p {
                      font-size: 0.95rem;
                    }
                  }
                }
              }
            }
            
            .features-grid-small {
              grid-template-columns: 1fr;
              gap: 2rem;
              max-width: 400px;
              margin: 0 auto;
              padding: 0 1rem;
              
              .feature-small {
                padding: 1.5rem;
                text-align: center;
                border-radius: 12px;
                
                .feature-icon-small {
                  margin: 0 auto 1rem auto;
                  width: 40px;
                  height: 40px;
                  
                  svg {
                    width: 20px;
                    height: 20px;
                  }
                }
                
                h4 {
                  font-size: 1.1rem;
                  margin: 0 0 0.5rem 0;
                }
                
                p {
                  font-size: 0.9rem;
                  line-height: 1.5;
                  margin: 0;
                  color: #64748b;
                }
              }
            }
          }
        }
        
        .cta {
          .cta-content h2 {
            font-size: 2rem;
          }
        }
        
        .footer {
          padding: 2rem 0 1.5rem;
          
          .footer-container {
            padding: 0 1rem;
          }
          
          .footer-content {
            flex-direction: column;
            text-align: center;
            gap: 2rem;
            align-items: center;
            
            .footer-brand {
              max-width: 100%;
              text-align: center;
              
              .footer-brand-title {
                font-size: 1.3rem;
              }
              
              p {
                font-size: 0.95rem;
                color: #94a3b8;
              }
            }
            
            .footer-links {
              justify-content: center;
              flex-wrap: wrap;
              gap: 1.5rem;
              
              a, button {
                font-size: 0.9rem;
                color: #cbd5e1;
                
                &:hover {
                  color: #ffffff;
                }
              }
            }
          }
          
          .footer-bottom {
            margin-top: 1rem;
            
            p {
              font-size: 0.85rem;
              color: #64748b;
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
            height: 350px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding-top: 3rem;
            
            .hero-images {
              position: relative;
              width: 100%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              
              .hero-image {
                &.hero-image-1,
                &.hero-image-3 {
                  display: none;
                }
                
                &.hero-image-2 {
                  position: static;
                  width: 220px;
                  height: 350px;
                  border-radius: 20px;
                  animation: float 3s ease-in-out infinite;
                  animation-delay: 0s;
                  margin-top: 2rem;
                }
              }
            }
          }
          
          .mobile-showcase-image {
            img {
              max-width: 95%;
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

      // Text Behind Image Feature Section
      .text-feature-showcase {
        padding: 6rem 0;
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        position: relative;
        overflow: hidden;

        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 30% 20%, rgba(79, 70, 229, 0.05) 0%, transparent 50%),
                      radial-gradient(circle at 70% 80%, rgba(124, 58, 237, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .section-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }

        .text-feature-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .text-feature-info {
          .feature-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 2rem;
            font-size: 0.875rem;
            font-weight: 600;
            margin-bottom: 1.5rem;

            .badge-icon {
              width: 16px;
              height: 16px;
            }
          }

          h2 {
            font-size: 3rem;
            font-weight: 800;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #1e293b, #475569);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1.2;
          }

          p {
            font-size: 1.25rem;
            color: #64748b;
            margin-bottom: 2rem;
            line-height: 1.6;
          }

          .text-feature-benefits {
            list-style: none;
            padding: 0;
            margin: 0 0 2.5rem 0;

            li {
              display: flex;
              align-items: center;
              gap: 0.75rem;
              margin-bottom: 1rem;
              font-size: 1.1rem;
              color: #475569;

              svg {
                color: #22c55e;
                width: 20px;
                height: 20px;
                flex-shrink: 0;
              }
            }
          }

          .feature-cta-button {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 0.75rem;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(79, 70, 229, 0.3);

            &:hover {
              transform: translateY(-2px);
              box-shadow: 0 8px 30px rgba(79, 70, 229, 0.4);
            }

            svg {
              width: 20px;
              height: 20px;
            }
          }
        }

        .text-feature-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;

          .text-preview-container {
            position: relative;
            width: 400px;
            height: 300px;
            perspective: 1000px;
          }

          .text-preview-mockup {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            transform: rotateY(-10deg) rotateX(5deg);
            transition: transform 0.3s ease;

            &:hover {
              transform: rotateY(-5deg) rotateX(2deg) scale(1.05);
            }

            .text-preview-image {
              position: absolute;
              top: 20%;
              left: 20%;
              width: 60%;
              height: 60%;
              background: radial-gradient(circle, rgba(255,255,255,0.2) 30%, transparent 70%);
              border-radius: 50%;
              opacity: 0.6;
            }

            .text-preview-text {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) perspective(500px) rotateX(20deg);
              font-size: 2.5rem;
              font-weight: 900;
              color: white;
              text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
              letter-spacing: 0.1em;
              z-index: 10;
            }
          }
        }

        @media (max-width: 768px) {
          padding: 4rem 0;

          .text-feature-content {
            grid-template-columns: 1fr;
            gap: 3rem;
            text-align: center;
          }

          .text-feature-info {
            h2 {
              font-size: 2.5rem;
            }

            p {
              font-size: 1.1rem;
            }
          }

          .text-feature-visual {
            .text-preview-container {
              width: 100%;
              max-width: 350px;
              height: auto;
              margin: 0 auto;
            }
            
            .text-behind-image {
              width: 100% !important;
              height: auto !important;
              max-width: 100%;
              border-radius: 1rem;
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
              transform: none !important;
            }
          }
        }
      }
`;
};

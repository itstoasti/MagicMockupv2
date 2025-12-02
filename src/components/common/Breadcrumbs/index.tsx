import React from 'react';
import { Routes, routeStore } from '../../../stores/routeStore';
import { FaHome, FaChevronRight } from 'react-icons/fa';

interface BreadcrumbItem {
  label: string;
  route?: Routes;
  url?: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const handleNavigation = (item: BreadcrumbItem) => {
    if (item.route) {
      routeStore.goToRoute(item.route);
    } else if (item.url) {
      window.location.href = item.url;
    }
  };

  return (
    <nav className={`breadcrumbs ${className}`} aria-label="Breadcrumb navigation">
      <ol className="breadcrumb-list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index > 0 && <FaChevronRight className="breadcrumb-separator" />}
            
            {item.active ? (
              <span className="breadcrumb-current" aria-current="page">
                {item.label}
              </span>
            ) : (
              <button
                onClick={() => handleNavigation(item)}
                className="breadcrumb-link"
                type="button"
              >
                {index === 0 && <FaHome className="breadcrumb-home" />}
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
      
      <style>{`
        .breadcrumbs {
          margin: 1rem 0;
          font-size: 0.875rem;
        }
        
        .breadcrumb-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 0;
          padding: 0;
          list-style: none;
        }
        
        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .breadcrumb-link {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: none;
          border: none;
          color: #6b7280;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        
        .breadcrumb-link:hover {
          color: #4f46e5;
          text-decoration: underline;
        }
        
        .breadcrumb-current {
          color: #1f2937;
          font-weight: 500;
        }
        
        .breadcrumb-separator {
          color: #9ca3af;
          font-size: 0.75rem;
        }
        
        .breadcrumb-home {
          font-size: 0.875rem;
        }
        
        @media (max-width: 768px) {
          .breadcrumbs {
            font-size: 0.75rem;
          }
          
          .breadcrumb-list {
            gap: 0.25rem;
          }
        }
      `}</style>
    </nav>
  );
};
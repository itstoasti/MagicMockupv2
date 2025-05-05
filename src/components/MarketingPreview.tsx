
import React from 'react';

interface MarketingPreviewProps {
  children: React.ReactNode;
  type: string;
  onClose: () => void;
}

const MarketingPreview = ({ children, type, onClose }: MarketingPreviewProps) => {
  let dimensions: string;
  let title: string;
  
  switch (type) {
    case 'appstore':
      dimensions = 'w-[1242px] h-[2208px]';
      title = 'App Store Preview';
      break;
    case 'instagram':
      dimensions = 'w-[1080px] h-[1080px]';
      title = 'Instagram Post Preview';
      break;
    default:
      dimensions = 'w-[1080px] h-[1080px]';
      title = 'Marketing Preview';
  }
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center border-b border-mockup-gray-200 p-4">
          <h3 className="font-medium text-mockup-gray-800">{title}</h3>
          <button 
            onClick={onClose}
            className="text-mockup-gray-500 hover:text-mockup-gray-700"
          >
            &times;
          </button>
        </div>
        
        <div className="p-4 overflow-auto flex-1">
          <div className="bg-mockup-gray-100 p-4 flex items-center justify-center rounded-lg overflow-hidden">
            {/* Scale down the preview to fit in the modal */}
            <div className={`${dimensions} scale-50 origin-center bg-white`} style={{ maxWidth: '100%', maxHeight: '75vh' }}>
              {children}
            </div>
          </div>
        </div>
        
        <div className="border-t border-mockup-gray-200 p-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-mockup-gray-100 text-mockup-gray-700 rounded-md hover:bg-mockup-gray-200"
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-mockup-blue text-white rounded-md hover:bg-blue-600"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketingPreview;

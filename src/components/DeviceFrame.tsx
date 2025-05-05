
import React from 'react';

interface DeviceFrameProps {
  image: string | null;
  deviceType: string;
  deviceColor: string;
  orientation: 'portrait' | 'landscape';
  shadow: boolean;
}

const DeviceFrame = ({ 
  image, 
  deviceType, 
  deviceColor, 
  orientation, 
  shadow 
}: DeviceFrameProps) => {
  
  // Define device frame styles based on type and color
  const getDeviceStyles = () => {
    const baseStyles = "relative transition-all duration-300 ease-in-out";
    
    // Shadow styles
    const shadowStyle = shadow ? "drop-shadow-xl" : "";
    
    // Device-specific styles
    switch (deviceType) {
      case 'iphone':
        return {
          container: `${baseStyles} ${shadowStyle} ${orientation === 'portrait' ? 'w-[280px] h-[570px]' : 'w-[570px] h-[280px]'}`,
          frame: `absolute inset-0 rounded-[40px] ${deviceColor === 'black' ? 'bg-black' : deviceColor === 'white' ? 'bg-white' : 'bg-gray-100'}`,
          screen: `absolute ${orientation === 'portrait' ? 'top-12 bottom-12 left-3 right-3' : 'top-3 bottom-3 left-12 right-12'} bg-gray-800 rounded-3xl overflow-hidden`,
          notch: `absolute ${orientation === 'portrait' ? 'top-4 left-1/2 -translate-x-1/2 w-20 h-6' : 'top-1/2 left-4 -translate-y-1/2 w-6 h-20'} bg-black rounded-full`
        };
      case 'android':
        return {
          container: `${baseStyles} ${shadowStyle} ${orientation === 'portrait' ? 'w-[260px] h-[540px]' : 'w-[540px] h-[260px]'}`,
          frame: `absolute inset-0 rounded-[20px] ${deviceColor === 'black' ? 'bg-black' : deviceColor === 'white' ? 'bg-white' : 'bg-gray-100'}`,
          screen: `absolute ${orientation === 'portrait' ? 'top-2 bottom-2 left-2 right-2' : 'top-2 bottom-2 left-2 right-2'} bg-gray-800 rounded-lg overflow-hidden`,
          notch: `absolute ${orientation === 'portrait' ? 'top-3 left-1/2 -translate-x-1/2 w-3 h-3' : 'top-1/2 left-3 -translate-y-1/2 w-3 h-3'} bg-black rounded-full`
        };
      case 'ipad':
        return {
          container: `${baseStyles} ${shadowStyle} ${orientation === 'portrait' ? 'w-[380px] h-[540px]' : 'w-[540px] h-[380px]'}`,
          frame: `absolute inset-0 rounded-[20px] ${deviceColor === 'black' ? 'bg-black' : deviceColor === 'white' ? 'bg-white' : 'bg-gray-100'}`,
          screen: `absolute ${orientation === 'portrait' ? 'top-4 bottom-4 left-3 right-3' : 'top-3 bottom-3 left-4 right-4'} bg-gray-800 rounded-lg overflow-hidden`,
          notch: `hidden`
        };
      case 'macbook':
        return {
          container: `${baseStyles} ${shadowStyle} w-[640px] h-[400px]`,
          frame: `absolute inset-0 rounded-[10px] ${deviceColor === 'black' ? 'bg-gray-800' : deviceColor === 'white' ? 'bg-gray-100' : 'bg-gray-200'}`,
          screen: `absolute top-0 bottom-16 left-3 right-3 bg-gray-800 rounded-t-lg overflow-hidden`,
          keyboard: `absolute bottom-0 h-16 left-0 right-0 bg-${deviceColor === 'black' ? 'gray-700' : 'gray-200'} rounded-b-lg`
        };
      default:
        return {
          container: `${baseStyles} ${shadowStyle} ${orientation === 'portrait' ? 'w-[280px] h-[570px]' : 'w-[570px] h-[280px]'}`,
          frame: `absolute inset-0 rounded-[40px] ${deviceColor === 'black' ? 'bg-black' : deviceColor === 'white' ? 'bg-white' : 'bg-gray-100'}`,
          screen: `absolute ${orientation === 'portrait' ? 'top-12 bottom-12 left-3 right-3' : 'top-3 bottom-3 left-12 right-12'} bg-gray-800 rounded-3xl overflow-hidden`,
          notch: `absolute ${orientation === 'portrait' ? 'top-4 left-1/2 -translate-x-1/2 w-20 h-6' : 'top-1/2 left-4 -translate-y-1/2 w-6 h-20'} bg-black rounded-full`
        };
    }
  };
  
  const styles = getDeviceStyles();
  
  return (
    <div className={styles.container}>
      <div className={styles.frame}></div>
      <div className={styles.notch}></div>
      {deviceType === 'macbook' && <div className={styles.keyboard}></div>}
      <div className={styles.screen}>
        {image && (
          <img 
            src={image} 
            alt="Screenshot" 
            className="w-full h-full object-cover"
          />
        )}
        {!image && (
          <div className="w-full h-full flex items-center justify-center bg-gray-700">
            <p className="text-gray-400 text-sm text-center px-4">Upload a screenshot</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeviceFrame;

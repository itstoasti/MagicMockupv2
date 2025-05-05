
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
    
    // Enhanced shadow styles
    const shadowStyle = shadow 
      ? "drop-shadow-xl after:absolute after:inset-0 after:opacity-20 after:blur-xl after:-z-10 after:bg-black after:translate-y-2 after:scale-95 after:rounded-[40px]" 
      : "";
    
    // Device-specific styles
    switch (deviceType) {
      case 'iphone':
        return {
          container: `${baseStyles} ${shadowStyle} ${orientation === 'portrait' ? 'w-[280px] h-[570px]' : 'w-[570px] h-[280px]'}`,
          frame: `absolute inset-0 rounded-[40px] ${deviceColor === 'black' ? 'bg-black' : deviceColor === 'white' ? 'bg-white' : 'bg-gray-100'} 
                  border border-opacity-10 ${deviceColor === 'black' ? 'border-white/10' : 'border-black/10'} 
                  before:absolute before:inset-0 before:rounded-[40px] before:opacity-30 before:bg-gradient-to-br before:from-white/20 before:to-transparent`,
          screen: `absolute ${orientation === 'portrait' ? 'top-12 bottom-12 left-3 right-3' : 'top-3 bottom-3 left-12 right-12'} bg-gray-800 rounded-3xl overflow-hidden
                   shadow-inner border border-gray-700`,
          notch: `absolute ${orientation === 'portrait' ? 'top-4 left-1/2 -translate-x-1/2 w-20 h-6' : 'top-1/2 left-4 -translate-y-1/2 w-6 h-20'} bg-black rounded-full z-10
                  flex items-center justify-center before:absolute before:w-2 before:h-2 before:bg-gray-700 before:rounded-full before:opacity-80`,
          buttons: [
            `absolute ${orientation === 'portrait' ? 'right-[-2px] top-28 h-10 w-1' : 'top-[-2px] left-28 w-10 h-1'} bg-gray-600 rounded-l-sm`,
            `absolute ${orientation === 'portrait' ? 'left-[-2px] top-28 h-14 w-1' : 'bottom-[-2px] left-28 w-14 h-1'} bg-gray-600 rounded-r-sm`,
            `absolute ${orientation === 'portrait' ? 'left-[-2px] top-48 h-14 w-1' : 'bottom-[-2px] left-48 w-14 h-1'} bg-gray-600 rounded-r-sm`
          ]
        };
      case 'android':
        return {
          container: `${baseStyles} ${shadowStyle} ${orientation === 'portrait' ? 'w-[260px] h-[540px]' : 'w-[540px] h-[260px]'}`,
          frame: `absolute inset-0 rounded-[20px] ${deviceColor === 'black' ? 'bg-black' : deviceColor === 'white' ? 'bg-white' : 'bg-gray-100'}
                  before:absolute before:inset-0 before:rounded-[20px] before:opacity-30 before:bg-gradient-to-br before:from-white/20 before:to-transparent
                  border border-opacity-10 ${deviceColor === 'black' ? 'border-white/10' : 'border-black/10'}`,
          screen: `absolute ${orientation === 'portrait' ? 'top-2 bottom-2 left-2 right-2' : 'top-2 bottom-2 left-2 right-2'} bg-gray-800 rounded-lg overflow-hidden
                   shadow-inner border border-gray-700`,
          notch: `absolute ${orientation === 'portrait' ? 'top-3 left-1/2 -translate-x-1/2 w-3 h-3' : 'top-1/2 left-3 -translate-y-1/2 w-3 h-3'} 
                  bg-gray-900 rounded-full z-10 flex items-center justify-center`,
          buttons: [
            `absolute ${orientation === 'portrait' ? 'right-[-2px] top-24 h-12 w-1' : 'top-[-2px] left-24 w-12 h-1'} bg-gray-600 rounded-l-sm`,
            `absolute ${orientation === 'portrait' ? 'right-[-2px] top-40 h-12 w-1' : 'top-[-2px] left-40 w-12 h-1'} bg-gray-600 rounded-l-sm`
          ]
        };
      case 'ipad':
        return {
          container: `${baseStyles} ${shadowStyle} ${orientation === 'portrait' ? 'w-[380px] h-[540px]' : 'w-[540px] h-[380px]'}`,
          frame: `absolute inset-0 rounded-[20px] ${deviceColor === 'black' ? 'bg-black' : deviceColor === 'white' ? 'bg-white' : 'bg-gray-100'}
                  before:absolute before:inset-0 before:rounded-[20px] before:opacity-30 before:bg-gradient-to-br before:from-white/20 before:to-transparent
                  border border-opacity-10 ${deviceColor === 'black' ? 'border-white/10' : 'border-black/10'}`,
          screen: `absolute ${orientation === 'portrait' ? 'top-4 bottom-4 left-3 right-3' : 'top-3 bottom-3 left-4 right-4'} bg-gray-800 rounded-lg overflow-hidden
                   shadow-inner border border-gray-700`,
          notch: `absolute ${orientation === 'portrait' ? 'top-2 left-1/2 -translate-x-1/2 w-4 h-4' : 'top-1/2 left-2 -translate-y-1/2 w-4 h-4'} 
                  bg-gray-900 rounded-full z-10 flex items-center justify-center`,
          buttons: [
            `absolute ${orientation === 'portrait' ? 'right-[-2px] top-16 h-10 w-1' : 'top-[-2px] left-16 w-10 h-1'} bg-gray-600 rounded-l-sm`
          ]
        };
      case 'macbook':
        return {
          container: `${baseStyles} ${shadowStyle} w-[640px] h-[400px]`,
          frame: `absolute inset-0 rounded-[10px] ${deviceColor === 'black' ? 'bg-gray-800' : deviceColor === 'white' ? 'bg-gray-100' : 'bg-gray-200'}
                  before:absolute before:inset-0 before:rounded-t-lg before:opacity-30 before:bg-gradient-to-br before:from-white/20 before:to-transparent
                  border border-opacity-10 ${deviceColor === 'black' ? 'border-white/10' : 'border-black/10'}`,
          screen: `absolute top-0 bottom-16 left-3 right-3 bg-gray-800 rounded-t-lg overflow-hidden
                   shadow-inner border border-gray-700`,
          keyboard: `absolute bottom-0 h-16 left-0 right-0 ${deviceColor === 'black' ? 'bg-gray-700' : 'bg-gray-200'} rounded-b-lg
                     before:absolute before:left-1/2 before:-translate-x-1/2 before:bottom-3 before:h-1 before:w-24 
                     before:rounded-full before:bg-gray-400 before:opacity-50`,
          touchpad: `absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 ${deviceColor === 'black' ? 'bg-gray-800' : 'bg-gray-300'} 
                     rounded-sm border ${deviceColor === 'black' ? 'border-gray-600' : 'border-gray-400'}`
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
      {deviceType === 'macbook' && (
        <>
          <div className={styles.keyboard}></div>
          <div className={styles.touchpad}></div>
        </>
      )}
      {styles.buttons && styles.buttons.map((buttonStyle, index) => (
        <div key={`button-${index}`} className={buttonStyle}></div>
      ))}
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

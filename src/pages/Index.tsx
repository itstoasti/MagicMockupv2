
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import ToolsPanel from '@/components/ToolsPanel';
import DeviceFrame from '@/components/DeviceFrame';
import Footer from '@/components/Footer';
import MarketingPreview from '@/components/MarketingPreview';

const Index = () => {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [deviceType, setDeviceType] = useState('iphone');
  const [deviceColor, setDeviceColor] = useState('black');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [shadow, setShadow] = useState(true);
  const [background, setBackground] = useState('white');
  const [marketingPreview, setMarketingPreview] = useState<string | null>(null);

  const handleImageUpload = (image: string) => {
    setUploadedImage(image);
  };

  const handleDeviceTypeChange = (type: string) => {
    setDeviceType(type);
  };

  const handleDeviceColorChange = (color: string) => {
    setDeviceColor(color);
  };

  const handleOrientationChange = (orientation: 'portrait' | 'landscape') => {
    setOrientation(orientation);
  };

  const handleShadowChange = (shadow: boolean) => {
    setShadow(shadow);
  };

  const handleBackgroundChange = (color: string) => {
    setBackground(color);
  };

  const handleExport = (type: string) => {
    if (!uploadedImage) {
      toast({
        title: "No screenshot",
        description: "Please upload a screenshot first.",
        variant: "destructive",
      });
      return;
    }

    if (type === 'mockup') {
      toast({
        title: "Exporting mockup",
        description: "Your mockup is being exported as PNG.",
      });
      // In a real app, we would generate and download the PNG here
    } else {
      // Open marketing preview
      setMarketingPreview(type);
    }
  };

  const getBackgroundStyle = () => {
    switch (background) {
      case 'white':
        return 'bg-white';
      case 'gray':
        return 'bg-mockup-gray-100';
      case 'blue':
        return 'bg-blue-100';
      case 'green':
        return 'bg-green-100';
      case 'gradient':
        return 'bg-gradient-to-br from-green-100 to-blue-100';
      default:
        return 'bg-white';
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Preview Pane */}
          <div className={`flex items-center justify-center p-8 rounded-lg ${getBackgroundStyle()}`}>
            <div className="animate-float">
              <DeviceFrame 
                image={uploadedImage} 
                deviceType={deviceType}
                deviceColor={deviceColor}
                orientation={orientation}
                shadow={shadow}
              />
            </div>
          </div>
          
          {/* Tools Panel */}
          <div>
            <h2 className="text-xl font-bold text-mockup-gray-800 mb-4">Mockup Settings</h2>
            <ToolsPanel 
              onImageUpload={handleImageUpload}
              onDeviceTypeChange={handleDeviceTypeChange}
              onDeviceColorChange={handleDeviceColorChange}
              onOrientationChange={handleOrientationChange}
              onShadowChange={handleShadowChange}
              onBackgroundChange={handleBackgroundChange}
              deviceType={deviceType}
              deviceColor={deviceColor}
              orientation={orientation}
              shadow={shadow}
              background={background}
              hasImage={!!uploadedImage}
              onExport={handleExport}
            />
            
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-mockup-gray-800 mb-2">Pro Tips</h3>
              <ul className="text-sm text-mockup-gray-600 space-y-2">
                <li>• Upload high-resolution screenshots for best results</li>
                <li>• Try different device frames to find the best fit</li>
                <li>• Add shadows for a more realistic mockup</li>
                <li>• Use gradient backgrounds for marketing materials</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {marketingPreview && (
        <MarketingPreview type={marketingPreview} onClose={() => setMarketingPreview(null)}>
          <div className="relative w-full h-full">
            {marketingPreview === 'appstore' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-300"></div>
                <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/4 scale-75">
                  <DeviceFrame 
                    image={uploadedImage} 
                    deviceType={deviceType}
                    deviceColor={deviceColor}
                    orientation="portrait"
                    shadow={true}
                  />
                </div>
                <div className="absolute bottom-1/4 left-0 right-0 text-center">
                  <h2 className="text-4xl font-bold text-white drop-shadow-lg mb-4">Your App Name</h2>
                  <p className="text-2xl text-white drop-shadow-md">Available now on the App Store</p>
                </div>
              </>
            )}
            
            {marketingPreview === 'instagram' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-300"></div>
                <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-75 rotate-[-5deg]">
                  <DeviceFrame 
                    image={uploadedImage} 
                    deviceType={deviceType}
                    deviceColor={deviceColor}
                    orientation="portrait"
                    shadow={true}
                  />
                </div>
                <div className="absolute right-1/4 top-1/2 -translate-y-1/2 max-w-[40%] text-left">
                  <h2 className="text-3xl font-bold text-white drop-shadow-lg mb-4">Track Your Keto Journey!</h2>
                  <p className="text-xl text-white drop-shadow-md">Download now and start your transformation</p>
                </div>
              </>
            )}
            <div className="absolute bottom-6 right-6 text-xs text-white opacity-50">
              Created with MockupMagic
            </div>
          </div>
        </MarketingPreview>
      )}
    </div>
  );
};

export default Index;

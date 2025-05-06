import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import ToolsPanel from '@/components/ToolsPanel';
import DeviceFrame from '@/components/DeviceFrame';
import Footer from '@/components/Footer';
import MarketingPreview from '@/components/MarketingPreview';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [deviceType, setDeviceType] = useState('iphone');
  const [deviceColor, setDeviceColor] = useState('black');
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [shadow, setShadow] = useState(true);
  const [background, setBackground] = useState('white');
  const [marketingPreview, setMarketingPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedAssetUrl, setGeneratedAssetUrl] = useState<string | null>(null);

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

  const handleExport = async (type: string) => {
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
      // Call backend to generate marketing asset
      setIsLoading(true);
      setGeneratedAssetUrl(null); // Reset previous asset
      setMarketingPreview(type); // Open modal immediately (optional, could wait for response)

      try {
        // Replace localhost URL with Supabase Edge Function URL
        const functionUrl = 'https://ymeoglaoccsstbwbqicq.supabase.co/functions/v1/generate-marketing-asset';

        // Retrieve the Supabase anon key (replace with your actual key or use Supabase client)
        // IMPORTANT: Storing the key directly here is not recommended for production.
        // Use environment variables or the Supabase JS client library for better security.
        const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltZW9nbGFvY2Nzc3Rid2JxaWNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY0MjgxNDQsImV4cCI6MjA2MjAwNDE0NH0.08zMmn-gLm4-2_7odg5-gC25sSmyrP8iZKZu6qBqLAo'; // <-- Key updated

        const response = await fetch(functionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // Add Supabase required headers
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'apikey': supabaseAnonKey // The anon key is often needed as apikey header too
          },
          body: JSON.stringify({
            mockupImage: uploadedImage, // Assuming uploadedImage holds the necessary data/URL
            deviceType: deviceType,
            outputType: type,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to generate marketing asset');
        }

        const data = await response.json();

        if (data.success && data.imageUrl) {
          setGeneratedAssetUrl(data.imageUrl);
          toast({
            title: "Asset Generated",
            description: `Your ${type} marketing asset is ready for preview.`,
          });
        } else {
          throw new Error('API response missing success or imageUrl');
        }

      } catch (error) {
        console.error("Error generating marketing asset:", error);
        toast({
          title: "Generation Failed",
          description: "Could not generate the marketing asset. Please try again.",
          variant: "destructive",
        });
        setMarketingPreview(null); // Close modal on error
      } finally {
        setIsLoading(false);
      }
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
        <MarketingPreview
          type={marketingPreview}
          onClose={() => {
            setMarketingPreview(null);
            setGeneratedAssetUrl(null); // Clear generated URL when closing
          }}
        >
          {/* Show loader while generating, then the generated image or fallback */}
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full min-h-[200px] bg-gray-100">
              <Loader2 className="h-12 w-12 animate-spin text-mockup-blue" />
            </div>
          ) : generatedAssetUrl ? (
            // Display the generated image - adjust styling as needed
            <div className="relative w-full h-full flex items-center justify-center">
               <img
                 src={generatedAssetUrl} // Use the generated URL
                 alt={`${marketingPreview} Preview`}
                 className="max-w-full max-h-full object-contain"
                 // Add onError handler if needed: onError={(e) => e.target.src='/path/to/error-image.png'}
               />
            </div>
          ) : (
             // Fallback or initial state before generation completes (or if it fails but modal wasn't closed)
             <div className="flex items-center justify-center w-full h-full min-h-[200px] bg-gray-100 text-mockup-gray-500">
               Generating asset...
             </div>
           )
          }
           {/* Optionally keep watermark if needed */}
           {!isLoading && generatedAssetUrl && (
              <div className="absolute bottom-6 right-6 text-xs text-black opacity-50 bg-white/70 px-1 rounded">
                 Generated with MockupMagic (Preview)
              </div>
           )}
        </MarketingPreview>
      )}
    </div>
  );
};

export default Index;

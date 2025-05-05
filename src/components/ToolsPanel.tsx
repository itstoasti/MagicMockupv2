
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from '@/components/ui/label';
import UploadArea from './UploadArea';
import { Check, Download, Image, ImagePlus } from 'lucide-react';

interface ToolsPanelProps {
  onImageUpload: (image: string) => void;
  onDeviceTypeChange: (type: string) => void;
  onDeviceColorChange: (color: string) => void;
  onOrientationChange: (orientation: 'portrait' | 'landscape') => void;
  onShadowChange: (shadow: boolean) => void;
  onBackgroundChange: (color: string) => void;
  deviceType: string;
  deviceColor: string;
  orientation: 'portrait' | 'landscape';
  shadow: boolean;
  background: string;
  hasImage: boolean;
  onExport: (type: string) => void;
}

const ToolsPanel = ({
  onImageUpload,
  onDeviceTypeChange,
  onDeviceColorChange,
  onOrientationChange,
  onShadowChange,
  onBackgroundChange,
  deviceType,
  deviceColor,
  orientation,
  shadow,
  background,
  hasImage,
  onExport
}: ToolsPanelProps) => {
  
  return (
    <div className="w-full bg-white rounded-lg border border-mockup-gray-200 overflow-hidden">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="upload">Upload</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>
        
        <div className="p-4">
          <TabsContent value="upload">
            <UploadArea onImageUpload={onImageUpload} />
          </TabsContent>
          
          <TabsContent value="customize">
            <div className="space-y-4">
              <div className="space-y-3">
                <Label>Device Type</Label>
                <Select value={deviceType} onValueChange={onDeviceTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select device" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iphone">iPhone 14 Pro</SelectItem>
                    <SelectItem value="android">Android Phone</SelectItem>
                    <SelectItem value="ipad">iPad Pro</SelectItem>
                    <SelectItem value="macbook">MacBook Pro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>Device Color</Label>
                <Select value={deviceColor} onValueChange={onDeviceColorChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="white">White</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <Label>Background Color</Label>
                <div className="grid grid-cols-5 gap-2">
                  {['white', 'gray', 'blue', 'green', 'gradient'].map((color) => (
                    <button
                      key={color}
                      className={`w-full h-10 rounded-md border ${background === color ? 'ring-2 ring-mockup-blue ring-offset-2' : ''}`}
                      style={{
                        background: color === 'white' ? 'white' : 
                                  color === 'gray' ? '#F3F4F6' : 
                                  color === 'blue' ? '#DBEAFE' : 
                                  color === 'green' ? '#DCFCE7' :
                                  'linear-gradient(135deg, #DCFCE7 0%, #DBEAFE 100%)'
                      }}
                      onClick={() => onBackgroundChange(color)}
                    >
                      {background === color && <Check size={16} className="m-auto text-mockup-blue" />}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-between">
                <div className="space-y-1">
                  <Label htmlFor="orientation">Portrait Mode</Label>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="orientation" 
                      checked={orientation === 'portrait'} 
                      onCheckedChange={(checked) => onOrientationChange(checked ? 'portrait' : 'landscape')}
                    />
                    <Label htmlFor="orientation">{orientation === 'portrait' ? 'On' : 'Off'}</Label>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="shadow">Shadow</Label>
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="shadow" 
                      checked={shadow} 
                      onCheckedChange={onShadowChange}
                    />
                    <Label htmlFor="shadow">{shadow ? 'On' : 'Off'}</Label>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="export">
            <div className="space-y-4">
              <div className="p-4 bg-mockup-gray-50 rounded-lg border border-mockup-gray-200 mb-4">
                <h3 className="font-medium text-mockup-gray-700 mb-2">Marketing Assets (Pro)</h3>
                <p className="text-sm text-mockup-gray-500 mb-4">Generate professional marketing assets for different platforms.</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-auto py-3 justify-start gap-3" 
                    onClick={() => onExport('appstore')}
                    disabled={!hasImage}
                  >
                    <div className="bg-blue-100 p-2 rounded-md">
                      <ImagePlus size={18} className="text-mockup-blue" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-mockup-gray-700">App Store</div>
                      <div className="text-xs text-mockup-gray-500">1242 x 2208</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-auto py-3 justify-start gap-3" 
                    onClick={() => onExport('instagram')}
                    disabled={!hasImage}
                  >
                    <div className="bg-pink-100 p-2 rounded-md">
                      <Image size={18} className="text-pink-600" />
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-mockup-gray-700">Instagram</div>
                      <div className="text-xs text-mockup-gray-500">1080 x 1080</div>
                    </div>
                  </Button>
                </div>
              </div>
              
              <Button 
                className="w-full bg-mockup-blue gap-2 hover:bg-blue-600" 
                size="lg" 
                onClick={() => onExport('mockup')}
                disabled={!hasImage}
              >
                <Download size={18} />
                Export Mockup (PNG)
              </Button>
              
              <div className="text-center text-xs text-mockup-gray-500 pt-2">
                Free plan: 5 exports remaining this month
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default ToolsPanel;

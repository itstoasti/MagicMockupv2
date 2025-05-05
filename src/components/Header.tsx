
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

const Header = () => {
  return (
    <header className="border-b border-mockup-gray-200 bg-white py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Camera size={24} className="text-mockup-blue" />
          <h1 className="text-xl font-bold text-mockup-gray-800">MockupMagic</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-mockup-gray-500">
            <span className="font-medium">Free Plan</span>
            <span className="ml-2">• 5 exports left</span>
          </div>
          <Button size="sm" className="bg-mockup-blue hover:bg-blue-600">Upgrade to Pro</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

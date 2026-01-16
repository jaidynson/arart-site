
import React from 'react';
import InkCanvas from './InkCanvas';
import { IMAGES } from '../constants';

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#f0f0f0]">
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {/* Container for Image + Ink Effect */}
        {/* Using max dimensions to ensure it fits on screen, but allowing natural aspect ratio */}
        <div className="relative shadow-2xl overflow-hidden rounded-sm bg-white max-h-[85vh] max-w-[90vw]">
          
          {/* Base Image (Model) */}
          {/* block element to remove bottom spacing from inline-block images */}
          <img 
            src={IMAGES.model} 
            alt="Model" 
            className="block w-auto h-auto max-h-[85vh] max-w-full pointer-events-none select-none"
          />

          {/* Canvas Overlay for Ink Effect */}
          <InkCanvas />
          
          {/* Overlay Text (Optional, for aesthetics) */}
          <div className="absolute bottom-6 left-6 pointer-events-none z-20">
            <h2 className="text-white text-3xl md:text-4xl font-bold mix-blend-overlay opacity-90">Collection</h2>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 animate-bounce text-gray-400 text-sm tracking-widest">
        SCROLL TO REVEAL
      </div>
    </section>
  );
};

export default HeroSection;

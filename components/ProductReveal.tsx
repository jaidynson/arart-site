
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IMAGES } from '../constants';

interface ProductRevealProps {
  onDiscover: () => void;
}

const ProductReveal: React.FC<ProductRevealProps> = ({ onDiscover }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Shorten the scroll distance required to trigger animations
  // Range 1: Background reveals (0 -> 40%)
  const bgOpacity = useTransform(scrollYProgress, [0.0, 0.4], [0, 1]);
  
  // Range 2: T-Shirt appears (20% -> 60%)
  const tshirtScale = useTransform(scrollYProgress, [0.2, 0.7], [0.95, 1]);
  const tshirtOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);
  const tshirtY = useTransform(scrollYProgress, [0.2, 0.7], [30, 0]); 
  
  // Range 3: Text/UI reveals (50% -> 80%)
  // Ensures it's fully visible well before the user finishes scrolling
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.8], [20, 0]);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-[#fdfdfd]">
      {/* Sticky Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">
        
        {/* Background Layer */}
        <motion.div 
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <img 
            src={IMAGES.background} 
            alt="Background Texture" 
            className="w-full h-full object-cover brightness-125"
          />
          <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
        </motion.div>

        {/* Product Layer */}
        <motion.div 
          style={{ 
            scale: tshirtScale, 
            opacity: tshirtOpacity,
            y: tshirtY
          }}
          className="relative z-10 w-full max-w-sm md:max-w-xl p-4 flex justify-center items-center"
        >
          {/* Responsive Image Switching */}
          <picture>
            <source media="(max-width: 1024px)" srcSet={IMAGES.tshirtHighRes} />
            <img 
              src={IMAGES.tshirt} 
              alt="ARA T-Shirt Object" 
              className="w-full h-auto max-h-[70vh] object-contain drop-shadow-2xl"
            />
          </picture>
        </motion.div>

        {/* Text/CTA Layer */}
        <motion.div 
          style={{ 
            opacity: textOpacity,
            y: textY 
          }}
          className="absolute bottom-20 z-20 text-center text-white w-full"
        >
          <h2 className="text-4xl md:text-6xl font-serif mb-4 drop-shadow-lg">The Being</h2>
          <p className="text-lg md:text-xl font-light tracking-widest mb-8 drop-shadow-md">
            The New Collection
          </p>
          <button 
            onClick={onDiscover}
            className="px-8 py-3 bg-white/90 text-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-all hover:scale-105 shadow-lg backdrop-blur-sm pointer-events-auto cursor-pointer"
          >
            Discover More
          </button>
        </motion.div>

      </div>
    </div>
  );
};

export default ProductReveal;

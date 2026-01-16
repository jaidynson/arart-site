
import React, { useState } from 'react';
import HeroSection from './components/HeroSection';
import ProductReveal from './components/ProductReveal';
import BrandStory from './components/BrandStory';
import { AnimatePresence, motion } from 'framer-motion';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'story'>('home');

  return (
    <main className="w-full min-h-screen bg-neutral-50">
      <AnimatePresence mode="wait">
        {currentView === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection />
            <ProductReveal onDiscover={() => setCurrentView('story')} />
            
            {/* Simple Footer for Home */}
            <footer className="w-full py-12 bg-[#1a1a1a] text-white flex flex-col items-center justify-center text-center">
              <p className="font-serif text-2xl mb-4">ARA ART</p>
              <p className="text-xs text-neutral-500 uppercase tracking-wider">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </footer>
          </motion.div>
        ) : (
          <motion.div
            key="story"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <BrandStory onBack={() => setCurrentView('home')} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default App;

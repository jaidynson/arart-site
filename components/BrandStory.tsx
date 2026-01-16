
import React, { useLayoutEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { IMAGES, COLOR_GREEN, COLOR_GRAY } from '../constants';

interface BrandStoryProps {
  onBack: () => void;
}

const FadeInSection: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const BrandStory: React.FC<BrandStoryProps> = ({ onBack }) => {
  const topFocusRef = useRef<HTMLDivElement>(null);

  // ROBUST SCROLL RESET STRATEGY FOR TABLET/MOBILE
  useLayoutEffect(() => {
    // 1. Enforce manual scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // 2. The "Focus Hack":
    // Focusing an element forces the browser to scroll it into view.
    // By placing a hidden element at (0,0) and focusing it, we force the viewport to the top.
    // This is often more reliable than window.scrollTo on complex mobile pages.
    if (topFocusRef.current) {
      topFocusRef.current.focus({ preventScroll: false });
    }

    // 3. Fallback: Standard scrollTo with redundancy
    const forceScrollTop = () => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };

    forceScrollTop();

    // 4. Persistence:
    // Sometimes the browser layout settles a few frames later (e.g. after images layout).
    // We force the scroll position for the first few critical frames.
    const frames = [0, 1, 2, 5, 10]; // Frame count
    frames.forEach(frame => {
      requestAnimationFrame(() => {
         // Nested requestAnimationFrame to space them out
         for(let i=0; i<frame; i++) requestAnimationFrame(() => {});
         forceScrollTop();
      });
    });
    
    // Also a slight timeout for good measure (handling slow main-thread execution)
    const timeoutId = setTimeout(forceScrollTop, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="w-full bg-[#fcfcfc] text-[#1a1a1a] min-h-screen relative">
      {/* Hidden Focus Anchor for Scroll Reset */}
      <div 
        ref={topFocusRef} 
        tabIndex={-1} 
        className="absolute top-0 left-0 w-px h-px outline-none pointer-events-none opacity-0"
        aria-hidden="true"
      />

      {/* Back Button */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center mix-blend-difference text-white">
        <button 
          onClick={onBack}
          className="text-sm uppercase tracking-widest hover:opacity-70 transition-opacity cursor-pointer"
        >
          ← Back to Collection
        </button>
      </nav>

      {/* Section 1: Header - Brand Identity */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20 text-center">
        <FadeInSection>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 tracking-tight">ARA</h1>
          <p className="text-lg md:text-xl font-light text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            나를 온전히 알다, 알아차림<br />
            <span className="text-sm md:text-base mt-2 block text-neutral-400 tracking-widest uppercase">
              "나답게, 그리고 자연스럽게."
            </span>
          </p>
        </FadeInSection>
      </section>

      {/* Section 2: Brand Core - Moment of ARA */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.background} 
            alt="Leaves and Nature" 
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative z-10 text-center text-white px-6 max-w-4xl">
          <FadeInSection>
            <h2 className="font-serif text-3xl md:text-5xl mb-8">Moment of ARA</h2>
            <div className="w-12 h-[1px] bg-white mx-auto mb-8" />
            <h3 className="text-xl md:text-2xl font-light mb-6">Wearable Mindfulness : 입는 명상</h3>
            <p className="text-base md:text-lg font-light leading-loose text-white/90">
              옷을 입는 행위는 단순히 몸을 가리는 것을 넘어, 나를 돌보는 시작입니다.<br className="hidden md:block"/> 
              ARA는 옷을 입는 찰나의 순간을 통해 자연의 고요함 속에 머무는 시간을 제안합니다.<br className="hidden md:block"/> 
              복잡한 일상을 잠시 멈추고, 지금 이 순간의 나를 온전히 알아차리는 경험.<br className="hidden md:block"/> 
              그것이 ARA의 에디션, <strong>'Moment of ARA'</strong>가 지향하는 가치입니다.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Section 3: Brand Philosophy - We are Nature */}
      <section className="w-full py-24 px-6 md:px-12 bg-[#f4f4f4]">
        <div className="max-w-6xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl mb-4 text-[#2a2a2a]">We are Nature</h2>
              <p className="text-neutral-500 font-light">"우리는 모두 자연의 일부입니다."</p>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">
            {/* Stone Grey Philosophy */}
            <FadeInSection delay={0.2}>
              <div className="bg-white p-8 md:p-12 h-full shadow-sm hover:shadow-md transition-shadow">
                <div 
                  className="w-12 h-12 mb-6 rounded-full opacity-80"
                  style={{ backgroundColor: COLOR_GRAY }}
                />
                <h3 className="font-serif text-2xl mb-4 text-neutral-800">Stone Grey</h3>
                <p className="text-neutral-600 leading-relaxed font-light">
                  천 년의 시간을 견뎌온 석상의 고요한 미소.<br/>
                  변하지 않는 단단함과 침묵 속의 평온을 담았습니다.
                </p>
              </div>
            </FadeInSection>

            {/* Forest Green Philosophy */}
            <FadeInSection delay={0.4}>
              <div className="bg-white p-8 md:p-12 h-full shadow-sm hover:shadow-md transition-shadow">
                <div 
                  className="w-12 h-12 mb-6 rounded-full opacity-80"
                  style={{ backgroundColor: COLOR_GREEN }}
                />
                <h3 className="font-serif text-2xl mb-4 text-neutral-800">Forest Green</h3>
                <p className="text-neutral-600 leading-relaxed font-light">
                  깊은 숲이 품은 끈질긴 생명력.<br/>
                  자연이 주는 가장 편안한 치유의 색을 원단에 물들였습니다.
                </p>
              </div>
            </FadeInSection>
          </div>
          
          <FadeInSection delay={0.6}>
            <p className="text-center mt-16 text-neutral-600 font-light max-w-2xl mx-auto leading-relaxed">
              "사람은 자연 속에 머물 때 비로소 가장 평온한 얼굴을 되찾습니다."
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Section 3.5: Lookbook Gallery */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
              <div>
                <span className="text-xs font-bold tracking-[0.2em] text-neutral-400 uppercase block mb-2">Collection 2026</span>
                <h2 className="font-serif text-4xl text-[#1a1a1a]">Lookbook</h2>
              </div>
              <p className="text-sm text-neutral-500 mt-4 md:mt-0 max-w-xs text-right font-light">
                자연의 색감과 질감을 그대로 담은<br/>ARA의 이번 시즌 룩북을 만나보세요.
              </p>
            </div>
          </FadeInSection>

          {/* New 6-Image Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Column 1: Woman Block (New) + Detail */}
            <div className="flex flex-col gap-4">
              <FadeInSection delay={0.1}>
                <div className="relative overflow-hidden group aspect-[3/4]">
                   <img 
                    src={IMAGES.lookbookWomanBlock} 
                    alt="ARA Collection Woman Block" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                     <p className="font-serif text-lg">Lotus Flower</p>
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection delay={0.3}>
                 <div className="relative overflow-hidden group aspect-square bg-[#f9f9f9] flex items-center justify-center">
                   <img 
                    src={IMAGES.tshirtDetail1} 
                    alt="T-Shirt Detail 1" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </FadeInSection>
            </div>

            {/* Column 2: Man Green + Background Texture */}
            <div className="flex flex-col gap-4">
              <FadeInSection delay={0.2}>
                 <div className="relative overflow-hidden group aspect-[3/4]">
                   <img 
                    src={IMAGES.lookbookManGreen} 
                    alt="ARA Collection Man Green" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                     <p className="font-serif text-lg">Forest Green</p>
                  </div>
                </div>
              </FadeInSection>
               <FadeInSection delay={0.4}>
                 <div className="relative overflow-hidden group aspect-square bg-[#EAEAEA] flex items-center justify-center">
                   <img 
                    src={IMAGES.lookbookBackground} 
                    alt="Fabric Texture" 
                    className="w-full h-full object-cover opacity-80 transition-transform duration-700 group-hover:scale-110"
                  />
                   <p className="absolute z-10 font-serif text-xl text-white/80 italic drop-shadow-md">"Breathing Fabric"</p>
                </div>
              </FadeInSection>
            </div>

            {/* Column 3: Man Brown + Detail */}
            <div className="flex flex-col gap-4">
               <FadeInSection delay={0.3}>
                 <div className="relative overflow-hidden group aspect-[3/4]">
                   <img 
                    src={IMAGES.lookbookManBrown} 
                    alt="ARA Collection Man Brown" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                   <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                     <p className="font-serif text-lg">Stone Grey</p>
                  </div>
                </div>
              </FadeInSection>
              <FadeInSection delay={0.5}>
                 <div className="relative overflow-hidden group aspect-square bg-[#f9f9f9] flex items-center justify-center">
                   <img 
                    src={IMAGES.tshirtDetail2} 
                    alt="T-Shirt Detail 2" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </FadeInSection>
            </div>

          </div>
        </div>
      </section>

      {/* Section 4: Brand Message - The Way of Being */}
      <section className="w-full min-h-screen flex flex-col md:flex-row bg-white">
        <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative order-1 md:order-2">
           {/* Reusing model image but focusing on silhouette/mood */}
          <img 
            src={IMAGES.model} 
            alt="Meditation Silhouette" 
            className="w-full h-full object-cover grayscale brightness-110 contrast-75"
          />
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20 order-2 md:order-1 bg-white">
          <FadeInSection>
            <h2 className="font-serif text-3xl md:text-5xl mb-8 leading-tight">The Way of Being<br/><span className="text-2xl text-neutral-400 italic">무아(無我)의 시간</span></h2>
            
            <h3 className="text-xl text-neutral-600 mb-6 font-light">있는 그대로의 나</h3>

            <p className="text-neutral-600 leading-loose font-light mb-8 text-sm md:text-base">
              억지로 무언가를 찾으려 애쓰지 마세요.<br/>
              무언가가 되려 하기보다, 그저 자연스럽게 나답게 머물러 보는 것.
            </p>
            
            <p className="text-neutral-800 leading-loose font-medium text-sm md:text-base border-l-2 border-black pl-6">
              ARA와 함께하는 그 시간은 당신이 세상의 소음에서 벗어나<br/>
              가장 나다운 고요함에 닿는 무아(無我)의 시간이 될 것입니다.
            </p>

            <div className="mt-12">
               <button className="px-8 py-3 border border-black text-black text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
                  Shop the Collection
               </button>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer for Story Page */}
      <footer className="w-full py-8 bg-neutral-100 text-center">
        <p className="font-serif text-lg text-neutral-400">ARA ART</p>
      </footer>
    </div>
  );
};

export default BrandStory;

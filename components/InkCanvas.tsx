
import React, { useRef, useEffect } from 'react';
import { InkParticle } from '../types';
import { COLOR_GREEN, COLOR_GRAY } from '../constants';

const InkCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<InkParticle[]>([]);
  const animationFrameId = useRef<number>(0);

  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  const createInkSplat = (x: number, y: number) => {
    // 50:50 ratio strictly as requested
    const isGreen = Math.random() >= 0.5;
    const color = isGreen ? COLOR_GREEN : COLOR_GRAY;
    
    // Generate a random "pressure" or "scale" for this specific splat event.
    // This simulates the natural variation in brush pressure, making some splats 
    // small and subtle, while others are large and heavy.
    const eventScale = random(0.5, 2.0);

    // Number of particles depends on the scale (more ink for larger splats)
    const clusterSize = Math.floor(random(5, 12) * eventScale);
    
    for (let i = 0; i < clusterSize; i++) {
        // Scatter sub-particles from center
        const angle = random(0, Math.PI * 2);
        // Larger spread for larger scale events
        const distance = random(0, 30 * eventScale); 
        
        particles.current.push({
          x: x + Math.cos(angle) * distance,
          y: y + Math.sin(angle) * distance,
          // Initial size varies based on event scale
          radius: random(2, 8) * eventScale, 
          // Final spread size varies significantly for organic feel
          maxRadius: random(20, 60) * eventScale, 
          color,
          // Lower alpha allows for beautiful layering when strokes overlap
          alpha: random(0.2, 0.45), 
          velocity: {
            x: random(-0.4, 0.4),
            y: random(-0.4, 0.4),
          },
          // Growth speed variation
          growthRate: random(0.2, 0.6),
        });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    createInkSplat(x, y);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const setSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
      }
    };
    setSize();
    window.addEventListener('resize', setSize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Apply blur to merge the clustered particles into a liquid-like blob
      ctx.filter = 'blur(12px)';
      
      // Use 'source-over' to blend colors naturally without darkening to black
      ctx.globalCompositeOperation = 'source-over';

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Growth physics (spreading ink)
        if (p.radius < p.maxRadius) {
            p.radius += p.growthRate;
            p.growthRate *= 0.96; // Decaying growth
        }
        
        // Slight drift
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        
        // Fade out
        p.alpha -= 0.002; 

        if (p.alpha <= 0) {
          particles.current.splice(i, 1);
          i--;
        }
      }
      
      ctx.filter = 'none';
      animationFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setSize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      // mix-blend-multiply allows the ink colors to "stain" the photo below
      className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none mix-blend-multiply"
    />
  );
};

export default InkCanvas;

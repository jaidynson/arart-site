export interface InkParticle {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  color: string;
  alpha: number;
  velocity: { x: number; y: number };
  growthRate: number;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

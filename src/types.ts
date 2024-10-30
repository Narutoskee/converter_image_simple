export interface ImageSettings {
  quality: number;
  maxWidth: number;
  maxHeight: number;
  preserveRatio: boolean;
  optimize: boolean;
  effect: ImageEffect;
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  sharpen: number;
  rotate: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
  removeBackground: boolean;
}

export interface ConversionResult {
  file: File;
  preview: string;
  originalSize: number;
  newSize: number;
  metadata?: ImageMetadata;
  histogram?: ImageHistogram;
}

export interface ImageMetadata {
  dimensions?: { width: number; height: number };
  make?: string;
  model?: string;
  dateTaken?: string;
  location?: { latitude: number; longitude: number };
  exposure?: string;
  aperture?: string;
  iso?: number;
  focalLength?: string;
}

export interface ImageHistogram {
  red: number[];
  green: number[];
  blue: number[];
  luminance: number[];
}

export type ImageEffect = 
  | 'none' 
  | 'grayscale' 
  | 'sepia' 
  | 'blur' 
  | 'sharpen'
  | 'vintage'
  | 'duotone'
  | 'noir'
  | 'chrome'
  | 'polaroid'
  | 'fade'
  | 'vivid';

export interface ProcessingProgress {
  status: 'idle' | 'processing' | 'complete' | 'error';
  progress: number;
}
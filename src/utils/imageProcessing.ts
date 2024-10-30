import imageCompression from 'browser-image-compression';
import exifr from 'exifr';
import type { ImageSettings, ConversionResult, ImageMetadata, ProcessingProgress } from '../types';

export async function processImage(
  file: File,
  format: string,
  settings: ImageSettings,
  onProgress?: (progress: ProcessingProgress) => void
): Promise<ConversionResult> {
  try {
    onProgress?.({ status: 'processing', progress: 0 });

    // Extract metadata
    const metadata: ImageMetadata = await extractMetadata(file);
    
    // Create a canvas to handle the image processing
    const img = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = Math.min(img.width, settings.maxWidth);
    canvas.height = Math.min(img.height, settings.maxHeight);
    
    if (settings.preserveRatio) {
      const ratio = Math.min(
        settings.maxWidth / img.width,
        settings.maxHeight / img.height
      );
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
    }

    const ctx = canvas.getContext('2d')!;

    // Apply selected effect
    switch (settings.effect) {
      case 'grayscale':
        ctx.filter = 'grayscale(100%)';
        break;
      case 'sepia':
        ctx.filter = 'sepia(100%)';
        break;
      case 'blur':
        ctx.filter = 'blur(4px)';
        break;
      case 'sharpen':
        ctx.filter = 'contrast(150%) brightness(110%)';
        break;
      default:
        ctx.filter = 'none';
    }

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Convert to the selected format
    const mimeType = `image/${format.toLowerCase()}`;
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob!),
        mimeType,
        settings.quality / 100
      );
    });

    // Optimize if requested
    let processedBlob = blob;
    if (settings.optimize) {
      const options = {
        maxSizeMB: 1,
        useWebWorker: true,
        maxWidthOrHeight: Math.max(settings.maxWidth, settings.maxHeight),
        initialQuality: settings.quality / 100,
        onProgress: (progress: number) => {
          onProgress?.({ status: 'processing', progress: Math.round(progress * 100) });
        },
      };
      processedBlob = await imageCompression(new File([blob], file.name, { type: mimeType }), options);
    }

    const processedFile = new File([processedBlob], file.name, { type: mimeType });
    const preview = await imageCompression.getDataUrlFromFile(processedFile);

    onProgress?.({ status: 'complete', progress: 100 });

    return {
      file: processedFile,
      preview,
      originalSize: file.size,
      newSize: processedFile.size,
      metadata,
    };
  } catch (error) {
    onProgress?.({ status: 'error', progress: 0 });
    throw error;
  }
}

async function extractMetadata(file: File): Promise<ImageMetadata> {
  try {
    const data = await exifr.parse(file);
    return {
      dimensions: data?.ImageWidth && data?.ImageHeight 
        ? { width: data.ImageWidth, height: data.ImageHeight }
        : undefined,
      make: data?.Make,
      model: data?.Model,
      dateTaken: data?.DateTimeOriginal,
      location: data?.latitude && data?.longitude
        ? { latitude: data.latitude, longitude: data.longitude }
        : undefined,
    };
  } catch {
    return {};
  }
}
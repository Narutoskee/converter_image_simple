import React, { useState } from 'react';
import { Download, Save } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { Header } from './components/Header';
import { Features } from './components/Features';
import { DropZone } from './components/DropZone';
import { ConversionOptions } from './components/ConversionOptions';
import { ImageSettings } from './components/ImageSettings';
import { ImageEffects } from './components/ImageEffects';
import { AdvancedAdjustments } from './components/AdvancedAdjustments';
import { MetadataDisplay } from './components/MetadataDisplay';
import { ImageHistogram } from './components/ImageHistogram';
import { ProgressBar } from './components/ProgressBar';
import { ImageCard } from './components/ImageCard';
import { processImage } from './utils/imageProcessing';
import type { ImageSettings as ImageSettingsType, ConversionResult, ProcessingProgress } from './types';

function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedFormat, setSelectedFormat] = useState('PNG');
  const [preview, setPreview] = useState<string | null>(null);
  const [processedResult, setProcessedResult] = useState<ConversionResult | null>(null);
  const [progress, setProgress] = useState<ProcessingProgress>({ status: 'idle', progress: 0 });
  const [settings, setSettings] = useState<ImageSettingsType>({
    quality: 90,
    maxWidth: 1920,
    maxHeight: 1080,
    preserveRatio: true,
    optimize: true,
    effect: 'none',
    brightness: 0,
    contrast: 0,
    saturation: 0,
    blur: 0,
    sharpen: 0,
    rotate: 0,
    flipHorizontal: false,
    flipVertical: false,
    removeBackground: false
  });

  const handleFileSelect = async (file: File) => {
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    await handleProcess(file);
  };

  const handleProcess = async (file: File = selectedFile!) => {
    if (!file) return;
    
    try {
      const result = await processImage(file, selectedFormat, settings, setProgress);
      setProcessedResult(result);
      setPreview(result.preview);
      toast.success('Image processed successfully!');
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image. Please try again.');
    }
  };

  const handleDownload = () => {
    if (!processedResult) return;
    
    const link = document.createElement('a');
    link.href = processedResult.preview;
    link.download = `converted-image.${selectedFormat.toLowerCase()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Toaster position="top-right" />
      
      <Header />

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <Features />

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-gray-100/50 p-8">
            <div className="space-y-8">
              <DropZone onFileSelect={handleFileSelect} />

              {selectedFile && (
                <div className="space-y-8">
                  <ProgressBar progress={progress} />

                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Left Column - Preview */}
                    <div className="space-y-6">
                      <ImageCard preview={preview} processedResult={processedResult} />
                      
                      {processedResult?.histogram && (
                        <ImageHistogram histogram={processedResult.histogram} />
                      )}
                      
                      {processedResult?.metadata && (
                        <MetadataDisplay metadata={processedResult.metadata} />
                      )}
                    </div>

                    {/* Right Column - Settings */}
                    <div className="space-y-8">
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                        <ConversionOptions
                          selectedFormat={selectedFormat}
                          onFormatChange={setSelectedFormat}
                        />
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6">
                        <ImageEffects
                          selectedEffect={settings.effect}
                          onEffectChange={(effect) => {
                            setSettings({ ...settings, effect });
                            handleProcess();
                          }}
                        />
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                        <AdvancedAdjustments
                          settings={settings}
                          onSettingsChange={(newSettings) => {
                            setSettings(newSettings);
                            handleProcess();
                          }}
                        />
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6">
                        <ImageSettings
                          settings={settings}
                          onSettingsChange={(newSettings) => {
                            setSettings(newSettings);
                            handleProcess();
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => handleProcess()}
                      disabled={progress.status === 'processing'}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save className="w-5 h-5" />
                      <span>
                        {progress.status === 'processing' ? 'Processing...' : 'Process Image'}
                      </span>
                    </button>
                    
                    <button
                      onClick={handleDownload}
                      disabled={!processedResult || progress.status === 'processing'}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Download className="w-5 h-5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              All processing happens in your browser. Your images never leave your device.
            </p>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-600">
              <a href="#" className="hover:text-blue-600 transition-colors duration-200">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-blue-600 transition-colors duration-200">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-blue-600 transition-colors duration-200">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
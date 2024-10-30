import React from 'react';
import { Sliders, RotateCw, FlipHorizontal, FlipVertical } from 'lucide-react';
import type { ImageSettings } from '../types';

interface AdvancedAdjustmentsProps {
  settings: ImageSettings;
  onSettingsChange: (settings: ImageSettings) => void;
}

export function AdvancedAdjustments({ settings, onSettingsChange }: AdvancedAdjustmentsProps) {
  const handleChange = (key: keyof ImageSettings, value: number | boolean) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sliders className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-700">Advanced Adjustments</h3>
      </div>

      <div className="space-y-4">
        {/* Brightness */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex justify-between">
            <span>Brightness</span>
            <span className="text-blue-600">{settings.brightness}%</span>
          </label>
          <input
            type="range"
            min="-100"
            max="100"
            value={settings.brightness}
            onChange={(e) => handleChange('brightness', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Contrast */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex justify-between">
            <span>Contrast</span>
            <span className="text-blue-600">{settings.contrast}%</span>
          </label>
          <input
            type="range"
            min="-100"
            max="100"
            value={settings.contrast}
            onChange={(e) => handleChange('contrast', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Saturation */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex justify-between">
            <span>Saturation</span>
            <span className="text-blue-600">{settings.saturation}%</span>
          </label>
          <input
            type="range"
            min="-100"
            max="100"
            value={settings.saturation}
            onChange={(e) => handleChange('saturation', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Blur */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex justify-between">
            <span>Blur</span>
            <span className="text-blue-600">{settings.blur}px</span>
          </label>
          <input
            type="range"
            min="0"
            max="20"
            value={settings.blur}
            onChange={(e) => handleChange('blur', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Sharpen */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex justify-between">
            <span>Sharpen</span>
            <span className="text-blue-600">{settings.sharpen}%</span>
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={settings.sharpen}
            onChange={(e) => handleChange('sharpen', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Rotation */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex justify-between">
            <span>Rotation</span>
            <span className="text-blue-600">{settings.rotate}°</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="0"
              max="360"
              value={settings.rotate}
              onChange={(e) => handleChange('rotate', parseInt(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <button
              onClick={() => handleChange('rotate', (settings.rotate + 90) % 360)}
              className="p-2 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Flip Controls */}
        <div className="flex gap-4">
          <button
            onClick={() => handleChange('flipHorizontal', !settings.flipHorizontal)}
            className={`flex-1 p-3 rounded-lg border transition-all ${
              settings.flipHorizontal
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FlipHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Flip H</span>
            </div>
          </button>
          <button
            onClick={() => handleChange('flipVertical', !settings.flipVertical)}
            className={`flex-1 p-3 rounded-lg border transition-all ${
              settings.flipVertical
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FlipVertical className="w-4 h-4" />
              <span className="text-sm font-medium">Flip V</span>
            </div>
          </button>
        </div>

        {/* AI Background Removal */}
        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.removeBackground}
              onChange={(e) => handleChange('removeBackground', e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Remove background (AI-powered)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
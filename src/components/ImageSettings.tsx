import React from 'react';
import { Settings, Maximize, MinusSquare, PlusSquare } from 'lucide-react';
import type { ImageSettings } from '../types';

interface ImageSettingsProps {
  settings: ImageSettings;
  onSettingsChange: (settings: ImageSettings) => void;
}

export function ImageSettings({ settings, onSettingsChange }: ImageSettingsProps) {
  const handleChange = (key: keyof ImageSettings, value: number | boolean) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-700">Image Settings</h3>
      </div>

      {/* Quality Slider */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          Quality ({settings.quality}%)
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={settings.quality}
          onChange={(e) => handleChange('quality', parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Maximize className="w-4 h-4" /> Max Width
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleChange('maxWidth', Math.max(100, settings.maxWidth - 100))}
              className="p-1 text-gray-500 hover:text-blue-600"
            >
              <MinusSquare className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={settings.maxWidth}
              onChange={(e) => handleChange('maxWidth', parseInt(e.target.value) || 100)}
              className="w-full px-3 py-1 border rounded-lg text-center"
            />
            <button
              onClick={() => handleChange('maxWidth', settings.maxWidth + 100)}
              className="p-1 text-gray-500 hover:text-blue-600"
            >
              <PlusSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Maximize className="w-4 h-4" /> Max Height
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleChange('maxHeight', Math.max(100, settings.maxHeight - 100))}
              className="p-1 text-gray-500 hover:text-blue-600"
            >
              <MinusSquare className="w-4 h-4" />
            </button>
            <input
              type="number"
              value={settings.maxHeight}
              onChange={(e) => handleChange('maxHeight', parseInt(e.target.value) || 100)}
              className="w-full px-3 py-1 border rounded-lg text-center"
            />
            <button
              onClick={() => handleChange('maxHeight', settings.maxHeight + 100)}
              className="p-1 text-gray-500 hover:text-blue-600"
            >
              <PlusSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.preserveRatio}
            onChange={(e) => handleChange('preserveRatio', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Preserve aspect ratio</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={settings.optimize}
            onChange={(e) => handleChange('optimize', e.target.checked)}
            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">Optimize file size</span>
        </label>
      </div>
    </div>
  );
}
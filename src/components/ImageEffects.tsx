import React from 'react';
import { Wand2 } from 'lucide-react';
import type { ImageEffect } from '../types';

interface ImageEffectsProps {
  selectedEffect: ImageEffect;
  onEffectChange: (effect: ImageEffect) => void;
}

export function ImageEffects({ selectedEffect, onEffectChange }: ImageEffectsProps) {
  const effects: { id: ImageEffect; label: string }[] = [
    { id: 'none', label: 'None' },
    { id: 'grayscale', label: 'Grayscale' },
    { id: 'sepia', label: 'Sepia' },
    { id: 'vintage', label: 'Vintage' },
    { id: 'duotone', label: 'Duotone' },
    { id: 'noir', label: 'Noir' },
    { id: 'chrome', label: 'Chrome' },
    { id: 'polaroid', label: 'Polaroid' },
    { id: 'fade', label: 'Fade' },
    { id: 'vivid', label: 'Vivid' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Wand2 className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-700">Effects</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {effects.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => onEffectChange(id)}
            className={`p-2 rounded-lg border text-sm transition-all duration-200
              ${selectedEffect === id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
              }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { Sparkles } from 'lucide-react';
import type { ConversionResult } from '../types';

interface ImageCardProps {
  preview: string | null;
  processedResult: ConversionResult | null;
}

export function ImageCard({ preview, processedResult }: ImageCardProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-blue-500" />
        Preview
      </h3>
      <div className="aspect-square rounded-xl border border-gray-200/50 overflow-hidden bg-white shadow-sm relative group">
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      {processedResult && (
        <div className="mt-4 space-y-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 hover:bg-white/80 transition-colors duration-200">
              <p className="text-sm text-gray-600">Original size</p>
              <p className="text-lg font-semibold text-gray-800">
                {(processedResult.originalSize / 1024).toFixed(1)} KB
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 hover:bg-white/80 transition-colors duration-200">
              <p className="text-sm text-gray-600">New size</p>
              <p className="text-lg font-semibold text-gray-800">
                {(processedResult.newSize / 1024).toFixed(1)} KB
              </p>
            </div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-3 hover:bg-white/80 transition-colors duration-200">
            <p className="text-sm text-gray-600">Size reduction</p>
            <p className="text-lg font-semibold text-blue-600">
              {((1 - processedResult.newSize / processedResult.originalSize) * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
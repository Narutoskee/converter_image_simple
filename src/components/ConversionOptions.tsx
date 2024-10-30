import React from 'react';
import { FileType, Image as ImageIcon } from 'lucide-react';

interface ConversionOptionsProps {
  selectedFormat: string;
  onFormatChange: (format: string) => void;
}

export function ConversionOptions({ selectedFormat, onFormatChange }: ConversionOptionsProps) {
  const formats = ['PNG', 'JPEG', 'WEBP', 'GIF'];

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        <FileType className="w-5 h-5" />
        Convert to
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {formats.map((format) => (
          <button
            key={format}
            onClick={() => onFormatChange(format)}
            className={`p-3 rounded-lg border transition-all duration-200
              ${selectedFormat === format
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
              }`}
          >
            <div className="flex items-center justify-center gap-2">
              <ImageIcon className="w-4 h-4" />
              <span className="font-medium">{format}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
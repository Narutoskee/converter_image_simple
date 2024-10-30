import React from 'react';
import { Info } from 'lucide-react';
import type { ImageMetadata } from '../types';

interface MetadataDisplayProps {
  metadata: ImageMetadata;
}

export function MetadataDisplay({ metadata }: MetadataDisplayProps) {
  if (!metadata) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        <h4 className="font-medium text-gray-900 dark:text-white">Image Information</h4>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {metadata.dimensions && (
          <>
            <span className="text-gray-700 dark:text-gray-300">Dimensions:</span>
            <span className="text-gray-900 dark:text-white">
              {metadata.dimensions.width} × {metadata.dimensions.height}
            </span>
          </>
        )}
        {metadata.make && (
          <>
            <span className="text-gray-700 dark:text-gray-300">Camera:</span>
            <span className="text-gray-900 dark:text-white">{metadata.make} {metadata.model}</span>
          </>
        )}
        {metadata.dateTaken && (
          <>
            <span className="text-gray-700 dark:text-gray-300">Date Taken:</span>
            <span className="text-gray-900 dark:text-white">
              {new Date(metadata.dateTaken).toLocaleDateString()}
            </span>
          </>
        )}
        {metadata.location && (
          <>
            <span className="text-gray-700 dark:text-gray-300">Location:</span>
            <span className="text-gray-900 dark:text-white">
              {metadata.location.latitude.toFixed(6)}, 
              {metadata.location.longitude.toFixed(6)}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
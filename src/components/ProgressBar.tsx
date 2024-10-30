import React from 'react';
import type { ProcessingProgress } from '../types';

interface ProgressBarProps {
  progress: ProcessingProgress;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  if (progress.status === 'idle') return null;

  return (
    <div className="w-full">
      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 rounded-full ${
            progress.status === 'error' 
              ? 'bg-red-500' 
              : progress.status === 'complete'
                ? 'bg-green-500'
                : 'bg-blue-500'
          }`}
          style={{ width: `${progress.progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-700 dark:text-gray-200 mt-1">
        {progress.status === 'processing' && `Processing: ${progress.progress}%`}
        {progress.status === 'complete' && 'Processing complete'}
        {progress.status === 'error' && 'Error processing image'}
      </p>
    </div>
  );
}
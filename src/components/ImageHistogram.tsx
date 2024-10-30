import React, { useEffect, useRef } from 'react';
import { LineChart } from 'lucide-react';
import type { ImageHistogram as HistogramType } from '../types';

interface ImageHistogramProps {
  histogram: HistogramType;
}

export function ImageHistogram({ histogram }: ImageHistogramProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Draw background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fillRect(0, 0, width, height);

    // Helper function to draw a histogram line
    const drawLine = (data: number[], color: string, alpha: number = 1) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = alpha;

      const max = Math.max(...data);
      for (let i = 0; i < data.length; i++) {
        const x = (i / data.length) * width;
        const y = height - (data[i] / max) * height;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    // Draw histograms
    drawLine(histogram.red, 'rgba(255, 0, 0, 0.5)');
    drawLine(histogram.green, 'rgba(0, 255, 0, 0.5)');
    drawLine(histogram.blue, 'rgba(0, 0, 255, 0.5)');
    drawLine(histogram.luminance, 'rgba(255, 255, 255, 0.8)', 0.5);

  }, [histogram]);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <LineChart className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-700">Color Distribution</h3>
      </div>
      <div className="bg-gray-900 rounded-lg p-4">
        <canvas
          ref={canvasRef}
          width={256}
          height={150}
          className="w-full h-auto"
        />
        <div className="flex justify-center gap-4 mt-2">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <span className="text-xs text-gray-400">Red</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
            <span className="text-xs text-gray-400">Green</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500/50" />
            <span className="text-xs text-gray-400">Blue</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-white/50" />
            <span className="text-xs text-gray-400">Luminance</span>
          </div>
        </div>
      </div>
    </div>
  );
}
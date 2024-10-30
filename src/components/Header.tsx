import React from 'react';
import { ImageIcon, Github } from 'lucide-react';

export function Header() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-400/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent" />
      </div>
      <div className="container mx-auto px-4 py-16 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center p-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl animate-pulse" />
            <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl relative">
              <ImageIcon className="w-8 h-8 text-white" />
              <h1 className="text-2xl font-bold text-white">Advanced Image Converter</h1>
            </div>
          </div>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your images with professional-grade tools and advanced optimization
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              <span>Star on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Zap, Shield, Cpu, Maximize2 } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Process images instantly with our optimized algorithms'
  },
  {
    icon: Shield,
    title: 'Secure',
    description: 'All processing happens locally in your browser'
  },
  {
    icon: Cpu,
    title: 'Advanced Processing',
    description: 'Professional-grade image optimization tools'
  },
  {
    icon: Maximize2,
    title: 'Batch Processing',
    description: 'Convert multiple images simultaneously'
  }
];

export function Features() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {features.map((feature, index) => (
        <div
          key={index}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100/50 hover:bg-white/80 transition-colors duration-200 group"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
            <feature.icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
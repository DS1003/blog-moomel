import React from 'react';

interface XPProgressProps {
  currentXP: number;
  nextLevelXP: number;
  level: number;
  className?: string;
}

export default function XPProgress({ currentXP, nextLevelXP, level, className = '' }: XPProgressProps) {
  const progress = Math.min(100, Math.max(0, (currentXP / nextLevelXP) * 100));

  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-end mb-2">
        <span className="text-sm font-bold text-neutral-700">Niveau {level}</span>
        <span className="text-xs text-neutral-500">{currentXP} / {nextLevelXP} XP</span>
      </div>
      <div className="h-3 w-full bg-neutral-100 rounded-full overflow-hidden shadow-inner">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-1000 ease-out relative"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

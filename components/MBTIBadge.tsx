import React from 'react';
import { MBTI_TYPES } from '../constants';

interface MBTIBadgeProps {
  type: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MBTIBadge: React.FC<MBTIBadgeProps> = ({ type, size = 'md' }) => {
  const data = MBTI_TYPES[type] || { bg: 'bg-gray-100', text: 'text-gray-600', color: 'border-gray-400' };
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base font-semibold',
  };

  return (
    <span className={`${data.bg} ${data.text} ${sizeClasses[size]} rounded-full border border-opacity-20 ${data.color} inline-flex items-center justify-center font-medium`}>
      {type}
    </span>
  );
};

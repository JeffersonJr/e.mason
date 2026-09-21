import React from 'react';
import './MasonicHex.css';

interface MasonicHexProps {
  size?: number;
  variant?: 'gradient' | 'primary' | 'accent' | 'outline';
  children?: React.ReactNode;
  className?: string;
  animated?: boolean;
}

export default function MasonicHex({
  size = 40,
  variant = 'gradient',
  children,
  className = '',
  animated = false,
}: MasonicHexProps) {
  return (
    <div
      className={`masonic-hex masonic-hex--${variant} ${animated ? 'masonic-hex--animated' : ''} ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="masonic-hex__inner">
        {children || (
          <svg viewBox="0 0 24 24" fill="currentColor" width="55%" height="55%">
            <path d="M12 2L22 7.5V16.5L12 22L2 16.5V7.5L12 2ZM12 4.311L4 8.5V15.5L12 19.689L20 15.5V8.5L12 4.311Z" />
          </svg>
        )}
      </div>
    </div>
  );
}

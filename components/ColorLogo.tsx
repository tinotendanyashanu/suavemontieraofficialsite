import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const ColorLogo: React.FC<LogoProps> = ({ size = 40, className = "" }) => {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg"
      >
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#gradient1)"
          stroke="url(#gradient2)"
          strokeWidth="2"
        />
        
        {/* Inner design - representing tailoring tools and elegance */}
        <path
          d="M30 35 L50 25 L70 35 L65 45 L50 40 L35 45 Z"
          fill="#000000"
          opacity="0.8"
        />
        
        {/* Elegant curves */}
        <path
          d="M35 55 Q50 45 65 55 Q50 65 35 55"
          fill="#000000"
          opacity="0.6"
        />
        
        {/* Central accent */}
        <circle
          cx="50"
          cy="50"
          r="8"
          fill="url(#accentGradient)"
        />
        
        {/* Bottom elegance line */}
        <path
          d="M25 75 Q50 65 75 75"
          stroke="#000000"
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>
          
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          
          <radialGradient id="accentGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#D97706" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
};

export default ColorLogo;
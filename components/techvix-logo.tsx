'use client';

interface TechvixLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function TechvixLogo({ className = '', size = 'md' }: TechvixLogoProps) {
  // Compact sizing optimized for navbar - no excess whitespace
  const sizes = {
    sm: { width: 130, height: 36, iconSize: 28, fontSize: 18 },
    md: { width: 160, height: 44, iconSize: 34, fontSize: 22 },
    lg: { width: 200, height: 54, iconSize: 42, fontSize: 28 },
    xl: { width: 250, height: 68, iconSize: 52, fontSize: 34 },
  };

  const { width, height, iconSize, fontSize } = sizes[size];
  const uniqueId = `logo-${size}`;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Techvix logo"
    >
      <defs>
        {/* Gradient for the arrow icon */}
        <linearGradient id={`${uniqueId}-arrowGradient`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
        
        {/* Gradient for "Tech" text - now more visible with white/gray tones */}
        <linearGradient id={`${uniqueId}-techGradient`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>
        
        {/* Gradient for "vix" text */}
        <linearGradient id={`${uniqueId}-vixGradient`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>

        {/* Glow filter */}
        <filter id={`${uniqueId}-glow`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Arrow/Chevron Icon - positioned closer to text */}
      <g transform={`translate(2, ${(height - iconSize) / 2})`} filter={`url(#${uniqueId}-glow)`}>
        {/* Main arrow shape */}
        <path
          d={`M0 ${iconSize * 0.15} L${iconSize * 0.6} ${iconSize * 0.5} L0 ${iconSize * 0.85} L${iconSize * 0.18} ${iconSize * 0.5} Z`}
          fill={`url(#${uniqueId}-arrowGradient)`}
        />
        {/* 3D effect - darker bottom part */}
        <path
          d={`M0 ${iconSize * 0.5} L${iconSize * 0.6} ${iconSize * 0.5} L0 ${iconSize * 0.85} Z`}
          fill="#0891b2"
          opacity="0.8"
        />
      </g>

      {/* "Tech" text - visible white/slate color */}
      <text
        x={iconSize + 6}
        y={height / 2 + fontSize / 3}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        fill={`url(#${uniqueId}-techGradient)`}
      >
        Tech
      </text>

      {/* "vix" text - cyan color */}
      <text
        x={iconSize + 6 + fontSize * 2.35}
        y={height / 2 + fontSize / 3}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        fill={`url(#${uniqueId}-vixGradient)`}
      >
        vix
      </text>
    </svg>
  );
}

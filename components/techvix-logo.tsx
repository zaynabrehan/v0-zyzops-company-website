'use client';

interface TechvixLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function TechvixLogo({ className = '', size = 'md' }: TechvixLogoProps) {
  const sizes = {
    sm: { width: 140, height: 40, iconSize: 32, fontSize: 20 },
    md: { width: 180, height: 50, iconSize: 42, fontSize: 26 },
    lg: { width: 220, height: 60, iconSize: 52, fontSize: 32 },
    xl: { width: 280, height: 75, iconSize: 65, fontSize: 40 },
  };

  const { width, height, iconSize, fontSize } = sizes[size];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradient for the arrow icon */}
        <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#67e8f9" />
        </linearGradient>
        
        {/* Gradient for "Tech" text */}
        <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        
        {/* Gradient for "vix" text */}
        <linearGradient id="vixGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>

        {/* Shadow filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Arrow/Chevron Icon */}
      <g transform={`translate(5, ${(height - iconSize) / 2})`} filter="url(#glow)">
        {/* Main arrow shape */}
        <path
          d={`M0 ${iconSize * 0.15} L${iconSize * 0.55} ${iconSize * 0.5} L0 ${iconSize * 0.85} L${iconSize * 0.15} ${iconSize * 0.5} Z`}
          fill="url(#arrowGradient)"
        />
        {/* 3D effect - darker bottom part */}
        <path
          d={`M0 ${iconSize * 0.5} L${iconSize * 0.55} ${iconSize * 0.5} L0 ${iconSize * 0.85} Z`}
          fill="#0891b2"
          opacity="0.8"
        />
      </g>

      {/* "Tech" text */}
      <text
        x={iconSize + 12}
        y={height / 2 + fontSize / 3}
        fontFamily="Arial, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        fill="url(#techGradient)"
      >
        Tech
      </text>

      {/* "vix" text */}
      <text
        x={iconSize + 12 + fontSize * 2.4}
        y={height / 2 + fontSize / 3}
        fontFamily="Arial, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        fill="url(#vixGradient)"
      >
        vix
      </text>
    </svg>
  );
}

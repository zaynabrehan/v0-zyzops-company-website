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
        {/* Gradient for the arrow icon - cyan/blue matching original */}
        <linearGradient id={`${uniqueId}-arrowGradient`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        
        {/* "vix" text gradient - bright cyan */}
        <linearGradient id={`${uniqueId}-vixGradient`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>

      {/* Arrow/Chevron Icon - exact match to original logo */}
      <g transform={`translate(2, ${(height - iconSize) / 2})`}>
        {/* Top part of arrow - lighter cyan */}
        <path
          d={`M0 ${iconSize * 0.12} L${iconSize * 0.65} ${iconSize * 0.5} L${iconSize * 0.2} ${iconSize * 0.5} L0 ${iconSize * 0.35} Z`}
          fill="#22d3ee"
        />
        {/* Bottom part of arrow - darker cyan for 3D effect */}
        <path
          d={`M0 ${iconSize * 0.35} L${iconSize * 0.2} ${iconSize * 0.5} L${iconSize * 0.65} ${iconSize * 0.5} L0 ${iconSize * 0.88} Z`}
          fill="#06b6d4"
        />
      </g>

      {/* "Tech" text - dark gray/slate as in original logo */}
      <text
        x={iconSize + 8}
        y={height / 2 + fontSize / 3}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        fill="#475569"
      >
        Tech
      </text>

      {/* "vix" text - bright cyan as in original logo */}
      <text
        x={iconSize + 8 + fontSize * 2.35}
        y={height / 2 + fontSize / 3}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        fill="#22d3ee"
      >
        vix
      </text>
    </svg>
  );
}

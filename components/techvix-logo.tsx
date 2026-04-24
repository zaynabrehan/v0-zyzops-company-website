'use client';

interface TechvixLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function TechvixLogo({ className = '', size = 'md' }: TechvixLogoProps) {
  // Larger sizing for better visibility - width is wider, height stays compact for navbar
  const sizes = {
    sm: { width: 150, height: 32, iconSize: 26, fontSize: 20 },
    md: { width: 180, height: 38, iconSize: 32, fontSize: 24 },
    lg: { width: 220, height: 46, iconSize: 38, fontSize: 28 },
    xl: { width: 280, height: 56, iconSize: 48, fontSize: 36 },
  };

  const { width, height, iconSize, fontSize } = sizes[size];
  const uniqueId = `logo-${size}-${Math.random().toString(36).substr(2, 9)}`;

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
      {/* No background - transparent, blends with navbar */}
      
      {/* 3D Chevron Icon - exact match to Techvix logo symbol */}
      <g transform={`translate(0, ${(height - iconSize) / 2})`}>
        {/* Top portion - lighter cyan, forms upper part of the arrow */}
        <path
          d={`M0 ${iconSize * 0.08} 
              L${iconSize * 0.42} ${iconSize * 0.08} 
              L${iconSize} ${iconSize * 0.5} 
              L${iconSize * 0.42} ${iconSize * 0.5} 
              L${iconSize * 0.18} ${iconSize * 0.32}
              L0 ${iconSize * 0.32} 
              Z`}
          fill="#22d3ee"
        />
        {/* Bottom portion - darker cyan for 3D folded effect */}
        <path
          d={`M0 ${iconSize * 0.32} 
              L${iconSize * 0.18} ${iconSize * 0.32}
              L${iconSize * 0.42} ${iconSize * 0.5} 
              L${iconSize} ${iconSize * 0.5} 
              L${iconSize * 0.42} ${iconSize * 0.92} 
              L0 ${iconSize * 0.92} 
              Z`}
          fill="#06b6d4"
        />
      </g>

      {/* "Techvix" as single text element - no space between Tech and vix */}
      <text
        x={iconSize + 8}
        y={height / 2 + fontSize * 0.35}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="-0.5"
      >
        <tspan fill="#FFFFFF">Tech</tspan><tspan fill="#22d3ee">vix</tspan>
      </text>
    </svg>
  );
}

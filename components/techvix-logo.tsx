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
      {/* No background - transparent */}
      
      {/* Arrow/Chevron Icon - exact match to original: cyan 3D chevron */}
      <g transform={`translate(0, ${(height - iconSize) / 2})`}>
        {/* Top part of arrow - lighter cyan (#22d3ee) */}
        <path
          d={`M0 ${iconSize * 0.1} 
              L${iconSize * 0.7} ${iconSize * 0.5} 
              L${iconSize * 0.22} ${iconSize * 0.5} 
              L0 ${iconSize * 0.32} Z`}
          fill="#22d3ee"
        />
        {/* Bottom part of arrow - darker cyan (#06b6d4) for 3D effect */}
        <path
          d={`M0 ${iconSize * 0.32} 
              L${iconSize * 0.22} ${iconSize * 0.5} 
              L${iconSize * 0.7} ${iconSize * 0.5} 
              L0 ${iconSize * 0.9} Z`}
          fill="#06b6d4"
        />
      </g>

      {/* "Tech" text - WHITE color as in original logo */}
      <text
        x={iconSize + 6}
        y={height / 2 + fontSize * 0.35}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        fill="#FFFFFF"
        letterSpacing="-0.5"
      >
        Tech
      </text>

      {/* "vix" text - bright cyan (#22d3ee) as in original logo */}
      <text
        x={iconSize + 6 + fontSize * 2.45}
        y={height / 2 + fontSize * 0.35}
        fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        fill="#22d3ee"
        letterSpacing="-0.5"
      >
        vix
      </text>
    </svg>
  );
}

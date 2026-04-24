interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}

export function GlassmorphismCard({ children, className = '', icon, style }: GlassmorphismCardProps) {
  return (
    <div 
      className={`glass-accent rounded-xl p-6 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 hover:translate-y-[-8px] ${className}`}
      style={style}
    >
      {icon && <div className="mb-4 text-cyan-400 group-hover:text-pink-500 transition-colors duration-300">{icon}</div>}
      {children}
    </div>
  );
}

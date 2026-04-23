interface GlassmorphismCardProps {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function GlassmorphismCard({ children, className = '', icon }: GlassmorphismCardProps) {
  return (
    <div className={`glass rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${className}`}>
      {icon && <div className="mb-4 text-cyan-400">{icon}</div>}
      {children}
    </div>
  );
}

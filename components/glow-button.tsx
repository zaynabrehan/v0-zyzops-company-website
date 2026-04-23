'use client';

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export function GlowButton({ 
  children, 
  onClick, 
  variant = 'primary',
  className = ''
}: GlowButtonProps) {
  const baseClasses = 'px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 via-purple-600 to-cyan-400 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] glow-multi hover:-translate-y-1 animate-gradient-shift',
    secondary: 'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] hover:border-purple-400 hover:text-purple-400 hover:-translate-y-1'
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
}

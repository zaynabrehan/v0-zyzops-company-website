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
    // Primary: Cyan to purple animated gradient
    primary: 'bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] animate-gradient-shift text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-1',
    // Secondary: Cyan outline (for Sign In, View Our Work)
    secondary: 'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:border-cyan-300 hover:text-cyan-300 hover:-translate-y-1'
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

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
  const baseClasses = 'px-6 py-3 rounded-lg font-semibold transition-all duration-300';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white hover:shadow-lg glow-purple',
    secondary: 'border border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:shadow-lg'
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

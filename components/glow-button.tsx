'use client';

interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
}

export function GlowButton({ 
  children, 
  variant = 'primary',
  className = '',
  disabled,
  ...props
}: GlowButtonProps) {
  const baseClasses = 'px-8 py-3 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 hover:scale-105 active:scale-95';
  
  const variantClasses = {
    // Primary: Cyan to purple animated gradient
    primary: 'bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 bg-[length:200%_100%] animate-gradient-shift text-white hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:-translate-y-1',
    // Secondary: Cyan outline (for Sign In, View Our Work)
    secondary: 'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] hover:border-cyan-300 hover:text-cyan-300 hover:-translate-y-1',
    // Danger: Red for destructive actions
    danger: 'bg-red-500/20 border-2 border-red-500/50 text-red-300 hover:bg-red-500/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:-translate-y-1'
  };

  return (
    <button 
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

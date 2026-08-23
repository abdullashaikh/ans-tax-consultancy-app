import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  ...props
}) => {
  return (
    <div
      className={`
        relative rounded-2xl bg-[#0f172a]/90 backdrop-blur-md 
        border border-slate-800/80 p-6 sm:p-8 
        transition-all duration-300
        ${hoverEffect ? 'hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50' : ''}
        ${glow ? 'gold-border-glow' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

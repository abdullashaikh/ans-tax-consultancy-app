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
        relative rounded-2xl bg-white 
        border border-slate-200 p-6 sm:p-8 shadow-sm
        transition-all duration-300
        ${hoverEffect ? 'hover:border-amber-400 hover:-translate-y-1 hover:shadow-xl' : ''}
        ${glow ? 'ring-2 ring-amber-400/40' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

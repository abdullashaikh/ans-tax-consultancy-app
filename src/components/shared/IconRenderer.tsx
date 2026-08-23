import React from 'react';
import * as Icons from 'lucide-react';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number;
}

export const IconRenderer: React.FC<IconRendererProps> = ({
  name,
  className = 'w-6 h-6',
  size,
}) => {
  // Try to find the icon by exact name or capitalized
  const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[name] || Icons.HelpCircle;

  return <IconComponent className={className} size={size} />;
};

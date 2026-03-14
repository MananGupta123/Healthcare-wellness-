import React from 'react';

export const Card = ({ children, className = '', hoverable = false, glass = false, style = {}, animate = false, delay = 0, ...props }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const baseStyle = {
    backgroundColor: glass ? 'rgba(22, 27, 38, 0.6)' : 'var(--bg-card)',
    backdropFilter: glass ? 'blur(12px)' : 'none',
    WebkitBackdropFilter: glass ? 'blur(12px)' : 'none',
    borderRadius: '16px',
    padding: '24px',
    border: '1px solid var(--border-color)',
    boxShadow: glass ? '0 8px 32px 0 rgba(0, 0, 0, 0.2)' : 'var(--shadow-md)',
    transition: 'all var(--transition-normal)',
    transform: isHovered && hoverable ? 'translateY(-4px)' : 'translateY(0)',
    borderColor: isHovered && hoverable ? 'var(--border-light)' : 'var(--border-color)',
    ...style
  };

  const hoverShadow = isHovered && hoverable ? 'var(--shadow-lg), 0 0 20px rgba(255,255,255,0.03)' : baseStyle.boxShadow;

  const animationClass = animate ? `animate-fade-up delay-${delay}` : '';

  return (
    <div 
      className={`card ${animationClass} ${className}`} 
      style={{ ...baseStyle, boxShadow: hoverShadow }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </div>
  );
};

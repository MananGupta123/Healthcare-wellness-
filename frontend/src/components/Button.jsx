import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({ children, onClick, className = '', type = 'button', variant = 'primary', isLoading = false, icon, fullWidth = false, style = {}, ...props }) => {
  const baseStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '10px',
    fontFamily: 'inherit',
    fontWeight: '600',
    fontSize: '14px',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-normal)',
    width: fullWidth ? '100%' : 'auto',
    position: 'relative',
    overflow: 'hidden',
    border: 'none',
    outline: 'none',
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, var(--accent-blue), #3b82f6)',
      color: '#fff',
      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.25)',
    },
    secondary: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-color)',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: 'var(--text-secondary)',
    }
  };

  const hoverStyles = {
    primary: { transform: 'translateY(-1px)', boxShadow: '0 6px 16px rgba(59, 130, 246, 0.35)', background: 'linear-gradient(135deg, #60a5fa, #3b82f6)' },
    secondary: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderColor: 'var(--border-light)', color: '#fff' },
    ghost: { backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#fff' }
  };

  const [isHovered, setIsHovered] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  const currentVariant = variants[variant] || variants.primary;
  const currentHover = isHovered && !isLoading ? hoverStyles[variant] : {};
  const pressedStyle = isPressed && !isLoading ? { transform: 'scale(0.98)' } : {};

  return (
    <button
      type={type}
      className={`btn-${variant} ${className}`}
      style={{ ...baseStyle, ...currentVariant, ...currentHover, ...pressedStyle, ...style }}
      onClick={!isLoading ? onClick : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? <Loader2 size={18} className="spin" style={{ animation: 'spin 1s linear infinite' }} /> : icon}
      {children}
    </button>
  );
};

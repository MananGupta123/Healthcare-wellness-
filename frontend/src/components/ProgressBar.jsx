import React, { useState, useEffect } from 'react';

export const ProgressBar = ({ label, value, max, unit, showValue = true, color = 'var(--accent-blue)', icon, small = false }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    // Small delay to trigger animation after mount
    const timer = setTimeout(() => setCurrentWidth(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);
  
  const isComplete = percentage >= 100;
  const barColor = isComplete ? 'var(--status-met)' : color;
  const glowShadow = isComplete ? '0 0 10px rgba(16, 185, 129, 0.5)' : 'none'; 

  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: small ? '6px' : '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {icon && <span style={{ 
            color: barColor, 
            display: 'flex', 
            padding: '6px', 
            borderRadius: '8px', 
            backgroundColor: 'rgba(255,255,255,0.05)'
          }}>{icon}</span>}
          <span style={{ fontSize: small ? '13px' : '15px', fontWeight: '500', color: 'var(--text-primary)' }}>{label}</span>
        </div>
        {showValue && (
          <span style={{ fontSize: small ? '12px' : '14px', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{typeof value === 'number' ? value.toLocaleString() : value}</strong> / {typeof max === 'number' ? max.toLocaleString() : max} {unit}
          </span>
        )}
      </div>
      
      {/* Track */}
      <div style={{ 
        width: '100%', 
        height: small ? '6px' : '10px', 
        backgroundColor: 'rgba(0,0,0,0.3)', 
        borderRadius: '999px',
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.05)',
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
      }}>
        {/* Fill */}
        <div style={{
          height: '100%',
          width: `${currentWidth}%`,
          backgroundColor: barColor,
          backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
          borderRadius: '999px',
          boxShadow: currentWidth > 0 ? (isComplete ? glowShadow : `0 0 8px ${color}`) : 'none',
          transition: 'width 1s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative',
        }}>
          {/* Shimmer effect inside the bar */}
          <div style={{
            position: 'absolute',
            top: 0, left: 0, bottom: 0, right: 0,
            backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 2s infinite linear'
          }}></div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Sidebar } from './Sidebar';

export const Layout = ({ children }) => {
  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      backgroundColor: 'var(--bg-app)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle background glow effect for the whole app */}
      <div style={{ 
        position: 'fixed', top: '-10%', right: '-10%', width: '50vw', height: '50vw', 
        background: 'radial-gradient(circle, rgba(79,142,247,0.04) 0%, rgba(0,0,0,0) 70%)', 
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0 
      }} />
      <div style={{ 
        position: 'fixed', bottom: '-10%', left: '-5%', width: '40vw', height: '40vw', 
        background: 'radial-gradient(circle, rgba(129,140,248,0.03) 0%, rgba(0,0,0,0) 70%)', 
        borderRadius: '50%', pointerEvents: 'none', zIndex: 0 
      }} />
      
      <Sidebar />
      <main style={{ flex: 1, padding: '32px 48px', overflowY: 'auto', height: '100vh', position: 'relative', zIndex: 1, scrollBehavior: 'smooth' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
          {children}
        </div>
      </main>
    </div>
  );
};

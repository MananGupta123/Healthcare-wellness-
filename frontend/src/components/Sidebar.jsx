import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, User, Target, MessageSquare, LogOut, Activity } from 'lucide-react';

export const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'My Profile', path: '/profile', icon: <User size={20} /> },
    { name: 'Wellness Goals', path: '/goals', icon: <Target size={20} /> },
    { name: 'Messages', path: '/messages', icon: <MessageSquare size={20} /> },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: 'var(--bg-card)',
      borderRight: '1px solid var(--border-color)',
      color: 'var(--text-primary)',
      minHeight: '100vh',
      padding: '28px 16px',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: 0,
      height: '100vh',
    }}>
      {/* Brand */}
      <div style={{ padding: '0 12px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          background: 'linear-gradient(135deg, var(--accent-blue), #818cf8)',
          padding: '8px',
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(79, 142, 247, 0.3)'
        }}>
          <Activity size={24} color="#fff" />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px', margin: 0 }}>
          Lumina<span style={{ color: 'var(--accent-blue)' }}>Health</span>
        </h2>
      </div>

      {/* Nav Links */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              color: isActive ? '#fff' : 'var(--text-secondary)',
              fontWeight: isActive ? '600' : '500',
              textDecoration: 'none',
              backgroundColor: isActive ? 'rgba(79, 142, 247, 0.1)' : 'transparent',
              borderRadius: '12px',
              transition: 'all 0.2s',
              border: '1px solid transparent',
              borderColor: isActive ? 'rgba(79, 142, 247, 0.2)' : 'transparent',
              position: 'relative',
              overflow: 'hidden'
            })}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <div style={{
                    position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px',
                    backgroundColor: 'var(--accent-blue)', borderRadius: '0 4px 4px 0'
                  }} />
                )}
                <span style={{ color: isActive ? 'var(--accent-blue)' : 'inherit', transition: 'color 0.2s' }}>
                  {item.icon}
                </span>
                <span style={{ fontSize: '14px' }}>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            color: 'var(--text-secondary)',
            fontSize: '14px',
            fontWeight: '500',
            padding: '12px 16px',
            width: '100%',
            textAlign: 'left',
            borderRadius: '12px',
            transition: 'all 0.2s',
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 'none',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
            e.currentTarget.style.color = 'var(--status-missed)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

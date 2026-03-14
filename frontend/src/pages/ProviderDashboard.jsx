import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import client from '../api/axiosClient';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Activity, Users, ChevronRight, LogOut, ShieldCheck, AlertTriangle, Clock } from 'lucide-react';

const BADGE_STYLES = {
  green: { bg: 'rgba(16,185,129,0.15)', color: '#10b981', icon: <ShieldCheck size={16} /> },
  red: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444', icon: <AlertTriangle size={16} /> },
  blue: { bg: 'rgba(79,142,247,0.15)', color: '#4f8ef7', icon: <Clock size={16} /> },
};

export const ProviderDashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/provider/patients')
      .then((res) => setPatients(res.data.patients || []))
      .catch((err) => console.error('Provider fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const displayName = currentUser?.name || 'Provider';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      {/* Top Bar */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 48px', borderBottom: '1px solid var(--border-color)', background: 'rgba(11,12,16,0.8)', backdropFilter: 'blur(12px)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, var(--accent-blue), #818cf8)', padding: '8px', borderRadius: '10px' }}>
            <Activity size={24} color="#fff" />
          </div>
          <h1 style={{ fontSize: '20px', color: '#fff', margin: 0 }}>Lumina<span style={{ color: 'var(--accent-blue)' }}>Health</span></h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Dr. {displayName}</span>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 48px' }}>
        <div className="animate-fade-up" style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '28px', color: '#fff', marginBottom: '8px' }}>Provider Dashboard</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Patient compliance overview and management.</p>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <Card glass animate delay="100" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '10px', background: 'rgba(79,142,247,0.15)', borderRadius: '10px', color: 'var(--accent-blue)' }}><Users size={20} /></div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>{patients.length}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total Patients</div>
              </div>
            </div>
          </Card>
          <Card glass animate delay="200" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '10px', background: 'rgba(16,185,129,0.15)', borderRadius: '10px', color: '#10b981' }}><ShieldCheck size={20} /></div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>{patients.filter(p => p.complianceBadge?.color === 'green').length}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Goals Met</div>
              </div>
            </div>
          </Card>
          <Card glass animate delay="300" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ padding: '10px', background: 'rgba(239,68,68,0.15)', borderRadius: '10px', color: '#ef4444' }}><AlertTriangle size={20} /></div>
              <div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#fff' }}>{patients.filter(p => p.complianceBadge?.color === 'red').length}</div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Missed Checkups</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Patient List */}
        <Card glass animate delay="400">
          <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Users size={20} color="var(--accent-blue)" /> My Patients
          </h3>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>Loading patients...</div>
          ) : patients.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>No patients registered yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {patients.map((p) => {
                const badge = p.complianceBadge || { badge: 'Upcoming', color: 'blue' };
                const style = BADGE_STYLES[badge.color] || BADGE_STYLES.blue;
                return (
                  <div
                    key={p._id}
                    onClick={() => navigate(`/provider/patient/${p._id}`)}
                    style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid var(--border-color)', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-light)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.transform = 'none'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>
                        {(p.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                      </div>
                      <div>
                        <div style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>{p.name}</div>
                        <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>{p.email}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', background: style.bg, color: style.color, padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '500' }}>
                        {style.icon} {badge.badge}
                      </span>
                      <ChevronRight size={18} color="var(--text-muted)" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </main>
    </div>
  );
};

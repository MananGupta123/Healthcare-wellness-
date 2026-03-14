import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Activity, Mail, Lock, ChevronRight } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 800);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: 'var(--bg-app)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Left Column: Branding / Illustration */}
      <div style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px',
        position: 'relative',
        background: 'linear-gradient(135deg, #0f111a 0%, #161b26 100%)',
        borderRight: '1px solid var(--border-color)'
      }} className="hide-on-mobile">
        
        {/* Abstract glow */}
        <div style={{ position: 'absolute', top: '20%', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(79,142,247,0.15) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }} className="animate-fade-up">
            <div style={{ background: 'var(--accent-blue)', padding: '12px', borderRadius: '12px', boxShadow: '0 0 24px rgba(79,142,247,0.4)' }}>
              <Activity size={32} color="#fff" />
            </div>
            <h1 style={{ fontSize: '36px', color: '#fff', margin: 0 }}>LuminaHealth</h1>
          </div>
          
          <h2 style={{ fontSize: '48px', lineHeight: '1.2', fontWeight: '700', marginBottom: '24px', color: '#fff' }} className="animate-fade-up delay-100">
            A new standard for <br/><span className="text-gradient">patient care.</span>
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }} className="animate-fade-up delay-200">
            Track your wellness goals, get real-time preventive care reminders, and stay connected with your healthcare providers all in one place.
          </p>
          
          {/* Glass mock feature card */}
          <Card glass style={{ marginTop: '48px', padding: '20px' }} className="animate-fade-up delay-300">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                 <Activity size={20} color="#fff" />
               </div>
               <div>
                 <div style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>All Goals Met</div>
                 <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>You successfully hit your targets today.</div>
               </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative'
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }} className="animate-fade-in">
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }} className="show-on-mobile">
            <div style={{ background: 'linear-gradient(135deg, var(--accent-blue), #818cf8)', padding: '12px', borderRadius: '12px', display: 'inline-flex', marginBottom: '16px' }}>
              <Activity size={28} color="#fff" />
            </div>
            <h2 style={{ fontSize: '28px', color: '#fff' }}>Welcome back</h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>Enter your details to access your account.</p>
          </div>

          <Card glass hoverable={false} style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '22px', color: '#fff', marginBottom: '32px', textAlign: 'center' }} className="hide-on-mobile">Sign In</h3>
            
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: '44px', marginBottom: 0 }}
                    required
                  />
                </div>
              </div>
              
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Password</label>
                  <a href="#" style={{ fontSize: '13px', color: 'var(--accent-blue)', textDecoration: 'none' }}>Forgot?</a>
                </div>
                <div style={{ position: 'relative' }}>
                  <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    style={{ paddingLeft: '44px', marginBottom: 0 }}
                    required
                  />
                </div>
              </div>
              
              <Button type="submit" fullWidth isLoading={isLoading} style={{ marginTop: '12px' }}>
                Sign In <ChevronRight size={18} />
              </Button>
            </form>
            
            <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              Don't have an account? <a href="/register" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: '500' }}>Register here</a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

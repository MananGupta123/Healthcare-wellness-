import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Activity, Mail, Lock, User, ChevronRight, ShieldCheck } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'Patient'
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      backgroundColor: 'var(--bg-app)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Left Column: Branding / Details */}
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
        <div style={{ position: 'absolute', top: '10%', right: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }} className="animate-fade-up">
            <div style={{ background: 'var(--accent-blue)', padding: '12px', borderRadius: '12px', boxShadow: '0 0 24px rgba(79,142,247,0.4)' }}>
              <Activity size={32} color="#fff" />
            </div>
            <h1 style={{ fontSize: '36px', color: '#fff', margin: 0 }}>LuminaHealth</h1>
          </div>
          
          <h2 style={{ fontSize: '48px', lineHeight: '1.2', fontWeight: '700', marginBottom: '24px', color: '#fff' }} className="animate-fade-up delay-100">
            Join the future of <br/><span className="text-gradient">digital health.</span>
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '40px' }} className="animate-fade-up delay-200">
            Create an account to track your daily metrics, get automated preventive care reminders, and monitor your progress securely.
          </p>
          
          <div className="animate-fade-up delay-300" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'rgba(16,185,129,0.1)', padding: '10px', borderRadius: '10px', color: '#10b981' }}><ShieldCheck size={24} /></div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '4px' }}>HIPAA Compliant & Secure</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>Your health data is encrypted and strictly protected.</p>
              </div>
            </div>
             <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ background: 'rgba(79,142,247,0.1)', padding: '10px', borderRadius: '10px', color: 'var(--accent-blue)' }}><Activity size={24} /></div>
              <div>
                <h4 style={{ color: '#fff', fontSize: '16px', marginBottom: '4px' }}>Real-time Tracking</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>Log your metrics and visualize your wellness journey instantly.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Registration Form */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        position: 'relative',
        overflowY: 'auto'
      }}>
        <div style={{ width: '100%', maxWidth: '460px', padding: '40px 0' }} className="animate-fade-in">
          
          <div style={{ textAlign: 'center', marginBottom: '32px' }} className="show-on-mobile">
            <div style={{ background: 'linear-gradient(135deg, var(--accent-blue), #818cf8)', padding: '12px', borderRadius: '12px', display: 'inline-flex', marginBottom: '16px' }}>
              <Activity size={28} color="#fff" />
            </div>
            <h2 style={{ fontSize: '28px', color: '#fff' }}>Create an Account</h2>
          </div>

          <Card glass hoverable={false} style={{ padding: '40px' }}>
            <div style={{ marginBottom: '32px' }} className="hide-on-mobile">
               <h3 style={{ fontSize: '24px', color: '#fff', marginBottom: '8px' }}>Register</h3>
               <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Enter your details to create your secure account.</p>
            </div>
            
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text"
                    name="name"
                    placeholder="David Singh"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    style={{ paddingLeft: '44px', marginBottom: 0 }}
                    required
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    style={{ paddingLeft: '44px', marginBottom: 0 }}
                    required
                  />
                </div>
              </div>

              {/* Account Type Selection */}
              <div>
                 <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Account Type</label>
                 <div style={{ display: 'flex', gap: '12px' }}>
                   <div 
                      onClick={() => setFormData({...formData, role: 'Patient'})}
                      style={{ flex: 1, padding: '12px', border: `1px solid ${formData.role === 'Patient' ? 'var(--accent-blue)' : 'var(--border-color)'}`, background: formData.role === 'Patient' ? 'rgba(79,142,247,0.1)' : 'rgba(0,0,0,0.2)', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                   >
                     <span style={{ color: formData.role === 'Patient' ? '#fff' : 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Patient</span>
                   </div>
                   <div 
                      onClick={() => setFormData({...formData, role: 'Provider'})}
                      style={{ flex: 1, padding: '12px', border: `1px solid ${formData.role === 'Provider' ? 'var(--accent-blue)' : 'var(--border-color)'}`, background: formData.role === 'Provider' ? 'rgba(79,142,247,0.1)' : 'rgba(0,0,0,0.2)', borderRadius: '10px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                   >
                     <span style={{ color: formData.role === 'Provider' ? '#fff' : 'var(--text-secondary)', fontSize: '14px', fontWeight: '500' }}>Care Provider</span>
                   </div>
                 </div>
              </div>
              
              <div style={{ display: 'flex', gap: '16px' }}>
                 <div style={{ flex: 1 }}>
                   <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Password</label>
                   <div style={{ position: 'relative' }}>
                     <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                     <input
                       type="password"
                       name="password"
                       placeholder="••••••••"
                       value={formData.password}
                       onChange={handleChange}
                       className="input-field"
                       style={{ paddingLeft: '44px', marginBottom: 0 }}
                       required
                     />
                   </div>
                 </div>
                 <div style={{ flex: 1 }}>
                   <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Confirm Password</label>
                   <div style={{ position: 'relative' }}>
                     <Lock size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                     <input
                       type="password"
                       name="confirmPassword"
                       placeholder="••••••••"
                       value={formData.confirmPassword}
                       onChange={handleChange}
                       className="input-field"
                       style={{ paddingLeft: '44px', marginBottom: 0 }}
                       required
                     />
                   </div>
                 </div>
              </div>

              {/* Required Consent Checkbox added per constraints */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '8px', marginBottom: '8px' }}>
                <input type="checkbox" id="consent" required style={{ marginTop: '4px', cursor: 'pointer' }} />
                <label htmlFor="consent" style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', cursor: 'pointer' }}>
                  I consent to the collection and processing of my health data as outlined in the <a href="#" style={{ color: 'var(--accent-blue)', textDecoration: 'none' }}>Privacy Policy</a>. *
                </label>
              </div>
              
              <Button type="submit" fullWidth isLoading={isLoading} style={{ marginTop: '8px' }}>
                Create Account <ChevronRight size={18} />
              </Button>
            </form>
            
            <div style={{ textAlign: 'center', marginTop: '32px', fontSize: '14px', color: 'var(--text-secondary)' }}>
              Already have an account? <a href="/login" style={{ color: 'var(--accent-blue)', textDecoration: 'none', fontWeight: '500' }}>Sign in</a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

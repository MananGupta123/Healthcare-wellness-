import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Footprints, Clock, Moon, Calendar, HeartPulse, Droplets, Target, ArrowRight } from 'lucide-react';

export const Dashboard = () => {
  return (
    <Layout>
      <div style={{ paddingBottom: '40px' }}>
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }} className="animate-fade-up">
          <div>
            <h1 style={{ color: '#fff', fontSize: '28px', marginBottom: '8px' }}>Welcome back, David</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Here's what is happening with your wellness today.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="hide-on-mobile">
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Today's Date</div>
              <div style={{ fontSize: '15px', color: '#fff', fontWeight: '500' }}>March 14, 2026</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold', color: '#fff', boxShadow: '0 4px 12px rgba(79, 142, 247, 0.3)' }}>
              DS
            </div>
          </div>
        </div>
        
        <div className="dashboard-grid">
          {/* Main Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            <Card hoverable glass animate delay="100">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Target size={22} color="var(--accent-blue)" /> Daily Progress
                </h2>
                <button style={{ color: 'var(--accent-blue)', fontSize: '14px', border: 'none', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                  View History <ArrowRight size={16} />
                </button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <ProgressBar 
                  label="Steps Taken" 
                  value={3620} max={6000} unit="steps" color="#818cf8" 
                  icon={<Footprints size={18} />}
                />
                
                <ProgressBar 
                  label="Active Time" 
                  value={56} max={60} unit="mins" color="#10b981" 
                  icon={<Clock size={18} />}
                />
                
                <ProgressBar 
                  label="Sleep Duration" 
                  value={6.5} max={8} unit="hrs" color="#a78bfa" 
                  showValue={false}
                  icon={<Moon size={18} />}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '-12px', paddingLeft: '40px' }}>
                  <span style={{ color: '#fff', fontWeight: '500' }}>6 hrs 30 mins</span>
                  <span>11:30 pm - 06:00 am</span>
                </div>
              </div>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <Card hoverable animate delay="300" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(16,185,129,0.05))', borderColor: 'rgba(59,130,246,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{ padding: '10px', background: 'rgba(59,130,246,0.2)', borderRadius: '12px', color: '#3b82f6' }}>
                    <Calendar size={22} />
                  </div>
                  <h2 style={{ fontSize: '18px', color: '#fff', margin: 0 }}>Preventive Care</h2>
                </div>
                
                <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '4px', height: '40px', background: 'var(--accent-blue)', borderRadius: '2px' }} />
                  <div>
                    <div style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>Annual Blood Test</div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>Scheduled for 23rd Jan 2025</div>
                  </div>
                </div>
              </Card>

              <Card hoverable animate delay="400">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', background: 'rgba(239,68,68,0.1)', borderRadius: '12px', color: '#ef4444' }}>
                    <HeartPulse size={22} />
                  </div>
                  <h2 style={{ fontSize: '18px', color: '#fff', margin: 0 }}>Health Tip</h2>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
                  <p style={{ margin: 0 }}>Stay hydrated! Aim to drink at least <strong style={{ color: '#fff', fontWeight: '600' }}>8 glasses</strong> of water per day to maintain optimal health.</p>
                </div>
              </Card>
            </div>
            
          </div>

          {/* Right Column (Detailed Metric Cards) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }} className="animate-fade-up delay-100">Quick Stats</h3>
            
            <Card hoverable glass animate delay="200" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '10px', background: 'rgba(129,140,248,0.15)', borderRadius: '10px', color: '#818cf8' }}>
                    <Footprints size={20} />
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Steps</span>
                </div>
                <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '12px', color: 'var(--text-secondary)' }}>Today</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '32px', fontWeight: '700', color: '#fff', lineHeight: '1' }}>3,620</span>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>/ 6000</span>
              </div>
              <ProgressBar value={3620} max={6000} unit="" showValue={false} color="#818cf8" small />
            </Card>

            <Card hoverable glass animate delay="300" style={{ padding: '20px' }}>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '10px', background: 'rgba(16,185,129,0.15)', borderRadius: '10px', color: '#10b981' }}>
                    <Clock size={20} />
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Active Time</span>
                </div>
                <span style={{ fontSize: '12px', background: 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: '12px', color: '#10b981' }}>Near Goal</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '32px', fontWeight: '700', color: '#fff', lineHeight: '1' }}>56</span>
                  <span style={{ fontSize: '16px', color: 'var(--text-muted)', marginLeft: '4px' }}>mins</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>1,712 Kcal</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>1.23 km</div>
                </div>
              </div>
              <ProgressBar value={56} max={60} unit="" showValue={false} color="#10b981" small />
            </Card>

            <Card hoverable glass animate delay="400" style={{ padding: '20px' }}>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '10px', background: 'rgba(167,139,250,0.15)', borderRadius: '10px', color: '#a78bfa' }}>
                    <Moon size={20} />
                  </div>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Sleep</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '32px', fontWeight: '700', color: '#fff', lineHeight: '1' }}>6</span><span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>h</span>
                <span style={{ fontSize: '32px', fontWeight: '700', color: '#fff', lineHeight: '1' }}>30</span><span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>m</span>
              </div>
              <ProgressBar value={6.5} max={8} unit="" showValue={false} color="#a78bfa" small />
            </Card>
            
            <Card hoverable animate delay="500" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(79,142,247,0.1), rgba(79,142,247,0))', borderStyle: 'dashed' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(79,142,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                  <Droplets size={20} />
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>Log Water</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>+ Add 250ml glass</div>
                </div>
              </div>
            </Card>

          </div>
        </div>
      </div>
    </Layout>
  );
};

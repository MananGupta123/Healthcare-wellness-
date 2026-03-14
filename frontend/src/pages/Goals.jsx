import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';
import { Target, TrendingUp, Plus, Footprints, Clock, Moon, Droplets } from 'lucide-react';

export const Goals = () => {
  return (
    <Layout>
      <div style={{ paddingBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }} className="animate-fade-up">
          <div>
            <h1 style={{ color: '#fff', fontSize: '28px', marginBottom: '8px' }}>Wellness Goals</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Track and manage your daily health targets.</p>
          </div>
          <div>
            <Button style={{ display: 'flex', gap: '8px' }}>
              <Plus size={18} /> Add New Goal
            </Button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
             {/* Main Big Card for Primary Goal */}
             <Card glass hoverable animate delay="100" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, rgba(79,142,247,0.1), rgba(16,185,129,0.05))', border: '1px solid rgba(79,142,247,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '12px', background: 'rgba(79,142,247,0.2)', borderRadius: '12px', color: 'var(--accent-blue)' }}><TrendingUp size={24} /></div>
                    <div>
                      <h2 style={{ fontSize: '20px', color: '#fff', margin: 0 }}>Weekly Steps Challenge</h2>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>4 days remaining</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', lineHeight: '1' }}>25,400</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>/ 40,000 steps</div>
                  </div>
                </div>
                <ProgressBar value={25400} max={40000} unit="steps" showValue={false} color="var(--accent-blue)" />
                <div style={{ marginTop: '20px', display: 'flex', gap: '8px', color: 'var(--text-secondary)', fontSize: '14px', alignItems: 'center' }}>
                  <TrendingUp size={16} color="var(--status-met)" /> 
                  You are <strong style={{ color: '#fff' }}>15% ahead</strong> of your goal trajectory. Keep it up!
                </div>
             </Card>

             {/* Standard Goal Cards */}
             <Card hoverable animate delay="200">
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <div style={{ padding: '8px', background: 'rgba(129,140,248,0.15)', borderRadius: '8px', color: '#818cf8' }}><Footprints size={20} /></div>
                   <h3 style={{ fontSize: '16px', color: '#fff', margin: 0 }}>Daily Steps</h3>
                 </div>
                 <Button variant="ghost" style={{ padding: '4px 8px', fontSize: '12px', height: 'auto' }}>Edit</Button>
               </div>
               <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px', fontWeight: '700', color: '#fff', lineHeight: '1' }}>3,620</span>
               </div>
               <ProgressBar value={3620} max={6000} unit="steps" showValue={false} color="#818cf8" small />
             </Card>

             <Card hoverable animate delay="300">
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <div style={{ padding: '8px', background: 'rgba(16,185,129,0.15)', borderRadius: '8px', color: '#10b981' }}><Clock size={20} /></div>
                   <h3 style={{ fontSize: '16px', color: '#fff', margin: 0 }}>Active Time</h3>
                 </div>
                 <Button variant="ghost" style={{ padding: '4px 8px', fontSize: '12px', height: 'auto' }}>Edit</Button>
               </div>
               <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px', fontWeight: '700', color: '#fff', lineHeight: '1' }}>56</span><span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>m</span>
               </div>
               <ProgressBar value={56} max={60} unit="mins" showValue={false} color="#10b981" small />
             </Card>

             <Card hoverable animate delay="400">
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   <div style={{ padding: '8px', background: 'rgba(56,189,248,0.15)', borderRadius: '8px', color: '#38bdf8' }}><Droplets size={20} /></div>
                   <h3 style={{ fontSize: '16px', color: '#fff', margin: 0 }}>Hydration</h3>
                 </div>
                 <Button variant="ghost" style={{ padding: '4px 8px', fontSize: '12px', height: 'auto' }}>Edit</Button>
               </div>
               <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '28px', fontWeight: '700', color: '#fff', lineHeight: '1' }}>3</span><span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>glasses</span>
               </div>
               <ProgressBar value={3} max={8} unit="glasses" showValue={false} color="#38bdf8" small />
             </Card>
        </div>
      </div>
    </Layout>
  );
};

import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';
import client from '../api/axiosClient';
import { Target, TrendingUp, Plus, Footprints, Clock, Moon, Droplets, X } from 'lucide-react';

const GOAL_TYPES = [
  { type: 'steps', label: 'Daily Steps', unit: 'steps', defaultTarget: 6000, icon: <Footprints size={20} />, color: '#818cf8', bg: 'rgba(129,140,248,0.15)' },
  { type: 'active_time', label: 'Active Time', unit: 'mins', defaultTarget: 60, icon: <Clock size={20} />, color: '#10b981', bg: 'rgba(16,185,129,0.15)' },
  { type: 'water', label: 'Hydration', unit: 'glasses', defaultTarget: 8, icon: <Droplets size={20} />, color: '#38bdf8', bg: 'rgba(56,189,248,0.15)' },
  { type: 'sleep', label: 'Sleep', unit: 'hrs', defaultTarget: 8, icon: <Moon size={20} />, color: '#a78bfa', bg: 'rgba(167,139,250,0.15)' },
];

export const Goals = () => {
  const [todayGoals, setTodayGoals] = useState([]);
  const [allGoals, setAllGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [logForm, setLogForm] = useState({ type: 'steps', value: '', target: '' });
  const [logLoading, setLogLoading] = useState(false);

  const fetchGoals = async () => {
    try {
      const res = await client.get('/patients/goals');
      setTodayGoals(res.data.todayGoals || []);
      setAllGoals(res.data.goals || []);
    } catch (err) {
      console.error('Goals fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGoals(); }, []);

  const getGoal = (type) => todayGoals.find((g) => g.type === type);

  const handleLog = async (e) => {
    e.preventDefault();
    setLogLoading(true);
    try {
      await client.post('/patients/goals', {
        type: logForm.type,
        value: Number(logForm.value),
        target: logForm.target ? Number(logForm.target) : undefined,
      });
      setShowModal(false);
      setLogForm({ type: 'steps', value: '', target: '' });
      await fetchGoals();
    } catch (err) {
      console.error('Goal log error:', err);
    } finally {
      setLogLoading(false);
    }
  };

  // Compute a weekly total for steps
  const weeklySteps = allGoals.filter((g) => g.type === 'steps').reduce((sum, g) => sum + g.value, 0);

  return (
    <Layout>
      <div style={{ paddingBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }} className="animate-fade-up">
          <div>
            <h1 style={{ color: '#fff', fontSize: '28px', marginBottom: '8px' }}>Wellness Goals</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Track and manage your daily health targets.</p>
          </div>
          <Button onClick={() => setShowModal(true)} style={{ display: 'flex', gap: '8px' }}>
            <Plus size={18} /> Log Goal
          </Button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>Loading goals...</div>
        ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '32px' }}>
          {/* Weekly summary card */}
          <Card glass hoverable animate delay="100" style={{ gridColumn: '1 / -1', background: 'linear-gradient(135deg, rgba(79,142,247,0.1), rgba(16,185,129,0.05))', border: '1px solid rgba(79,142,247,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ padding: '12px', background: 'rgba(79,142,247,0.2)', borderRadius: '12px', color: 'var(--accent-blue)' }}><TrendingUp size={24} /></div>
                <div>
                  <h2 style={{ fontSize: '20px', color: '#fff', margin: 0 }}>Recent Steps Total</h2>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '14px', marginTop: '4px' }}>Last {allGoals.filter(g => g.type === 'steps').length} entries</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', lineHeight: '1' }}>{weeklySteps.toLocaleString()}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>steps total</div>
              </div>
            </div>
            <ProgressBar value={weeklySteps} max={40000} unit="steps" showValue={false} color="var(--accent-blue)" />
          </Card>

          {/* Individual goal cards */}
          {GOAL_TYPES.map((gt) => {
            const goal = getGoal(gt.type);
            const val = goal?.value || 0;
            const target = goal?.target || gt.defaultTarget;
            return (
              <Card key={gt.type} hoverable animate delay="200">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ padding: '8px', background: gt.bg, borderRadius: '8px', color: gt.color }}>{gt.icon}</div>
                    <h3 style={{ fontSize: '16px', color: '#fff', margin: 0 }}>{gt.label}</h3>
                  </div>
                  <Button variant="ghost" onClick={() => { setLogForm({ type: gt.type, value: '', target: String(target) }); setShowModal(true); }} style={{ padding: '4px 8px', fontSize: '12px', height: 'auto' }}>Log</Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '28px', fontWeight: '700', color: '#fff', lineHeight: '1' }}>{val.toLocaleString()}</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{gt.unit}</span>
                </div>
                <ProgressBar value={val} max={target} unit={gt.unit} showValue={false} color={gt.color} small />
              </Card>
            );
          })}
        </div>
        )}

        {/* Log Goal Modal */}
        {showModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, backdropFilter: 'blur(4px)' }} onClick={() => setShowModal(false)}>
            <Card glass style={{ width: '100%', maxWidth: '400px', padding: '32px' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h3 style={{ color: '#fff', fontSize: '20px', margin: 0 }}>Log Goal</h3>
                <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              <form onSubmit={handleLog} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Type</label>
                  <select value={logForm.type} onChange={(e) => setLogForm({ ...logForm, type: e.target.value })} className="input-field" style={{ marginBottom: 0 }}>
                    {GOAL_TYPES.map((gt) => <option key={gt.type} value={gt.type}>{gt.label}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Value</label>
                  <input type="number" min="0" step="any" value={logForm.value} onChange={(e) => setLogForm({ ...logForm, value: e.target.value })} className="input-field" style={{ marginBottom: 0 }} placeholder="e.g. 3620" required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Target (optional)</label>
                  <input type="number" min="0" step="any" value={logForm.target} onChange={(e) => setLogForm({ ...logForm, target: e.target.value })} className="input-field" style={{ marginBottom: 0 }} placeholder="e.g. 6000" />
                </div>
                <Button type="submit" fullWidth isLoading={logLoading} style={{ marginTop: '8px' }}>Save</Button>
              </form>
            </Card>
          </div>
        )}
      </div>
    </Layout>
  );
};

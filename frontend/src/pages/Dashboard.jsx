import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { useAuth } from '../context/AuthContext';
import client from '../api/axiosClient';
import { Button } from '../components/Button';
import { Footprints, Clock, Moon, Calendar, HeartPulse, Droplets, Target, ArrowRight, Plus, CheckCircle, XCircle } from 'lucide-react';

const HEALTH_TIPS = [
  'Stay hydrated! Aim to drink at least 8 glasses of water per day to maintain optimal health.',
  'Take a 10-minute walk after meals to improve digestion and blood sugar control.',
  'Practice deep breathing for 5 minutes daily to reduce stress and lower blood pressure.',
  'Eat at least 5 portions of fruit and vegetables each day for essential vitamins.',
  'Aim for 7-9 hours of quality sleep every night for physical and mental recovery.',
  'Limit screen time before bed — blue light disrupts your circadian rhythm.',
];

const DEFAULT_TARGETS = { steps: 6000, active_time: 60, sleep: 8, water: 8, calories: 2000 };

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const [todayGoals, setTodayGoals] = useState([]);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tip] = useState(() => HEALTH_TIPS[Math.floor(Math.random() * HEALTH_TIPS.length)]);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderForm, setReminderForm] = useState({ title: '', dueDate: '', type: 'checkup', description: '' });
  const [reminderSaving, setReminderSaving] = useState(false);

  const fetchData = async () => {
    try {
      const [goalsRes, remindersRes] = await Promise.all([
        client.get('/patients/goals'),
        client.get('/patients/reminders'),
      ]);
      setTodayGoals(goalsRes.data.todayGoals || []);
      setReminders(remindersRes.data.reminders || []);
    } catch (err) {
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateReminder = async (e) => {
    e.preventDefault();
    setReminderSaving(true);
    try {
      await client.post('/patients/reminders', reminderForm);
      setShowReminderModal(false);
      setReminderForm({ title: '', dueDate: '', type: 'checkup', description: '' });
      fetchData();
    } catch (err) {
      console.error('Create reminder error:', err);
    } finally {
      setReminderSaving(false);
    }
  };

  const handleUpdateReminderStatus = async (id, status) => {
    try {
      await client.put(`/patients/reminders/${id}/status`, { status });
      fetchData();
    } catch (err) {
      console.error('Update reminder error:', err);
    }
  };

  const getGoalValue = (type) => {
    const g = todayGoals.find((g) => g.type === type);
    return g ? g.value : 0;
  };
  const getGoalTarget = (type) => {
    const g = todayGoals.find((g) => g.type === type);
    return g?.target || DEFAULT_TARGETS[type] || 100;
  };

  const stepsVal = getGoalValue('steps');
  const stepsTarget = getGoalTarget('steps');
  const activeVal = getGoalValue('active_time');
  const activeTarget = getGoalTarget('active_time');
  const sleepVal = getGoalValue('sleep');
  const sleepTarget = getGoalTarget('sleep');

  const upcomingReminder = reminders.find((r) => r.computedStatus === 'upcoming');
  const displayName = currentUser?.name?.split(' ')[0] || 'there';

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const initials = (currentUser?.name || 'U').split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <Layout>
      <div style={{ paddingBottom: '40px' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }} className="animate-fade-up">
          <div>
            <h1 style={{ color: '#fff', fontSize: '28px', marginBottom: '8px' }}>Welcome back, {displayName}</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Here's what is happening with your wellness today.</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="hide-on-mobile">
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Today's Date</div>
              <div style={{ fontSize: '15px', color: '#fff', fontWeight: '500' }}>{dateStr}</div>
            </div>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold', color: '#fff', boxShadow: '0 4px 12px rgba(79, 142, 247, 0.3)' }}>
              {initials}
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>Loading your dashboard...</div>
        ) : (
        <div className="dashboard-grid">
          {/* Main Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card hoverable glass animate delay="100">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2 style={{ fontSize: '20px', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Target size={22} color="var(--accent-blue)" /> Daily Progress
                </h2>
                <a href="/goals" style={{ color: 'var(--accent-blue)', fontSize: '14px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '500' }}>
                  View History <ArrowRight size={16} />
                </a>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <ProgressBar label="Steps Taken" value={stepsVal} max={stepsTarget} unit="steps" color="#818cf8" icon={<Footprints size={18} />} />
                <ProgressBar label="Active Time" value={activeVal} max={activeTarget} unit="mins" color="#10b981" icon={<Clock size={18} />} />
                <ProgressBar label="Sleep Duration" value={sleepVal} max={sleepTarget} unit="hrs" color="#a78bfa" showValue={false} icon={<Moon size={18} />} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-secondary)', marginTop: '-12px', paddingLeft: '40px' }}>
                  <span style={{ color: '#fff', fontWeight: '500' }}>{Math.floor(sleepVal)} hrs {Math.round((sleepVal % 1) * 60)} mins</span>
                </div>
              </div>
            </Card>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
              <Card hoverable animate delay="300" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(16,185,129,0.05))', borderColor: 'rgba(59,130,246,0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ padding: '10px', background: 'rgba(59,130,246,0.2)', borderRadius: '12px', color: '#3b82f6' }}>
                      <Calendar size={22} />
                    </div>
                    <h2 style={{ fontSize: '18px', color: '#fff', margin: 0 }}>Preventive Care</h2>
                  </div>
                  <button onClick={() => setShowReminderModal(true)} style={{ background: 'rgba(79,142,247,0.15)', border: '1px solid rgba(79,142,247,0.3)', color: 'var(--accent-blue)', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus size={16} /> Add Reminder
                  </button>
                </div>
                {reminders.length === 0 ? (
                  <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>No reminders yet. Add one to stay on track!</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '260px', overflowY: 'auto' }}>
                    {reminders.map((r) => {
                      const status = r.computedStatus || r.status;
                      const statusColor = status === 'met' ? '#10b981' : status === 'missed' ? '#ef4444' : '#4f8ef7';
                      const statusBg = status === 'met' ? 'rgba(16,185,129,0.15)' : status === 'missed' ? 'rgba(239,68,68,0.15)' : 'rgba(79,142,247,0.15)';
                      return (
                        <div key={r._id} style={{ background: 'rgba(0,0,0,0.2)', padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ color: '#fff', fontWeight: '500', fontSize: '14px' }}>{r.title}</div>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '12px', marginTop: '3px' }}>
                              Due {new Date(r.dueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                              {r.type && ` · ${r.type}`}
                            </div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {status === 'upcoming' && (
                              <>
                                <button onClick={() => handleUpdateReminderStatus(r._id, 'met')} title="Mark as Met" style={{ background: 'rgba(16,185,129,0.15)', border: 'none', borderRadius: '6px', padding: '5px', cursor: 'pointer', color: '#10b981', display: 'flex' }}><CheckCircle size={16} /></button>
                                <button onClick={() => handleUpdateReminderStatus(r._id, 'missed')} title="Mark as Missed" style={{ background: 'rgba(239,68,68,0.15)', border: 'none', borderRadius: '6px', padding: '5px', cursor: 'pointer', color: '#ef4444', display: 'flex' }}><XCircle size={16} /></button>
                              </>
                            )}
                            <span style={{ background: statusBg, color: statusColor, padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500', textTransform: 'capitalize' }}>{status}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>

              <Card hoverable animate delay="400">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ padding: '10px', background: 'rgba(239,68,68,0.1)', borderRadius: '12px', color: '#ef4444' }}>
                    <HeartPulse size={22} />
                  </div>
                  <h2 style={{ fontSize: '18px', color: '#fff', margin: 0 }}>Health Tip</h2>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6' }}>
                  <p style={{ margin: 0 }}>{tip}</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '1px' }} className="animate-fade-up delay-100">Quick Stats</h3>

            <Card hoverable glass animate delay="200" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '10px', background: 'rgba(129,140,248,0.15)', borderRadius: '10px', color: '#818cf8' }}><Footprints size={20} /></div>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Steps</span>
                </div>
                <span style={{ fontSize: '12px', background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '12px', color: 'var(--text-secondary)' }}>Today</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '32px', fontWeight: '700', color: '#fff', lineHeight: '1' }}>{stepsVal.toLocaleString()}</span>
                <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '4px' }}>/ {stepsTarget.toLocaleString()}</span>
              </div>
              <ProgressBar value={stepsVal} max={stepsTarget} unit="" showValue={false} color="#818cf8" small />
            </Card>

            <Card hoverable glass animate delay="300" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ padding: '10px', background: 'rgba(16,185,129,0.15)', borderRadius: '10px', color: '#10b981' }}><Clock size={20} /></div>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Active Time</span>
                </div>
                {activeVal >= activeTarget * 0.9 && (
                  <span style={{ fontSize: '12px', background: 'rgba(16,185,129,0.1)', padding: '4px 10px', borderRadius: '12px', color: '#10b981' }}>Near Goal</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '32px', fontWeight: '700', color: '#fff', lineHeight: '1' }}>{activeVal}</span>
                <span style={{ fontSize: '16px', color: 'var(--text-muted)', marginLeft: '4px' }}>mins</span>
              </div>
              <ProgressBar value={activeVal} max={activeTarget} unit="" showValue={false} color="#10b981" small />
            </Card>

            <Card hoverable glass animate delay="400" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ padding: '10px', background: 'rgba(167,139,250,0.15)', borderRadius: '10px', color: '#a78bfa' }}><Moon size={20} /></div>
                <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Sleep</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontSize: '32px', fontWeight: '700', color: '#fff', lineHeight: '1' }}>{Math.floor(sleepVal)}</span><span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>h</span>
                <span style={{ fontSize: '32px', fontWeight: '700', color: '#fff', lineHeight: '1' }}>{Math.round((sleepVal % 1) * 60)}</span><span style={{ fontSize: '16px', color: 'var(--text-muted)' }}>m</span>
              </div>
              <ProgressBar value={sleepVal} max={sleepTarget} unit="" showValue={false} color="#a78bfa" small />
            </Card>

            <Card hoverable animate delay="500" style={{ padding: '20px', background: 'linear-gradient(135deg, rgba(79,142,247,0.1), rgba(79,142,247,0))', borderStyle: 'dashed' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(79,142,247,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-blue)' }}>
                  <Droplets size={20} />
                </div>
                <div>
                  <div style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>Water: {getGoalValue('water')} / {getGoalTarget('water')} glasses</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>Log your hydration on the Goals page</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        )}

        {/* Add Reminder Modal */}
        {showReminderModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }} onClick={() => setShowReminderModal(false)}>
            <div onClick={(e) => e.stopPropagation()} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '32px', width: '100%', maxWidth: '440px' }}>
              <h3 style={{ color: '#fff', fontSize: '20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={20} color="var(--accent-blue)" /> New Reminder
              </h3>
              <form onSubmit={handleCreateReminder} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Title *</label>
                  <input className="input-field" style={{ marginBottom: 0 }} placeholder="e.g. Annual Blood Test" value={reminderForm.title} onChange={(e) => setReminderForm({ ...reminderForm, title: e.target.value })} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Due Date *</label>
                  <input type="date" className="input-field" style={{ marginBottom: 0 }} value={reminderForm.dueDate} onChange={(e) => setReminderForm({ ...reminderForm, dueDate: e.target.value })} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Type</label>
                  <select className="input-field" style={{ marginBottom: 0 }} value={reminderForm.type} onChange={(e) => setReminderForm({ ...reminderForm, type: e.target.value })}>
                    <option value="checkup">Checkup</option>
                    <option value="medication">Medication</option>
                    <option value="vaccination">Vaccination</option>
                    <option value="lab_test">Lab Test</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '6px', fontWeight: '500' }}>Description (optional)</label>
                  <input className="input-field" style={{ marginBottom: 0 }} placeholder="Any notes..." value={reminderForm.description} onChange={(e) => setReminderForm({ ...reminderForm, description: e.target.value })} />
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                  <Button type="button" variant="secondary" onClick={() => setShowReminderModal(false)} style={{ flex: 1 }}>Cancel</Button>
                  <Button type="submit" isLoading={reminderSaving} style={{ flex: 1 }}>Create Reminder</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

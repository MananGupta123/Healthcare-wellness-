import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import client from '../api/axiosClient';
import { Card } from '../components/Card';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';
import { ArrowLeft, User, Calendar, Footprints, Clock, Moon, Droplets, ShieldCheck, AlertTriangle } from 'lucide-react';

const BADGE_STYLES = {
  green: { bg: 'rgba(16,185,129,0.15)', color: '#10b981' },
  red: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
  blue: { bg: 'rgba(79,142,247,0.15)', color: '#4f8ef7' },
};

const STATUS_COLORS = {
  met: { bg: 'rgba(16,185,129,0.15)', color: '#10b981' },
  missed: { bg: 'rgba(239,68,68,0.15)', color: '#ef4444' },
  upcoming: { bg: 'rgba(79,142,247,0.15)', color: '#4f8ef7' },
};

export const PatientDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get(`/provider/patients/${id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.error('Patient detail error:', err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        Loading patient data...
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)' }}>
        Patient not found.
      </div>
    );
  }

  const { patient, goals, reminders, complianceBadge } = data;
  const badge = complianceBadge || { badge: 'Upcoming', color: 'blue' };
  const badgeStyle = BADGE_STYLES[badge.color] || BADGE_STYLES.blue;

  // Get latest goal values
  const latestGoal = (type) => goals.find((g) => g.type === type);
  const stepsGoal = latestGoal('steps');
  const activeGoal = latestGoal('active_time');
  const sleepGoal = latestGoal('sleep');
  const waterGoal = latestGoal('water');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-app)' }}>
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 48px' }}>
        {/* Back Button + Header */}
        <div style={{ marginBottom: '32px' }} className="animate-fade-up">
          <Button variant="ghost" onClick={() => navigate('/provider')} style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
            <ArrowLeft size={18} /> Back to Dashboard
          </Button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '20px' }}>
                {(patient.name || 'U').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </div>
              <div>
                <h1 style={{ color: '#fff', fontSize: '28px', margin: 0 }}>{patient.name}</h1>
                <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0', fontSize: '14px' }}>{patient.email}</p>
              </div>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px', background: badgeStyle.bg, color: badgeStyle.color, padding: '8px 18px', borderRadius: '20px', fontSize: '14px', fontWeight: '600' }}>
              {badge.color === 'green' ? <ShieldCheck size={18} /> : badge.color === 'red' ? <AlertTriangle size={18} /> : <Clock size={18} />}
              {badge.badge}
            </span>
          </div>
        </div>

        {/* Patient Info */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Blood Type', value: patient.bloodType || 'N/A' },
            { label: 'Allergies', value: (patient.allergies || []).join(', ') || 'None' },
            { label: 'Medications', value: (patient.currentMedications || []).join(', ') || 'None' },
            { label: 'Phone', value: patient.phone || 'N/A' },
          ].map((item) => (
            <Card key={item.label} animate delay="100" style={{ padding: '16px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>{item.label}</div>
              <div style={{ color: '#fff', fontWeight: '500', fontSize: '15px' }}>{item.value}</div>
            </Card>
          ))}
        </div>

        {/* Goals */}
        <Card glass animate delay="200" style={{ marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '28px' }}>Latest Wellness Goals</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { g: stepsGoal, label: 'Steps', icon: <Footprints size={18} />, color: '#818cf8', unit: 'steps', defTarget: 6000 },
              { g: activeGoal, label: 'Active Time', icon: <Clock size={18} />, color: '#10b981', unit: 'mins', defTarget: 60 },
              { g: sleepGoal, label: 'Sleep', icon: <Moon size={18} />, color: '#a78bfa', unit: 'hrs', defTarget: 8 },
              { g: waterGoal, label: 'Water', icon: <Droplets size={18} />, color: '#38bdf8', unit: 'glasses', defTarget: 8 },
            ].map(({ g, label, icon, color, unit, defTarget }) => (
              <div key={label}>
                <ProgressBar
                  label={label}
                  value={g?.value || 0}
                  max={g?.target || defTarget}
                  unit={unit}
                  color={color}
                  icon={icon}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* Reminders */}
        <Card glass animate delay="300">
          <h3 style={{ fontSize: '18px', color: '#fff', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={20} color="var(--accent-blue)" /> Preventive Care Reminders
          </h3>
          {reminders.length === 0 ? (
            <div style={{ color: 'var(--text-secondary)', padding: '20px 0' }}>No reminders for this patient.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {reminders.map((r) => {
                const status = r.computedStatus || r.status;
                const sc = STATUS_COLORS[status] || STATUS_COLORS.upcoming;
                return (
                  <div key={r._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                    <div>
                      <div style={{ color: '#fff', fontWeight: '500', fontSize: '15px' }}>{r.title}</div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px' }}>
                        Due: {new Date(r.dueDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {r.type && ` — ${r.type}`}
                      </div>
                    </div>
                    <span style={{ background: sc.bg, color: sc.color, padding: '4px 14px', borderRadius: '16px', fontSize: '13px', fontWeight: '500', textTransform: 'capitalize' }}>
                      {status}
                    </span>
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

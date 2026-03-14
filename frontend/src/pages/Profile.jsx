import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import client from '../api/axiosClient';
import { User, Mail, Phone, MapPin, Calendar, Heart, Save } from 'lucide-react';

export const Profile = () => {
  const { currentUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    bloodType: '',
    allergies: '',
    currentMedications: '',
  });

  useEffect(() => {
    client.get('/patients/me').then((res) => {
      const u = res.data.user;
      setProfileData({
        name: u.name || '',
        email: u.email || '',
        phone: u.phone || '',
        dateOfBirth: u.dateOfBirth ? u.dateOfBirth.slice(0, 10) : '',
        address: u.address || '',
        bloodType: u.bloodType || '',
        allergies: (u.allergies || []).join(', '),
        currentMedications: (u.currentMedications || []).join(', '),
      });
    }).catch((err) => console.error('Profile fetch error:', err));
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');
    try {
      const payload = {
        name: profileData.name,
        phone: profileData.phone,
        dateOfBirth: profileData.dateOfBirth || undefined,
        address: profileData.address,
        bloodType: profileData.bloodType,
        allergies: profileData.allergies ? profileData.allergies.split(',').map((s) => s.trim()).filter(Boolean) : [],
        currentMedications: profileData.currentMedications ? profileData.currentMedications.split(',').map((s) => s.trim()).filter(Boolean) : [],
      };
      await client.put('/patients/me', payload);
      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <div style={{ paddingBottom: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }} className="animate-fade-up">
          <div>
            <h1 style={{ color: '#fff', fontSize: '28px', marginBottom: '8px' }}>My Profile</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Manage your personal details and medical information.</p>
          </div>
          <div>
            {isEditing ? (
              <Button onClick={handleSave} isLoading={saving} style={{ display: 'flex', gap: '8px', background: 'var(--status-met)' }}>
                <Save size={18} /> Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="secondary" style={{ display: 'flex', gap: '8px' }}>
                <User size={18} /> Edit Profile
              </Button>
            )}
          </div>
        </div>

        {message && (
          <div style={{ background: message.includes('success') ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${message.includes('success') ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}`, color: message.includes('success') ? '#10b981' : '#ef4444', padding: '12px 16px', borderRadius: '10px', fontSize: '14px', marginBottom: '24px' }}>
            {message}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          <Card hoverable animate delay="100">
            <h2 style={{ fontSize: '18px', color: '#fff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', background: 'rgba(79,142,247,0.1)', borderRadius: '8px', color: 'var(--accent-blue)' }}><User size={20} /></div> Personal Information
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Full Name</label>
                 {isEditing ? <input name="name" value={profileData.name} onChange={handleChange} className="input-field" style={{marginBottom: 0}} /> : <div style={{ color: '#fff', fontSize: '15px' }}>{profileData.name}</div>}
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Email Address</label>
                 <div style={{ color: '#fff', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} color="var(--text-muted)" /> {profileData.email}</div>
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Phone Number</label>
                 {isEditing ? <input name="phone" value={profileData.phone} onChange={handleChange} className="input-field" style={{marginBottom: 0}} /> : <div style={{ color: '#fff', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} color="var(--text-muted)" /> {profileData.phone || 'Not set'}</div>}
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Address</label>
                 {isEditing ? <input name="address" value={profileData.address} onChange={handleChange} className="input-field" style={{marginBottom: 0}} /> : <div style={{ color: '#fff', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} color="var(--text-muted)" /> {profileData.address || 'Not set'}</div>}
               </div>
            </div>
          </Card>

          <Card hoverable animate delay="200">
            <h2 style={{ fontSize: '18px', color: '#fff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', color: '#10b981' }}><Heart size={20} /></div> Medical Overview
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Date of Birth</label>
                 {isEditing ? <input type="date" name="dateOfBirth" value={profileData.dateOfBirth} onChange={handleChange} className="input-field" style={{marginBottom: 0}} /> : <div style={{ color: '#fff', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} color="var(--text-muted)" /> {profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not set'}</div>}
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                 <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Blood Type</label>
                 {isEditing ? (
                   <select name="bloodType" value={profileData.bloodType} onChange={handleChange} className="input-field" style={{marginBottom: 0}}>
                     <option value="">Select Blood Group</option>
                     <option value="A+">A+</option>
                     <option value="A-">A-</option>
                     <option value="B+">B+</option>
                     <option value="B-">B-</option>
                     <option value="AB+">AB+</option>
                     <option value="AB-">AB-</option>
                     <option value="O+">O+</option>
                     <option value="O-">O-</option>
                   </select>
                 ) : <div style={{ display: 'inline-block', background: 'rgba(239,68,68,0.15)', color: '#ef4444', padding: '4px 12px', borderRadius: '16px', fontWeight: '600', width: 'fit-content' }}>{profileData.bloodType || 'Not set'}</div>}
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', marginTop: '8px' }}>
                 <label style={{ fontSize: '14px', color: '#fff', fontWeight: '500' }}>Known Allergies</label>
                 {isEditing ? <input name="allergies" value={profileData.allergies} onChange={handleChange} className="input-field" style={{marginBottom: 0}} placeholder="Comma-separated, e.g. Penicillin, Pollen" /> : <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{profileData.allergies || 'None recorded'}</div>}
               </div>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                 <label style={{ fontSize: '14px', color: '#fff', fontWeight: '500' }}>Current Medications</label>
                 {isEditing ? <input name="currentMedications" value={profileData.currentMedications} onChange={handleChange} className="input-field" style={{marginBottom: 0}} placeholder="Comma-separated, e.g. Metformin 500mg" /> : <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{profileData.currentMedications || 'None recorded'}</div>}
               </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

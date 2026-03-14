import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { User, Mail, Phone, MapPin, Calendar, Heart, Save } from 'lucide-react';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'David Singh',
    email: 'david@example.com',
    phone: '+1 (555) 123-4567',
    dob: '1990-05-14',
    address: '123 Health Ave, Medical City, MC 90210',
    bloodType: 'O+',
    allergies: 'Penicillin',
    medications: 'Metformin 500mg'
  });

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // In real app, trigger PUT /api/patients/me here
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
              <Button onClick={handleSave} style={{ display: 'flex', gap: '8px', background: 'var(--status-met)' }}>
                <Save size={18} /> Save Changes
              </Button>
            ) : (
              <Button onClick={() => setIsEditing(true)} variant="secondary" style={{ display: 'flex', gap: '8px' }}>
                <User size={18} /> Edit Profile
              </Button>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {/* General Info Card */}
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
                 {isEditing ? <input name="email" value={profileData.email} onChange={handleChange} className="input-field" style={{marginBottom: 0}} /> : <div style={{ color: '#fff', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} color="var(--text-muted)" /> {profileData.email}</div>}
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Phone Number</label>
                 {isEditing ? <input name="phone" value={profileData.phone} onChange={handleChange} className="input-field" style={{marginBottom: 0}} /> : <div style={{ color: '#fff', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} color="var(--text-muted)" /> {profileData.phone}</div>}
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Address</label>
                 {isEditing ? <input name="address" value={profileData.address} onChange={handleChange} className="input-field" style={{marginBottom: 0}} /> : <div style={{ color: '#fff', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} color="var(--text-muted)" /> {profileData.address}</div>}
               </div>
            </div>
          </Card>

          {/* Medical Info Card */}
          <Card hoverable animate delay="200">
            <h2 style={{ fontSize: '18px', color: '#fff', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '8px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', color: '#10b981' }}><Heart size={20} /></div> Medical Overview
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                 <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Date of Birth</label>
                 {isEditing ? <input type="date" name="dob" value={profileData.dob} onChange={handleChange} className="input-field" style={{marginBottom: 0}} /> : <div style={{ color: '#fff', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}><Calendar size={16} color="var(--text-muted)" /> {new Date(profileData.dob).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>}
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                 <label style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '500' }}>Blood Type</label>
                 {isEditing ? <input name="bloodType" value={profileData.bloodType} onChange={handleChange} className="input-field" style={{marginBottom: 0}} /> : <div style={{ display: 'inline-block', background: 'rgba(239,68,68,0.15)', color: '#ef4444', padding: '4px 12px', borderRadius: '16px', fontWeight: '600', width: 'fit-content' }}>{profileData.bloodType}</div>}
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', marginTop: '8px' }}>
                 <label style={{ fontSize: '14px', color: '#fff', fontWeight: '500' }}>Known Allergies</label>
                 {isEditing ? <input name="allergies" value={profileData.allergies} onChange={handleChange} className="input-field" style={{marginBottom: 0}} /> : <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{profileData.allergies || 'None recorded'}</div>}
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                 <label style={{ fontSize: '14px', color: '#fff', fontWeight: '500' }}>Current Medications</label>
                 {isEditing ? <input name="medications" value={profileData.medications} onChange={handleChange} className="input-field" style={{marginBottom: 0}} /> : <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{profileData.medications || 'None recorded'}</div>}
               </div>
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

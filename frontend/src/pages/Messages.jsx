import React from 'react';
import { Layout } from '../components/Layout';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Search, Send, User, ChevronRight } from 'lucide-react';

export const Messages = () => {
  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
         <div style={{ marginBottom: '24px' }} className="animate-fade-up">
            <h1 style={{ color: '#fff', fontSize: '28px', marginBottom: '8px' }}>Messages</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Communicate securely with your healthcare providers.</p>
         </div>

         <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: 0 }}>
            {/* Contacts Sidebar */}
            <Card style={{ width: '320px', display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }} animate delay="100">
              <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ position: 'relative' }}>
                  <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input 
                    type="text" 
                    placeholder="Search messages..." 
                    className="input-field" 
                    style={{ marginBottom: 0, paddingLeft: '40px', background: 'rgba(0,0,0,0.3)', border: 'none' }}
                  />
                </div>
              </div>

              <div style={{ overflowY: 'auto', flex: 1 }}>
                 {/* Contact Item */}
                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', borderBottom: '1px solid var(--border-color)', background: 'rgba(79,142,247,0.05)', cursor: 'pointer', borderLeft: '3px solid var(--accent-blue)' }}>
                   <div style={{ position: 'relative' }}>
                     <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                       DR
                     </div>
                     <div style={{ position: 'absolute', bottom: 0, right: 0, width: '12px', height: '12px', background: 'var(--status-met)', borderRadius: '50%', border: '2px solid var(--bg-card)' }} />
                   </div>
                   <div style={{ flex: 1, overflow: 'hidden' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                       <span style={{ color: '#fff', fontWeight: '600', fontSize: '15px' }}>Dr. Sarah Rao</span>
                       <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>10:42 AM</span>
                     </div>
                     <div style={{ color: 'var(--accent-blue)', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: '500' }}>
                       Your test results look great...
                     </div>
                   </div>
                 </div>

                 {/* Contact Item */}
                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', borderBottom: '1px solid var(--border-color)', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                   <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                     MC
                   </div>
                   <div style={{ flex: 1, overflow: 'hidden' }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                       <span style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '15px' }}>Medical Clinic</span>
                       <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Yesterday</span>
                     </div>
                     <div style={{ color: 'var(--text-secondary)', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                       Reminder: Upcoming appointment for...
                     </div>
                   </div>
                 </div>
              </div>
            </Card>

            {/* Chat Area */}
            <Card style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }} glass animate delay="200">
               {/* Chat Header */}
               <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                   <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                     DR
                   </div>
                   <div>
                     <div style={{ color: '#fff', fontWeight: '600', fontSize: '16px' }}>Dr. Sarah Rao</div>
                     <span style={{ color: 'var(--status-met)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                       <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--status-met)' }} /> Online
                     </span>
                   </div>
                 </div>
                 <Button variant="ghost" style={{ padding: '8px' }}>
                    View Patient Portal <ChevronRight size={16} />
                 </Button>
               </div>

               {/* Messages Stream */}
               <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {/* Incoming */}
                  <div style={{ display: 'flex', gap: '16px', maxWidth: '80%' }}>
                     <div style={{ width: '32px', height: '32px', flexShrink: 0, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>DR</div>
                     <div>
                       <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '0 16px 16px 16px', color: '#fff', fontSize: '14px', lineHeight: '1.6', border: '1px solid var(--border-color)' }}>
                         Hello David, I reviewed your recent bloodwork. Everything looks fantastic, your cholesterol has dropped significantly since our last checkup!
                       </div>
                       <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', marginLeft: '4px' }}>Yesterday, 2:30 PM</div>
                     </div>
                  </div>

                  {/* Outgoing */}
                  <div style={{ display: 'flex', gap: '16px', maxWidth: '80%', alignSelf: 'flex-end', flexDirection: 'row-reverse' }}>
                     <div style={{ width: '32px', height: '32px', flexShrink: 0, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-blue), #818cf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>DS</div>
                     <div>
                       <div style={{ background: 'var(--accent-blue)', padding: '16px', borderRadius: '16px 0 16px 16px', color: '#fff', fontSize: '14px', lineHeight: '1.6', boxShadow: '0 4px 12px rgba(79,142,247,0.2)' }}>
                         That is great news! Should I continue the current dosage of the Metformin?
                       </div>
                       <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', marginRight: '4px', textAlign: 'right' }}>Yesterday, 2:45 PM</div>
                     </div>
                  </div>

                  {/* Incoming */}
                  <div style={{ display: 'flex', gap: '16px', maxWidth: '80%' }}>
                     <div style={{ width: '32px', height: '32px', flexShrink: 0, borderRadius: '50%', background: 'linear-gradient(135deg, #10b981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px', fontWeight: 'bold' }}>DR</div>
                     <div>
                       <div style={{ background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: '0 16px 16px 16px', color: '#fff', fontSize: '14px', lineHeight: '1.6', border: '1px solid var(--border-color)' }}>
                         Yes, continue the same dosage. Your test results look great, so we'll just monitor things during your annual checkup next month.
                       </div>
                       <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px', marginLeft: '4px' }}>Today, 10:42 AM</div>
                     </div>
                  </div>
               </div>

               {/* Input Box */}
               <div style={{ padding: '20px', borderTop: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.2)' }}>
                 <div style={{ display: 'flex', gap: '12px' }}>
                   <input 
                     type="text" 
                     placeholder="Type a secure message..." 
                     className="input-field"
                     style={{ marginBottom: 0, flex: 1, background: 'var(--bg-card)' }}
                   />
                   <Button style={{ padding: '0 20px', borderRadius: '10px' }}>
                     <Send size={18} />
                   </Button>
                 </div>
               </div>
            </Card>
         </div>
      </div>
    </Layout>
  );
};

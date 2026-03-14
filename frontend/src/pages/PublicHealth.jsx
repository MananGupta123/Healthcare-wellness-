import React from 'react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Activity, ShieldAlert, HeartHandshake, BrainCircuit, ArrowRight } from 'lucide-react';

export const PublicHealth = () => {
  const cards = [
    {
      title: "COVID-19 Updates",
      description: "Stay informed about the latest COVID-19 guidelines, variants, and vaccination booster information globally.",
      icon: <ShieldAlert size={28} color="#ef4444" />,
      color: "rgba(239,68,68,0.15)",
      delay: "100"
    },
    {
      title: "Seasonal Flu Prevention",
      description: "Learn about actionable steps you can take to prevent the seasonal flu and locate vaccination drives near you.",
      icon: <HeartHandshake size={28} color="#3b82f6" />,
      color: "rgba(59,130,246,0.15)",
      delay: "200"
    },
    {
      title: "Mental Health Awareness",
      description: "Explore curated resources, therapy options, and peer support networks for maintaining strong mental health.",
      icon: <BrainCircuit size={28} color="#a78bfa" />,
      color: "rgba(167,139,250,0.15)",
      delay: "300"
    }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-app)', position: 'relative', overflow: 'hidden' }}>
      {/* Background Orbs */}
      <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(79,142,247,0.05) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, rgba(0,0,0,0) 70%)', borderRadius: '50%', pointerEvents: 'none', zIndex: 0 }} />

      {/* Header */}
      <header style={{ 
        position: 'fixed', top: 0, width: '100%', 
        backgroundColor: 'rgba(11, 12, 16, 0.8)', 
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 0',
        zIndex: 50
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
             <Activity size={24} color="var(--accent-blue)" />
             <h1 style={{ fontSize: '20px', margin: 0, fontWeight: '700' }}>Lumina<span style={{color: 'var(--accent-blue)'}}>Health</span></h1>
          </div>
          <nav style={{ display: 'none', '@media (minWidth: 768px)': { display: 'flex' }, gap: '32px', fontSize: '14px', fontWeight: '500' }} className="hide-on-mobile">
            <a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Health Topics</a>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Services</a>
            <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>Contact</a>
          </nav>
          <Button variant="primary" onClick={() => window.location.href='/login'} style={{ padding: '8px 20px' }}>Sign In</Button>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '140px 24px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 80px' }} className="animate-fade-up">
          <div style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(79,142,247,0.1)', color: 'var(--accent-blue)', borderRadius: '20px', fontSize: '14px', fontWeight: '600', marginBottom: '24px', border: '1px solid rgba(79,142,247,0.2)' }}>
            Knowledge Center
          </div>
          <h2 style={{ fontSize: '48px', fontWeight: '700', lineHeight: '1.2', marginBottom: '24px', color: '#fff' }}>
            Latest <span className="text-gradient">Health Information</span>
          </h2>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            Empowering you with expert-curated resources and the latest updates to keep you and your loved ones safe, healthy, and informed.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {cards.map((card, index) => (
            <Card key={index} hoverable glass animate delay={card.delay} style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: card.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                {card.icon}
              </div>
              <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '16px' }}>{card.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px', flex: 1 }}>
                {card.description}
              </p>
              <div style={{ marginTop: 'auto' }}>
                <Button variant="ghost" style={{ padding: '0', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-blue)' }} className="group">
                  Read Article <ArrowRight size={16} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
      
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '40px 0', position: 'relative', zIndex: 1, backgroundColor: 'rgba(11, 12, 16, 0.5)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} color="var(--text-muted)" />
            <span style={{ color: 'var(--text-muted)', fontWeight: '500' }}>LuminaHealth © 2026</span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
             Built for HCLTech Hackathon
          </div>
        </div>
      </footer>
    </div>
  );
};

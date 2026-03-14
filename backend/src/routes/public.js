const express = require('express');

const router = express.Router();

// Static health content — curated for the portal.
// No authentication required on any route in this file.
const HEALTH_INFO = {
  healthTips: [
    'Drink at least 8 glasses (2 litres) of water daily to stay hydrated.',
    'Walk 10,000 steps a day to maintain cardiovascular health.',
    'Aim for 7–9 hours of quality sleep every night.',
    'Eat at least 5 portions of fruit and vegetables each day.',
    'Limit processed sugar and saturated fats in your diet.',
    'Practice mindfulness or meditation for 10 minutes daily to reduce stress.',
    'Perform at least 150 minutes of moderate aerobic activity per week.',
    'Schedule regular health check-ups even when you feel healthy.',
    'Wash your hands frequently to prevent the spread of infections.',
    'Avoid smoking and limit alcohol consumption for long-term health.',
  ],
  preventiveCareSchedule: [
    'Annual blood test & full metabolic panel (recommended for all adults 18+).',
    'Blood pressure check every 2 years (or annually if at risk).',
    'Cholesterol (lipid panel) screening every 4–6 years for adults 20+.',
    'Blood glucose / diabetes screening every 3 years for adults 45+.',
    'Dental check-up and cleaning every 6 months.',
    'Eye examination every 1–2 years (more frequently if wearing glasses/contacts).',
    'Skin cancer screening annually, especially if fair-skinned or high sun exposure.',
    'Flu (influenza) vaccine every year — ideally each autumn before flu season.',
    'Colon cancer screening starting at age 45 (colonoscopy every 10 years if normal).',
    'Mammogram every 1–2 years for women aged 40 and above.',
    'Cervical cancer (Pap smear) screening every 3 years for women aged 21–65.',
    'Bone density (DEXA) scan for women 65+ or men 70+ (or earlier if at risk).',
    'COVID-19 booster as recommended by national health guidelines.',
  ],
  privacyPolicy:
    'Your health data is encrypted at rest and in transit using industry-standard AES-256 ' +
    'and TLS 1.3 protocols. We never share, sell, or disclose your personal or medical ' +
    'information to third parties without your explicit written consent, except where required ' +
    'by applicable law. All access to sensitive records is logged in a HIPAA-compliant audit ' +
    'trail. You have the right to view, correct, export, or delete your data at any time by ' +
    'contacting our Data Protection Officer. For full details, refer to our complete Privacy ' +
    'Policy document available on request.',
  dataRights: [
    'Right to access: Request a copy of all personal data we hold about you.',
    'Right to rectification: Correct inaccurate or incomplete data at any time.',
    'Right to erasure: Request deletion of your personal data ("right to be forgotten").',
    'Right to data portability: Receive your data in a structured, machine-readable format.',
    'Right to restrict processing: Limit how we use your data in certain circumstances.',
    'Right to object: Object to processing based on legitimate interests or for direct marketing.',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/public/health-info
// Returns curated health tips, preventive care schedule, and privacy policy.
// No authentication required — accessible to the public.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/health-info', (req, res) => {
  res.json(HEALTH_INFO);
});

module.exports = router;

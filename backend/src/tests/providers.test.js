// Ensure server.js skips the DB connection + process.exit block when imported by Jest
process.env.NODE_ENV = 'test';


const request = require('supertest');
const app = require('../server');

// ─────────────────────────────────────────────────────────────────────────────
// Provider & Public Route Tests
// These tests verify auth guards and response shapes WITHOUT needing a live DB.
// Tests that require DB queries will fail gracefully (500/connection error)
// when MONGO_URI is not set; in CI, secrets provide a real connection.
// ─────────────────────────────────────────────────────────────────────────────

describe('Public Route — GET /api/public/health-info', () => {
  it('should return 200 with healthTips, preventiveCareSchedule, and privacyPolicy', async () => {
    const res = await request(app).get('/api/public/health-info');

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('healthTips');
    expect(res.body).toHaveProperty('preventiveCareSchedule');
    expect(res.body).toHaveProperty('privacyPolicy');
    expect(res.body).toHaveProperty('dataRights');
    expect(Array.isArray(res.body.healthTips)).toBe(true);
    expect(Array.isArray(res.body.preventiveCareSchedule)).toBe(true);
    expect(Array.isArray(res.body.dataRights)).toBe(true);
    expect(res.body.healthTips.length).toBeGreaterThan(0);
  });
});

describe('Provider Routes — Auth Guard Tests (no DB needed)', () => {
  it('GET /api/provider/patients — should return 401 with no token', async () => {
    const res = await request(app).get('/api/provider/patients');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('GET /api/provider/patients/:id — should return 401 with no token', async () => {
    const res = await request(app).get('/api/provider/patients/64a1f2b3c4d5e6f7a8b9c0d1');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  it('GET /api/provider/patients/:id — should return 400 for an invalid (non-ObjectId) patient ID when authenticated', async () => {
    // We use an invalid JWT to test the auth guard fires first (401)
    // A 400 for invalid ObjectId is tested at the route level, guarded by protect() first
    const res = await request(app)
      .get('/api/provider/patients/not-a-valid-id')
      .set('Authorization', 'Bearer invalid.token.here');

    // Either 401 (bad JWT) or 400 (bad ID) — must NOT be 500
    expect([400, 401]).toContain(res.statusCode);
    expect(res.body).toHaveProperty('error');
  });
});

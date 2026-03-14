# LuminaHealth — Healthcare Wellness & Preventive Care Portal

A full-stack healthcare portal that empowers patients to track wellness goals, manage preventive care reminders, and securely communicate with healthcare providers. Built with HIPAA-compliant security practices including audit logging, encrypted passwords, and role-based access control.

---

## Live Demo

| Service  | URL |
|----------|-----|
| Frontend | _Deployed on Vercel_ |
| Backend  | _Deployed on Render_ |

> Register as **Patient** or **Provider** to explore the full experience.

---

## Key Features

### For Patients
- **Dashboard** — Daily progress bars (steps, active time, sleep), health tip of the day, preventive care reminders
- **Wellness Goal Tracker** — Log daily goals (steps, water, sleep, calories, active time) with smart upsert (no duplicate entries per day)
- **Preventive Care Reminders** — Create, view, and mark reminders as met/missed with auto-detection of overdue items
- **Profile Management** — Edit personal and medical info (allergies, medications, blood type, emergency contact)
- **Public Health Page** — General health information and privacy policy (no login required)

### For Healthcare Providers
- **Patient Dashboard** — View all assigned patients with color-coded compliance badges
- **Patient Detail View** — Deep-dive into individual patient goals, reminders, and medical info
- **Compliance Summary** — Aggregate stats (total reminders, met, missed, upcoming)

### Security & Compliance
- JWT authentication with 7-day expiry
- bcrypt password hashing (12 salt rounds)
- HIPAA audit trail — every write operation logged automatically
- Rate limiting (100 global / 20 auth per 15 min)
- Helmet security headers, CORS whitelisting, 10kb body limit
- Field whitelisting on profile updates (role/email can't be modified)
- Consent tracking with timestamp at registration

---

## Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend | React 19 + Vite 5 | UI framework + fast HMR bundler |
| Styling | Tailwind CSS + Custom CSS | Utility-first + dark theme |
| Routing | React Router DOM v7 | Client-side SPA navigation |
| HTTP Client | Axios | JWT interceptor, auto-logout on 401 |
| Backend | Node.js + Express 4 | REST API server |
| Database | MongoDB Atlas + Mongoose 8 | NoSQL document store + ODM |
| Auth | jsonwebtoken + bcryptjs | Stateless JWT + password hashing |
| Security | Helmet + CORS + express-rate-limit | HTTP hardening |
| Validation | express-validator | Server-side input sanitization |
| Logging | Morgan + Custom Audit Logger | HTTP logs + HIPAA compliance |
| Testing | Jest + Supertest | API integration tests |
| CI/CD | GitHub Actions | Automated test + build pipeline |

---

## Project Structure

```
Healthcare-wellness-/
├── backend/
│   ├── src/
│   │   ├── server.js                 # Express app, middleware chain, route mounting
│   │   ├── middleware/
│   │   │   ├── auth.js               # JWT verify (protect) + role check (authorize)
│   │   │   ├── auditLogger.js        # HIPAA audit trail (non-blocking)
│   │   │   └── errorHandler.js       # Global error handler
│   │   ├── models/
│   │   │   ├── User.js               # Patient/Provider schema, bcrypt hooks
│   │   │   ├── Goal.js               # Wellness goals with compound indexes
│   │   │   ├── Reminder.js           # Preventive care with computedStatus()
│   │   │   └── AuditLog.js           # HIPAA compliance log schema
│   │   ├── routes/
│   │   │   ├── auth.js               # POST /register, /login, GET /me
│   │   │   ├── patients.js           # Profile, goals (upsert), reminders CRUD
│   │   │   ├── providers.js          # Patient list, compliance badges, detail
│   │   │   └── public.js             # Health info, privacy policy (no auth)
│   │   └── tests/
│   │       └── providers.test.js     # API integration tests
│   ├── .env                          # MONGO_URI, JWT_SECRET (not committed)
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                   # Route definitions + auth wrapper
│   │   ├── main.jsx                  # React entry point
│   │   ├── index.css                 # Global styles + dark theme
│   │   ├── api/
│   │   │   └── axiosClient.js        # Axios instance + JWT interceptor
│   │   ├── context/
│   │   │   └── AuthContext.jsx        # Global auth state (login/register/logout)
│   │   ├── components/
│   │   │   ├── Layout.jsx            # Sidebar + content wrapper
│   │   │   ├── Sidebar.jsx           # Navigation + logout
│   │   │   ├── ProtectedRoute.jsx    # Role-based route guard
│   │   │   ├── Button.jsx            # Reusable button component
│   │   │   ├── Card.jsx              # Glass-morphism card component
│   │   │   └── ProgressBar.jsx       # Animated progress bar
│   │   └── pages/
│   │       ├── Login.jsx             # Email/password login
│   │       ├── Register.jsx          # Registration with role + consent
│   │       ├── Dashboard.jsx         # Patient home: goals, reminders, tips
│   │       ├── Profile.jsx           # View/edit medical profile
│   │       ├── Goals.jsx             # Log & track wellness goals
│   │       ├── Messages.jsx          # Secure messaging UI
│   │       ├── PublicHealth.jsx      # Public health info page
│   │       ├── ProviderDashboard.jsx # Provider: patient list + compliance
│   │       └── PatientDetail.jsx     # Provider: individual patient view
│   └── package.json
│
├── .github/workflows/ci.yml         # CI: backend tests + frontend build
├── .gitignore
└── PROJECT_WALKTHROUGH.md            # Detailed technical walkthrough
```

---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/<your-username>/Healthcare-wellness-.git
cd Healthcare-wellness-
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create `backend/.env`:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/healthcare
JWT_SECRET=your-secret-key-here
PORT=5000
NODE_ENV=development
```

Start the backend:
```bash
npm run dev    # with hot reload (nodemon)
# or
npm start      # production
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

The app runs at:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### 4. Run Tests
```bash
cd backend
npm test
```

---

## API Endpoints

### Auth (`/api/auth`) — Public
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Create patient or provider account |
| POST | `/login` | Authenticate and receive JWT |
| GET | `/me` | Get current user (requires JWT) |

### Patient (`/api/patients`) — Requires JWT + role: patient
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/me` | Get own profile |
| PUT | `/me` | Update profile (whitelisted fields) |
| GET | `/goals` | Get wellness goals (filter by date/type) |
| POST | `/goals` | Log a goal (upserts same-day entries) |
| GET | `/reminders` | Get all reminders with computed status |
| POST | `/reminders` | Create a preventive care reminder |
| PUT | `/reminders/:id/status` | Mark reminder as met or missed |

### Provider (`/api/provider`) — Requires JWT + role: provider
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/patients` | List all patients with compliance badges |
| GET | `/patients/:id` | Patient detail (profile + goals + reminders) |
| GET | `/patients/:id/compliance` | Compliance summary with counts |

### Public (`/api/public`) — No auth required
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health-info` | Health tips, preventive care schedule, privacy policy |

---

## Architecture

```
Browser (React SPA)
    │
    │ Authorization: Bearer <JWT>
    │ (auto-attached by axios interceptor)
    ▼
Express Server (Port 5000)
    │
    ├─ Helmet (security headers)
    ├─ CORS (whitelist frontend origin)
    ├─ Rate Limiter (100 req / 15 min)
    ├─ Body Parser (10kb limit)
    ├─ Audit Logger (HIPAA trail)
    │
    ├─ /api/auth      →  JWT sign/verify
    ├─ /api/patients   →  protect() → authorize('patient')
    ├─ /api/provider   →  protect() → authorize('provider')
    ├─ /api/public     →  no middleware
    │
    └─ Error Handler (must be last)
          │
          ▼
    MongoDB Atlas
    ├── users       (patients + providers)
    ├── goals       (daily wellness metrics)
    ├── reminders   (preventive care tracking)
    └── auditlogs   (HIPAA compliance)
```

---

## MongoDB Schema Design

### Users Collection

Stores both patients and providers in a single collection, differentiated by the `role` field.

```javascript
{
  _id: ObjectId,
  // ── Core Identity ──
  name:          String (required, max 100),
  email:         String (required, unique, lowercase),
  password:      String (required, min 8, bcrypt hashed, NEVER returned in queries),
  role:          "patient" | "provider",

  // ── Patient Health Profile ──
  dateOfBirth:       Date,
  gender:            "male" | "female" | "other" | "",
  phone:             String (max 20),
  address:           String (max 200),
  bloodType:         String,
  allergies:         [String],              // e.g. ["Penicillin", "Pollen"]
  currentMedications:[String],              // e.g. ["Metformin 500mg", "Aspirin"]
  emergencyContact:  {
    name:         String,
    phone:        String,
    relationship: String
  },

  // ── Provider-Specific ──
  specialization:  String,
  licenseNumber:   String,

  // ── HIPAA Compliance ──
  consentGiven:  Boolean (required),        // must be true at registration
  consentDate:   Date,                      // timestamp when consent was given
  isActive:      Boolean (default: true),
  lastLogin:     Date,                      // updated on every login

  createdAt:     Date,                      // auto (Mongoose timestamps)
  updatedAt:     Date                       // auto (Mongoose timestamps)
}
// Index: { role: 1 }
```

### Goals Collection

Tracks daily wellness metrics. Uses **compound indexes** for fast per-user-per-day lookups and **upsert** to prevent duplicate entries.

```javascript
{
  _id:     ObjectId,
  userId:  ObjectId (ref: User, required),   // who logged this
  type:    "steps" | "water" | "sleep" | "calories" | "active_time",
  value:   Number (min: 0),                  // e.g. 5000 steps
  target:  Number,                           // e.g. 6000 steps goal
  unit:    String,                           // e.g. "steps", "glasses"
  date:    Date (default: midnight today),   // normalized to 00:00:00
  notes:   String,
  createdAt: Date,
  updatedAt: Date
}
// Indexes: { userId: 1, date: -1 }
//          { userId: 1, type: 1, date: -1 }  ← used for upsert
```

**Upsert logic:** When a patient logs the same goal type twice in one day, it **updates** the existing entry instead of creating a duplicate:
```javascript
Goal.findOneAndUpdate(
  { userId, type, date: midnightToday },   // find existing
  { value, target },                        // update values
  { upsert: true, new: true }              // create if not found
);
```

### Reminders Collection

Preventive care reminders with **computed status** — no cron jobs needed.

```javascript
{
  _id:         ObjectId,
  userId:      ObjectId (ref: User, required),
  title:       String (required),             // e.g. "Annual Blood Test"
  description: String,                        // e.g. "Fasting required"
  type:        "checkup" | "medication" | "vaccination" | "lab_test" | "custom",
  dueDate:     Date (required),
  status:      "upcoming" | "met" | "missed" (default: "upcoming"),
  createdBy:   ObjectId (ref: User),
  createdAt:   Date,
  updatedAt:   Date
}
// Index: { userId: 1, dueDate: 1 }
```

**computedStatus() method** — determines the real status at read time:
```javascript
// If manually marked "met" or "missed" → keep that status
// If still "upcoming" but dueDate has passed → return "missed"
// If still "upcoming" and dueDate is future → return "upcoming"
computedStatus() {
  if (this.status !== 'upcoming') return this.status;
  return new Date() > this.dueDate ? 'missed' : 'upcoming';
}
```

### AuditLogs Collection (HIPAA)

Automatically logs every sensitive write operation. Non-blocking — fires after the response is sent.

```javascript
{
  _id:        ObjectId,
  userId:     ObjectId (nullable),           // null for unauthenticated actions
  action:     String,                        // e.g. "POST /api/patients/goals"
  resource:   String,                        // e.g. "/api/patients/goals"
  ip:         String,                        // client IP address
  userAgent:  String,                        // browser/client identifier
  statusCode: Number,                        // HTTP response code
  createdAt:  Date
}
// Indexes: { userId: 1, createdAt: -1 }
//          { action: 1, createdAt: -1 }
```

### Entity Relationship

```
┌──────────┐       ┌──────────┐       ┌──────────────┐
│  Users   │──1:N──│  Goals   │       │  AuditLogs   │
│          │       └──────────┘       │  (auto-log)  │
│ patient  │                          └──────────────┘
│ provider │──1:N──┌──────────────┐
│          │       │  Reminders   │
└──────────┘       └──────────────┘

- One User (patient) → Many Goals
- One User (patient) → Many Reminders
- One User (any)     → Many AuditLogs (automatic)
- Provider reads patient data via /api/provider routes
```

---

## Authentication Flow

```
Registration                         Login
    │                                   │
    ▼                                   ▼
Validate inputs                   Validate inputs
Check duplicate email             Find user by email
Hash password (bcrypt 12)         Compare password (bcrypt)
Create user in MongoDB            Update lastLogin
Sign JWT { id, exp: 7d }          Sign JWT { id, exp: 7d }
    │                                   │
    └──────────┬────────────────────────┘
               ▼
    Return { token, user }
    Frontend stores in localStorage
               │
               ▼
    Every API call: axios interceptor
    attaches "Authorization: Bearer <token>"
               │
               ▼
    protect() middleware verifies token
    authorize() checks role
               │
               ▼
    Token expired? → 401 → axios catches
    → clear localStorage → redirect /login
```

---

## Deployment

### Backend → Render (Free Tier)
1. Connect GitHub repo on [render.com](https://render.com)
2. Settings: Root `backend`, Build `npm install`, Start `node src/server.js`
3. Add env vars: `MONGO_URI`, `JWT_SECRET`, `NODE_ENV=production`
4. Whitelist `0.0.0.0/0` in MongoDB Atlas → Network Access

### Frontend → Vercel (Free Tier)
1. Import repo on [vercel.com](https://vercel.com)
2. Settings: Root `frontend`, Framework `Vite`, Output `dist`
3. Update `axiosClient.js` baseURL to your Render backend URL
4. Update CORS origin in `backend/src/server.js` to your Vercel URL

---

## Security Measures

| Layer | Measure | Implementation |
|-------|---------|----------------|
| Password | bcrypt hash (12 rounds) | `User.js` pre-save hook |
| Auth | JWT with expiry | 7-day tokens, stateless verification |
| Transport | Helmet headers | CSP, HSTS, X-Frame-Options, etc. |
| Rate Limit | express-rate-limit | 100 global / 20 auth per 15 min |
| Input | express-validator | All routes validated server-side |
| CORS | Origin whitelist | Only frontend URL allowed |
| Body | Size limit | 10kb max JSON payload |
| Fields | Whitelist | PUT /me only allows safe fields |
| Audit | HIPAA logger | Every POST/PUT/DELETE auto-logged |
| Consent | Registration | Required checkbox + timestamp |
| Enumeration | Generic errors | "Invalid email or password" on login |

---

## Team

| Member | Role | Responsibilities |
|--------|------|-----------------|
| Member 1 | Frontend/UI | React pages, components, styling, responsive design |
| Member 2 | Backend/API | Express server, models, routes, middleware, auth, testing |
| Member 3 | Backend/Provider | Provider APIs, public routes, CI/CD pipeline |

---

## License

Built for the HCLTech Healthcare Hackathon 2026.

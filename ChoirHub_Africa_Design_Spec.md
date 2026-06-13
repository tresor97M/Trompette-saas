# ChoirHub Africa — Complete Design & Security Specification
> **Document Type:** Master Design & Architecture Reference  
> **Version:** 1.0 — Production Ready  
> **Audience:** Principal Architect · Senior Engineers · UX/UI Lead · DevSecOps  
> **Philosophy:** Build the Planning Center of Africa — scalable, secure, beautiful, gospel-driven.

---

## Table of Contents

1. [Product Vision & Positioning](#1-product-vision--positioning)
2. [Target Users & Personas](#2-target-users--personas)
3. [RBAC Permission System](#3-rbac-permission-system)
4. [Design System](#4-design-system)
5. [Information Architecture](#5-information-architecture)
6. [User Flows](#6-user-flows)
7. [Core Module Specifications](#7-core-module-specifications)
8. [Database Design](#8-database-design)
9. [API Architecture](#9-api-architecture)
10. [Security Architecture](#10-security-architecture)
11. [Multi-Tenancy Architecture](#11-multi-tenancy-architecture)
12. [Tech Stack Reference](#12-tech-stack-reference)
13. [Deployment Infrastructure](#13-deployment-infrastructure)
14. [Development Phases](#14-development-phases)
15. [Quality Assurance](#15-quality-assurance)
16. [Navigation & SEO](#16-navigation--seo)
17. [Launch & Maintenance Checklist](#17-launch--maintenance-checklist)

---

## 1. Product Vision & Positioning

### 1.1 Mission Statement

ChoirHub Africa is an intelligent, multi-tenant SaaS platform for choir and worship ministry management — built specifically for African churches, gospel choirs, and Christian organizations operating across francophone and anglophone contexts.

### 1.2 Core Problem Statement

| Pain Point | Current Reality | ChoirHub Africa Solution |
|---|---|---|
| Member tracking | WhatsApp groups, paper registers | Centralized digital profiles with voice-type classification |
| Attendance | Manual roll-call, unreliable data | QR code + mobile check-in with automated reporting |
| Song management | Shared Google Drive folders | Versioned song library with audio, PDF scores, and Bible references |
| Worship planning | Spreadsheets and emails | Drag-and-drop setlist builder with team assignments |
| Musician training | One-on-one or none | Structured courses with progress tracking and certificates |
| Communication | Multiple disconnected apps | Unified announcements, prayer requests, and internal messaging |
| Multi-campus management | Siloed systems | Full multi-tenancy with independent data and billing per church |

### 1.3 Competitive Positioning

```
Planning Center (US)   →   ChoirHub Africa adapts this model for African church culture
Church Center          →   Mobile-first engagement layer
Hillsong/Elevation     →   Aesthetic inspiration for worship-grade UI
Spotify                →   Song library UX model
Notion                 →   Flexible workspace metaphor for planning
Linear                 →   Engineering-grade UI precision and speed
```

### 1.4 Languages Supported

- **French** (primary — francophone Africa)
- **English** (secondary — anglophone Africa and diaspora)
- Architecture must support adding additional languages (Swahili, Lingala, Hausa, etc.) without refactoring.

---

## 2. Target Users & Personas

### Persona 1 — Choir Member (Marie-Joëlle, 24, Douala)

- Joins rehearsal twice a week after work
- Checks her schedule on her phone
- Wants to practice her soprano part at home
- Needs: Mobile attendance check-in · individual vocal track · rehearsal reminders

### Persona 2 — Choir Master (Pasteur Jean-Claude, 45, Abidjan)

- Manages 120 members across 4 vocal sections
- Needs attendance data every Sunday before service
- Leads discipline processes according to Matthew 18
- Needs: Dashboard · discipline module · attendance reports · WhatsApp notifications

### Persona 3 — Music Director (Esperanza, 31, Yaoundé)

- Composes bilingual worship songs in French and English
- Builds weekly setlists for Sunday services
- Coordinates 8 instrumentalists
- Needs: Song library · AI songwriting assistant · worship planner · musician assignments

### Persona 4 — Church Administrator (Sylvie, 38, Kinshasa)

- Manages billing, user access, and church branding
- Oversees multi-campus structure (3 campuses)
- Needs: Admin dashboard · RBAC controls · billing management · church settings

### Persona 5 — Senior Pastor (Rev. Dr. Mbeki, 56, Accra)

- Reads ministry reports monthly
- Approves worship strategy
- Needs: Executive analytics · prayer request summary · org chart view

---

## 3. RBAC Permission System

### 3.1 Role Hierarchy

```
Super Admin
    └── Church Admin
            ├── Pastor
            ├── Music Director
            │       ├── Choir Master
            │       │       ├── Section Leader
            │       │       │       └── Choir Member
            │       │       └── Instrumentalist
            │       └── Training Coordinator
            └── Guest
```

### 3.2 Permission Matrix

| Permission | Super Admin | Church Admin | Pastor | Music Director | Choir Master | Section Leader | Choir Member | Instrumentalist | Guest |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Manage all churches | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manage church settings | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Manage billing | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View all members | ✅ | ✅ | ✅ | ✅ | ✅ | 🔶 (section) | ❌ | ❌ | ❌ |
| Add/edit members | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Delete members | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View attendance | ✅ | ✅ | ✅ | ✅ | ✅ | 🔶 | 🔶 (own) | 🔶 (own) | ❌ |
| Mark attendance | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Manage song library | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View song library | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 🔶 |
| Create worship plans | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View worship plans | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Manage discipline records | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View own discipline record | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Create training courses | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Enroll in courses | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| Post announcements | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| View announcements | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Manage media | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| AI Songwriting access | ✅ | ✅ | ❌ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| View analytics dashboard | ✅ | ✅ | ✅ | 🔶 | 🔶 | ❌ | ❌ | ❌ | ❌ |
| Manage org chart | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

🔶 = Limited scope access

### 3.3 Role Assignment Rules

- A user can have only one role per church (no role stacking).
- A user can belong to multiple churches with different roles in each.
- Role changes are logged in an audit trail.
- Role downgrade requires confirmation and triggers automatic permission revocation.

---

## 4. Design System

### 4.1 Visual Identity

**Design Concept:** "Sacred Precision" — the aesthetic intersection of African gospel warmth and digital product excellence.

The signature element: a **golden harmonic waveform** — a subtle animated SVG audio waveform rendered in gold that acts as a decorative divider and loading indicator, evoking both music and divine resonance.

### 4.2 Color Palette

```css
/* Primary Brand */
--color-gold:        #C9A84C;   /* Gospel gold — primary accent */
--color-gold-light:  #E8C97B;   /* Hover states, highlights */
--color-gold-dark:   #8B6914;   /* Active states */

/* Neutral Dark (Dark Mode base) */
--color-midnight:    #0D0F14;   /* True background */
--color-surface:     #161922;   /* Card background */
--color-elevated:    #1E2230;   /* Elevated card / modal */
--color-border:      #2A2F3D;   /* Borders and dividers */

/* Neutral Light (Light Mode base) */
--color-parchment:   #F8F5EF;   /* Page background */
--color-paper:       #FFFFFF;   /* Card background */
--color-paper-alt:   #F1EDE6;   /* Alternating rows, subtle bg */
--color-border-lt:   #E2DDD6;   /* Light mode borders */

/* Semantic */
--color-success:     #3DAA6E;   /* Presence, completion */
--color-warning:     #E9A23B;   /* Late arrival, caution */
--color-danger:      #E05252;   /* Absence, discipline flag */
--color-info:        #4A8CE8;   /* Informational */

/* Text */
--color-text-primary:   #F0EDE8;   /* Dark mode primary text */
--color-text-secondary: #8E94A8;   /* Muted / labels */
--color-text-dark:      #1A1A2E;   /* Light mode primary text */
```

### 4.3 Typography

```css
/* Display — used for hero headings, module titles */
--font-display: 'Canela', 'Playfair Display', Georgia, serif;
/* Weight: 300 (Light) for large display, 700 (Bold) for emphasis */

/* Body — readable, neutral, works in French and English */
--font-body: 'Inter', 'DM Sans', system-ui, sans-serif;
/* Weight: 400 (Regular), 500 (Medium), 600 (SemiBold) */

/* Mono — code, IDs, QR references */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Type Scale

| Token | Size | Weight | Usage |
|---|---|---|---|
| `--text-hero` | 56px / 3.5rem | 300 | Landing hero |
| `--text-h1` | 36px / 2.25rem | 700 | Page titles |
| `--text-h2` | 28px / 1.75rem | 600 | Section headings |
| `--text-h3` | 22px / 1.375rem | 600 | Card titles |
| `--text-h4` | 18px / 1.125rem | 600 | Subsection labels |
| `--text-body-lg` | 17px / 1.0625rem | 400 | Lead paragraphs |
| `--text-body` | 15px / 0.9375rem | 400 | Default body |
| `--text-sm` | 13px / 0.8125rem | 400 | Captions, metadata |
| `--text-xs` | 11px / 0.6875rem | 500 | Labels, badges |

### 4.4 Spacing System (8px base)

```css
--space-1:  4px;
--space-2:  8px;
--space-3:  12px;
--space-4:  16px;
--space-5:  20px;
--space-6:  24px;
--space-8:  32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;
--space-20: 80px;
--space-24: 96px;
```

### 4.5 Component Tokens

```css
/* Border Radius */
--radius-sm:   6px;    /* Badges, chips */
--radius-md:   10px;   /* Inputs, buttons */
--radius-lg:   16px;   /* Cards */
--radius-xl:   24px;   /* Modals, drawers */
--radius-full: 9999px; /* Avatars, pills */

/* Shadows (Dark Mode) */
--shadow-sm:  0 1px 3px rgba(0,0,0,0.4);
--shadow-md:  0 4px 16px rgba(0,0,0,0.5);
--shadow-lg:  0 8px 32px rgba(0,0,0,0.6);
--shadow-gold: 0 0 20px rgba(201,168,76,0.2);

/* Transitions */
--transition-fast:   150ms ease;
--transition-normal: 250ms ease;
--transition-slow:   400ms ease;
```

### 4.6 Dark Mode / Light Mode

Toggle is persisted in `localStorage` and synced with OS preference via `prefers-color-scheme`.

```typescript
// Token switch example
:root[data-theme="dark"]  { --bg-page: var(--color-midnight); }
:root[data-theme="light"] { --bg-page: var(--color-parchment); }
```

### 4.7 Motion Design

```typescript
// Framer Motion — standard page entry
const pageVariants = {
  initial:   { opacity: 0, y: 12 },
  animate:   { opacity: 1, y: 0,  transition: { duration: 0.3, ease: 'easeOut' } },
  exit:      { opacity: 0, y: -8, transition: { duration: 0.2 } }
};

// Card hover micro-interaction
const cardHover = {
  whileHover: { scale: 1.015, boxShadow: 'var(--shadow-gold)' },
  transition:  { type: 'spring', stiffness: 400, damping: 25 }
};

// Stagger children (list items, dashboard cards)
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.07 } }
};
```

Rules:
- Respect `prefers-reduced-motion` — disable animations entirely when set.
- No animation longer than 400ms for navigation transitions.
- Waveform signature element plays on page load and on worship service completion.

### 4.8 Accessibility Standards

- WCAG 2.1 AA compliance minimum.
- All interactive elements reachable by keyboard (Tab order, focus rings).
- Color contrast ratio ≥ 4.5:1 for body text, ≥ 3:1 for large text.
- All images have descriptive `alt` attributes.
- ARIA roles and labels on all dynamic components (modals, toasts, dropdowns).
- Screen reader announcements on attendance check-in confirmation.

---

## 5. Information Architecture

### 5.1 Application Sitemap

```
ChoirHub Africa
├── Public / Marketing Site
│   ├── Home
│   ├── Features
│   ├── Pricing
│   ├── About
│   ├── Contact
│   └── Auth
│       ├── Sign In
│       ├── Register Church
│       └── Forgot Password
│
└── App (Authenticated)
    ├── Dashboard
    │   ├── Overview (KPI cards + charts)
    │   ├── Upcoming Events
    │   └── Prayer Requests Feed
    │
    ├── Members
    │   ├── Member List
    │   ├── Member Profile
    │   ├── Add Member
    │   └── Import Members (CSV)
    │
    ├── Attendance
    │   ├── Mark Attendance (QR / Manual)
    │   ├── Attendance History
    │   └── Reports (Weekly / Monthly / Annual)
    │
    ├── Songs
    │   ├── Song Library (Search + Filter)
    │   ├── Song Detail
    │   ├── Add Song
    │   └── AI Songwriting Assistant
    │
    ├── Worship Planner
    │   ├── Calendar View
    │   ├── Service Plan Builder (Drag & Drop)
    │   ├── Setlist Manager
    │   └── Team Assignments
    │
    ├── Vocal Harmonization
    │   ├── Voice Part Separation
    │   ├── Individual Track Players
    │   ├── Sheet Music Viewer
    │   └── MIDI Export
    │
    ├── Training Center
    │   ├── Course Catalog
    │   ├── My Courses
    │   ├── Course Player (video + quiz)
    │   └── My Certificates
    │
    ├── Discipline
    │   ├── Active Cases
    │   ├── Case Detail + Timeline
    │   ├── New Case
    │   └── Restored Members Archive
    │
    ├── Organization
    │   ├── Org Chart
    │   ├── Sections Management
    │   └── Role Assignments
    │
    ├── Media Center
    │   ├── Audio Files
    │   ├── Video Files
    │   ├── Sheet Music / PDFs
    │   └── Images
    │
    ├── Communication
    │   ├── Announcements
    │   ├── Prayer Requests
    │   ├── Internal Messages
    │   └── Event Reminders
    │
    ├── Analytics (Music Director / Pastor / Admin)
    │   ├── Growth Metrics
    │   ├── Attendance Trends
    │   └── Ministry Health Score
    │
    └── Settings
        ├── Church Profile
        ├── Branding
        ├── Users & Roles
        ├── Notifications
        ├── Billing & Subscription
        └── Security & Audit Log
```

### 5.2 Navigation Structure

**Sidebar Navigation (Desktop) — collapsed to icon rail on `<1280px`:**

```
[Logo + Church Name]
────────────────────
  Dashboard
  Members
  Attendance
  Songs
  Worship Planner
  Vocal Harmonization
  Training Center
────────────────────
  Discipline
  Communication
  Media Center
  Analytics
────────────────────
  Settings
  [User Avatar + Name]
```

**Bottom Tab Bar (Mobile — 5 primary tabs):**

```
Dashboard | Members | Attendance | Songs | More (→ full menu)
```

---

## 6. User Flows

### 6.1 Onboarding Flow — New Church Registration

```
Landing Page
    → "Register Your Church" CTA
        → Step 1: Church Details (name, country, campus count, denomination)
        → Step 2: Admin Account (name, email, phone, password)
        → Step 3: Choose Plan (Free Trial / Starter / Pro / Enterprise)
        → Step 4: Payment (Stripe — skip if Free Trial)
        → Step 5: Invite First Team Members (optional)
        → Dashboard (with empty-state onboarding checklist)
```

### 6.2 Attendance Flow — QR Check-In

```
Choir Master opens "Mark Attendance"
    → Generates session QR code (tied to event + timestamp)
        → Member opens app → scans QR
            → System confirms: "Present ✅ — Marie-Joëlle, 8:04 AM"
        → Manual override available for members without phones
    → End Session → auto-generates attendance report
    → Report sent via WhatsApp/Email to Choir Master
```

### 6.3 Worship Planning Flow

```
Music Director → "New Service Plan"
    → Set date, service type, campus
    → Search song library → drag songs to setlist
    → Assign vocal sections and instrumentalists per song
    → Set rehearsal dates and locations
    → Publish plan → all assigned members receive notification
    → On service day: live view mode (song-by-song presenter view)
```

### 6.4 AI Songwriting Flow

```
Music Director → "AI Songwriting Assistant"
    → Select song structure (Verse / Chorus / Bridge / All)
    → Input theme, scripture reference, language (FR / EN / Bilingual)
    → Select musical style (Contemporary Worship / Gospel / Hymn)
    → Generate lyrics → preview with Bible citation overlay
    → Edit inline → Save to Song Library
    → Optionally: generate SATB harmonization
```

### 6.5 Discipline Flow (Matthew 18 Process)

```
Choir Master → "New Discipline Case"
    → Select member → Describe incident (private, encrypted)
    → Step 1: Private conversation (logged)
    → Step 2: Witness meeting (2-3 leaders added)
    → Step 3: Leadership review
    → Decision: Restoration plan OR temporary suspension
    → Follow-up reminders scheduled automatically
    → Case closed → member restored → archived
```

---

## 7. Core Module Specifications

### 7.1 Dashboard

**KPI Cards (role-based):**

| Card | Roles | Data Source |
|---|---|---|
| Active Members | All Leaders | `members.status = ACTIVE` |
| Attendance Rate (last 30 days) | All Leaders | Aggregated attendance records |
| Upcoming Rehearsals | All | Events within 7 days |
| New Songs Added | Music Director+ | Song library created_at |
| Open Discipline Cases | Choir Master+ | Discipline cases status |
| Prayer Requests | All | Communication module |
| Ministry Growth (% MoM) | Admin / Pastor | Member count trend |

**Charts:**
- Attendance trend line chart (12-week rolling)
- Voice section distribution donut chart
- Training progress bar chart
- New member enrollment histogram

### 7.2 Member Profile — Complete Field Specification

```typescript
interface MemberProfile {
  // Identity
  id:               string;         // UUID
  firstName:        string;
  lastName:         string;
  displayName:      string;
  avatarUrl:        string | null;  // AWS S3

  // Contact
  email:            string;
  phone:            string;         // International format
  whatsappNumber:   string | null;
  address:          string | null;
  city:             string | null;
  country:          string;

  // Church Info
  churchId:         string;
  campusId:         string | null;
  dateJoined:       Date;
  membershipStatus: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'RESTORED';

  // Choir
  choirSection:     'SOPRANO' | 'ALTO' | 'TENOR' | 'BASS' | 'UNASSIGNED';
  voiceRange:       string | null;  // e.g., "C4–G5"
  sectionId:        string | null;
  role:             UserRole;

  // Personal
  birthday:         Date | null;
  gender:           'MALE' | 'FEMALE' | 'PREFER_NOT_TO_SAY';
  spiritualMentor:  string | null;  // Member ID reference
  emergencyContact: {
    name:     string;
    phone:    string;
    relation: string;
  } | null;

  // Metadata
  createdAt:        Date;
  updatedAt:        Date;
  createdBy:        string;        // Admin/Music Director ID
}
```

### 7.3 Song Library — Field Specification

```typescript
interface Song {
  id:             string;
  title:          string;
  titleTranslated: string | null;    // For bilingual songs
  author:         string;
  composer:       string | null;
  theme:          string[];          // Tags: ['Praise', 'Repentance', 'Communion']
  bibleReferences: string[];         // ['Psalm 150:1', 'Revelation 5:12']
  key:            string;            // 'G', 'Ab', 'F#m', etc.
  tempo:          number;            // BPM
  timeSignature:  string;            // '4/4', '3/4', '6/8'
  language:       'FR' | 'EN' | 'BILINGUAL' | 'OTHER';
  style:          'CONTEMPORARY' | 'GOSPEL' | 'HYMN' | 'TRADITIONAL';

  leadSinger:     string | null;     // Member ID
  sections:       SongSection[];     // SATB vocal parts

  // Media
  audioUrl:       string | null;     // AWS S3
  videoUrl:       string | null;
  pdfScoreUrl:    string | null;
  midiUrl:        string | null;

  // Meta
  dateCreated:    Date;
  createdBy:      string;
  churchId:       string;
  isAiGenerated:  boolean;
  usageCount:     number;            // Times used in worship plans
}
```

### 7.4 Training Center — Course Structure

```typescript
interface Course {
  id:           string;
  title:        string;
  titleFR:      string;
  description:  string;
  category:     'MUSIC_THEORY' | 'SIGHT_READING' | 'CONDUCTING' | 
                'VOCAL_TECHNIQUE' | 'PIANO' | 'GUITAR' | 'BASS' | 
                'DRUMS' | 'WORSHIP_THEOLOGY';
  level:        'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  modules:      CourseModule[];
  prerequisites: string[];           // Course IDs
  certificateId: string | null;
  durationHours: number;
  language:     'FR' | 'EN' | 'BOTH';
  createdBy:    string;
}

interface CourseModule {
  id:       string;
  title:    string;
  lessons:  Lesson[];
  quiz:     Quiz | null;
}

interface Lesson {
  id:       string;
  title:    string;
  type:     'VIDEO' | 'AUDIO' | 'TEXT' | 'INTERACTIVE';
  content:  string;                  // URL or HTML content
  duration: number;                  // seconds
}
```

---

## 8. Database Design

### 8.1 Multi-Tenancy Strategy

**Approach:** Shared database, separate schemas per church (PostgreSQL schema isolation).

```sql
-- Each church gets its own schema
CREATE SCHEMA church_a8f3b2;
CREATE SCHEMA church_c7d1e9;

-- Shared public schema for super admin tables
-- church_id foreign key on every tenant table
```

### 8.2 Core Prisma Models

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ─── CHURCH (TENANT) ──────────────────────────────────────

model Church {
  id            String   @id @default(uuid())
  name          String
  slug          String   @unique        // URL-safe identifier
  country       String
  city          String
  logoUrl       String?
  primaryColor  String   @default("#C9A84C")
  plan          PlanType @default(FREE_TRIAL)
  stripeCustomerId String?
  isActive      Boolean  @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  campuses      Campus[]
  users         User[]
  members       Member[]
  songs         Song[]
  events        Event[]
  songs         Song[]
  mediaFiles    MediaFile[]
  announcements Announcement[]
  courses       Course[]

  @@index([slug])
}

model Campus {
  id        String   @id @default(uuid())
  churchId  String
  name      String
  address   String?
  church    Church   @relation(fields: [churchId], references: [id])
  members   Member[]
  events    Event[]
}

// ─── USER & AUTH ───────────────────────────────────────────

model User {
  id            String    @id @default(uuid())
  churchId      String
  email         String    @unique
  passwordHash  String?
  googleId      String?   @unique
  microsoftId   String?   @unique
  role          UserRole  @default(CHOIR_MEMBER)
  isActive      Boolean   @default(true)
  lastLoginAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  church        Church    @relation(fields: [churchId], references: [id])
  member        Member?
  auditLogs     AuditLog[]
  messages      Message[]

  @@index([churchId, email])
}

enum UserRole {
  SUPER_ADMIN
  CHURCH_ADMIN
  PASTOR
  MUSIC_DIRECTOR
  CHOIR_MASTER
  SECTION_LEADER
  CHOIR_MEMBER
  INSTRUMENTALIST
  TRAINING_COORDINATOR
  GUEST
}

enum PlanType {
  FREE_TRIAL
  STARTER
  PRO
  ENTERPRISE
}

// ─── MEMBER ────────────────────────────────────────────────

model Member {
  id               String          @id @default(uuid())
  churchId         String
  campusId         String?
  userId           String?         @unique
  firstName        String
  lastName         String
  email            String?
  phone            String?
  whatsappNumber   String?
  address          String?
  city             String?
  country          String
  birthday         DateTime?
  gender           Gender          @default(PREFER_NOT_TO_SAY)
  avatarUrl        String?

  choirSection     ChoirSection    @default(UNASSIGNED)
  voiceRange       String?
  sectionId        String?

  spiritualMentorId String?
  emergencyContact Json?

  membershipStatus MemberStatus    @default(ACTIVE)
  dateJoined       DateTime        @default(now())
  createdAt        DateTime        @default(now())
  updatedAt        DateTime        @updatedAt

  church           Church          @relation(fields: [churchId], references: [id])
  campus           Campus?         @relation(fields: [campusId], references: [id])
  user             User?           @relation(fields: [userId], references: [id])
  section          Section?        @relation(fields: [sectionId], references: [id])
  attendances      Attendance[]
  disciplineCases  DisciplineCase[]
  trainingProgress TrainingProgress[]

  @@index([churchId, choirSection])
}

enum ChoirSection {
  SOPRANO
  ALTO
  TENOR
  BASS
  UNASSIGNED
}

enum MemberStatus {
  ACTIVE
  INACTIVE
  SUSPENDED
  RESTORED
}

enum Gender {
  MALE
  FEMALE
  PREFER_NOT_TO_SAY
}

// ─── ATTENDANCE ────────────────────────────────────────────

model Event {
  id          String      @id @default(uuid())
  churchId    String
  campusId    String?
  title       String
  type        EventType
  startTime   DateTime
  endTime     DateTime
  location    String?
  qrToken     String?     @unique    // Used for QR check-in
  qrExpiresAt DateTime?
  createdAt   DateTime    @default(now())

  church      Church      @relation(fields: [churchId], references: [id])
  campus      Campus?     @relation(fields: [campusId], references: [id])
  attendances Attendance[]
  servicePlans ServicePlan[]

  @@index([churchId, startTime])
}

enum EventType {
  REHEARSAL
  SUNDAY_SERVICE
  SPECIAL_EVENT
  TRAINING
  PRAYER_MEETING
}

model Attendance {
  id         String           @id @default(uuid())
  eventId    String
  memberId   String
  status     AttendanceStatus @default(PRESENT)
  checkedInAt DateTime?
  method     CheckInMethod    @default(MANUAL)
  note       String?
  createdAt  DateTime         @default(now())

  event      Event  @relation(fields: [eventId], references: [id])
  member     Member @relation(fields: [memberId], references: [id])

  @@unique([eventId, memberId])
  @@index([eventId])
  @@index([memberId])
}

enum AttendanceStatus {
  PRESENT
  ABSENT
  LATE
  EXCUSED
}

enum CheckInMethod {
  QR_CODE
  MOBILE
  MANUAL
}

// ─── SONGS ─────────────────────────────────────────────────

model Song {
  id              String   @id @default(uuid())
  churchId        String
  title           String
  titleFR         String?
  author          String
  composer        String?
  themes          String[]
  bibleReferences String[]
  key             String?
  tempo           Int?
  timeSignature   String?
  language        SongLanguage @default(EN)
  style           SongStyle

  leadSingerId    String?
  audioUrl        String?
  videoUrl        String?
  pdfScoreUrl     String?
  midiUrl         String?
  isAiGenerated   Boolean  @default(false)
  usageCount      Int      @default(0)

  createdBy       String
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  church          Church   @relation(fields: [churchId], references: [id])
  setlistSongs    SetlistSong[]

  @@index([churchId, language])
  @@index([churchId, themes])
}

enum SongLanguage {
  FR
  EN
  BILINGUAL
  OTHER
}

enum SongStyle {
  CONTEMPORARY
  GOSPEL
  HYMN
  TRADITIONAL
}

// ─── WORSHIP PLANNING ──────────────────────────────────────

model ServicePlan {
  id          String   @id @default(uuid())
  churchId    String
  eventId     String
  title       String
  notes       String?
  publishedAt DateTime?
  createdBy   String
  createdAt   DateTime @default(now())

  event       Event        @relation(fields: [eventId], references: [id])
  setlist     SetlistSong[]
  assignments TeamAssignment[]
}

model SetlistSong {
  id            String   @id @default(uuid())
  servicePlanId String
  songId        String
  order         Int
  key           String?
  notes         String?

  servicePlan   ServicePlan @relation(fields: [servicePlanId], references: [id])
  song          Song        @relation(fields: [songId], references: [id])
}

model TeamAssignment {
  id            String   @id @default(uuid())
  servicePlanId String
  memberId      String
  role          String   // e.g., "Lead Vocalist", "Drummer"
  servicePlan   ServicePlan @relation(fields: [servicePlanId], references: [id])
}

// ─── DISCIPLINE ────────────────────────────────────────────

model DisciplineCase {
  id          String          @id @default(uuid())
  churchId    String
  memberId    String
  status      DisciplineStatus @default(OPEN)
  description String          // Encrypted at rest
  step        Int             @default(1)   // 1=Private, 2=Witnesses, 3=Leadership
  resolution  String?
  openedAt    DateTime        @default(now())
  closedAt    DateTime?
  createdBy   String

  member      Member          @relation(fields: [memberId], references: [id])
  followUps   DisciplineFollowUp[]
}

enum DisciplineStatus {
  OPEN
  IN_PROGRESS
  SUSPENDED
  RESTORED
  CLOSED
}

model DisciplineFollowUp {
  id       String   @id @default(uuid())
  caseId   String
  note     String
  dueDate  DateTime?
  doneAt   DateTime?
  createdBy String
  createdAt DateTime @default(now())

  case     DisciplineCase @relation(fields: [caseId], references: [id])
}

// ─── TRAINING ──────────────────────────────────────────────

model Course {
  id           String        @id @default(uuid())
  churchId     String
  title        String
  titleFR      String
  description  String
  category     CourseCategory
  level        CourseLevel
  durationHours Float
  language     SongLanguage
  createdBy    String
  createdAt    DateTime      @default(now())

  church       Church        @relation(fields: [churchId], references: [id])
  modules      CourseModule[]
  progress     TrainingProgress[]
}

model TrainingProgress {
  id        String   @id @default(uuid())
  courseId  String
  memberId  String
  percent   Float    @default(0)
  completedAt DateTime?

  course    Course  @relation(fields: [courseId], references: [id])
  member    Member  @relation(fields: [memberId], references: [id])

  @@unique([courseId, memberId])
}

enum CourseCategory {
  MUSIC_THEORY
  SIGHT_READING
  CONDUCTING
  VOCAL_TECHNIQUE
  PIANO
  GUITAR
  BASS
  DRUMS
  WORSHIP_THEOLOGY
}

enum CourseLevel {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

// ─── COMMUNICATION ─────────────────────────────────────────

model Announcement {
  id          String   @id @default(uuid())
  churchId    String
  title       String
  body        String
  targetRoles UserRole[]
  publishedAt DateTime @default(now())
  createdBy   String

  church      Church   @relation(fields: [churchId], references: [id])
}

model PrayerRequest {
  id          String   @id @default(uuid())
  churchId    String
  memberId    String
  content     String
  isAnonymous Boolean  @default(false)
  status      String   @default("OPEN")
  createdAt   DateTime @default(now())
}

model Message {
  id          String   @id @default(uuid())
  senderId    String
  recipientId String
  content     String
  readAt      DateTime?
  createdAt   DateTime @default(now())

  sender      User     @relation(fields: [senderId], references: [id])
}

// ─── MEDIA ─────────────────────────────────────────────────

model MediaFile {
  id        String    @id @default(uuid())
  churchId  String
  name      String
  type      MediaType
  url       String
  sizeBytes Int
  uploadedBy String
  createdAt DateTime  @default(now())

  church    Church    @relation(fields: [churchId], references: [id])
}

enum MediaType {
  AUDIO
  VIDEO
  IMAGE
  PDF
  DOCUMENT
}

// ─── AUDIT LOG ─────────────────────────────────────────────

model AuditLog {
  id        String   @id @default(uuid())
  userId    String
  action    String
  resource  String
  resourceId String?
  metadata  Json?
  ip        String?
  createdAt DateTime @default(now())

  user      User     @relation(fields: [userId], references: [id])

  @@index([userId, createdAt])
}
```

---

## 9. API Architecture

### 9.1 REST API Structure (NestJS)

```
/api/v1/
├── auth/
│   ├── POST   /login
│   ├── POST   /register
│   ├── POST   /logout
│   ├── POST   /refresh
│   ├── GET    /google          (OAuth)
│   └── GET    /microsoft       (OAuth)
│
├── churches/
│   ├── POST   /                (Super Admin only)
│   ├── GET    /:id
│   ├── PATCH  /:id
│   └── GET    /:id/stats
│
├── members/
│   ├── GET    /                (paginated, filtered)
│   ├── POST   /
│   ├── GET    /:id
│   ├── PATCH  /:id
│   ├── DELETE /:id
│   └── POST   /import          (CSV bulk import)
│
├── attendance/
│   ├── GET    /events
│   ├── POST   /events
│   ├── GET    /events/:id
│   ├── POST   /events/:id/checkin         (QR / manual)
│   ├── GET    /events/:id/report
│   └── GET    /reports                   (aggregated)
│
├── songs/
│   ├── GET    /                (search + filter)
│   ├── POST   /
│   ├── GET    /:id
│   ├── PATCH  /:id
│   ├── DELETE /:id
│   └── POST   /ai/generate               (AI songwriting)
│
├── worship-plans/
│   ├── GET    /
│   ├── POST   /
│   ├── GET    /:id
│   ├── PATCH  /:id
│   ├── PATCH  /:id/setlist                (reorder songs)
│   ├── POST   /:id/assignments
│   └── POST   /:id/publish
│
├── training/
│   ├── GET    /courses
│   ├── POST   /courses
│   ├── GET    /courses/:id
│   ├── POST   /courses/:id/enroll
│   ├── PATCH  /progress/:id
│   └── GET    /certificates/:memberId
│
├── discipline/
│   ├── GET    /cases
│   ├── POST   /cases
│   ├── GET    /cases/:id
│   ├── PATCH  /cases/:id
│   └── POST   /cases/:id/followups
│
├── communication/
│   ├── GET    /announcements
│   ├── POST   /announcements
│   ├── GET    /prayer-requests
│   ├── POST   /prayer-requests
│   ├── GET    /messages
│   └── POST   /messages
│
├── media/
│   ├── GET    /
│   ├── POST   /upload           (multipart, → S3)
│   └── DELETE /:id
│
└── analytics/
    ├── GET    /dashboard
    ├── GET    /attendance-trends
    ├── GET    /growth
    └── GET    /ministry-health
```

### 9.2 WebSocket Events (Real-Time)

```typescript
// Server → Client events
'attendance:checked-in'     // Member scanned QR
'announcement:new'          // New announcement published
'message:received'          // New internal message
'discipline:updated'        // Case status changed
'worship-plan:published'    // Service plan published

// Client → Server events
'presence:active'           // User is online
'attendance:scan'           // QR code scanned
'message:send'              // Send a message
```

### 9.3 Authentication Flow

```
1. User submits credentials → POST /auth/login
2. Server validates → generates:
   - Access Token (JWT, 15 min TTL)
   - Refresh Token (HTTP-only cookie, 7 days)
3. Client stores Access Token in memory (NOT localStorage)
4. Every request: Bearer token in Authorization header
5. Token expiry → silent refresh via /auth/refresh
6. On logout → Refresh Token invalidated server-side (allowlist pattern)
```

---

## 10. Security Architecture

> This section is the answer to: *"Recherchez des mesures de sécurité telles que les certificats SSL, les pare-feu et l'analyse des logiciels malveillants."*

### 10.1 SSL / TLS (HTTPS Everywhere)

**Implementation:**

```nginx
# nginx.conf — TLS Configuration
server {
  listen 443 ssl http2;
  server_name app.choirhub.africa;

  ssl_certificate     /etc/letsencrypt/live/choirhub.africa/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/choirhub.africa/privkey.pem;

  ssl_protocols       TLSv1.2 TLSv1.3;
  ssl_ciphers         ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384;
  ssl_prefer_server_ciphers on;
  ssl_session_cache   shared:SSL:10m;
  ssl_session_timeout 1d;

  # HSTS (1 year, includes subdomains)
  add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;

  # Redirect HTTP to HTTPS
  return 301 https://$host$request_uri;
}

server {
  listen 80;
  return 301 https://$host$request_uri;
}
```

**Certificate Management:**
- **Provider:** Let's Encrypt (free) via Certbot, with auto-renewal via cron.
- **Wildcard cert:** `*.choirhub.africa` covers all church subdomains.
- **Certificate monitoring:** Alert 30 days before expiry via AWS SNS.
- **Pinning:** No certificate pinning (mobile app) — breaks renewal; use HPKP alternatives.

### 10.2 Firewall Configuration (AWS + Application Layer)

**Layer 1 — AWS Security Groups:**

```
Inbound Rules:
  Port 443 (HTTPS)     → 0.0.0.0/0 (public)
  Port 80  (HTTP)      → 0.0.0.0/0 (redirect to HTTPS)
  Port 22  (SSH)       → Admin IP whitelist ONLY
  Port 5432 (PostgreSQL) → Application server SG only (never public)
  Port 6379 (Redis)    → Application server SG only

Outbound Rules:
  All traffic          → 0.0.0.0/0 (for external APIs: Stripe, WhatsApp, etc.)
```

**Layer 2 — AWS WAF (Web Application Firewall):**

```yaml
# WAF Rules
Rules:
  - Name: AWSManagedRulesCommonRuleSet
    Priority: 1
    Action: Block
    Scope: Managed

  - Name: AWSManagedRulesKnownBadInputsRuleSet
    Priority: 2
    Action: Block

  - Name: AWSManagedRulesSQLiRuleSet
    Priority: 3
    Action: Block

  - Name: AWSManagedRulesXSSRuleSet
    Priority: 4
    Action: Block

  - Name: RateLimitRule
    Priority: 5
    RateLimit: 2000 requests per 5 minutes per IP
    Action: Block

  - Name: BotControlRule
    Priority: 6
    Action: Challenge (CAPTCHA for suspicious bots)
```

**Layer 3 — NestJS Application Guards:**

```typescript
// Rate limiting per endpoint
@UseGuards(ThrottlerGuard)
@Throttle({ default: { ttl: 60000, limit: 100 } })
@Controller('auth')
export class AuthController { ... }

// Specific endpoint tighter limits
@Throttle({ default: { ttl: 60000, limit: 5 } })
@Post('login')
async login() { ... }
```

**Layer 4 — CORS Configuration:**

```typescript
// main.ts
app.enableCors({
  origin: [
    'https://app.choirhub.africa',
    'https://admin.choirhub.africa',
    /\.choirhub\.africa$/      // All church subdomains
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400,
});
```

### 10.3 Malware Scanning & File Upload Security

Every file upload goes through a multi-stage scanning pipeline before storage.

```
User uploads file
       │
       ▼
┌─────────────────────────┐
│  Stage 1: Validation    │
│  - MIME type check      │  Reject if MIME ≠ declared extension
│  - File size limit      │  Audio ≤100MB · Video ≤500MB · PDF ≤20MB
│  - File extension whitelist │
└─────────────────────────┘
       │
       ▼
┌─────────────────────────┐
│  Stage 2: Magic Bytes   │
│  - Read file header     │  Detect disguised executables
│  - Reject mismatch      │  (e.g., .exe renamed to .pdf)
└─────────────────────────┘
       │
       ▼
┌─────────────────────────┐
│  Stage 3: ClamAV Scan   │
│  - Antivirus scan       │  ClamAV Docker sidecar
│  - Real-time virus DB   │  Updated daily
│  - Quarantine on detect │
└─────────────────────────┘
       │
       ▼
┌─────────────────────────┐
│  Stage 4: AWS S3 Upload │
│  - Temp bucket first    │  Never directly to production
│  - Server-side encrypt  │  AES-256 (SSE-S3)
│  - Promote to prod bucket│ Only after all checks pass
└─────────────────────────┘
       │
       ▼
  Secure URL returned (pre-signed, TTL-limited)
```

```typescript
// File upload guard implementation
@Injectable()
export class FileSecurityGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const file = request.file;

    if (!file) return false;

    // 1. Extension whitelist
    const allowed = ['pdf','mp3','mp4','wav','jpg','jpeg','png','mid','midi'];
    const ext = path.extname(file.originalname).slice(1).toLowerCase();
    if (!allowed.includes(ext)) throw new BadRequestException('File type not allowed');

    // 2. Magic bytes check
    const magicBytes = file.buffer.slice(0, 8);
    if (!isValidMagicBytes(magicBytes, ext)) {
      throw new BadRequestException('File content does not match declared type');
    }

    // 3. ClamAV scan
    const scanResult = await this.clamavService.scan(file.buffer);
    if (scanResult.isInfected) {
      await this.alertService.notifyAdmin('Malware detected in upload', scanResult);
      throw new BadRequestException('File failed security scan');
    }

    return true;
  }
}
```

### 10.4 Data Encryption

**At Rest:**

```typescript
// PostgreSQL — sensitive fields encrypted with AES-256
// Using @prisma/client + custom encryption middleware
const encryptedFields = [
  'discipline_cases.description',   // Pastoral confidentiality
  'members.emergencyContact',
  'users.passwordHash',             // bcrypt hashed (not encrypted)
];

// Encryption key rotation: quarterly via AWS KMS
// Key ID stored in environment, never in code
```

**In Transit:**
- TLS 1.3 for all API traffic.
- S3 pre-signed URLs (15-minute TTL) for media access.
- Database connections use SSL (`?sslmode=require` in connection string).
- Internal service-to-service calls use mTLS.

**Passwords:**
```typescript
// bcrypt with cost factor 12
import * as bcrypt from 'bcryptjs';
const hash = await bcrypt.hash(password, 12);
```

### 10.5 Authentication Security

```typescript
// JWT Configuration
const jwtConfig = {
  secret: process.env.JWT_SECRET,           // 256-bit random, stored in AWS Secrets Manager
  accessTokenTTL: '15m',
  refreshTokenTTL: '7d',
  algorithm: 'HS256',
};

// Refresh Token Rotation
// - Each refresh generates a new refresh token
// - Old refresh token is immediately invalidated (stored in Redis blocklist)
// - Concurrent refresh detection triggers logout of all sessions

// Session Management
// - Active sessions stored in Redis with TTL
// - Suspicious login (new country/device) triggers email alert
// - Max 5 concurrent sessions per user
```

### 10.6 SQL Injection Prevention

- **Prisma ORM** with parameterized queries by default — no raw SQL without explicit sanitization.
- **Input validation** via `class-validator` decorators on all DTOs:

```typescript
export class CreateMemberDto {
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-zA-ZÀ-ÿ\s'-]+$/)       // Names only — no SQL characters
  firstName: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber()
  phone: string;
}
```

### 10.7 Security Headers

```typescript
// NestJS Helmet middleware
import helmet from 'helmet';

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc:  ["'self'"],
      scriptSrc:   ["'self'", "'nonce-{NONCE}'"],
      styleSrc:    ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      imgSrc:      ["'self'", 'data:', '*.amazonaws.com'],
      connectSrc:  ["'self'", 'wss://app.choirhub.africa'],
      fontSrc:     ["'self'", 'https://fonts.gstatic.com'],
      objectSrc:   ["'none'"],
      frameSrc:    ["'none'"],
    },
  },
  hsts:               { maxAge: 31536000, includeSubDomains: true },
  xFrameOptions:      { action: 'DENY' },
  xContentTypeOptions: true,
  referrerPolicy:     { policy: 'strict-origin-when-cross-origin' },
  permissionsPolicy:  { features: { camera: ['none'], microphone: ['none'] } },
}));
```

### 10.8 Audit Trail

Every sensitive action is logged with full context:

```typescript
interface AuditEvent {
  userId:     string;
  action:     string;        // 'MEMBER_DELETED', 'ROLE_CHANGED', 'DISCIPLINE_OPENED'
  resource:   string;        // 'Member', 'User', 'DisciplineCase'
  resourceId: string;
  before:     object | null; // State before change
  after:      object | null; // State after change
  ip:         string;
  userAgent:  string;
  timestamp:  Date;
}
```

Audit logs are:
- Stored in a separate, append-only table.
- Exported monthly to S3 (encrypted, Glacier storage class).
- Retained for 7 years (compliance).
- Never deletable by Church Admin or below — Super Admin only.

### 10.9 GDPR / Data Privacy (African Context)

Although GDPR is EU law, ChoirHub Africa follows its principles as best practice and to enable EU church adoption:

- **Right to erasure:** Soft-delete members → anonymize PII after 30 days.
- **Data portability:** Church Admin can export all church data as JSON/CSV at any time.
- **Privacy by design:** No PII in logs or error messages.
- **Data residency:** African churches: data hosted in AWS `af-south-1` (Cape Town).
- **Cookie consent:** GDPR-compliant consent banner on marketing site.

### 10.10 Backup & Disaster Recovery

```yaml
Backup Strategy:
  Database (PostgreSQL):
    - Automated daily snapshots via AWS RDS
    - Point-in-time recovery (up to 35 days)
    - Cross-region backup: af-south-1 → eu-west-1
    - RPO (Recovery Point Objective): 1 hour
    - RTO (Recovery Time Objective): 4 hours

  Media Files (S3):
    - S3 Versioning enabled on all buckets
    - Cross-region replication to secondary bucket
    - 30-day version retention

  Application:
    - Infrastructure-as-Code (Terraform) stored in Git
    - Docker images in AWS ECR (tagged, immutable)
    - Deployment rollback in < 5 minutes via ECS task revision

  Monitoring:
    - AWS CloudWatch for infrastructure
    - Sentry for application errors
    - PagerDuty for critical alerts (15 min response SLA)
    - Uptime monitoring: checks every 60 seconds
```

---

## 11. Multi-Tenancy Architecture

### 11.1 Tenant Isolation Strategy

```
Request → API Gateway
    → Extract JWT → decode churchId
    → All Prisma queries automatically scoped to churchId
    → No cross-tenant data leakage possible via code
    → Database: row-level security as additional safety net
```

### 11.2 Subdomain Routing

```
app.choirhub.africa          → App shell (login redirects to church)
{slug}.choirhub.africa       → Direct church access (e.g., ebgc.choirhub.africa)
admin.choirhub.africa        → Super Admin console
api.choirhub.africa          → API (all tenants, scoped by JWT)
```

### 11.3 Custom Branding per Church

Each church configures via Settings → Branding:

```typescript
interface ChurchBranding {
  logoUrl:        string;
  primaryColor:   string;    // CSS hex
  accentColor:    string;
  splashImageUrl: string | null;
  emailFromName:  string;    // "Eglise Biblique de Grâce"
  emailFromAddr:  string;    // "noreply@ebgc.choirhub.africa"
  customDomain:   string | null;  // "chœur.ebgc.cm"
}
```

---

## 12. Tech Stack Reference

### 12.1 Complete Technology Map

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Frontend Framework | Next.js | 15 | SSR + App Router |
| UI Library | React | 19 | Component tree |
| Language | TypeScript | 5.x | Type safety |
| Styling | TailwindCSS | 3.4 | Utility-first CSS |
| Component Library | shadcn/ui | Latest | Accessible components |
| Animation | Framer Motion | 11 | Smooth UI animation |
| State Management | Zustand | 4 | Global state |
| Data Fetching | TanStack Query | 5 | Server state, caching |
| Forms | React Hook Form + Zod | Latest | Typed form validation |
| Backend Framework | NestJS | 10 | Modular Node.js API |
| ORM | Prisma | 5 | Type-safe DB client |
| Database | PostgreSQL | 16 | Relational data |
| Cache / Sessions | Redis | 7 | Refresh tokens, sessions |
| Auth | JWT + Passport.js | Latest | Authentication |
| File Storage | AWS S3 | SDK v3 | Media files |
| CDN | AWS CloudFront | — | Static assets + media |
| Email | AWS SES / Resend | Latest | Transactional email |
| SMS | Africa's Talking | v2 | African SMS delivery |
| WhatsApp | WhatsApp Business API | v18 | Notifications |
| Payments | Stripe | Latest | Subscriptions + billing |
| Search | Meilisearch | Latest | Full-text song search |
| AI | Claude API / OpenAI | Latest | Songwriting assistant |
| Realtime | Socket.IO | 4 | WebSocket events |
| Testing | Jest + Cypress | Latest | Unit + E2E |
| CI/CD | GitHub Actions | — | Automated pipelines |
| Containers | Docker + Docker Compose | Latest | Containerization |
| Orchestration | AWS ECS Fargate | — | Serverless containers |
| Infrastructure | Terraform | 1.7 | Infrastructure as Code |
| Monitoring | AWS CloudWatch + Sentry | — | Observability |
| Malware Scan | ClamAV | 1.x | File security |
| WAF | AWS WAF | v2 | Web Application Firewall |
| Secrets | AWS Secrets Manager | — | Keys and credentials |

---

## 13. Deployment Infrastructure

### 13.1 AWS Architecture

```
Internet
    │
    ▼
Route 53 (DNS)
    │
    ▼
CloudFront (CDN + WAF)
    │
    ├──→ S3 (static Next.js export / media files)
    │
    └──→ Application Load Balancer
              │
              ├──→ ECS Fargate (Next.js frontend containers)
              │         ├── Task: nextjs-app (2 vCPU, 4GB RAM)
              │         └── Auto-scaling: 2–20 tasks
              │
              └──→ ECS Fargate (NestJS API containers)
                        ├── Task: nestjs-api (2 vCPU, 4GB RAM)
                        └── Auto-scaling: 2–20 tasks

              Data Layer:
              ├── RDS PostgreSQL (Multi-AZ, db.t3.medium → db.r5.large)
              ├── ElastiCache Redis (cache.t3.micro → cache.r6g.large)
              ├── S3 Buckets (media, backups, exports)
              └── Secrets Manager (all credentials)
```

### 13.2 GitHub Actions CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
name: ChoirHub Africa — Deploy

on:
  push:
    branches: [main, staging]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run unit tests
        run: |
          npm ci
          npm run test:ci
      - name: Run E2E tests (headless)
        run: npm run test:e2e

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Trivy vulnerability scan (Docker image)
        uses: aquasecurity/trivy-action@master
      - name: OWASP Dependency Check
        run: npm audit --audit-level=high

  build-and-push:
    needs: [test, security-scan]
    runs-on: ubuntu-latest
    steps:
      - name: Build Docker images
        run: |
          docker build -t choirhub/frontend:${{ github.sha }} ./frontend
          docker build -t choirhub/api:${{ github.sha }} ./backend
      - name: Push to AWS ECR
        run: |
          aws ecr get-login-password | docker login --username AWS --password-stdin $ECR_URI
          docker push $ECR_URI/choirhub/frontend:${{ github.sha }}
          docker push $ECR_URI/choirhub/api:${{ github.sha }}

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Run Prisma migrations
        run: npx prisma migrate deploy
      - name: Update ECS service (zero-downtime)
        run: |
          aws ecs update-service \
            --cluster choirhub-production \
            --service choirhub-api \
            --force-new-deployment
      - name: Smoke test
        run: curl --fail https://api.choirhub.africa/health
```

---

## 14. Development Phases

| Phase | Deliverable | Duration |
|---|---|---|
| Phase 1 | PRD + Stakeholder Validation | Week 1 |
| Phase 2 | Information Architecture + Sitemap | Week 1 |
| Phase 3 | User Flows + Wireframes | Week 2 |
| Phase 4 | Database Design + Prisma Schema | Week 2 |
| Phase 5 | Design System + UI Component Library | Week 3–4 |
| Phase 6 | Frontend — Auth, Dashboard, Members, Attendance | Week 5–7 |
| Phase 7 | Backend — NestJS API, Auth, Core Modules | Week 5–7 |
| Phase 8 | Song Library + AI Songwriting + Vocal Harmonization | Week 8–9 |
| Phase 9 | Worship Planner + Training + Discipline | Week 10–11 |
| Phase 10 | Communication + Analytics + Media | Week 12 |
| Phase 11 | Multi-tenancy + Billing (Stripe) | Week 13 |
| Phase 12 | Testing (Unit + E2E + Security Penetration) | Week 14–15 |
| Phase 13 | Deployment Infrastructure + CI/CD | Week 16 |
| Phase 14 | Beta Launch (5 pilot churches) | Week 17 |
| Phase 15 | Public Launch | Week 18+ |

---

## 15. Quality Assurance

### 15.1 Testing Strategy

```typescript
// Unit Tests — Jest (target: 80% coverage)
describe('AttendanceService', () => {
  it('should mark member as PRESENT on valid QR scan', async () => { ... });
  it('should mark member as LATE if scan > 15 min after event start', async () => { ... });
  it('should reject expired QR token', async () => { ... });
});

// Integration Tests — Jest + Supertest
describe('POST /api/v1/songs', () => {
  it('should require Music Director role or above', async () => { ... });
  it('should reject upload without valid JWT', async () => { ... });
});

// E2E Tests — Cypress
it('Choir member can check in via QR code', () => {
  cy.visit('/attendance');
  cy.get('[data-testid="qr-scanner"]').should('be.visible');
  cy.scanQR(mockQRToken);
  cy.get('[data-testid="checkin-success"]').should('contain', 'Present ✅');
});
```

### 15.2 Security Testing

- **Penetration testing** (OWASP Top 10) before production launch.
- **Dependency audit:** `npm audit` in CI, blocking on `high` severity.
- **SAST (Static Analysis):** ESLint security plugin, Semgrep in CI.
- **DAST:** OWASP ZAP automated scan against staging environment weekly.
- **Secrets scanning:** GitGuardian on all commits (prevent API key leaks).

---

## 16. Navigation & SEO

### 16.1 Public Site Navigation

```
Primary Nav:
  Home | Features | Pricing | Resources | Sign In | [Start Free Trial →]

Footer:
  Product: Features · Pricing · Changelog · Roadmap
  Support: Documentation · Help Center · Contact
  Legal:   Privacy Policy · Terms of Service · Security
  Social:  LinkedIn · Twitter/X · YouTube · WhatsApp
```

### 16.2 SEO Optimization Checklist

- `<title>` and `<meta name="description">` on all pages (Next.js Metadata API).
- Open Graph tags for social sharing.
- Structured data (JSON-LD) for Organization and SoftwareApplication schema.
- Sitemap.xml auto-generated and submitted to Google Search Console.
- `robots.txt` configured (block `/api/`, `/admin/`, `/settings/`).
- Page speed target: Core Web Vitals LCP < 2.5s, CLS < 0.1, FID < 100ms.
- Multilingual SEO: `hreflang` tags for French (`fr`) and English (`en`) versions.
- Image optimization: Next.js `<Image>` component (WebP conversion, lazy loading).
- Internal linking: Song Library → Worship Planner → Training Center (content cluster).

---

## 17. Launch & Maintenance Checklist

### Pre-Launch

- [ ] SSL certificate installed and auto-renewal configured
- [ ] AWS WAF rules active and tested
- [ ] ClamAV malware scanner operational
- [ ] All environment variables in AWS Secrets Manager (zero secrets in code)
- [ ] Database backups configured and tested (restore drill completed)
- [ ] HTTPS redirect enforced on all routes
- [ ] Security headers validated via securityheaders.com
- [ ] Penetration test completed — all critical/high findings resolved
- [ ] GDPR/privacy policy published
- [ ] Cookie consent banner functional
- [ ] All forms tested (contact, registration, attendance, song upload)
- [ ] Mobile responsiveness verified on iPhone 12, Samsung Galaxy S21, iPad
- [ ] Cross-browser testing: Chrome, Firefox, Safari, Edge
- [ ] QR code check-in tested in real conditions (camera, lighting)
- [ ] WhatsApp notifications verified (Africa's Talking + WhatsApp Business API)
- [ ] Stripe integration tested in test mode (all plan types)
- [ ] AI Songwriting assistant tested with French and English prompts
- [ ] Monitoring and alerting configured (CloudWatch + Sentry)
- [ ] CI/CD pipeline tested with a full deploy cycle
- [ ] Onboarding flow tested end-to-end (church registration → first rehearsal)

### Post-Launch Maintenance

| Frequency | Task |
|---|---|
| Daily | Monitor error rates in Sentry |
| Daily | Check CloudWatch for unusual traffic (WAF blocked IPs) |
| Weekly | Review ClamAV scan logs for any quarantined files |
| Weekly | Broken link check |
| Monthly | Review user feedback and feature requests |
| Monthly | Dependency security audit (`npm audit`) |
| Monthly | Export and verify database backup integrity |
| Monthly | Review attendance and growth analytics — produce ministry health report |
| Quarterly | Rotate encryption keys (AWS KMS) |
| Quarterly | Renew API keys (Stripe, WhatsApp Business, Africa's Talking) |
| Quarterly | Security penetration test (automated OWASP ZAP scan) |
| Semi-annual | Full disaster recovery drill |
| Annual | Review and update privacy policy + terms of service |

---

*ChoirHub Africa — Building the digital infrastructure for African worship.*  
*"Let everything that has breath praise the Lord." — Psalm 150:6*

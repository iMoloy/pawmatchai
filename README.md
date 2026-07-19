<div align="center">
  <h1>🐾 PawMatchAI</h1>
  <p>AI-powered pet adoption platform built with Next.js 16, React 19, and Tailwind CSS v4</p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
    <img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwind-css" />
    <img src="https://img.shields.io/badge/TanStack_Query-5-FF4154" />
    <img src="https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript" />
  </p>
</div>

---

## 📖 Overview

PawMatchAI is a modern, full-stack pet adoption platform that uses AI to match adopters with their ideal companion. This repository contains the **Next.js frontend** client.

The backend lives in a separate repository: [`pawmatchai-server`](https://github.com/iMoloy/pawmatchai-server).

Live demo: [https://pawmatchai-server.onrender.com](https://pawmatchai-server.onrender.com)

---

## ✨ Features

| Page | Route | Description |
|------|-------|-------------|
| 🏠 Home | `/` | Landing page with hero, features, and CTA |
| 🔍 Explore Pets | `/explore` | Search, filter, and sort pets with pagination |
| 🐶 Pet Details | `/explore/:id` | Full pet profile with gallery and inline AI chat |
| 🤖 AI Match | `/ai-match` | Multi-step lifestyle quiz → ranked AI recommendations |
| 💬 Chat (Paws) | Floating Widget | SSE-streamed AI chat assistant on every page |
| 📋 Dashboard | `/dashboard` | User profile, stats, AI matches, and chat preview |
| ➕ Add Pet | `/pets/add` | Protected form to list a new pet for adoption |
| ⚙️ Manage Pets | `/pets/manage` | CRUD table for your own pet listings |
| 🤝 Adopt | `/adopt` | Adoption request / checkout flow |
| 🔐 Login | `/login` | Email/password + Google OAuth |
| 📝 Register | `/register` | Account creation with validation |
| ℹ️ About | `/about` | About the platform and mission |
| 📞 Contact | `/contact` | Contact form |
| ❓ FAQ | `/faq` | Frequently asked questions |
| 🆘 Help | `/help` | Help centre |
| 🔒 Privacy | `/privacy` | Privacy policy |
| 📄 Terms | `/terms` | Terms of service |

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 6 |
| **UI** | React 19, Tailwind CSS v4 |
| **Data Fetching** | TanStack Query v5, Axios |
| **Auth** | JWT via `AuthContext` + Google OAuth (`@react-oauth/google`) |
| **AI Chat** | SSE streaming via native `fetch` ReadableStream |
| **Charts** | Recharts v2 |
| **State** | React Context (`AuthContext`, `ChatContext`) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- The [`pawmatchai-server`](https://github.com/iMoloy/pawmatchai-server) backend running (or use the hosted instance)

### 1. Clone & Install

```bash
git clone https://github.com/iMoloy/pawmatchai.git
cd pawmatchai
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values (see [Environment Variables](#-environment-variables) below).

### 3. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** All AI features and pet data require the backend server. You can point `NEXT_PUBLIC_API_URL` at the hosted instance (`https://pawmatchai-server.onrender.com`) or run the server locally on port 5000.

---

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── about/                  # About the platform
│   ├── adopt/                  # Adoption request / checkout flow
│   ├── ai-match/               # AI quiz & ranked results
│   ├── contact/                # Contact form
│   ├── dashboard/              # User profile & stats
│   ├── explore/
│   │   ├── page.tsx            # Search / filter / sort pets
│   │   └── [id]/               # Pet detail page
│   ├── faq/                    # Frequently asked questions
│   ├── help/                   # Help centre
│   ├── login/                  # Email + Google OAuth login
│   ├── pets/
│   │   ├── add/                # Protected — add a pet listing
│   │   └── manage/             # Protected — manage your listings
│   ├── privacy/                # Privacy policy
│   ├── register/               # Account creation
│   ├── terms/                  # Terms of service
│   ├── layout.tsx              # Root layout (injects AIChatWidget)
│   ├── providers.tsx           # QueryClient + AuthProvider + ChatProvider
│   └── globals.css             # Global styles
├── components/
│   ├── AIChatWidget.tsx        # Floating Paws AI chat widget (SSE)
│   ├── AdoptionStats.tsx       # Stats section for home page
│   ├── Categories.tsx          # Pet category cards
│   ├── FeaturedPets.tsx        # Featured pets section
│   ├── Footer.tsx              # Site footer
│   ├── Hero.tsx                # Home page hero
│   ├── HowItWorks.tsx          # How-it-works section
│   ├── LoadingSpinner.tsx      # Shared loading spinner
│   ├── Navbar.tsx              # Responsive navigation
│   ├── Newsletter.tsx          # Newsletter sign-up
│   ├── PetCard.tsx             # Reusable pet card
│   ├── ProtectedRoute.tsx      # Auth guard HOC
│   ├── Testimonials.tsx        # Testimonials section
│   └── WhyAIMatching.tsx       # AI matching explainer section
└── context/
    ├── AuthContext.tsx         # JWT auth state + Google OAuth
    └── ChatContext.tsx         # Global chat state + SSE streaming
```

---

## 🔐 Authentication

Authentication is handled by `AuthContext` which communicates with the backend REST API.

| Method | Endpoint | Description |
|--------|----------|-------------|
| Email/Password | `POST /api/auth/login` | Standard login |
| Registration | `POST /api/auth/register` | New account |
| Google OAuth | `POST /api/auth/google` | Google access token exchange |

The authenticated user object (including JWT) is persisted to `localStorage` under the key `pawmatch_user`.

---

## 🤖 AI Features

### AI Smart Matching (`/ai-match`)

Takes users through a multi-step lifestyle quiz and POSTs answers to `POST /api/ai/recommend`. Results display pet cards with an AI-generated "why this match" explanation.

### Paws Chat Widget

A floating bottom-right SSE-streamed chat assistant powered by `POST /api/ai/chat`. Persists across page navigation via `ChatContext`. Clicking "Ask Paws about this pet" on a pet detail page injects that pet's context.

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🌐 Environment Variables

Copy `.env.example` to `.env.local` and fill in the values.

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | ✅ Yes | — | Backend API base URL (no trailing slash) |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional | — | Google OAuth client ID for Google sign-in |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is for educational purposes as part of a Programming Hero assignment.

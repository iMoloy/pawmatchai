<div align="center">
  <h1>🐾 PawMatchAI — Frontend</h1>
  <p>AI-powered pet adoption platform built with Next.js 16, React 19, and Tailwind CSS</p>
  <p>
    <img src="https://img.shields.io/badge/Next.js-16.2-black?logo=nextdotjs" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
    <img src="https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwind-css" />
    <img src="https://img.shields.io/badge/TanStack_Query-5-FF4154" />
  </p>
</div>

---

## 📖 Overview

PawMatchAI is a modern, full-stack pet adoption platform that uses AI to match adopters with their ideal companion. This repository contains the **Next.js frontend** client.

The backend lives in a separate repository: [`pawmatch-server`](https://github.com/iMoloy/pawmatchai-server).

---

## ✨ Features

| Page | Route | Description |
|------|-------|-------------|
| 🏠 Home | `/` | Landing page with hero, features, and CTA |
| 🔍 Explore Pets | `/explore` | Search, filter, and sort pets with pagination |
| 🐶 Pet Details | `/pets/:id` | Full pet profile with gallery and AI chat |
| 🤖 AI Match | `/ai-match` | Multi-step lifestyle quiz → ranked AI recommendations |
| 💬 Chat (Paws) | Floating Widget | SSE-streamed AI chat assistant on every page |
| 📋 Dashboard | `/dashboard` | User profile, stats, AI matches, chat preview |
| ➕ Add Pet | `/pets/add` | Protected form to list a new pet for adoption |
| ⚙️ Manage Pets | `/pets/manage` | CRUD table for your own listings |
| 🤝 Adopt | `/adopt` | Adoption request / checkout flow |
| 🔐 Login | `/login` | Email/password + Google OAuth + Demo account |
| 📝 Register | `/register` | Account creation with validation |

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS v4
- **Data Fetching**: TanStack Query v5, Axios
- **Auth**: Custom `AuthContext` (JWT-ready, mocked for demo)
- **AI Chat**: SSE streaming via native `fetch` ReadableStream
- **State**: React Context (AuthContext, ChatContext)

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- The `pawmatch-server` backend running on port 5000

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

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-oauth-client-id
```

### 3. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Note:** Make sure the backend server is also running on port 5000 for data fetching and AI features to work.

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── ai-match/           # AI quiz & results
│   ├── adopt/              # Adoption request page
│   ├── dashboard/          # User dashboard
│   ├── explore/            # Explore pets (search/filter)
│   ├── login/              # Authentication
│   ├── pets/
│   │   ├── [id]/           # Pet details page
│   │   ├── add/            # Add new pet
│   │   └── manage/         # Manage own pets
│   ├── register/           # Account creation
│   ├── layout.js           # Root layout (injects AIChatWidget)
│   └── providers.jsx       # React Query + AuthProvider + ChatProvider
├── components/
│   ├── AIChatWidget.jsx    # Floating Paws AI chat widget
│   ├── Footer.jsx
│   ├── Navbar.jsx
│   ├── PetCard.jsx         # Reusable pet card (+ AI reason blurb)
│   └── ProtectedRoute.jsx  # Auth guard component
└── context/
    ├── AuthContext.jsx     # User authentication state
    └── ChatContext.jsx     # Global chat state + SSE streaming
```

---

## 🔐 Authentication

Authentication is currently **mocked** on the frontend. The `AuthContext` simulates a real API call with a delay and stores a mock JWT in `localStorage`.

**Demo credentials** (via "Try Demo Account" button):
- Email: `demo@pawmatch.ai`
- Password: `pawmatch2026`

To use real auth, wire up the login/register `AuthContext` methods to your backend endpoints.

---

## 🤖 AI Features

### AI Smart Matching (`/ai-match`)
Takes users through a 4-step lifestyle quiz and POSTs answers to `POST /api/ai/recommend`. Results display pet cards with an AI-generated "why this match" explanation blurb.

### Paws Chat Widget
A floating bottom-right SSE-streamed chat assistant powered by `POST /api/ai/chat`. Persists across page navigation via `ChatContext`. Clicking "Ask Paws about this pet" on any pet page injects that pet's context.

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

See [`.env.example`](.env.example) for all available options.

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Optional | Google OAuth client ID |

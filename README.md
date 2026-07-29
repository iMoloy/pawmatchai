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

PawMatchAI is a state-of-the-art, full-stack pet adoption platform that uses artificial intelligence to match adopters with their ideal animal companions. This repository contains the **Next.js frontend** client.

The backend REST & AI server lives in a separate repository: [`pawmatchai-server`](https://github.com/iMoloy/pawmatchai-server).

---

## ✨ Features & AI Enhancements

| Feature / Page | Route | Description |
|----------------|-------|-------------|
| 🏠 **Home** | `/` | Hero section, featured pets, stats, and call to action |
| 🔍 **Explore Pets** | `/explore` | Search, filter, and toggle between **Pet Grid** & **📍 GPS Shelter Map** |
| 🐶 **Pet Details** | `/explore/:id` | Detailed pet profile with gallery, inline AI chat & **📊 Monthly Budget Estimator** |
| 🤖 **AI Match** | `/ai-match` | Lifestyle quiz with **🔥 Tinder-Style Swipe Deck** & **Radar Compatibility Breakdown** |
| 💬 **Paws AI Assistant** | Floating Widget | Real-time SSE-streamed AI adoption guide with clean single-typing indicators |
| 📋 **Dashboard** | `/dashboard` | User profile, saved stats, AI matches, and **📋 Live Adoption Application Tracker** |
| 📷 **Add Pet with AI** | `/pets/add` | Pet submission form with **✨ AI Vision Auto-Fill** (detects breed, age, size, weight & traits) |
| ⚙️ **Manage Pets** | `/pets/manage` | CRUD dashboard for user pet listings |
| 🤝 **Adopt** | `/adopt` | Adoption application flow connected to backend REST persistence |
| 🔐 **Authentication** | `/login` / `/register` | Email/password + Google OAuth authentication |

---

## 🚀 Key AI & Interactive Modules

### ✨ 1. AI Vision Auto-Fill (`/pets/add`)
Paste any pet image URL and click **"✨ Auto-Fill with AI"**. Gemini Vision analyzes the photo and automatically populates:
- Breed & Species
- Estimated Age & Weight
- Size Category (`Small`, `Medium`, `Large`)
- Temperament Tags & Adoption Summary

### 🔥 2. Tinder-Style Swipe Match Deck (`/ai-match`)
After taking the lifestyle quiz, toggle between Grid View and **Swipe Deck Mode**:
- Swipe Right (❤️) to Shortlist pets.
- Swipe Left (✕) to Pass.
- Multi-bar **Compatibility Breakdown**: Household Activity Fit, Living Space Match, Kids Safety, and Budget Alignment.

### 📋 3. Live Adoption Application Tracker (`/dashboard`)
Submitting an adoption form creates a real-time record in MongoDB. The dashboard tracks application progress via a live status timeline badge:
`Submitted` ➔ `Under Review` ➔ `Approved`.

### 📍 4. GPS Shelter Location Map (`/explore`)
Uses browser geolocation (`navigator.geolocation`) and Haversine distance calculations to show nearest partner shelters in `km away` with Google Maps direction links.

### 📊 5. AI Monthly Pet Care Budget Estimator (`/explore/[id]`)
Dynamic financial estimator calculating monthly food, veterinary insurance, grooming, and supplies cost based on species, weight, and diet preferences.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router, Turbopack) |
| **Language** | TypeScript 6 |
| **UI Styling** | React 19, Tailwind CSS v4 |
| **Data Fetching** | TanStack Query v5, Axios |
| **Auth** | JWT via `AuthContext` + Google OAuth (`@react-oauth/google`) |
| **AI Streaming** | Server-Sent Events (SSE) via native `fetch` ReadableStream |
| **State** | React Context (`AuthContext`, `ChatContext`) |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build production bundle (verified 0-error clean build) |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint check |

"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PetCard from "@/components/PetCard";

// Mock data for AI Matches
const aiMatches = [
  {
    id: 1,
    name: "Luna",
    breed: "Golden Retriever",
    age: "2 years",
    size: "Large",
    gender: "Female",
    location: "Austin, TX",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "Oliver",
    breed: "Maine Coon",
    age: "1 year",
    size: "Medium",
    gender: "Male",
    location: "Seattle, WA",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "Bella",
    breed: "French Bulldog",
    age: "3 months",
    size: "Small",
    gender: "Female",
    location: "Austin, TX",
    imageUrl: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=800",
  },
];

export default function DashboardPage() {
  const { user, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />

        <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Header & Welcome */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                Welcome back, {user?.name || "Friend"}! 👋
              </h1>
              <p className="text-slate-500 mt-2">Here is what is happening with your adoption journey.</p>
            </div>
            <Link 
              href="/explore" 
              className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-sm"
            >
              Continue Exploring
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Profile & Stats */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Profile Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-5">
                <div className="h-16 w-16 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-inner">
                  {user?.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{user?.name}</h2>
                  <p className="text-sm text-slate-500">{user?.email}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                  <div className="text-slate-400 mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-black text-slate-800">12</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Saved Pets</div>
                </div>
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
                  <div className="text-teal-500 mb-2">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-2xl font-black text-slate-800">3</div>
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">AI Matches</div>
                </div>
                <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 col-span-2 flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-black text-slate-800">5</div>
                    <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">Chat Sessions</div>
                  </div>
                  <div className="h-12 w-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Link href="/explore" className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors">
                    <div className="bg-slate-100 p-2 rounded-lg text-slate-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg></div>
                    Explore Pets
                  </Link>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors text-left">
                    <div className="bg-slate-100 p-2 rounded-lg text-slate-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg></div>
                    Add a Pet
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium transition-colors text-left">
                    <div className="bg-slate-100 p-2 rounded-lg text-slate-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                    Manage My Pets
                  </button>
                  <button onClick={logout} className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-red-50 text-red-600 font-medium transition-colors text-left">
                    <div className="bg-red-100 p-2 rounded-lg text-red-500"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg></div>
                    Logout
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: AI Matches & Chat Preview */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* AI Matches Section */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      Your AI Matches
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">Based on your lifestyle and preferences</p>
                  </div>
                  <Link href="/explore" className="text-sm font-bold text-teal-600 hover:text-teal-800 transition-colors">
                    View All
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {aiMatches.map(pet => (
                    <PetCard key={pet.id} pet={pet} />
                  ))}
                </div>
              </div>

              {/* Chat Preview Section */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 shadow-lg text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
                </div>
                
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  Recent Chat with Paws
                </h2>

                <div className="bg-white/10 rounded-2xl p-5 backdrop-blur-sm border border-white/10 space-y-4 mb-6">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center shrink-0">🐾</div>
                    <div className="bg-white/20 rounded-2xl rounded-tl-none p-3 text-sm">
                      I noticed you saved Luna! Golden Retrievers are great for active families. Are you looking for a dog that can go on runs with you?
                    </div>
                  </div>
                  <div className="flex gap-3 flex-row-reverse">
                    <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center shrink-0 text-xs font-bold">{user?.name?.charAt(0).toUpperCase() || "U"}</div>
                    <div className="bg-teal-600 rounded-2xl rounded-tr-none p-3 text-sm">
                      Yes! I run about 3 miles a day and want a companion.
                    </div>
                  </div>
                </div>

                <button className="w-full sm:w-auto px-6 py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-slate-100 transition-colors shadow-sm text-sm">
                  Continue Conversation
                </button>
              </div>

            </div>
          </div>

        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
}

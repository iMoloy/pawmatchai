"use client";

import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface TeamMember {
  name: string;
  role: string;
  emoji: string;
  bio: string;
}

interface Value {
  icon: string;
  title: string;
  description: string;
}

const TEAM: TeamMember[] = [
  { name: "Moloy Rahman", role: "Founder & Full-Stack Developer", emoji: "👨‍💻", bio: "Passionate about combining AI with social good. Built PawMatch to help more pets find loving homes." },
  { name: "Paws (AI)", role: "Chief Adoption Advisor", emoji: "🐾", bio: "An AI trained to understand pet adoption — here 24/7 to answer your questions and find your perfect match." },
  { name: "The Community", role: "Shelter Partners & Volunteers", emoji: "❤️", bio: "Hundreds of shelters, fosters, and volunteers across the country who make every adoption possible." },
];

const VALUES: Value[] = [
  { icon: "🤝", title: "Responsible Adoption", description: "We believe every pet deserves a home that's the right fit. Our AI matching ensures both pet and family thrive together." },
  { icon: "🧠", title: "AI for Good", description: "We use AI not to replace human connection, but to enhance it — helping people find the right companion faster." },
  { icon: "🌍", title: "Community First", description: "We work with local shelters and rescues, amplifying their reach and helping more animals get the visibility they deserve." },
  { icon: "🔒", title: "Safety & Trust", description: "Every listing is reviewed. Every adopter goes through a meet-and-greet. We don't rush the process — we perfect it." },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-slate-900 text-white py-24 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-semibold text-teal-200 mb-6 border border-white/10">
              🐾 Our Mission
            </div>
            <h1 className="text-5xl font-black mb-6 leading-tight">
              Find the right pet,<br />
              <span className="text-teal-400">the smart way.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              PawMatch AI is an AI-powered pet adoption platform that connects loving families with the perfect companion — using smart matching, real-time chat, and a community of trusted shelters.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-black text-slate-800 mb-6">Why we built this</h2>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>Every year, millions of pets sit in shelters waiting for a family. At the same time, millions of people search for the perfect companion but struggle to find the right match. The problem isn&apos;t a lack of pets — it&apos;s a lack of connection.</p>
                <p>PawMatch AI was created to bridge that gap. By combining a modern browsing experience with AI-powered lifestyle matching, we help people find pets that truly fit their lives — not just ones that look cute in a photo.</p>
                <p>Our AI assistant <strong>&quot;Paws&quot;</strong> is available 24/7 to answer questions about adoption, help you understand a pet&apos;s personality, and guide you through the entire process.</p>
              </div>
              <Link href="/ai-match" className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-800 transition-colors shadow-sm">
                Try AI Matching
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-teal-50 border border-teal-100 rounded-3xl p-8 text-center">
                <div className="text-5xl font-black text-teal-700 mb-1">1,200+</div>
                <div className="text-sm text-teal-600 font-medium">Pets Adopted</div>
              </div>
              <div className="bg-pink-50 border border-pink-100 rounded-3xl p-8 text-center">
                <div className="text-5xl font-black text-pink-600 mb-1">300+</div>
                <div className="text-sm text-pink-600 font-medium">Active Listings</div>
              </div>
              <div className="bg-amber-50 border border-amber-100 rounded-3xl p-8 text-center">
                <div className="text-5xl font-black text-amber-600 mb-1">4.9★</div>
                <div className="text-sm text-amber-600 font-medium">Avg. Rating</div>
              </div>
              <div className="bg-slate-100 border border-slate-200 rounded-3xl p-8 text-center">
                <div className="text-5xl font-black text-slate-700 mb-1">48h</div>
                <div className="text-sm text-slate-600 font-medium">Avg. Match Time</div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 bg-white border-y border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-black text-slate-800 mb-3">What we stand for</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Four principles guide every feature we build and every partnership we make.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((v) => (
                <div key={v.title} className="bg-slate-50 border border-slate-100 rounded-3xl p-7 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                  <div className="text-4xl mb-4">{v.icon}</div>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{v.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-4xl font-black text-slate-800 mb-3">The team behind PawMatch</h2>
              <p className="text-slate-500 max-w-xl mx-auto">Built by a developer who loves pets, powered by AI, and fuelled by community.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {TEAM.map((member) => (
                <div key={member.name} className="bg-white border border-slate-100 rounded-3xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-5xl mb-4">{member.emoji}</div>
                  <div className="font-black text-slate-800 text-lg">{member.name}</div>
                  <div className="text-sm text-teal-600 font-semibold mb-3">{member.role}</div>
                  <p className="text-sm text-slate-500 leading-relaxed">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-black mb-4">Ready to find your perfect pet?</h2>
            <p className="text-teal-100 mb-8 text-lg">Take our 2-minute lifestyle quiz and let our AI find your best matches.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/ai-match" className="px-8 py-4 bg-white text-teal-800 font-bold rounded-2xl hover:bg-slate-50 transition-colors shadow-lg">
                ✨ Start AI Matching
              </Link>
              <Link href="/explore" className="px-8 py-4 bg-teal-500/30 text-white font-bold rounded-2xl hover:bg-teal-500/40 border border-white/20 transition-colors">
                Browse All Pets
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

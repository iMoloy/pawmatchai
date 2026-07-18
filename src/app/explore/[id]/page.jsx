"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { placeholderPets } from "@/data/pets";

export default function PetDetailsPage({ params }) {
  const resolvedParams = use(params);
  const petId = parseInt(resolvedParams.id);
  const pet = placeholderPets.find((p) => p.id === petId);

  // Gallery state
  const [activeImage, setActiveImage] = useState(pet?.image || "");
  
  // Inquiry Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!pet) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200/60 shadow-sm text-center max-w-md">
            <h1 className="text-2xl font-black text-slate-800 mb-2">Pet Not Found</h1>
            <p className="text-slate-600 mb-6">The pet you are looking for might have been adopted or the link is invalid.</p>
            <Link href="/explore" className="px-6 py-2.5 bg-teal-700 text-white font-semibold rounded-xl text-sm hover:bg-teal-800 transition-colors">
              Back to Explore
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    setIsSubmitted(true);
  };

  const allImages = pet.images && pet.images.length > 0 ? pet.images : [pet.image];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-850 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Explore Pets
          </Link>
        </div>

        {/* Pet Details Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Media & Core Info (8/12 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Gallery Panel */}
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/60 p-4 shadow-sm">
              <div className="aspect-[16/10] bg-slate-100 rounded-2xl overflow-hidden mb-4 relative">
                <img
                  src={activeImage || pet.image}
                  alt={pet.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Vaccine badge on main image */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <span className={`px-3.5 py-1 text-xs font-semibold rounded-full shadow-md bg-white/90 backdrop-blur-sm ${
                    pet.sex === 'Male' ? 'text-blue-700' : 'text-pink-700'
                  }`}>
                    {pet.sex}
                  </span>
                  {pet.vaccinated && (
                    <span className="px-3.5 py-1 text-xs font-semibold rounded-full shadow-md bg-emerald-600 text-white">
                      Fully Vaccinated
                    </span>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        (activeImage === img || (!activeImage && index === 0)) ? "border-teal-700 scale-95" : "border-transparent opacity-75 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt={`${pet.name} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* General Info Card */}
            <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-sm space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black text-slate-800">{pet.name}</h1>
                  <p className="text-slate-500 font-semibold mt-1">
                    {pet.breed} &bull; {pet.species}
                  </p>
                </div>
                <div className="text-left md:text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Adoption Fee</span>
                  <span className="text-3xl font-black text-teal-700">${pet.fee}</span>
                </div>
              </div>

              {/* Quick stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Age</span>
                  <span className="font-bold text-slate-800">{pet.age}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Size</span>
                  <span className="font-bold text-slate-800 capitalize">{pet.size}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Weight</span>
                  <span className="font-bold text-slate-800">{pet.weight}</span>
                </div>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Location</span>
                  <span className="font-bold text-slate-800 truncate block">{pet.location}</span>
                </div>
              </div>

              {/* Story Description */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-slate-800">My Story</h2>
                <p className="text-slate-650 leading-relaxed text-sm md:text-base">
                  {pet.description}
                </p>
              </div>

              {/* Temperament Tags */}
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-slate-800">Temperament & Personality</h2>
                <div className="flex flex-wrap gap-2">
                  {pet.temperament.map((trait, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-amber-50 text-amber-800 border border-amber-200/50 rounded-xl text-sm font-semibold shadow-sm"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Inquiry Form / Application (4/12 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 shadow-sm space-y-6">
              
              <div className="text-center pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800">Interested in {pet.name}?</h2>
                <p className="text-slate-500 text-sm mt-1">Submit an inquiry to schedule a meeting.</p>
              </div>

              {isSubmitted ? (
                <div className="bg-teal-50 border border-teal-200 rounded-2xl p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-teal-900">Application Received!</h3>
                  <p className="text-teal-850 text-xs leading-relaxed">
                    Thank you, {name}! We have received your interest in {pet.name}. One of our adoption coordinators will contact you shortly via email ({email}) or phone.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setName("");
                      setEmail("");
                      setPhone("");
                      setMessage("");
                    }}
                    className="w-full py-2 bg-teal-700 text-white font-semibold text-xs rounded-xl hover:bg-teal-800 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  
                  {/* Name field */}
                  <div className="space-y-1">
                    <label htmlFor="form-name" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Name</label>
                    <input
                      id="form-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-sm transition-all"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-1">
                    <label htmlFor="form-email" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                    <input
                      id="form-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-sm transition-all"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1">
                    <label htmlFor="form-phone" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                    <input
                      id="form-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-sm transition-all"
                    />
                  </div>

                  {/* Message field */}
                  <div className="space-y-1">
                    <label htmlFor="form-msg" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
                    <textarea
                      id="form-msg"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={`Tell us why you'd like to adopt ${pet.name}...`}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white text-sm transition-all resize-none"
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-teal-700 text-white font-bold rounded-xl shadow-md hover:bg-teal-850 hover:shadow-lg active:scale-[0.98] transition-all cursor-pointer text-sm"
                  >
                    Send Adoption Inquiry
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

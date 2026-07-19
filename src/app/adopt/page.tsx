"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Sample pet data
const samplePet = {
  id: 1,
  name: "Luna",
  breed: "Golden Retriever",
  age: "2 years",
  fee: 150,
  imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800",
  location: "Austin, TX",
};

const CONTACT_METHODS = [
  { id: "email", label: "Email", description: "We'll send updates to your registered email", icon: "✉️", disabled: false },
  { id: "phone", label: "Phone Call", description: "Prefer a call? (Coming soon)", icon: "📞", disabled: true },
];

export default function AdoptionRequestPage() {
  const [form, setForm] = useState({ fullName: "", phone: "", address: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contactMethod, setContactMethod] = useState("email");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s\-().]{7,15}$/.test(form.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    if (!form.address.trim()) newErrors.address = "Address is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 text-5xl">
              🐾
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-3">Request Submitted!</h1>
            <p className="text-slate-500 mb-2 leading-relaxed">
              Your adoption request for <span className="font-bold text-teal-700">{samplePet.name}</span> has been received.
            </p>
            <p className="text-slate-500 mb-8 leading-relaxed">
              We&apos;ll reach out to you via email to schedule your meet-and-greet within 1–2 business days.
            </p>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm mb-8 text-left space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Pet</span>
                <span className="font-bold text-slate-800">{samplePet.name}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Name</span>
                <span className="font-bold text-slate-800">{form.fullName}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Contact via</span>
                <span className="font-bold text-slate-800 capitalize">{contactMethod}</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-100">
                <span className="text-slate-500">Adoption Fee</span>
                <span className="font-bold text-teal-700 text-base">${samplePet.fee}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/explore" className="px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors shadow-sm">
                Browse More Pets
              </Link>
              <Link href="/dashboard" className="px-6 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors">
                Go to Dashboard
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
        <div className="mb-8">
          <Link href={`/pets/${samplePet.id}`} className="text-sm font-bold text-slate-500 hover:text-teal-700 transition-colors flex items-center gap-1.5 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            Back to Pet Details
          </Link>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Adoption Request</h1>
          <p className="text-slate-500 mt-1">Fill in your details to begin the adoption process.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 space-y-8">

              {/* Adopter Information */}
              <div>
                <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">Your Information</h2>
                <div className="space-y-5">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={`w-full px-4 py-3 bg-slate-50 border ${errors.fullName ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-teal-500'} rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm`}
                    />
                    {errors.fullName && <p className="text-xs text-red-500 font-medium">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full px-4 py-3 bg-slate-50 border ${errors.phone ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-teal-500'} rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 font-medium">{errors.phone}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Home Address</label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="123 Main St, Austin, TX 78701"
                      rows={3}
                      className={`w-full px-4 py-3 bg-slate-50 border ${errors.address ? 'border-red-300 focus:ring-red-400' : 'border-slate-200 focus:ring-teal-500'} rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:bg-white transition-all text-sm resize-none`}
                    />
                    {errors.address && <p className="text-xs text-red-500 font-medium">{errors.address}</p>}
                  </div>
                </div>
              </div>

              {/* Contact Method */}
              <div>
                <h2 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3 mb-5">Preferred Contact Method</h2>
                <div className="space-y-3">
                  {CONTACT_METHODS.map(method => (
                    <button
                      key={method.id}
                      type="button"
                      disabled={method.disabled}
                      onClick={() => !method.disabled && setContactMethod(method.id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                        method.disabled
                          ? 'border-slate-100 bg-slate-50 cursor-not-allowed opacity-60'
                          : contactMethod === method.id
                          ? 'border-teal-500 bg-teal-50/50 ring-4 ring-teal-500/10'
                          : 'border-slate-200 bg-white hover:border-teal-200'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${contactMethod === method.id && !method.disabled ? 'bg-teal-100' : 'bg-slate-100'}`}>
                        {method.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
                          {method.label}
                          {method.disabled && <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">Soon</span>}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">{method.description}</div>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                        contactMethod === method.id && !method.disabled
                          ? 'border-teal-500 bg-teal-500'
                          : 'border-slate-300'
                      }`}>
                        {contactMethod === method.id && !method.disabled && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-teal-700 text-white font-bold rounded-2xl hover:bg-teal-800 active:scale-[0.98] transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting Request...
                  </>
                ) : (
                  <>
                    <span>🐾</span>
                    Submit Adoption Request
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right: Pet Summary Card (sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">

              {/* Pet Card */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="relative aspect-[4/3]">
                  <img src={samplePet.imageUrl} alt={samplePet.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <p className="text-white font-black text-2xl">{samplePet.name}</p>
                    <p className="text-white/80 text-sm font-medium">{samplePet.breed}</p>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500 flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {samplePet.age}
                    </span>
                    <span className="text-sm text-slate-500 flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      {samplePet.location}
                    </span>
                  </div>

                  <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Adoption Fee</p>
                      <p className="text-2xl font-black text-teal-700">${samplePet.fee}</p>
                    </div>
                    <div className="px-3 py-1.5 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                      Available
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-amber-600 text-lg shrink-0">ℹ️</span>
                <p className="text-sm text-amber-800 leading-relaxed">
                  Submitting a request doesn&apos;t guarantee adoption. Our team will review your application and contact you to schedule a meet-and-greet.
                </p>
              </div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

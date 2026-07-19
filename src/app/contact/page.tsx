"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ContactMethod {
  icon: string;
  label: string;
  value: string;
  href: string | null;
}

interface Faq {
  q: string;
  a: string;
}

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

const CONTACT_METHODS: ContactMethod[] = [
  { icon: "📧", label: "Email Us", value: "hello@pawmatch.ai", href: "mailto:hello@pawmatch.ai" },
  { icon: "📍", label: "Location", value: "Austin, TX 78701", href: "https://maps.google.com" },
  { icon: "🕐", label: "Support Hours", value: "Mon–Fri, 9am – 6pm CST", href: null },
];

const FAQS: Faq[] = [
  { q: "How does AI matching work?", a: "Our quiz asks about your lifestyle — living space, activity level, experience, and more. The AI cross-references your answers with every available pet and ranks them by compatibility." },
  { q: "Is PawMatch AI free to use?", a: "Yes! Browsing pets, using the AI matching quiz, and chatting with Paws are all completely free for adopters." },
  { q: "How do I list a pet for adoption?", a: "Create a free account, go to Add Pet from your dashboard, and fill in the details. Your listing will be reviewed and published within 24 hours." },
  { q: "What happens after I submit an adoption request?", a: "Our team reviews your application and reaches out within 1–2 business days to schedule a meet-and-greet with the pet and its current owner/shelter." },
];

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Enter a valid email";
    if (!form.subject.trim()) newErrors.subject = "Subject is required";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 20) newErrors.message = "Message must be at least 20 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const inputClass = (field: keyof FormState) =>
    `w-full px-4 py-3 bg-slate-50 border ${errors[field] ? "border-red-300 focus:ring-red-400" : "border-slate-200 focus:ring-teal-500"} rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:bg-white transition-all`;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />

      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900 text-white py-20 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="text-5xl mb-4">💬</div>
            <h1 className="text-5xl font-black mb-4">Get in Touch</h1>
            <p className="text-lg text-slate-300 leading-relaxed">
              Have a question, a partnership proposal, or just want to say hi? We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Contact Info + FAQ */}
            <div className="lg:col-span-4 space-y-6">

              {/* Contact Methods */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7 space-y-5">
                <h2 className="font-black text-slate-800 text-xl">Contact Info</h2>
                {CONTACT_METHODS.map(c => (
                  <div key={c.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center text-xl shrink-0">
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">{c.label}</div>
                      {c.href ? (
                        <a href={c.href} className="text-sm font-semibold text-teal-700 hover:underline">{c.value}</a>
                      ) : (
                        <div className="text-sm font-semibold text-slate-700">{c.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
                <h2 className="font-black text-slate-800 text-xl mb-5">FAQs</h2>
                <div className="space-y-3">
                  {FAQS.map((faq, i) => (
                    <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full text-left px-5 py-4 flex justify-between items-center hover:bg-slate-50 transition-colors"
                      >
                        <span className="font-semibold text-slate-800 text-sm pr-2">{faq.q}</span>
                        <svg className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {openFaq === i && (
                        <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Contact Form */}
            <div className="lg:col-span-8">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10">
                {isSuccess ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">Message Sent!</h3>
                    <p className="text-slate-500">Thanks for reaching out! We&apos;ll get back to you within 1–2 business days.</p>
                    <button
                      onClick={() => { setIsSuccess(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                      className="mt-6 px-6 py-3 bg-teal-600 text-white font-bold rounded-xl hover:bg-teal-700 transition-colors"
                    >
                      Send Another
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-black text-slate-800 mb-7">Send us a message</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Full Name</label>
                          <input name="name" value={form.name} onChange={handleChange} placeholder="Jane Doe" className={inputClass("name")} />
                          {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name}</p>}
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
                          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" className={inputClass("email")} />
                          {errors.email && <p className="text-xs text-red-500 font-medium">{errors.email}</p>}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Subject</label>
                        <input name="subject" value={form.subject} onChange={handleChange} placeholder="How does AI matching work?" className={inputClass("subject")} />
                        {errors.subject && <p className="text-xs text-red-500 font-medium">{errors.subject}</p>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Message</label>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={6} placeholder="Tell us how we can help..." className={`${inputClass("message")} resize-none`} />
                        <div className="flex justify-between">
                          {errors.message ? <p className="text-xs text-red-500 font-medium">{errors.message}</p> : <span />}
                          <span className="text-xs text-slate-400">{form.message.length}/500</span>
                        </div>
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-teal-700 text-white font-bold rounded-2xl hover:bg-teal-800 active:scale-[0.98] transition-all shadow-md disabled:opacity-70 flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>
                            Sending...
                          </>
                        ) : "Send Message →"}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

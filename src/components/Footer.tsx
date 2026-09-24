import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
 return (
 <footer className="bg-linear-to-br from-teal-50 to-slate-100 text-slate-800 py-6 border-t border-slate-200 relative overflow-hidden">
 <div className="absolute top-0 right-1/4 -translate-y-12 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
 <div className="absolute bottom-0 left-1/4 translate-y-1/3 w-96 h-96 bg-coral-100 rounded-full blur-3xl opacity-30 pointer-events-none"></div>
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
 {/* Logo & About */}
 <div className="md:col-span-1 lg:col-span-2 pr-4">
 <Link href="/" className="flex items-center gap-2.5 text-xl font-black text-teal-700 mb-4 tracking-tight">
 <div className="relative w-9 h-9">
 <Image src="/logo-icon.png" alt="PawMatchAI Logo" fill className="object-contain" />
 </div>
 <span>PawMatch<span className="text-[#ff6a52]">AI</span></span>
 </Link>
 <p className="text-slate-600 text-sm mb-4 max-w-sm leading-relaxed">
 Connecting loving families with their perfect pets through intelligent AI matching technology.
 </p>
 <div className="mt-8">
 <div className="flex gap-2.5 mb-4">
 <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-linear-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all">
 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
 </a>
 <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-linear-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all">
 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
 </a>
 <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-linear-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all">
 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
 </a>
 <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-linear-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white flex items-center justify-center shadow-sm hover:shadow-md hover:scale-105 transition-all">
 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.62 1.62 0 1 0 0-3.24 1.62 1.62 0 0 0 0 3.24M5.07 18.5h2.78v-8.37H5.07v8.37z"/></svg>
 </a>
 </div>
 <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} PawMatch AI. All rights reserved.</p>
 </div>

 </div>

 {/* Quick Links */}
 <div>
 <h3 className="font-semibold text-slate-900 text-lg mb-4">Quick Links</h3>
 <ul className="space-y-3">
 <li><Link href="/" className="text-slate-600 hover:text-teal-700 transition-colors">Home</Link></li>
 <li><Link href="/explore" className="text-slate-600 hover:text-teal-700 transition-colors">Explore Pets</Link></li>
 <li><Link href="/ai-match" className="text-slate-600 hover:text-teal-700 transition-colors">Find Match</Link></li>
 </ul>
 </div>

 {/* Support */}
 <div>
 <h3 className="font-semibold text-slate-900 text-lg mb-4">Support</h3>
 <ul className="space-y-3">
 <li><Link href="/help" className="text-slate-600 hover:text-teal-700 transition-colors">Help Center</Link></li>
 <li><Link href="/faq" className="text-slate-600 hover:text-teal-700 transition-colors">FAQ</Link></li>
 <li><Link href="/help" className="text-slate-600 hover:text-teal-700 transition-colors">Adoption Guide</Link></li>
 <li><Link href="/privacy" className="text-slate-600 hover:text-teal-700 transition-colors">Privacy Policy</Link></li>
 <li><Link href="/terms" className="text-slate-600 hover:text-teal-700 transition-colors">Terms of Service</Link></li>
 </ul>
 </div>

 {/* Contact Info */}
 <div>
 <h3 className="font-semibold text-slate-900 text-lg mb-4">Contact Us</h3>
 <ul className="space-y-3 text-slate-600">
 <li className="flex items-center">
 <span className="mr-2">📧</span>
 hello@pawmatchai.com
 </li>
 <li className="flex items-center">
 <span className="mr-2">📞</span>
 (555) 123-4567
 </li>
 <li className="flex items-center">
 <span className="mr-2">📍</span>
 San Francisco, CA
 </li>
 </ul>
 </div>
 </div>
 </div>
 </footer>
 );
}

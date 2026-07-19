import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo & About */}
          <div className="md:col-span-1 lg:col-span-2 pr-4">
            <Link href="/" className="flex items-center gap-2 text-2xl font-black text-white mb-4 tracking-tight">
              <div className="relative w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1.5 shadow-sm">
                <Image src="/logo.png" alt="PawMatchAI Logo" fill className="object-contain" />
              </div>
              <span>PawMatch<span className="text-teal-400">AI</span></span>
            </Link>
            <p className="text-slate-400 text-sm mb-6 max-w-sm leading-relaxed">
              Connecting loving families with their perfect pets through intelligent AI matching technology.
            </p>
            <form className="flex gap-2 max-w-sm">
              <input type="email" placeholder="Subscribe to newsletter" className="bg-slate-800 border border-slate-700 text-sm text-white px-4 py-2.5 rounded-xl flex-1 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-colors placeholder:text-slate-500" />
              <button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-slate-300 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/explore" className="text-slate-300 hover:text-white transition-colors">Explore Pets</Link></li>
              <li><Link href="/ai-match" className="text-slate-300 hover:text-white transition-colors">Find Match</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link href="/help" className="text-slate-300 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/faq" className="text-slate-300 hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/help" className="text-slate-300 hover:text-white transition-colors">Adoption Guide</Link></li>
              <li><Link href="/privacy" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-slate-300 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                hello@pawmatchai.com
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.232a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.232 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (555) 123-4567
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                </svg>
                San Francisco, CA
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} PawMatch AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

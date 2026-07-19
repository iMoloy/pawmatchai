import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
              <li><a href="/match" className="text-slate-300 hover:text-white transition-colors">Find Match</a></li>
              <li><a href="/about" className="text-slate-300 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li><a href="/help" className="text-slate-300 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="/faq" className="text-slate-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/adoption-guide" className="text-slate-300 hover:text-white transition-colors">Adoption Guide</a></li>
              <li><a href="/privacy" className="text-slate-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="text-slate-300 hover:text-white transition-colors">Terms of Service</a></li>
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

            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.236.195 2.236.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.549 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0021.5 6.375a8.322 8.322 0 01-2.357.646 4.125 4.125 0 001.908-.114 8.218 8.218 0 01-2.605 1.05A4.106 4.106 0 0021.5 4.106c-.883.518-1.86.925-2.896 1.15a4.104 4.104 0 00-6.993 3.746A11.666 11.666 0 013 4.37a4.104 4.104 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.29 4.026 4.1 4.1 0 01-1.853.07 4.108 4.108 0 003.767 2.777A8.222 8.222 0 012 19.54a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-teal-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.221.058 2.07.49 2.617.987.547.497.88 1.346.938 2.568.058 1.277.069 1.655.069 4.85s-.012 3.584-.07 4.85c-.058 1.221-.49 2.07-.987 2.617-.497.547-1.346.88-2.568.938-1.277.058-1.655.069-4.85.069s-3.584-.012-4.85-.07c-1.221-.058-2.07-.49-2.617-.987-.547-.497-.88-1.346-.938-2.568C2.012 19.73 2 19.352 2 16.158s.012-3.584.07-4.85c.058-1.221.49-2.07.987-2.617.497-.547 1.346-.88 2.568-.938 1.277-.058 1.655-.069 4.85-.069s3.584.012 4.85.07c1.221.058 2.07.49 2.617.987.547.497.88 1.346.938 2.568.058 1.277.069 1.655.069 4.85s-.012 3.584-.07 4.85c-.058 1.221-.49 2.07-.987 2.617-.497.547-1.346.88-2.568.938-1.277.058-1.655.069-4.85.069z" />
                </svg>
              </a>
            </div>
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
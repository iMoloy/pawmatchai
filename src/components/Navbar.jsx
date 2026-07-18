"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const publicLinks = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore Pets" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const protectedLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pets/add", label: "Add Pet" },
  { href: "/pets/manage", label: "Manage Pets" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (href) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navLinkClass = (href) =>
    `font-medium text-sm transition-colors ${
      isActive(href)
        ? "text-teal-700 font-bold"
        : "text-slate-600 hover:text-teal-700"
    }`;

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/70 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-black text-teal-700 tracking-tight shrink-0">
            <img src="/logo.png" alt="PawMatchAI Logo" className="w-8 h-8 object-contain" />
            <span>PawMatch<span className="text-pink-500">AI</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-7">
            {publicLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={navLinkClass(href)}>{label}</Link>
            ))}
            {user && protectedLinks.map(({ href, label }) => (
              <Link key={href} href={href} className={navLinkClass(href)}>{label}</Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-slate-500 font-medium hidden lg:block">
                  Hi, <span className="text-slate-800 font-bold">{user.name?.split(" ")[0]}</span>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-full font-medium hover:bg-slate-100 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-4 py-2 text-sm text-slate-600 border border-slate-200 rounded-full font-medium hover:bg-slate-100 transition-colors">
                  Login
                </Link>
                <Link href="/register" className="px-4 py-2 text-sm bg-teal-700 text-white rounded-full font-semibold hover:bg-teal-800 transition-colors shadow-sm">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-slate-700 hover:text-teal-700 p-2"
            onClick={() => setMobileOpen(prev => !prev)}
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
          {publicLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(href) ? "bg-teal-50 text-teal-700 font-bold" : "text-slate-700 hover:bg-slate-50"}`}
            >
              {label}
            </Link>
          ))}
          {user && (
            <>
              <div className="border-t border-slate-100 pt-2 mt-2">
                {protectedLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isActive(href) ? "bg-teal-50 text-teal-700 font-bold" : "text-slate-700 hover:bg-slate-50"}`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-slate-100 pt-2 mt-2">
                <button onClick={handleLogout} className="block w-full text-left px-3 py-2.5 text-sm text-red-600 font-medium hover:bg-red-50 rounded-xl">
                  Logout
                </button>
              </div>
            </>
          )}
          {!user && (
            <div className="border-t border-slate-100 pt-3 mt-2 flex gap-2">
              <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2.5 border border-slate-200 text-sm font-medium text-slate-700 rounded-xl hover:bg-slate-50">
                Login
              </Link>
              <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2.5 bg-teal-700 text-sm font-semibold text-white rounded-xl hover:bg-teal-800">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

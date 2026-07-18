"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-bold text-teal-700">
              PawMatch<span className="text-coral-500">AI</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-700 hover:text-teal-700 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              href="/explore"
              className="text-slate-700 hover:text-teal-700 transition-colors font-medium"
            >
              Explore Pets
            </Link>
            {isLoggedIn && (
              <>
                <Link
                  href="/dashboard"
                  className="text-slate-700 hover:text-teal-700 transition-colors font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  href="/add-pet"
                  className="text-slate-700 hover:text-teal-700 transition-colors font-medium"
                >
                  Add Pet
                </Link>
                <Link
                  href="/manage-pets"
                  className="text-slate-700 hover:text-teal-700 transition-colors font-medium"
                >
                  Manage Pets
                </Link>
                <Link
                  href="/chat"
                  className="text-slate-700 hover:text-teal-700 transition-colors font-medium"
                >
                  Chat
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-5 py-2 text-slate-700 border border-slate-300 rounded-full font-medium hover:bg-slate-100 transition-colors"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-5 py-2 text-slate-700 border border-slate-300 rounded-full font-medium hover:bg-slate-100 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-5 py-2 bg-teal-700 text-white rounded-full font-medium hover:bg-teal-800 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-slate-700 hover:text-teal-700">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

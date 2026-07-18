"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useGoogleLogin } from "@react-oauth/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LoginPage() {
  const { login, loginWithGoogle, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, redirect away
  useEffect(() => {
    if (user) {
      router.push(callbackUrl);
    }
  }, [user, router, callbackUrl]);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");
    
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);
    const result = await login(email, password);
    setIsLoading(false);

    if (result.success) {
      router.push(callbackUrl);
    } else {
      setError(result.message);
    }
  };

  const handleDemoLogin = () => {
    setEmail("demo@pawmatch.ai");
    setPassword("pawmatch2026");
    // We defer submission slightly so state updates first
    setTimeout(() => {
      document.getElementById("login-form").requestSubmit();
    }, 100);
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      setError("");
      
      const result = await loginWithGoogle(tokenResponse.access_token);
      setIsLoading(false);

      if (result.success) {
        router.push(callbackUrl);
      } else {
        setError(result.message);
      }
    },
    onError: () => {
      setError("Google Login failed. Please try again.");
    }
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">Welcome Back</h1>
              <p className="text-slate-500 mt-2 text-sm">Sign in to find your perfect furry friend</p>
            </div>

            {error && (
              <div className="mb-6 p-3.5 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm font-medium flex items-center gap-2">
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {error}
              </div>
            )}

            <form id="login-form" onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm"
                  placeholder="you@example.com"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Password</label>
                  <a href="#" className="text-xs font-semibold text-teal-600 hover:text-teal-800 transition-colors">Forgot?</a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all text-sm"
                  placeholder="••••••••"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-teal-700 text-white font-bold rounded-xl hover:bg-teal-850 active:scale-[0.98] transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <div className="my-6 flex items-center before:flex-1 before:border-t before:border-slate-200 after:flex-1 after:border-t after:border-slate-200">
              <span className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider">or</span>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleGoogleLogin()}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-sm font-semibold text-slate-700 shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-3 px-4 bg-slate-800 text-white rounded-xl hover:bg-slate-900 transition-colors text-sm font-semibold shadow-sm flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Try Demo Account
              </button>
            </div>
          </div>

          <div className="bg-slate-50 px-8 py-5 text-center border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Don't have an account?{' '}
              <Link href={`/register?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="font-bold text-teal-700 hover:text-teal-900 transition-colors">
                Sign up here
              </Link>
            </p>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

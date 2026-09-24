"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const getNavLinks = (user: any) => {
 const baseLinks = [
 { href: "/", label: "Home" },
 { href: "/explore", label: "Explore Pets" },
 { href: "/ai-match", label: "AI Matcher" },
 ];
 if (user) {
 baseLinks.push({ href: "/pets/add", label: "Add Pet" });
 baseLinks.push({ href: "/pets/manage", label: "Manage Pets" });
 }
 baseLinks.push({ href: "/about", label: "About" });
 baseLinks.push({ href: "/contact", label: "Contact" });
 return baseLinks;
};

export default function Navbar() {
 const [mobileOpen, setMobileOpen] = useState(false);
 const { user, logout } = useAuth();
 const pathname = usePathname();

 const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

 const navLinkClass = (href: string) =>
 `transition-colors flex items-center gap-1.5 ${
 isActive(href)
 ? "text-teal-600 font-extrabold text-[15px]"
 : "text-slate-600 font-medium text-sm hover:text-teal-600"
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
 <Link href="/" className="flex items-center gap-2.5 text-xl font-black text-teal-700 tracking-tight shrink-0">
 <div className="relative w-9 h-9">
 <Image src="/logo-icon.png" alt="PawMatchAI Logo" fill className="object-contain" priority />
 </div>
 <span>PawMatch<span className="text-[#ff6a52]">AI</span></span>
 </Link>

 {/* Desktop Nav */}
 <div className="hidden md:flex items-center gap-7">
 {getNavLinks(user).map(({ href, label }) => {
 const active = isActive(href);
 return (
 <Link key={href} href={href} className={navLinkClass(href)}>
 {active && <span>🐾</span>}
 {label}
 </Link>
 );
 })}
 </div>

 {/* Desktop Auth */}
 <div className="hidden md:flex items-center gap-3">
 {user ? (
 <>
 <Link href="/profile" className="text-sm text-slate-500 font-medium hidden lg:flex items-center gap-2 hover:opacity-80 transition-opacity">
 <img 
 src={user.avatar || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop"} 
 alt={user.name} 
 className="w-8 h-8 rounded-full object-cover border border-slate-200" 
 />
 <span>Hi, <span className="text-slate-800 font-bold hover:text-teal-700 transition-colors">{user.name?.split(" ")[0]}</span></span>
 </Link>
 <button
 onClick={handleLogout}
 className="btn-gradient px-4 py-2 text-sm rounded-full font-medium shadow-sm"
 >
 Logout
 </button>
 </>
 ) : (
 <>
 <Link href="/login" className="px-4 py-2 text-sm bg-linear-to-r from-red-400 to-red-500 text-white border-0 rounded-full font-medium hover:from-red-500 hover:to-red-600 transition-colors shadow-sm">
 Login
 </Link>
 <Link href="/register" className="px-4 py-2 text-sm bg-linear-to-r from-teal-600 to-emerald-600 text-white border-0 rounded-full font-semibold hover:from-teal-700 hover:to-emerald-700 transition-colors shadow-sm">
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
 <span className="text-xl">✖️</span>
 ) : (
 <span className="text-2xl">☰</span>
 )}
 </button>
 </div>
 </div>

 {/* Mobile Menu */}
 {mobileOpen && (
 <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-1">
 {getNavLinks(user).map(({ href, label }) => {
 const active = isActive(href);
 return (
 <Link
 key={href}
 href={href}
 onClick={() => setMobileOpen(false)}
 className={`flex items-center gap-2 px-3 py-2.5 rounded-xl transition-colors ${active ? "bg-teal-50 text-teal-600 font-extrabold text-base" : "text-slate-700 font-medium text-sm hover:bg-slate-50"}`}
 >
 {active && <span>🐾</span>}
 {label}
 </Link>
 );
 })}
 {user && (
 <>
 <div className="border-t border-slate-100 pt-3 mt-2 mb-1 px-3">
 <Link href="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors">
 <img 
 src={user.avatar || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=200&auto=format&fit=crop"} 
 alt={user.name} 
 className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm" 
 />
 <div>
 <p className="text-sm font-bold text-slate-800">{user.name}</p>
 <p className="text-xs text-teal-600 font-medium">View Profile</p>
 </div>
 </Link>
 </div>

 <div className="border-t border-slate-100 pt-2 mt-2">
 <button onClick={handleLogout} className="btn-gradient block w-full text-center px-3 py-2.5 text-sm font-medium rounded-full">
 Logout
 </button>
 </div>
 </>
 )}
 {!user && (
 <div className="border-t border-slate-100 pt-3 mt-2 flex gap-2">
 <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2.5 bg-linear-to-r from-red-400 to-red-500 text-white border-0 text-sm font-medium rounded-full hover:from-red-500 hover:to-red-600 shadow-sm">
 Login
 </Link>
 <Link href="/register" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-2.5 bg-linear-to-r from-teal-600 to-emerald-600 border-0 text-sm font-semibold text-white rounded-full hover:from-teal-700 hover:to-emerald-700 shadow-sm">
 Register
 </Link>
 </div>
 )}
 </div>
 )}
 </nav>
 );
}

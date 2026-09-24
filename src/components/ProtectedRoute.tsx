"use client";

import React, { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
 const { user, isLoading } = useAuth();
 const router = useRouter();
 const pathname = usePathname();

 useEffect(() => {
 if (!isLoading && !user) {
 router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
 }
 }, [user, isLoading, router, pathname]);

 // Show a loading skeleton/spinner while checking auth state
 if (isLoading) {
 return (
 <div className="min-h-screen flex items-center justify-center bg-slate-50">
 <div className="flex flex-col items-center">
 <span className="animate-bounce text-4xl mb-4">⏳</span>
 <p className="text-slate-500 font-medium">Verifying access...</p>
 </div>
 </div>
 );
 }

 if (!user) {
 return null;
 }

 return <>{children}</>;
}

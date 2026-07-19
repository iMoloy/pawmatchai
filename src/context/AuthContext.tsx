"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
  avatar?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  loginWithGoogle: (accessToken: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const storedUser = localStorage.getItem("pawmatch_user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (e) {
      console.error("Failed to parse stored user", e);
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${getApiUrl()}/api/auth/login`, { email, password });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("pawmatch_user", JSON.stringify(res.data.user));
        return { success: true };
      }
      return { success: false, message: res.data.message || "Login failed" };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed. Please try again."
      };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${getApiUrl()}/api/auth/register`, { name, email, password });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("pawmatch_user", JSON.stringify(res.data.user));
        return { success: true };
      }
      return { success: false, message: res.data.message || "Registration failed" };
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed. Please try again."
      };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (accessToken: string) => {
    try {
      setIsLoading(true);
      const res = await axios.post(`${getApiUrl()}/api/auth/google`, { accessToken });
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("pawmatch_user", JSON.stringify(res.data.user));
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (error: any) {
      console.error("Google login failed", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Google login failed. Please try again.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pawmatch_user");
    router.push("/login");
  };

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <AuthContext.Provider
        value={{ user, isLoading, login, register, loginWithGoogle, logout }}
      >
        {children}
      </AuthContext.Provider>
    </GoogleOAuthProvider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

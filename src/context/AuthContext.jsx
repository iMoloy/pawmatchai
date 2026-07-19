"use client";

import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
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

  const login = async (email, password) => {
    // Mock login delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (email && password) {
      const loggedInUser = {
        id: "usr_12345",
        name: email.split("@")[0],
        email,
        token: "mock-jwt-token-abc-123",
      };
      setUser(loggedInUser);
      localStorage.setItem("pawmatch_user", JSON.stringify(loggedInUser));
      return { success: true };
    }
    return { success: false, message: "Invalid email or password" };
  };

  const register = async (name, email, password) => {
    // Mock register delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (name && email && password) {
      const newUser = {
        id: "usr_99999",
        name,
        email,
        token: "mock-jwt-token-xyz-999",
      };
      setUser(newUser);
      localStorage.setItem("pawmatch_user", JSON.stringify(newUser));
      return { success: true };
    }
    return { success: false, message: "Please fill all required fields" };
  };

  const loginWithGoogle = async (accessToken) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL || "https://pawmatchai-server.onrender.com"}/api/auth/google`,
        { accessToken },
      );
      if (res.data.success) {
        setUser(res.data.user);
        localStorage.setItem("pawmatch_user", JSON.stringify(res.data.user));
        return { success: true };
      }
      return { success: false, message: res.data.message };
    } catch (error) {
      console.error("Google login failed", error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Google login failed. Please try again.",
      };
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

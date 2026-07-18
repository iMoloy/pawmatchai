"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load user from local storage on initial mount
  useEffect(() => {
    const storedUser = localStorage.getItem("pawmatch_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
    setIsLoading(false);
  }, []);

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

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pawmatch_user");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}


import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types";
import { users } from "../services/mockData";
import { toast } from "sonner";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, password would be hashed and validated against database
      // For now, just check if email exists (password is ignored in this mock)
      const user = users.find(u => u.email === email);
      
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("currentUser", JSON.stringify(user));
        toast.success("Logged in successfully");
      } else {
        toast.error("Invalid email or password");
        throw new Error("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      const existingUser = users.find(u => u.email === email);
      
      if (existingUser) {
        toast.error("Email already in use");
        throw new Error("Email already in use");
      }
      
      // Create new user (in a real app, this would save to database)
      const newUser: User = {
        id: String(users.length + 1),
        name,
        email,
        isAdmin: false
      };
      
      // Add to mock data (in memory only for demo)
      users.push(newUser);
      
      // Set as current user
      setCurrentUser(newUser);
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      
      toast.success("Account created successfully");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    toast.info("Logged out successfully");
  };

  const value = {
    currentUser,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

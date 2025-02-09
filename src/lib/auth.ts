import { createContext, useContext } from "react";
import { supabase } from "./supabase";

import { Profile } from "@/types/database";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: "user" | "dealer" | "admin";
  is_verified?: boolean;
  profile?: Profile;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

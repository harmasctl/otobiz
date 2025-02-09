import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, User } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      if (session?.user) {
        await fetchUserProfile(session.user.id);
        if (event === "SIGNED_IN") {
          navigate("/");
        }
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user?.user_metadata?.full_name) {
          const { error: createError } = await supabase
            .from("profiles")
            .insert([
              {
                id: userId,
                full_name: user.user_metadata.full_name,
                email: user.email,
                avatar_url: user.user_metadata.avatar_url,
                role: "user",
                is_verified: false,
              },
            ]);
          if (createError) throw createError;

          setUser({
            id: userId,
            name: user.user_metadata.full_name,
            email: user.email || "",
            avatar: user.user_metadata.avatar_url,
            role: "user",
            is_verified: false,
          });
        } else {
          throw error;
        }
      } else {
        setUser({
          id: userId,
          name: profile.full_name,
          email: profile.email,
          avatar: profile.avatar_url,
          role: profile.role,
          is_verified: profile.is_verified,
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin + "/auth/callback",
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (!data.user) throw new Error("No user returned from login");

      await fetchUserProfile(data.user.id);
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
          },
          emailRedirectTo: window.location.origin + "/auth/callback",
        },
      });

      if (error) throw error;
      if (!authData.user) throw new Error("No user returned from signup");

      if (authData.session === null) {
        navigate("/auth/login", {
          state: {
            message:
              "Please check your email to confirm your account before logging in.",
          },
        });
        return;
      }

      if (authData.session) {
        setUser({
          id: authData.user.id,
          name: data.name,
          email: data.email,
          role: "user",
          is_verified: false,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      navigate("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

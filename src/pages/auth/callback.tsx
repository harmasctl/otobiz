import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;
        if (!session?.user) throw new Error("No user found");

        // Check if profile exists
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (!profile) {
          // Create profile for new user
          await supabase.from("profiles").insert([
            {
              id: session.user.id,
              full_name: session.user.user_metadata.full_name || "",
              email: session.user.email,
              avatar_url: session.user.user_metadata.avatar_url,
              role: "user",
              is_verified: false,
            },
          ]);
        }

        // Redirect to home page
        navigate("/", { replace: true });
      } catch (error) {
        console.error("Error in auth callback:", error);
        navigate("/auth/login", { replace: true });
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse">
          <h2 className="text-2xl font-semibold mb-2">Completing sign in...</h2>
          <p className="text-muted-foreground">
            Please wait while we redirect you.
          </p>
        </div>
      </div>
    </div>
  );
}

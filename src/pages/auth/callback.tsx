import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the URL hash
        const hash = window.location.hash;
        if (!hash) throw new Error("No hash found in URL");

        // Parse the access token from the URL
        const accessToken = new URLSearchParams(hash.substring(1)).get(
          "access_token",
        );
        if (!accessToken) throw new Error("No access token found");

        // Exchange the access token for a session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: null,
        });

        if (sessionError) throw sessionError;
        if (!session?.user) throw new Error("No user in session");

        // Check if profile exists
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (!profile) {
          // Create profile for new user
          const { error: profileError } = await supabase
            .from("profiles")
            .insert([
              {
                id: session.user.id,
                full_name: session.user.user_metadata.full_name || "",
                email: session.user.email,
                avatar_url: session.user.user_metadata.avatar_url,
                role: "user",
              },
            ]);

          if (profileError) {
            console.error("Error creating profile:", profileError);
            setError("Failed to create user profile");
            return;
          }
        }

        // Redirect to home page after successful authentication
        navigate("/", { replace: true });
      } catch (err) {
        console.error("Error in auth callback:", err);
        setError("An unexpected error occurred");
        setTimeout(() => navigate("/login", { replace: true }), 2000);
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        {error ? (
          <div className="text-destructive">
            <h2 className="text-2xl font-semibold mb-2">
              Authentication Error
            </h2>
            <p>{error}</p>
          </div>
        ) : (
          <div className="animate-pulse">
            <h2 className="text-2xl font-semibold mb-2">
              Completing sign in...
            </h2>
            <p className="text-muted-foreground">
              Please wait while we redirect you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { Profile } from "@/types/database";
import { profilesApi } from "@/lib/api/profiles";
import { useAuth } from "@/lib/auth";

export function useProfile(id?: string) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const profileId = id || user?.id;

  useEffect(() => {
    if (!profileId) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const data = await profilesApi.get(profileId);
        setProfile(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [profileId]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!profileId) return;

    try {
      const updated = await profilesApi.update(profileId, updates);
      setProfile(updated);
      return updated;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateAvatar = async (file: File) => {
    if (!profileId) return;

    try {
      const updated = await profilesApi.updateAvatar(profileId, file);
      setProfile(updated);
      return updated;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    profile,
    loading,
    error,
    updateProfile,
    updateAvatar,
  };
}

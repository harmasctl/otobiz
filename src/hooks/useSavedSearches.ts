import { useState, useEffect } from "react";
import { SavedSearch } from "@/types/database";
import { savedSearchesApi } from "@/lib/api/saved-searches";
import { useAuth } from "@/lib/auth";

export function useSavedSearches() {
  const { user } = useAuth();
  const [searches, setSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchSearches = async () => {
      try {
        const data = await savedSearchesApi.list();
        setSearches(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearches();
  }, [user]);

  const saveSearch = async (name: string, filters: Record<string, any>) => {
    try {
      const saved = await savedSearchesApi.create({ name, filters });
      setSearches((prev) => [saved, ...prev]);
      return saved;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteSearch = async (id: string) => {
    try {
      await savedSearchesApi.delete(id);
      setSearches((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    searches,
    loading,
    error,
    saveSearch,
    deleteSearch,
  };
}

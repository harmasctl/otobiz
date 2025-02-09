import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { VehicleFilters } from "./useVehicleSearch";

export interface SavedSearch {
  id: string;
  user_id: string;
  filters: VehicleFilters;
  name: string;
  created_at: string;
}

export function useSavedSearches() {
  const { user } = useAuth();
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSavedSearches = async () => {
      try {
        const { data, error } = await supabase
          .from("saved_searches")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setSavedSearches(data || []);
      } catch (err) {
        console.error("Error fetching saved searches:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedSearches();

    // Set up real-time subscription
    const subscription = supabase
      .channel("saved_searches_channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "saved_searches",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          fetchSavedSearches();
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const saveSearch = async (name: string, filters: VehicleFilters) => {
    if (!user) return;

    try {
      const { error } = await supabase.from("saved_searches").insert([
        {
          user_id: user.id,
          name,
          filters,
        },
      ]);

      if (error) throw error;
    } catch (err) {
      console.error("Error saving search:", err);
      throw err;
    }
  };

  const deleteSearch = async (id: string) => {
    try {
      const { error } = await supabase
        .from("saved_searches")
        .delete()
        .eq("id", id)
        .eq("user_id", user?.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error deleting saved search:", err);
      throw err;
    }
  };

  return {
    savedSearches,
    loading,
    saveSearch,
    deleteSearch,
  };
}

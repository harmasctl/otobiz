import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

export function useVehicleFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const { data, error } = await supabase
          .from("favorites")
          .select("vehicle_id")
          .eq("user_id", user.id);

        if (error) throw error;
        setFavorites(data.map((f) => f.vehicle_id));
      } catch (err) {
        console.error("Error fetching favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();

    // Set up realtime subscription
    const subscription = supabase
      .channel("favorites_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "favorites",
          filter: `user_id=eq.${user.id}`,
        },
        () => fetchFavorites(),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const toggleFavorite = async (vehicleId: string) => {
    if (!user) return;

    try {
      if (favorites.includes(vehicleId)) {
        // Remove from favorites
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", user.id)
          .eq("vehicle_id", vehicleId);

        if (error) throw error;
      } else {
        // Add to favorites
        const { error } = await supabase
          .from("favorites")
          .insert([{ user_id: user.id, vehicle_id: vehicleId }]);

        if (error) throw error;
      }
    } catch (err) {
      console.error("Error toggling favorite:", err);
      throw err;
    }
  };

  return {
    favorites,
    loading,
    toggleFavorite,
    isFavorite: (vehicleId: string) => favorites.includes(vehicleId),
  };
}

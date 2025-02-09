import { useState, useEffect } from "react";
import { Favorite } from "@/types/database";
import { favoritesApi } from "@/lib/api/favorites";
import { useAuth } from "@/lib/auth";

export function useFavorites() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        const data = await favoritesApi.list();
        setFavorites(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const addFavorite = async (vehicleId: string) => {
    try {
      const added = await favoritesApi.add(vehicleId);
      setFavorites((prev) => [added, ...prev]);
      return added;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const removeFavorite = async (vehicleId: string) => {
    try {
      await favoritesApi.remove(vehicleId);
      setFavorites((prev) => prev.filter((f) => f.vehicle_id !== vehicleId));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    isFavorite: (vehicleId: string) =>
      favorites.some((f) => f.vehicle_id === vehicleId),
  };
}

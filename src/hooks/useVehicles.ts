import { useState, useEffect } from "react";
import { Vehicle } from "@/types/database";
import { vehiclesApi } from "@/lib/api/vehicles";

export function useVehicles(filters?: Record<string, any>) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const data = await vehiclesApi.list(filters);
        setVehicles(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, [filters]);

  const createVehicle = async (vehicle: Omit<Vehicle, "id" | "created_at">) => {
    try {
      const created = await vehiclesApi.create(vehicle);
      setVehicles((prev) => [created, ...prev]);
      return created;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateVehicle = async (id: string, updates: Partial<Vehicle>) => {
    try {
      const updated = await vehiclesApi.update(id, updates);
      setVehicles((prev) =>
        prev.map((v) => (v.id === updated.id ? updated : v)),
      );
      return updated;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteVehicle = async (id: string) => {
    try {
      await vehiclesApi.delete(id);
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const uploadImages = async (id: string, files: File[]) => {
    try {
      const updated = await vehiclesApi.uploadImages(id, files);
      setVehicles((prev) =>
        prev.map((v) => (v.id === updated.id ? updated : v)),
      );
      return updated;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    vehicles,
    loading,
    error,
    createVehicle,
    updateVehicle,
    deleteVehicle,
    uploadImages,
  };
}

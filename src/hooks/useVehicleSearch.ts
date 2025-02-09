import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Tables } from "@/types/supabase";

type Vehicle = Tables<"vehicles">;

export interface VehicleFilters {
  make?: string[];
  model?: string[];
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  minMileage?: number;
  maxMileage?: number;
  fuelType?: string[];
  transmission?: string[];
  location?: string;
  sortBy?: "price_asc" | "price_desc" | "year_desc" | "mileage_asc";
}

export function useVehicleSearch(initialFilters?: VehicleFilters) {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<VehicleFilters>(initialFilters || {});
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        setLoading(true);
        setError(null);

        let query = supabase.from("vehicles").select("*", { count: "exact" });

        // Apply filters
        if (filters.make?.length) {
          query = query.in("make", filters.make);
        }
        if (filters.model?.length) {
          query = query.in("model", filters.model);
        }
        if (filters.minPrice) {
          query = query.gte("price", filters.minPrice);
        }
        if (filters.maxPrice) {
          query = query.lte("price", filters.maxPrice);
        }
        if (filters.minYear) {
          query = query.gte("year", filters.minYear);
        }
        if (filters.maxYear) {
          query = query.lte("year", filters.maxYear);
        }
        if (filters.minMileage) {
          query = query.gte("mileage", filters.minMileage);
        }
        if (filters.maxMileage) {
          query = query.lte("mileage", filters.maxMileage);
        }
        if (filters.fuelType?.length) {
          query = query.in("fuel_type", filters.fuelType);
        }
        if (filters.transmission?.length) {
          query = query.in("transmission", filters.transmission);
        }
        if (filters.location) {
          query = query.ilike("location", `%${filters.location}%`);
        }

        // Apply sorting
        switch (filters.sortBy) {
          case "price_asc":
            query = query.order("price", { ascending: true });
            break;
          case "price_desc":
            query = query.order("price", { ascending: false });
            break;
          case "year_desc":
            query = query.order("year", { ascending: false });
            break;
          case "mileage_asc":
            query = query.order("mileage", { ascending: true });
            break;
          default:
            query = query.order("created_at", { ascending: false });
        }

        const { data, error: fetchError, count } = await query;

        if (fetchError) throw fetchError;

        setVehicles(data || []);
        setTotal(count || 0);
      } catch (err) {
        console.error("Error fetching vehicles:", err);
        setError("Failed to fetch vehicles");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();

    // Set up real-time subscription
    const subscription = supabase
      .channel("vehicles_channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "vehicles" },
        () => fetchVehicles(),
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [filters]);

  return {
    vehicles,
    loading,
    error,
    filters,
    setFilters,
    total,
  };
}

import { useState } from "react";

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

export function useVehicleFilters(initialFilters?: VehicleFilters) {
  const [filters, setFilters] = useState<VehicleFilters>(initialFilters || {});

  const updateFilter = (key: keyof VehicleFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const addArrayFilter = (key: keyof VehicleFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: [...((prev[key] as string[]) || []), value],
    }));
  };

  const removeArrayFilter = (key: keyof VehicleFilters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: ((prev[key] as string[]) || []).filter((v) => v !== value),
    }));
  };

  return {
    filters,
    updateFilter,
    clearFilters,
    addArrayFilter,
    removeArrayFilter,
  };
}

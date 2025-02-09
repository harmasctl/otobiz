import React from "react";
import VehicleGrid from "@/components/marketplace/VehicleGrid";

export default function SavedVehiclesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Saved Vehicles</h1>
        <p className="text-muted-foreground">Manage your favorite vehicles</p>
      </div>

      <VehicleGrid />
    </div>
  );
}

import React from "react";
import { Button } from "@/components/ui/button";
import VehicleGrid from "@/components/marketplace/VehicleGrid";
import { Plus } from "lucide-react";

export default function MyListingsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">My Listings</h1>
          <p className="text-muted-foreground">Manage your vehicle listings</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Listing
        </Button>
      </div>

      <VehicleGrid />
    </div>
  );
}

import React from "react";
import { useParams } from "react-router-dom";
import VehicleDetails from "@/components/marketplace/VehicleDetails";

export default function VehicleDetailsPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background py-8">
      <VehicleDetails />
    </div>
  );
}

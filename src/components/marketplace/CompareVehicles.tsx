import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Vehicle } from "@/types/database";

interface CompareVehiclesProps {
  vehicles: Vehicle[];
}

export function CompareVehicles({ vehicles }: CompareVehiclesProps) {
  const features = [
    "make",
    "model",
    "year",
    "price",
    "mileage",
    "fuel_type",
    "transmission",
  ];

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Compare Vehicles</h2>
      <ScrollArea className="w-full">
        <div className="min-w-[800px]">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2">Feature</th>
                {vehicles.map((vehicle) => (
                  <th key={vehicle.id} className="text-left p-2">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature} className="border-t">
                  <td className="p-2 font-medium capitalize">
                    {feature.replace("_", " ")}
                  </td>
                  {vehicles.map((vehicle) => (
                    <td key={vehicle.id} className="p-2">
                      {vehicle[feature as keyof Vehicle]?.toString() || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </Card>
  );
}

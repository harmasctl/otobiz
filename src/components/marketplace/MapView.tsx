import React, { Suspense } from "react";
import { Card } from "../ui/card";
import OpenLayersMap from "./OpenLayersMap";
import { MapLocation } from "@/types/map";

const defaultLocations: MapLocation[] = [
  {
    id: "1",
    lat: 14.7167,
    lng: -17.4677,
    title: "2019 Toyota Camry",
    price: "$15,000",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop",
  },
  {
    id: "2",
    lat: 14.7366,
    lng: -17.4545,
    title: "2020 Honda Civic",
    price: "$17,500",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop",
  },
  {
    id: "3",
    lat: 14.7266,
    lng: -17.4777,
    title: "2018 Ford Focus",
    price: "$12,000",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop",
  },
];

interface MapViewProps {
  locations?: MapLocation[];
  onMarkerClick?: (location: MapLocation) => void;
  selectedLocation?: string;
}

const MapView = ({
  locations = defaultLocations,
  onMarkerClick = () => {},
  selectedLocation,
}: MapViewProps) => {
  return (
    <div className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden">
      <Suspense
        fallback={
          <div className="w-full h-full bg-muted animate-pulse rounded-lg" />
        }
      >
        <OpenLayersMap locations={locations} onMarkerClick={onMarkerClick} />
      </Suspense>
      {/* Tooltip overlay for selected location */}
      {selectedLocation && (
        <div className="absolute top-4 right-4 z-10">
          <Card className="w-64 p-3">
            <img
              src={locations.find((l) => l.id === selectedLocation)?.image}
              alt={locations.find((l) => l.id === selectedLocation)?.title}
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h3 className="text-sm font-medium">
              {locations.find((l) => l.id === selectedLocation)?.title}
            </h3>
            <p className="text-sm text-primary">
              {locations.find((l) => l.id === selectedLocation)?.price}
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MapView;

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Grid2X2, Map } from "lucide-react";
import VehicleCard from "./VehicleCard";
import MapView from "./MapView";

interface Vehicle {
  id: string;
  image: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  location: string;
  transmission: string;
  fuelType: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface VehicleGridProps {
  vehicles?: Vehicle[];
  onVehicleClick?: (vehicle: Vehicle) => void;
  onFavoriteClick?: (vehicle: Vehicle) => void;
}

const defaultVehicles: Vehicle[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&h=300&fit=crop",
    title: "2020 Toyota Camry",
    price: 15000,
    year: 2020,
    mileage: 50000,
    location: "Dakar, Senegal",
    transmission: "Automatic",
    fuelType: "Gasoline",
    coordinates: { lat: 14.7167, lng: -17.4677 },
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&h=300&fit=crop",
    title: "2019 Honda Civic",
    price: 12000,
    year: 2019,
    mileage: 65000,
    location: "Saint-Louis, Senegal",
    transmission: "Manual",
    fuelType: "Diesel",
    coordinates: { lat: 14.7366, lng: -17.4545 },
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=500&h=300&fit=crop",
    title: "2021 Hyundai Tucson",
    price: 20000,
    year: 2021,
    mileage: 35000,
    location: "Thiès, Senegal",
    transmission: "Automatic",
    fuelType: "Gasoline",
    coordinates: { lat: 14.7266, lng: -17.4777 },
  },
];

const VehicleGrid: React.FC<VehicleGridProps> = ({
  vehicles = defaultVehicles,
  onVehicleClick = () => {},
  onFavoriteClick = () => {},
}) => {
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [selectedVehicle, setSelectedVehicle] = useState<string | undefined>();

  const toggleViewMode = () => {
    setViewMode(viewMode === "grid" ? "map" : "grid");
  };

  const handleMarkerClick = (location: { id: string }) => {
    setSelectedVehicle(location.id);
  };

  return (
    <div className="w-full h-full bg-background p-4 sm:p-6">
      <div className="mb-6 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          {vehicles.length} vehicles found
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={toggleViewMode}
            className="flex items-center gap-2"
          >
            {viewMode === "grid" ? (
              <>
                <Map className="h-4 w-4" />
                Show Map
              </>
            ) : (
              <>
                <Grid2X2 className="h-4 w-4" />
                Show Grid
              </>
            )}
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 justify-items-center">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              image={vehicle.image}
              title={vehicle.title}
              price={vehicle.price}
              year={vehicle.year}
              mileage={vehicle.mileage}
              location={vehicle.location}
              transmission={vehicle.transmission}
              fuelType={vehicle.fuelType}
              onClick={() => onVehicleClick(vehicle)}
              onFavorite={() => onFavoriteClick(vehicle)}
            />
          ))}
        </div>
      ) : (
        <div className="h-[800px] w-full">
          <MapView
            locations={vehicles.map((v) => ({
              id: v.id,
              lat: v.coordinates.lat,
              lng: v.coordinates.lng,
              title: v.title,
              price: `$${v.price.toLocaleString()}`,
              image: v.image,
            }))}
            onMarkerClick={handleMarkerClick}
            selectedLocation={selectedVehicle}
          />
        </div>
      )}
    </div>
  );
};

export default VehicleGrid;

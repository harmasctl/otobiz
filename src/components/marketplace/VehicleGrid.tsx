import React from "react";
import VehicleCard from "./VehicleCard";

interface Vehicle {
  id: string;
  image: string;
  title: string;
  monthlyPrice: number;
  initialPayment: number;
  contractLength: number;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  engineSize: string;
  power: string;
  rating: number;
  isNew: boolean;
}

interface VehicleGridProps {
  vehicles?: Vehicle[];
  onVehicleClick?: (id: string) => void;
  onFavorite?: (id: string) => void;
}

const defaultVehicles: Vehicle[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop",
    title: "Renault Austral E-Tech",
    monthlyPrice: 235,
    initialPayment: 2811,
    contractLength: 24,
    year: 2023,
    mileage: 0,
    fuelType: "Hybrid",
    transmission: "Automatic",
    engineSize: "1.6L",
    power: "200 HP",
    rating: 4.5,
    isNew: true,
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop",
    title: "Cupra Born V2",
    monthlyPrice: 232,
    initialPayment: 2774,
    contractLength: 24,
    year: 2023,
    mileage: 0,
    fuelType: "Electric",
    transmission: "Automatic",
    engineSize: "N/A",
    power: "204 HP",
    rating: 4.7,
    isNew: true,
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259b6e14?w=800&h=600&fit=crop",
    title: "Nissan Qashqai e-Power",
    monthlyPrice: 237,
    initialPayment: 2835,
    contractLength: 36,
    year: 2023,
    mileage: 0,
    fuelType: "Hybrid",
    transmission: "Automatic",
    engineSize: "1.5L",
    power: "190 HP",
    rating: 4.6,
    isNew: true,
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop",
    title: "Skoda Kamiq Monte Carlo",
    monthlyPrice: 276,
    initialPayment: 3303,
    contractLength: 36,
    year: 2023,
    mileage: 0,
    fuelType: "Petrol",
    transmission: "Manual",
    engineSize: "1.5L",
    power: "150 HP",
    rating: 4.4,
    isNew: true,
  },
];

const VehicleGrid = ({
  vehicles = defaultVehicles,
  onVehicleClick = () => {},
  onFavorite = () => {},
}: VehicleGridProps) => {
  return (
    <div className="w-full bg-background">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            {...vehicle}
            onClick={onVehicleClick}
            onFavorite={onFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default VehicleGrid;

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Fuel, Gauge, Calendar, Award, Heart } from "lucide-react";
import { useVehicleFavorites } from "@/hooks/useVehicleFavorites";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

interface VehicleCardProps {
  id: string;
  image?: string;
  title: string;
  price?: number;
  year?: number;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  engineSize?: string;
  power?: string;
  rating?: number;
  isNew?: boolean;
  onClick?: (id: string) => void;
}

const VehicleCard = ({
  id,
  image = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&h=300&fit=crop",
  title = "Vehicle",
  price = 0,
  year = new Date().getFullYear(),
  mileage = 0,
  fuelType = "Not specified",
  transmission = "Not specified",
  engineSize,
  power,
  rating,
  isNew = false,
  onClick = () => {},
}: VehicleCardProps) => {
  const { user } = useAuth?.() || { user: null };
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useVehicleFavorites();

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      navigate("/login");
      return;
    }
    await toggleFavorite(id);
  };

  return (
    <Card
      className="group w-full overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white"
      onClick={() => onClick(id)}
    >
      <div className="relative">
        <div className="absolute top-2 left-2 bg-white/90 rounded-full px-2 py-1 text-xs flex items-center gap-1">
          <Camera className="h-3 w-3" />
          <span>20</span>
        </div>
        {isNew && (
          <Badge className="absolute top-2 right-2 bg-green-500">New</Badge>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 bg-white/90 hover:bg-white"
          onClick={handleFavorite}
        >
          <Heart
            className={`h-4 w-4 ${isFavorite(id) ? "fill-red-500 text-red-500" : ""}`}
          />
        </Button>
        <img
          src={image}
          alt={title}
          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 space-y-4">
        <div className="space-y-1">
          <div className="text-2xl font-bold">£{price.toLocaleString()}</div>
        </div>

        <div className="flex justify-between items-start">
          <h3 className="font-medium flex-1">{title}</h3>
          {rating && (
            <div className="flex items-center gap-1">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Gauge className="h-4 w-4 text-muted-foreground" />
            <span>{mileage.toLocaleString()} mi</span>
          </div>
          <div className="flex items-center gap-1">
            <Fuel className="h-4 w-4 text-muted-foreground" />
            <span>{fuelType}</span>
          </div>
          {power && (
            <div className="flex items-center gap-1">
              <svg
                className="h-4 w-4 text-muted-foreground"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2v20M17 7l-5-5-5 5" />
              </svg>
              <span>{power}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">
            {transmission}
          </Badge>
          {engineSize && (
            <Badge variant="secondary" className="text-xs">
              {engineSize}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
};

export default VehicleCard;

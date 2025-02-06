import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, Fuel, Gauge, Calendar, Award, Heart } from "lucide-react";

interface VehicleCardProps {
  id?: string;
  image?: string;
  title?: string;
  monthlyPrice?: number;
  initialPayment?: number;
  contractLength?: number;
  year?: number;
  mileage?: number;
  fuelType?: string;
  transmission?: string;
  engineSize?: string;
  power?: string;
  rating?: number;
  isNew?: boolean;
  onClick?: (id: string) => void;
  onFavorite?: (id: string) => void;
}

const VehicleCard = ({
  id = "1",
  image = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&h=300&fit=crop",
  title = "2020 Toyota Camry",
  monthlyPrice = 235,
  initialPayment = 2811,
  contractLength = 24,
  year = 2023,
  mileage = 0,
  fuelType = "Hybrid",
  transmission = "Automatic",
  engineSize = "2.0L",
  power = "204 HP",
  rating = 4.5,
  isNew = true,
  onClick = () => {},
  onFavorite = () => {},
}: VehicleCardProps) => {
  return (
    <Card className="group w-full max-w-[300px] overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer bg-white">
      <div className="relative" onClick={() => onClick(id)}>
        {/* Image count badge */}
        <div className="absolute top-2 left-2 bg-white/90 rounded-full px-2 py-1 text-xs flex items-center gap-1">
          <Camera className="h-3 w-3" />
          <span>20</span>
        </div>
        {/* New badge */}
        {isNew && (
          <Badge className="absolute top-2 right-2 bg-green-500">New</Badge>
        )}
        {/* Favorite button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 bg-white/90 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(id);
          }}
        >
          <Heart className="h-4 w-4" />
        </Button>
        <img
          src={image}
          alt={title}
          className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 space-y-4" onClick={() => onClick(id)}>
        {/* Price Section */}
        <div className="space-y-1">
          <div className="flex items-baseline gap-1">
            <span className="text-sm">From</span>
            <span className="text-2xl font-bold">£{monthlyPrice}</span>
            <span className="text-sm text-muted-foreground">/mo</span>
          </div>
          <div className="text-sm text-muted-foreground">
            £{initialPayment.toLocaleString()} initial payment
          </div>
          <div className="text-sm text-muted-foreground">
            {contractLength} month contract
          </div>
        </div>

        {/* Title and Rating */}
        <div className="flex justify-between items-start">
          <h3 className="font-medium flex-1">{title}</h3>
          <div className="flex items-center gap-1">
            <Award className="h-4 w-4 text-yellow-500" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>

        {/* Specs Grid */}
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
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary" className="text-xs">
            {transmission}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {engineSize}
          </Badge>
        </div>
      </div>
    </Card>
  );
};

export default VehicleCard;

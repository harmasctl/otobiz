import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Heart, MapPin } from "lucide-react";

interface VehicleCardProps {
  image?: string;
  title?: string;
  price?: number;
  year?: number;
  mileage?: number;
  location?: string;
  transmission?: string;
  fuelType?: string;
  onClick?: () => void;
  onFavorite?: () => void;
}

const VehicleCard = ({
  image = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=500&h=300&fit=crop",
  title = "2020 Toyota Camry",
  price = 15000,
  year = 2020,
  mileage = 50000,
  location = "Dakar, Senegal",
  transmission = "Automatic",
  fuelType = "Gasoline",
  onClick = () => {},
  onFavorite = () => {},
}: VehicleCardProps) => {
  return (
    <Card className="w-full max-w-[384px] overflow-hidden hover:shadow-lg transition-all duration-300 bg-background hover:-translate-y-1 group">
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[200px] object-cover"
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={(e) => {
            e.stopPropagation();
            onFavorite();
          }}
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      <CardContent className="p-4" onClick={onClick}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <span className="text-xl font-bold text-primary">
            ${price.toLocaleString()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <Badge variant="secondary" className="justify-center">
            {year}
          </Badge>
          <Badge variant="secondary" className="justify-center">
            {mileage.toLocaleString()} km
          </Badge>
          <Badge variant="secondary" className="justify-center">
            {transmission}
          </Badge>
          <Badge variant="secondary" className="justify-center">
            {fuelType}
          </Badge>
        </div>
      </CardContent>

      <Separator />

      <CardFooter className="p-4">
        <Button className="w-full" onClick={onClick}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;

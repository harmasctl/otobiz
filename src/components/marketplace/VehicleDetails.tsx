import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Heart, MapPin, Calendar, Gauge, Fuel, Settings } from "lucide-react";

interface VehicleDetailsProps {
  id?: string;
  image?: string;
  title?: string;
  price?: number;
  year?: number;
  mileage?: number;
  location?: string;
  transmission?: string;
  fuelType?: string;
  description?: string;
  features?: string[];
  onBack?: () => void;
  onContact?: () => void;
  onFavorite?: () => void;
}

const VehicleDetails = ({
  image = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&h=400&fit=crop",
  title = "2020 Toyota Camry",
  price = 15000,
  year = 2020,
  mileage = 50000,
  location = "Dakar, Senegal",
  transmission = "Automatic",
  fuelType = "Gasoline",
  description = "This beautiful Toyota Camry is in excellent condition. It features a powerful yet efficient engine, comfortable interior, and all the modern amenities you'd expect.",
  features = [
    "Bluetooth Connectivity",
    "Backup Camera",
    "Keyless Entry",
    "Power Windows",
    "Climate Control",
    "Alloy Wheels",
  ],
  onBack = () => {},
  onContact = () => {},
  onFavorite = () => {},
}: VehicleDetailsProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 bg-background">
      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>
          ← Back to listings
        </Button>
        <Button variant="outline" size="icon" onClick={onFavorite}>
          <Heart className="h-5 w-5" />
        </Button>
      </div>

      {/* Main Image */}
      <Card className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-[400px] object-cover"
        />
      </Card>

      {/* Basic Info */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">
              ${price.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Key Specs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Year</div>
              <div className="font-medium">{year}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Gauge className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Mileage</div>
              <div className="font-medium">{mileage.toLocaleString()} km</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Transmission</div>
              <div className="font-medium">{transmission}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Fuel className="h-5 w-5 text-muted-foreground" />
            <div>
              <div className="text-sm text-muted-foreground">Fuel Type</div>
              <div className="font-medium">{fuelType}</div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Description */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Separator />

      {/* Features */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Features</h2>
        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <Badge key={index} variant="secondary">
              {feature}
            </Badge>
          ))}
        </div>
      </div>

      {/* Contact Button */}
      <div className="pt-4">
        <Button className="w-full" size="lg" onClick={onContact}>
          Contact Seller
        </Button>
      </div>
    </div>
  );
};

export default VehicleDetails;

import React from "react";
import { Card } from "@/components/ui/card";

interface BrandCardProps {
  logo: string;
  name: string;
  modelCount: number;
  onClick?: () => void;
}

const BrandCard = ({
  logo,
  name,
  modelCount,
  onClick = () => {},
}: BrandCardProps) => {
  return (
    <Card
      className="group p-6 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center space-y-4 bg-white"
      onClick={onClick}
    >
      <img
        src={logo}
        alt={name}
        className="h-16 w-16 object-contain group-hover:scale-110 transition-transform duration-300"
      />
      <div className="text-center">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">{modelCount} models</p>
      </div>
    </Card>
  );
};

export default BrandCard;

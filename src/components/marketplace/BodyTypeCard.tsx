import React from "react";
import { Card } from "@/components/ui/card";

interface BodyTypeCardProps {
  image: string;
  name: string;
  count: number;
  onClick?: () => void;
}

const BodyTypeCard = ({
  image,
  name,
  count,
  onClick = () => {},
}: BodyTypeCardProps) => {
  return (
    <Card
      className="group cursor-pointer overflow-hidden relative h-[200px]"
      onClick={onClick}
    >
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 text-white">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-white/80">
          {count.toLocaleString()} vehicles
        </p>
      </div>
    </Card>
  );
};

export default BodyTypeCard;

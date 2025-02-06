import React from "react";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";

interface ReviewCardProps {
  avatar: string;
  name: string;
  rating: number;
  date: string;
  review: string;
  carModel: string;
}

const ReviewCard = ({
  avatar,
  name,
  rating,
  date,
  review,
  carModel,
}: ReviewCardProps) => {
  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{carModel}</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
            />
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{review}</p>
      <div className="text-xs text-muted-foreground">{date}</div>
    </Card>
  );
};

export default ReviewCard;

import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface NewsCardProps {
  image: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  onClick?: () => void;
}

const NewsCard = ({
  image,
  title,
  category,
  date,
  excerpt,
  onClick = () => {},
}: NewsCardProps) => {
  return (
    <Card
      className="group cursor-pointer overflow-hidden flex flex-col"
      onClick={onClick}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary">{category}</Badge>
          <span className="text-sm text-muted-foreground">{date}</span>
        </div>
        <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm flex-1">{excerpt}</p>
      </div>
    </Card>
  );
};

export default NewsCard;

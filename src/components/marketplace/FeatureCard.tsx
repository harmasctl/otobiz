import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick?: () => void;
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  onClick = () => {},
}: FeatureCardProps) => {
  return (
    <Card
      className="group p-6 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center text-center space-y-4 bg-white"
      onClick={onClick}
    >
      <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </Card>
  );
};

export default FeatureCard;

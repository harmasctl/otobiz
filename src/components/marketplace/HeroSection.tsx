import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface HeroSectionProps {
  onSearch?: (searchTerm: string) => void;
  backgroundImage?: string;
  title?: string;
  subtitle?: string;
}

const HeroSection = ({
  onSearch = () => {},
  backgroundImage = "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920&h=500&fit=crop",
  title = "Find Your Perfect Vehicle",
  subtitle = "Browse through thousands of cars, trucks, and motorcycles in Senegal",
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[500px] bg-gray-900">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by make, model, or keywords"
                className="h-12 bg-white/90 backdrop-blur-sm text-black placeholder:text-gray-500"
              />
            </div>
            <Button
              size="lg"
              className="h-12 px-6"
              onClick={() => onSearch("")}
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {["Popular Makes", "New Arrivals", "Price Range", "Location"].map(
              (filter) => (
                <Button
                  key={filter}
                  variant="secondary"
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  {filter}
                </Button>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

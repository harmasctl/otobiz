import React, { useState } from "react";
import HeroSection from "./marketplace/HeroSection";
import SearchBar from "./marketplace/SearchBar";
import FilterSidebar from "./marketplace/FilterSidebar";
import VehicleGrid from "./marketplace/VehicleGrid";
import { Button } from "./ui/button";
import { Filter } from "lucide-react";

interface HomeProps {
  initialSearchTerm?: string;
}

const Home = ({ initialSearchTerm = "" }: HomeProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearchTerm);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: any) => {
    // Handle filter changes
    console.log("Filters updated:", filters);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar and Filter Toggle */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1 w-full">
            <SearchBar onSearch={handleSearch} />
          </div>
          <Button
            variant="outline"
            className="sm:self-stretch flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {/* Main Grid and Sidebar Layout */}
        <div className="flex gap-6 relative min-h-[calc(100vh-20rem)]">
          {/* Filter Sidebar */}
          <aside
            className={`${showFilters ? "translate-x-0" : "-translate-x-full sm:translate-x-0"} 
            fixed sm:relative sm:block top-0 left-0 h-[calc(100vh-4rem)] z-30 transition-transform duration-300 ease-in-out bg-background`}
          >
            <FilterSidebar
              onFilterChange={handleFilterChange}
              onClose={() => setShowFilters(false)}
              isOpen={showFilters}
            />
          </aside>

          {/* Vehicle Grid */}
          <main className="flex-1 w-full sm:w-auto">
            <VehicleGrid
              onVehicleClick={(vehicle) =>
                console.log("Vehicle clicked:", vehicle)
              }
              onFavoriteClick={(vehicle) =>
                console.log("Favorite clicked:", vehicle)
              }
            />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Home;

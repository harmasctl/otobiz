import { useState } from "react";
import SearchBar from "@/components/marketplace/SearchBar";
import FilterSidebar from "@/components/marketplace/FilterSidebar";
import VehicleGrid from "@/components/marketplace/VehicleGrid";
import MapView from "@/components/marketplace/MapView";
import { Button } from "@/components/ui/button";
import { Grid, Map } from "lucide-react";
import { useVehicleSearch } from "@/hooks/useVehicleSearch";
import { useVehicleFilters } from "@/hooks/useVehicleFilters";

type ViewMode = "grid" | "map";

export default function SearchPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [showFilters, setShowFilters] = useState(true);

  const { filters, updateFilter, clearFilters } = useVehicleFilters();
  const { vehicles, loading, total } = useVehicleSearch(filters);

  const handleSearch = (searchParams: any) => {
    updateFilter("make", searchParams.make ? [searchParams.make] : undefined);
    updateFilter(
      "model",
      searchParams.model ? [searchParams.model] : undefined,
    );
    if (searchParams.location) {
      updateFilter("location", searchParams.location);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
            <div className="text-sm text-muted-foreground">
              {loading ? "Loading..." : `${total} vehicles found`}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("map")}
            >
              <Map className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex gap-6">
          {showFilters && (
            <FilterSidebar
              filters={filters}
              onFilterChange={updateFilter}
              onClearFilters={clearFilters}
            />
          )}

          <div className="flex-1">
            {viewMode === "grid" ? (
              <VehicleGrid vehicles={vehicles} loading={loading} />
            ) : (
              <div className="h-[800px]">
                <MapView
                  locations={vehicles.map((v) => ({
                    id: v.id,
                    lat: v.latitude || 0,
                    lng: v.longitude || 0,
                    title: `${v.year} ${v.make} ${v.model}`,
                    price: `$${v.price.toLocaleString()}`,
                    image: v.images?.[0] || "",
                  }))}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

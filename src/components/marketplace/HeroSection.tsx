import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface HeroSectionProps {
  onSearch?: (filters: SearchFilters) => void;
}

interface SearchFilters {
  postcode: string;
  national: string;
  make: string;
  model: string;
  minPrice: string;
  maxPrice: string;
  paymentType: "Cash" | "Finance";
}

const HeroSection = ({ onSearch = () => {} }: HeroSectionProps) => {
  const [filters, setFilters] = React.useState<SearchFilters>({
    postcode: "",
    national: "",
    make: "",
    model: "",
    minPrice: "",
    maxPrice: "",
    paymentType: "Cash",
  });

  const [totalCars] = React.useState(435926);

  return (
    <div className="relative w-full min-h-[600px] bg-[#FF0033] flex items-center">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Search Panel */}
        <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Find your perfect car</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Postcode"
                value={filters.postcode}
                onChange={(e) =>
                  setFilters({ ...filters, postcode: e.target.value })
                }
              />
              <Select
                value={filters.national}
                onValueChange={(value) =>
                  setFilters({ ...filters, national: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="National" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="national">National</SelectItem>
                  <SelectItem value="local">Local</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                value={filters.make}
                onValueChange={(value) =>
                  setFilters({ ...filters, make: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Make" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota</SelectItem>
                  <SelectItem value="honda">Honda</SelectItem>
                  <SelectItem value="ford">Ford</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.model}
                onValueChange={(value) =>
                  setFilters({ ...filters, model: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="camry">Camry</SelectItem>
                  <SelectItem value="civic">Civic</SelectItem>
                  <SelectItem value="focus">Focus</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant={filters.paymentType === "Cash" ? "default" : "outline"}
                className="w-full"
                onClick={() => setFilters({ ...filters, paymentType: "Cash" })}
              >
                Cash
              </Button>
              <Button
                variant={
                  filters.paymentType === "Finance" ? "default" : "outline"
                }
                className="w-full"
                onClick={() =>
                  setFilters({ ...filters, paymentType: "Finance" })
                }
              >
                Finance
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Select
                value={filters.minPrice}
                onValueChange={(value) =>
                  setFilters({ ...filters, minPrice: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Min price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1000">£1,000</SelectItem>
                  <SelectItem value="5000">£5,000</SelectItem>
                  <SelectItem value="10000">£10,000</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.maxPrice}
                onValueChange={(value) =>
                  setFilters({ ...filters, maxPrice: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Max price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="20000">£20,000</SelectItem>
                  <SelectItem value="30000">£30,000</SelectItem>
                  <SelectItem value="40000">£40,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className="w-full bg-[#0000FF] hover:bg-blue-700 text-white"
              size="lg"
              onClick={() => onSearch(filters)}
            >
              <Search className="mr-2 h-5 w-5" />
              Search {totalCars.toLocaleString()} cars
            </Button>

            <div className="flex justify-between text-sm">
              <button className="text-blue-600 hover:underline">
                Reset filters
              </button>
              <button className="text-blue-600 hover:underline">
                More options
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="text-white space-y-6 lg:max-w-2xl">
          <div className="space-y-2">
            <h1 className="text-6xl font-bold tracking-tight">
              BRAND NEW CARS
              <br />
              FOUND
              <span className="inline-block ml-4 bg-white text-[#FF0033] px-4">
                AT
              </span>
            </h1>
          </div>
          <p className="text-2xl">Available now and ready to roll.</p>
          <img
            src="https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&h=400&fit=crop"
            alt="New Car"
            className="w-full max-w-lg ml-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

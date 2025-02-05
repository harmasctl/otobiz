import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
  onClose?: () => void;
  isOpen?: boolean;
}

interface FilterState {
  priceRange: [number, number];
  makes: string[];
  models: string[];
  years: [number, number];
  mileage: [number, number];
  transmission: string[];
  fuelType: string[];
}

const FilterSidebar = ({
  onFilterChange = () => {},
  onClose = () => {},
  isOpen = true,
}: FilterSidebarProps) => {
  const [filters, setFilters] = React.useState<FilterState>({
    priceRange: [0, 100000],
    makes: [],
    models: [],
    years: [2000, 2024],
    mileage: [0, 200000],
    transmission: [],
    fuelType: [],
  });

  const makes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes"];
  const transmissions = ["Automatic", "Manual"];
  const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid"];

  const handlePriceChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [value[0], value[1]],
    }));
    onFilterChange(filters);
  };

  const handleCheckboxChange = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return {
        ...prev,
        [category]: newValues,
      };
    });
    onFilterChange(filters);
  };

  return (
    <div
      className={`w-80 h-full bg-background border-r border-border shadow-lg ${isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"} transition-transform duration-200 ease-in-out`}
    >
      <div className="p-4 border-b border-border flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-64px)] p-4">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="price">
            <AccordionTrigger>Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Slider
                  min={0}
                  max={100000}
                  step={1000}
                  value={[filters.priceRange[0], filters.priceRange[1]]}
                  onValueChange={handlePriceChange}
                  className="mt-6"
                />
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) =>
                      handlePriceChange([
                        parseInt(e.target.value),
                        filters.priceRange[1],
                      ])
                    }
                    className="w-full"
                  />
                  <span>to</span>
                  <Input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) =>
                      handlePriceChange([
                        filters.priceRange[0],
                        parseInt(e.target.value),
                      ])
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="make">
            <AccordionTrigger>Make</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {makes.map((make) => (
                  <div key={make} className="flex items-center space-x-2">
                    <Checkbox
                      id={`make-${make}`}
                      checked={filters.makes.includes(make)}
                      onCheckedChange={() =>
                        handleCheckboxChange("makes", make)
                      }
                    />
                    <label
                      htmlFor={`make-${make}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {make}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="transmission">
            <AccordionTrigger>Transmission</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {transmissions.map((transmission) => (
                  <div
                    key={transmission}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`transmission-${transmission}`}
                      checked={filters.transmission.includes(transmission)}
                      onCheckedChange={() =>
                        handleCheckboxChange("transmission", transmission)
                      }
                    />
                    <label
                      htmlFor={`transmission-${transmission}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {transmission}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fuelType">
            <AccordionTrigger>Fuel Type</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {fuelTypes.map((fuelType) => (
                  <div key={fuelType} className="flex items-center space-x-2">
                    <Checkbox
                      id={`fuelType-${fuelType}`}
                      checked={filters.fuelType.includes(fuelType)}
                      onCheckedChange={() =>
                        handleCheckboxChange("fuelType", fuelType)
                      }
                    />
                    <label
                      htmlFor={`fuelType-${fuelType}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {fuelType}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-6 space-x-2">
          {filters.makes.map((make) => (
            <Badge
              key={make}
              variant="secondary"
              className="mb-2"
              onClick={() => handleCheckboxChange("makes", make)}
            >
              {make}
              <X className="ml-1 h-3 w-3" />
            </Badge>
          ))}
        </div>

        <div className="mt-6 space-y-4">
          <Button
            className="w-full"
            onClick={() => {
              setFilters({
                priceRange: [0, 100000],
                makes: [],
                models: [],
                years: [2000, 2024],
                mileage: [0, 200000],
                transmission: [],
                fuelType: [],
              });
              onFilterChange(filters);
            }}
          >
            Clear All Filters
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

export default FilterSidebar;

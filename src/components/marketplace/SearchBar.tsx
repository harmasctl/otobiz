import React from "react";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchBarProps {
  onSearch?: (searchParams: SearchParams) => void;
  makes?: string[];
  models?: string[];
  locations?: string[];
}

interface SearchParams {
  query: string;
  make: string;
  model: string;
  location: string;
}

const defaultMakes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes"];
const defaultModels = ["Camry", "Civic", "F-150", "3 Series", "C-Class"];
const defaultLocations = [
  "Dakar",
  "Saint-Louis",
  "Thiès",
  "Ziguinchor",
  "Rufisque",
];

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch = () => {},
  makes = defaultMakes,
  models = defaultModels,
  locations = defaultLocations,
}) => {
  const [searchParams, setSearchParams] = React.useState<SearchParams>({
    query: "",
    make: "",
    model: "",
    location: "",
  });

  const handleSearch = () => {
    onSearch(searchParams);
  };

  return (
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-4 flex flex-col gap-4 md:flex-row md:items-center md:gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <Input
          type="text"
          placeholder="Search vehicles..."
          className="pl-10 w-full"
          value={searchParams.query}
          onChange={(e) =>
            setSearchParams({ ...searchParams, query: e.target.value })
          }
        />
      </div>

      <Select
        value={searchParams.make}
        onValueChange={(value) =>
          setSearchParams({ ...searchParams, make: value })
        }
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Make" />
        </SelectTrigger>
        <SelectContent>
          {makes.map((make) => (
            <SelectItem key={make} value={make}>
              {make}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.model}
        onValueChange={(value) =>
          setSearchParams({ ...searchParams, model: value })
        }
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={searchParams.location}
        onValueChange={(value) =>
          setSearchParams({ ...searchParams, location: value })
        }
      >
        <SelectTrigger className="w-full md:w-[180px]">
          <SelectValue placeholder="Location" />
        </SelectTrigger>
        <SelectContent>
          {locations.map((location) => (
            <SelectItem key={location} value={location}>
              {location}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="w-full md:w-auto" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;

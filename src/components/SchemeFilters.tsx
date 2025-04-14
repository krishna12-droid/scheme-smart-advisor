
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SchemeFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  providerFilter: string[];
  onProviderFilterChange: (provider: string) => void;
}

export const SchemeFilters = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  providerFilter,
  onProviderFilterChange,
}: SchemeFiltersProps) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name A-Z</SelectItem>
              <SelectItem value="name-desc">Name Z-A</SelectItem>
              <SelectItem value="provider">Provider</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant={providerFilter.includes("LIC") ? "secondary" : "outline"}
            onClick={() => onProviderFilterChange("LIC")}
            size="sm"
          >
            LIC
          </Button>
          <Button
            variant={providerFilter.includes("Star Health") ? "secondary" : "outline"}
            onClick={() => onProviderFilterChange("Star Health")}
            size="sm"
          >
            Star Health
          </Button>
          <Button
            variant={providerFilter.includes("Government") ? "secondary" : "outline"}
            onClick={() => onProviderFilterChange("Government")}
            size="sm"
          >
            Government
          </Button>
        </div>
      </div>
    </div>
  );
};

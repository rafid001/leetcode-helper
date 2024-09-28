import React from 'react';
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

interface MultiSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export function MultiSelect({ options, selected = [], onChange }: MultiSelectProps) {
    const handleToggle = (category: string) => {
      const updatedSelection = selected.includes(category)
        ? selected.filter(item => item !== category)
        : [...selected, category];
      onChange(updatedSelection);
    };
  
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between">
            {selected.length > 0 ? `${selected.length} selected` : "Select categories"}
            <ChevronDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <div className="max-h-60 overflow-auto p-2">
            {options.map((category) => (
              <div key={category} className="flex items-center space-x-2 p-2">
                <Checkbox
                  id={category}
                  checked={selected.includes(category)}
                  onCheckedChange={() => handleToggle(category)}
                />
                <label
                  htmlFor={category}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    );
  }
  
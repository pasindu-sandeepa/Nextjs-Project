"use client";

import {
  Combobox,
  ComboboxAnchor,
  ComboboxBadgeItem,
  ComboboxBadgeList,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxLabel,
  ComboboxTrigger,
} from "@/components/ui/combobox";
import { ChevronDown } from "lucide-react";
import * as React from "react";

export default function MultiSelect({ list, placeholder, onValueChange }) {
  const [value, setValue] = React.useState([]);

  return (
    <Combobox
      value={value}
      onValueChange={(newValue) => {
        setValue(newValue); // Update local state
        onValueChange(newValue); // Pass the selected value to the parent
      }}
    
      multiple
      autoHighlight
    >
      <ComboboxAnchor className="h-full min-h-10 flex-wrap px-3 py-2">
        <ComboboxBadgeList>
          {value.map((item) => {
            const option = list.find((option) => option.value === item);
            if (!option) return null;

            return (
              <ComboboxBadgeItem key={item} value={item}>
                {option.label}
              </ComboboxBadgeItem>
            );
          })}
        </ComboboxBadgeList>
        <ComboboxInput
          placeholder={placeholder}
          className="h-auto min-w-20 flex-1 focus:outline-none" // Remove outline on focus
        />
        <ComboboxTrigger className="absolute top-3 right-2">
          <ChevronDown className="h-4 w-4" />
        </ComboboxTrigger>
      </ComboboxAnchor>
      <ComboboxContent> 
        <ComboboxEmpty>No options found.</ComboboxEmpty>
        {list.map((item) => (
          <ComboboxItem key={item.value} value={item.value}>
            {item.label}
          </ComboboxItem>
        ))}
      </ComboboxContent>
    </Combobox>
  );
}
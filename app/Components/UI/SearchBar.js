import React from "react";
import { Icon } from "@iconify/react";

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search...",
  onClear
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon icon="mdi:magnify" className="text-body" width="20" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-3 rounded-lg border border-stroke bg-white/5 text-white outline-none focus:border-main transition-colors placeholder:text-body"
      />

      {value && (
        <button
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-body hover:text-white transition-colors"
          aria-label="Clear search"
        >
          <Icon icon="mdi:close" width="20" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

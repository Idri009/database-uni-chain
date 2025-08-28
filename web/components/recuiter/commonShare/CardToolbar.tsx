import React, { useState } from "react";
import { FaFilter, FaSortAlphaDown, FaSearch } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";

export default function CardToolbar({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  // Example: filter applied state (replace with your actual filter logic)
  const [filterApplied, setFilterApplied] = useState(false);

  return (
    <div className="  hover:bg-neutral-100 flex items-center justify-between bg-white rounded shadow px-4 py-2 mb-4">
      <div className="flex items-center gap-4">
        {/* Filter sidebar toggle */}
        <button
          className="relative p-2 rounded hover:bg-gray-100 flex items-center justify-center"
          onClick={() => {
            onToggleSidebar();
            setFilterApplied((v) => !v); // Demo toggle, replace with your filter logic
          }}
          title="Bộ lọc"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="6" width="20" height="3" rx="1.5" fill="#00000080" />
            <rect x="7" y="13" width="14" height="3" rx="1.5" fill="#00000080" />
            <rect x="10" y="20" width="8" height="3" rx="1.5" fill="#00000080" />
          </svg>
          {filterApplied && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-orange-500 rounded-full border-2 border-white"></span>
          )}
        </button>
        {/* Search box */}
        <div className="flex items-center border rounded-xl shadow-xs rounded px-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder=""
            className="rounded px-4 py-2 w-96 text-sm"
            style={{ color: '#000000' }}
          />
        </div>
        {/* Sort dropdown */}
        <select className="ml-2 px-2 py-1 rounded border text-sm border-1 text-black">
          <option value="name-asc">Sort by name (A-Z)</option>
          <option value="name-desc">Sort by name (Z-A)</option>
          <option value="date-asc">Sort by date (oldest)</option>
          <option value="date-desc">Sort by date (newest)</option>
        </select>
      </div>
      {/* Placeholder for extra actions if needed */}
      <div></div>
    </div>
  );
}

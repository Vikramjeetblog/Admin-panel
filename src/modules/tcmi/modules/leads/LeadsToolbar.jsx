import React from "react";
import { FiPlus, FiSearch } from "react-icons/fi";

const LeadsToolbar = ({ filters, setFilters, setPage, onOpenAdd }) => (
  <div className="flex flex-wrap items-center justify-between gap-3">
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative">
        <FiSearch className="absolute left-2 top-2.5 text-gray-500" size={14} />
        <input
          value={filters.search}
          onChange={(e) => {
            setFilters((prev) => ({ ...prev, search: e.target.value }));
            setPage(1);
          }}
          placeholder="Search leads..."
          className="rounded-lg border border-gray-200 py-2 pl-8 pr-3 text-xs"
        />
      </div>
      <select
        value={filters.status}
        onChange={(e) => {
          setFilters((prev) => ({ ...prev, status: e.target.value }));
          setPage(1);
        }}
        className="rounded-lg border border-gray-200 px-3 py-2 text-xs"
      >
        <option>All</option>
        <option>Hot</option>
        <option>Warm</option>
        <option>Cold</option>
      </select>
      <button onClick={() => setFilters({ search: "", status: "All" })} className="rounded-lg border border-gray-200 px-3 py-2 text-xs hover:bg-gray-50">
        Clear Filters
      </button>
    </div>
    <button onClick={onOpenAdd} className="inline-flex items-center gap-1 rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">
      <FiPlus size={14} /> Add Lead
    </button>
  </div>
);

export default LeadsToolbar;

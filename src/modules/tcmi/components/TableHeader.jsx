import React from "react";

const TableHeader = ({ children, sortable = false, onSort }) => (
  <th
    className={`px-3 py-2 text-left text-[11px] uppercase tracking-[0.12em] text-gray-500 ${sortable ? "cursor-pointer hover:bg-gray-50" : ""}`}
    onClick={sortable ? onSort : undefined}
  >
    {children}
  </th>
);

export default TableHeader;

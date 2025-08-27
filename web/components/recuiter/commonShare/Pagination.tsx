import React, { useState } from "react";

export default function Pagination() {
  const totalPages = 10;
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="flex justify-end items-center gap-2 mb-8 text-black">
      {/* Prev button */}
      <button
        className="px-4 mt-2 py-1.5 border border-gray-300 rounded bg-gray-50 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p - 1))}
      >
        &lt;
      </button>

      <select
        value={currentPage}
        onChange={(e) => setCurrentPage(Number(e.target.value))}
        className="px-2 py-1 rounded border border-gray-200 bg-gray-50 disabled:opacity-50 py-2 mt-2"
      >
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <option key={page} value={page}>
            Page {page}
          </option>
        ))}
      </select>

      {/* Next button */}
      <button
        className="px-4 mt-2 py-1.5 border border-gray-300 rounded bg-gray-50 disabled:opacity-50"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
      >
        &gt;
      </button>
    </div>
  );
}

import React from "react";

export default function SkillPagination() {
  return (
    <div className="flex justify-end items-center gap-2 mb-8">
      <span>Page 1</span>
      <button className="px-3 py-1 rounded bg-gray-200">&lt;</button>
      <button className="px-3 py-1 rounded bg-gray-200">&gt;</button>
    </div>
  );
}

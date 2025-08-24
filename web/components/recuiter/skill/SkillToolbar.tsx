import React from "react";
import { FaSearch } from "react-icons/fa";

export default function SkillToolbar() {
  return (
    <div className="flex items-center gap-4 mb-4">
      <button className="p-2 rounded bg-white shadow text-blue-700">Tất cả</button>
      <div className="flex items-center bg-white rounded shadow px-2 flex-1">
        <FaSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Tìm kiếm tên ứng viên, học đại chỉ ứng viên"
          className="bg-transparent outline-none py-1 text-sm w-full"
        />
      </div>
      <select className="px-2 py-1 rounded border text-sm bg-white shadow">
        <option value="name-asc">Sort by name (A-Z)</option>
        <option value="name-desc">Sort by name (Z-A)</option>
      </select>
    </div>
  );
}

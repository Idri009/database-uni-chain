import React from "react";

const filters = {
  type: ["Bằng cấp", "Chứng chỉ", "Giải thưởng", "Tin chỉ"],
  education: ["Đại học", "Trung tâm đào tạo", "Công ty"],
  level: ["Dễ", "Trung bình", "Khó"],
};

export default function NFTFilterSidebar() {
  return (
    <aside className="bg-white rounded shadow p-4 w-64 h-full" style={{color: 'black'}}>
      <h3 className="font-bold mb-2">Lọc</h3>
      <div className="mb-4">
        <div className="font-semibold mb-1">Loại</div>
        {filters.type.map((t) => (
          <div key={t} className="flex items-center mb-1">
            <input
              type="radio"
              name="filterType" // 👈 all radios share the same name
              value={t}
              defaultChecked={t === "Bằng cấp"}
              className="mr-2"
            />
            <span>{t}</span>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-1">Đơn vị giáo dục</div>
        {filters.education.map((e) => (
          <div key={e} className="flex items-center mb-1">
            <input type="checkbox" className="mr-2" />
            <span>{e}</span>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <div className="font-semibold mb-1">Độ khó</div>
        {filters.level.map((l) => (
          <div key={l} className="flex items-center mb-1">
            <input type="checkbox" className="mr-2" />
            <span>{l}</span>
          </div>
        ))}
      </div>
      <button className="text-xs text-gray-500 underline">Clear All</button>
    </aside>
  );
}

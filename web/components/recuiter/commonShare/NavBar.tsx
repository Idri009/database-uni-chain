import React from "react";

const NavBar = () => (
  <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
    <div className="flex items-center gap-4">
      <button className="p-2" aria-label="Open menu">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect y="4" width="24" height="2" rx="1" fill="#333" />
          <rect y="11" width="24" height="2" rx="1" fill="#333" />
          <rect y="18" width="24" height="2" rx="1" fill="#333" />
        </svg>
      </button>
      <img src="/logo-UIT.svg" onClick={() => window.location.href='/recuiter/landingPage'} alt="Logo" className="h-8 w-9 cursor-pointer" />
    </div>
    <div className="relative flex-1 flex justify-center">
      <input
        type="text"
        placeholder="Tìm kiếm bằng tên ứng viên, hoặc địa chỉ ứng viên"
        className="border rounded px-4 py-2 w-96 text-sm"
        style={{ color: '#000000' }}
      />
    </div>
    <div className="w-23"></div>
  </nav>
);

export default NavBar;

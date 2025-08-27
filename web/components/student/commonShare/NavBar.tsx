import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const NavBar = () => (
  <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
    {/* Left section*/}
    <div className="flex items-center gap-4">
      <button className="p-2" aria-label="Open menu">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" rx="1" fill="#333" />
          <rect y="11" width="24" height="2" rx="1" fill="#333" />
          <rect y="18" width="24" height="2" rx="1" fill="#333" />
        </svg>
      </button>
      <img
        src="/logo-UIT.svg"
        onClick={() => (window.location.href = "/recuiter/landingPage")}
        alt="Logo"
        className="h-8 w-9 cursor-pointer"
      />
    </div>

    {/* Middle section */}
    <div className="relative flex-1 flex justify-center">
      <div className="relative w-96">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder=""
          className="pl-10 pr-4 py-2 border rounded w-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ color: "#000000" }}
        />
      </div>
    </div>

    {/* Right section */}
    <div className="w-46 flex gap-4 justify-end h-13">
        <button className="text-white font-bold bg-blue-600 rounded rounded-xl w-36 px-5 whitespace-nowrap text-xm">Đăng nhập</button>
        <button className="text-black font-bold border border-solid border-black w-36 whitespace-nowrap text-xm rounded rounded-xl px-5">Đăng ký</button>
    </div>
  </nav>
);

export default NavBar;

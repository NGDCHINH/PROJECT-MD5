import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Logo1 from "../../assets/quiz1.png";

export const HeaderUser = () => {
  return (
    <nav className="bg-gray-800 ">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex-shrink-0 flex items-center">
            <img className="h-14 w-14 cursor-pointer" src={Logo1} alt="Quiz" />
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
            <a
              href="/"
              className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
              aria-current="page"
            >
              Trang chủ
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Tin tức
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Cộng đồng
            </a>
            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Liên hệ
            </a>
            <a
              href="/signin"
              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
            >
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

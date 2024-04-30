import React from "react";
import { HeaderUser } from "../../components/header&etc/HeaderUser";
import { FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import bg1 from "../../assets/bg1.png";

export const HomePage = () => {
  const Nav = useNavigate();

  return (
    <div>
      <div>
        <HeaderUser />
      </div>
      <div className="relative flex flex-col mt-0 items-center h-screen">
        <img
          src={bg1}
          className="absolute inset-0 w-full h-full object-cover"
          alt="Background"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white gap-5">
          <h1 className="text-9xl text-blue-400">Let's do some quiz</h1>
          <h2 className="text-3xl">Test your skills and become a master</h2>
          <h2 className="">Bắt đầu tại đây:</h2>
          <div className="flex gap-1 justify-center items-center bg-blue-400 p-3 rounded-md">
            <FiUserPlus size={30} className="p-1" />
            <button
              className="bg-blue-400 p-3 rounded-md"
              onClick={() => Nav("/signup")}
            >
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

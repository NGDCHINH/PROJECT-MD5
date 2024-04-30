import React, { useEffect, useState } from "react";
import logo1 from "../../assets/quiz1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const SignInPage: React.FC = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const Nav = useNavigate();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post<{ token: string }>(
        "http://localhost:8080/auth/login",
        inputValue,
        {
          withCredentials: true,
        }
      );

      const token = res.data.token;

      // Lưu token vào cookie
      Cookies.set("token", token);

      // Chuyển hướng đến trang /app
      Nav("/app");
    } catch (error) {
      console.log("Error during login:", error);
      setError("Failed to login.");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <div className="w-full flex justify-center mb-4">
              <img src={logo1} alt="" className="w-20 h-20 rounded-full" />
            </div>
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">
              Đăng nhập
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Đăng nhập email và mật khẩu
            </p>
          </div>
          <div className="m-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleOnChange}
                  placeholder="you@company.com"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleOnChange}
                  placeholder="Your Password"
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
                <a
                  href="#!"
                  className=" text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>
              <div className="mb-6">
                <button className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-900 focus:outline-none my-1">
                  Sign In
                </button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
              </div>
              <p className="text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?{" "}
                <a
                  href="/signup"
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"
                >
                  Sign up
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

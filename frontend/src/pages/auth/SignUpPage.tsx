import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo1 from "../../assets/quiz1.png";
import axios from "axios";
import Swal from "sweetalert2";

export const SignUpPage = () => {
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [error, setError] = useState("");
  const Nav = useNavigate();

  const handleOnChange = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.password !== inputValue.confirm_password) {
      setPasswordMatch(false);
      setError("Mật khẩu không trùng khớp!");
      showAlert("Error", "Mật khẩu không trùng khớp!", "error");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:8080/user/create",
        inputValue
      );
      if (res.data.error) {
        setError(res.data.error);
        showAlert("Error", res.data.error, "error");
        return;
      }
      Nav("/signin");
    } catch (error) {
      console.log("Error during login:", error);
      showAlert("Error", "Đăng ký thất bại.", "error");
    }
  };

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="bg-grey-lighter min-h-screen flex flex-col">
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <div className="w-full flex justify-center mb-4">
            <img src={logo1} alt="" className="w-20 h-20 rounded-full" />
          </div>
          <h1 className="mb-8 text-3xl text-center">Sign Up</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign up to do some quiz
          </p>
          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="Full Name"
            onChange={handleOnChange}
          />

          <input
            type="text"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onChange={handleOnChange}
          />

          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            onChange={handleOnChange}
          />
          <input
            type="password"
            className="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="Confirm Password"
            onChange={handleOnChange}
          />
          <button
            className="w-full text-center py-3 rounded bg-green-400 text-white hover:bg-green-900 focus:outline-none my-1"
            onClick={handleSubmit}
          >
            Sign Up
          </button>
          <div className="text-center text-sm text-grey-dark mt-4">
            By signing up, you agree to the
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="https://en.wikipedia.org/wiki/Terms_of_service"
            >
              Terms of Service
            </a>{" "}
            and
            <a
              className="no-underline border-b border-grey-dark text-grey-dark"
              href="https://en.wikipedia.org/wiki/Privacy_policy"
            >
              Privacy Policy
            </a>
          </div>
        </div>

        <div className="text-gray-700 mt-6">
          Already have an account?
          <a
            className="no-underline border-b border-blue text-blue-500"
            href="/signin"
          >
            Sign In
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

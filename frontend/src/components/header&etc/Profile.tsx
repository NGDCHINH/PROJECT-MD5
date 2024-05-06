import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  avatar: string;
  password: string;
}

export const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const jwt = Cookies.get("token");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  }, [jwt]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleUpdateProfile = () => {
    if (password !== confirmPassword) {
      alert("Mật khẩu và mật khẩu nhập lại không khớp.");
      return;
    }

    axios
      .patch(`http://localhost:8080/user/${user?.id}`, {
        email: user?.email,
        password: password,
        avatar: user?.avatar,
      })
      .then((response) => {
        Swal.fire({
          icon: "success",
          title: "Cập nhật thành công!",
        });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex gap-40">
      <div>
        <h1>Thông tin người dùng</h1>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border">
          <tbody>
            <tr>
              <td className="px-6 py-3 bg-gray-200 dark:bg-gray-200 border-b">
                Tên người dùng
              </td>
              <td className="px-6 py-3 bg-gray-200 dark:bg-gray-200 border-b">
                {user?.username}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-3 bg-gray-200 dark:bg-gray-200 border-b">
                Email người dùng
              </td>
              <td className="px-6 py-3 bg-gray-200 dark:bg-gray-200 border-b">
                {user?.email}
              </td>
            </tr>
            <tr>
              <td className="px-6 py-3 bg-gray-200 dark:bg-gray-200 border-b">
                Avatar người dùng
              </td>
              <td className="px-6 py-3 bg-gray-200 dark:bg-gray-200 border-b">
                <img src={user?.avatar} alt="Avatar" className="w-20 h-20" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1>Cập nhật thông tin</h1>
        <div className="border">
          <table>
            <tbody>
              <tr>
                <td className="px-6 py-3 bg-gray-200 dark:bg-gray-200 border-b">
                  Tên người dùng
                </td>
                <td>{user?.username}</td>
              </tr>
              <tr>
                <td className="px-6 py-3 bg-gray-200 dark:bg-gray-200 border-b">
                  Email người dùng
                </td>
                <input type="email" onChange={handlePasswordChange} />
              </tr>
              <tr>
                <td className="px-6 py-3 bg-gray-200 dark:bg-gray-200 border-b">
                  Avatar người dùng
                </td>
                <td>
                  <input type="file" onChange={handlePasswordChange} />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 bg-gray-200 dark:bg-gray-200 border-b">
                  Mật khẩu
                </td>
                <td>
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={handlePasswordChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="px-6 py-3 bg-gray-200 dark:bg-gray-200 border-b">
                  Nhập lại mật khẩu
                </td>
                <td>
                  <input
                    type={showPassword ? "text" : "password"}
                    onChange={handleConfirmPasswordChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={handleUpdateProfile}
            className="mx-40 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
};
